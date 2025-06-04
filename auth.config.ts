import type { NextAuthConfig } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

// Get the base URL based on the environment
const getBaseUrl = () => {
	// In production on Vercel, use VERCEL_URL if available
	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`;
	}
	// Allow overriding with NEXTAUTH_URL if explicitly set
	if (process.env.NEXTAUTH_URL) {
		return process.env.NEXTAUTH_URL;
	}
	// Default to localhost for development
	return "http://localhost:3000";
};

const baseUrl = getBaseUrl();
console.log("Auth Config - Base URL:", baseUrl);

// Get the root domain for cookies (without www or subdomains)
const getCookieDomain = (url: string) => {
	try {
		const hostname = new URL(url).hostname;
		// For localhost, return undefined to avoid setting domain
		if (hostname === "localhost") return undefined;
		// For Vercel preview URLs, use the full domain
		if (hostname.endsWith(".vercel.app")) return hostname;
		// For custom domains, remove subdomains
		const parts = hostname.split(".");
		return parts.length > 2 ? parts.slice(-2).join(".") : hostname;
	} catch (e) {
		console.error("Error parsing URL for cookie domain:", e);
		return undefined;
	}
};

const cookieDomain = getCookieDomain(baseUrl);
console.log("Auth Config - Cookie Domain:", cookieDomain);

// List of trusted hosts for NextAuth
export const authTrustedHosts = [
	// Vercel preview deployments
	/\.vercel\.app$/,
	// Add your production domain here when ready
	// /yourdomain\.com$/,
];

const authConfig: NextAuthConfig = {
	providers: [
		CredentialProvider({
			name: "credentials",
			credentials: {
				email: { type: "email", label: "Email" },
				password: { type: "password", label: "Password" },
			},
			async authorize(credentials) {
				const testEmail = process.env.NEXT_PUBLIC_TEST_USER_EMAIL;
				const testPassword = process.env.NEXT_PUBLIC_TEST_USER_PASSWORD;

				// DEBUG LOGGING
				console.log("DEBUG AUTH", {
					credentialsEmail: credentials?.email,
					testEmail,
					emailMatch: credentials?.email === testEmail,
					passwordMatch: credentials?.password === testPassword,
				});

				if (!testEmail || !testPassword) {
					console.error(
						"Missing test user credentials in environment variables",
					);
					return null;
				}

				if (
					credentials?.email === testEmail &&
					credentials?.password === testPassword
				) {
					const user = {
						id: "test-user",
						email: testEmail,
						name: "Test User",
						role: "tester",
					};
					console.log("User authenticated successfully:", user.email);
					return user;
				}
				console.log("Authentication failed: Invalid credentials");
				return null;
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	useSecureCookies: process.env.NODE_ENV === "production",
	cookies: {
		sessionToken: {
			name: `${process.env.NODE_ENV === "production" ? "__Secure-" : ""}next-auth.session-token`,
			options: {
				httpOnly: true,
				sameSite: "lax",
				path: "/",
				secure: process.env.NODE_ENV === "production",
				domain: cookieDomain,
			},
		},
	},
	debug:
		process.env.NODE_ENV === "development" ||
		process.env.NODE_ENV === "production",
	trustHost: true, // Temporarily set to true for Vercel, implement custom trust check in middleware instead
	theme: {
		logo: `${baseUrl}/logo.png`, // Example of using baseUrl
	},
	callbacks: {
		async redirect({ url, baseUrl }) {
			return url.startsWith(baseUrl) ? url : baseUrl;
		},
	},
	pages: {
		signIn: "/auth/signin",
	},
} satisfies NextAuthConfig;

export default authConfig;
