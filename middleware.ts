import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Public paths that don't require authentication
const publicPaths = [
	"/",
	"/auth/signin",
	"/auth/register",
	"/auth/error",
	"/api/auth/**",
	"/_next/**",
	"/favicon.ico",
];

// Log environment variables (without sensitive data)
function logEnvironment() {
	console.log("Middleware Environment:", {
		NODE_ENV: process.env.NODE_ENV,
		VERCEL_ENV: process.env.VERCEL_ENV,
		VERCEL_URL: process.env.VERCEL_URL,
		NEXTAUTH_URL: process.env.NEXTAUTH_URL ? "set" : "not set",
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "set" : "not set",
	});
}

// Check if the path is public
function isPublicPath(pathname: string): boolean {
	return publicPaths.some(
		(path) =>
			pathname === path ||
			(path.endsWith("**") && pathname.startsWith(path.slice(0, -3))),
	);
}

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Log environment on first request for debugging
	if (process.env.NODE_ENV === "development") {
		logEnvironment();
	}

	// Skip middleware for public paths
	if (isPublicPath(pathname)) {
		const response = NextResponse.next();
		response.headers.set("x-middleware-cache", "no-cache");
		return response;
	}

	try {
		// Get the session token
		const session = await getToken({
			req: request,
			secret: process.env.NEXTAUTH_SECRET,
			secureCookie: process.env.NODE_ENV === "production",
		});

		// Debug logging
		console.log("Middleware - Session Check:", {
			pathname,
			hasSession: !!session,
			isPublicPath: isPublicPath(pathname),
			url: request.url,
			method: request.method,
			host: request.headers.get("host"),
			referer: request.headers.get("referer"),
		});

		// If no session, redirect to sign-in with callback URL
		if (!session) {
			const signInUrl = new URL("/auth/signin", request.url);
			signInUrl.searchParams.set("callbackUrl", request.url);
			console.log("Redirecting to sign in:", signInUrl.toString());
			return NextResponse.redirect(signInUrl);
		}

		// Add security headers to authenticated responses
		const response = NextResponse.next();
		response.headers.set("x-middleware-cache", "no-cache");

		// Security headers
		response.headers.set("x-frame-options", "DENY");
		response.headers.set("x-content-type-options", "nosniff");
		response.headers.set("x-xss-protection", "1; mode=block");
		response.headers.set("referrer-policy", "strict-origin-when-cross-origin");

		return response;
	} catch (error) {
		console.error("Middleware error:", error);

		// Log detailed error information
		const errorInfo =
			error instanceof Error
				? { message: error.message, stack: error.stack }
				: { error: "Unknown error type" };

		console.error("Middleware error details:", errorInfo);

		// Redirect to error page with error details
		const errorUrl = new URL("/auth/error", request.url);
		errorUrl.searchParams.set("error", "MiddlewareError");
		errorUrl.searchParams.set("from", pathname);

		return NextResponse.redirect(errorUrl);
	}
}

export const config = {
	matcher: [
		// Match all request paths except for the ones starting with:
		// - _next/static (static files)
		// - _next/image (image optimization files)
		// - favicon.ico (favicon file)
		// - public folder
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
