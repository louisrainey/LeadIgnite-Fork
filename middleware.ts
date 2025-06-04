import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const publicPaths = [
	"/",
	"/auth/signin",
	"/auth/register",
	"/api/auth/**",
	"/_next/**",
];

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const isPublicPath = publicPaths.some(
		(path) =>
			pathname === path ||
			(path.endsWith("**") && pathname.startsWith(path.slice(0, -3))),
	);

	// Allow unauthenticated access to public paths
	if (isPublicPath) {
		return NextResponse.next();
	}

	try {
		// Get the session token
		const session = await getToken({
			req: request,
			secret: process.env.NEXTAUTH_SECRET,
		});

		// Debug logging
		console.log("Middleware - Session Check:", {
			pathname,
			hasSession: !!session,
			isPublicPath,
			env: {
				NODE_ENV: process.env.NODE_ENV,
				NEXTAUTH_URL: process.env.NEXTAUTH_URL,
			},
		});

		// If no session and not a public path, redirect to sign-in
		if (!session) {
			const signInUrl = new URL("/auth/signin", request.url);
			signInUrl.searchParams.set("callbackUrl", request.url);
			return NextResponse.redirect(signInUrl);
		}

		// Add security headers
		const response = NextResponse.next();
		response.headers.set("x-middleware-cache", "no-cache");
		return response;
	} catch (error) {
		console.error("Middleware error:", error);
		// In case of error, redirect to sign-in
		const signInUrl = new URL("/auth/error", request.url);
		signInUrl.searchParams.set("error", "SessionError");
		return NextResponse.redirect(signInUrl);
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
