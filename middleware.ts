import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const publicPaths = ["/", "/auth/signin", "/auth/register", "/api/auth/**"];

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Allow unauthenticated access to public paths
	if (
		publicPaths.some(
			(path) =>
				pathname === path ||
				(path.endsWith("**") && pathname.startsWith(path.slice(0, -3))),
		)
	) {
		return NextResponse.next();
	}

	// Get the session token
	const sessionToken = await getToken({
		req: request,
		secret: process.env.NEXTAUTH_SECRET,
	});

	// Debug logging
	console.log("Middleware - Session Check:", {
		pathname,
		hasSession: !!sessionToken,
		token: sessionToken ? "***" : "none",
		env: {
			NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "set" : "not set",
			NODE_ENV: process.env.NODE_ENV,
		},
	});

	if (!sessionToken) {
		// Not authenticated, redirect to sign-in
		const signinUrl = new URL("/auth/signin", request.url);
		signinUrl.searchParams.set("callbackUrl", encodeURI(request.url));
		return NextResponse.redirect(signinUrl);
	}

	// Add security headers
	const response = NextResponse.next();
	response.headers.set("x-middleware-cache", "no-cache");

	return response;
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
