import type { NextAuthConfig } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

// Get the base URL based on the environment
const getBaseUrl = () => {
	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`;
	}
	if (process.env.NEXTAUTH_URL) {
		return process.env.NEXTAUTH_URL;
	}
	return "http://localhost:3000";
};

const baseUrl = getBaseUrl();
console.log("Auth Config - Base URL:", baseUrl);

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
				domain:
					process.env.NODE_ENV === "production"
						? new URL(baseUrl).hostname.replace("www.", "")
						: undefined,
			},
		},
	},
	debug: process.env.NODE_ENV === "development",
	trustHost: true,
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
