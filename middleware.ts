import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Allow unauthenticated access to the root page only
	if (pathname === "/") {
		return NextResponse.next();
	}

	// Check for mockAuthToken cookie (demo auth only)
	const mockAuthToken = request.cookies.get("mockAuthToken");

	if (!mockAuthToken) {
		// Not authenticated, redirect to root
		const signinUrl = request.nextUrl.clone();
		signinUrl.pathname = "/";
		return NextResponse.redirect(signinUrl);
	}

	// Authenticated, allow access
	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
