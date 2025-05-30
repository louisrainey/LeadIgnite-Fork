import type { NextAuthConfig } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

// Get the base URL based on the environment
const getBaseUrl = () => {
	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`;
	}
	return "http://localhost:3000";
};

const baseUrl = getBaseUrl();

const authConfig: NextAuthConfig = {
	providers: [
		CredentialProvider({
			credentials: {
				email: { type: "email" },
				password: { type: "password" },
			},
			async authorize(credentials) {
				const testEmail = process.env.NEXT_PUBLIC_TEST_USER_EMAIL;
				const testPassword = process.env.NEXT_PUBLIC_TEST_USER_PASSWORD;

				// DEBUG LOGGING
				console.log("DEBUG AUTH", {
					credentialsEmail: credentials?.email,
					credentialsPassword: credentials?.password,
					testEmail,
					testPassword,
					emailMatch: credentials?.email === testEmail,
					passwordMatch: credentials?.password === testPassword,
				});

				if (
					credentials?.email === testEmail &&
					credentials?.password === testPassword
				) {
					return {
						id: "test-user",
						email: testEmail,
						name: "Test User",
						role: "tester",
					};
				}
				return null;
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
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
