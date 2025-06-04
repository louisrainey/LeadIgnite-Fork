/** @type {import('next').NextConfig} */
const nextConfig = {
	// Enable React strict mode
	reactStrictMode: true,

	// Configure ESLint
	eslint: {
		ignoreDuringBuilds: true,
	},

	// Configure image domains
	images: {
		domains: [
			"utfs.io",
			"www.realtor.com",
			"unsplash.com",
			"pixabay.com",
			"ap.rdcpix.com",
			"loremflickr.com",
			"picsum.photos",
			"avatars.githubusercontent.com",
			"placehold.co",
		],
		// Enable image optimization for Vercel
		unoptimized: false,
	},

	// Environment variables
	env: {
		// Set NEXTAUTH_URL based on Vercel environment
		NEXTAUTH_URL:
			process.env.NEXTAUTH_URL ||
			(process.env.VERCEL_URL
				? `https://${process.env.VERCEL_URL}`
				: "http://localhost:3000"),

		// Debug mode based on environment
		NEXTAUTH_DEBUG: process.env.NODE_ENV !== "production" ? "true" : "false",
	},

	// Custom headers
	async headers() {
		return [
			{
				// Apply these headers to all routes
				source: "/(.*)",
				headers: [
					// Security headers
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "X-XSS-Protection",
						value: "1; mode=block",
					},
					// Disable caching for all responses
					{
						key: "Cache-Control",
						value: "no-store, max-age=0",
					},
					// Disable middleware caching
					{
						key: "x-middleware-cache",
						value: "no-cache",
					},
				],
			},
		];
	},

	// Webpack configuration
	webpack: (config, { isServer }) => {
		// Important: return the modified config
		return config;
	},
};

// Log important configuration at build time
console.log("Next.js Configuration:");
console.log("- NODE_ENV:", process.env.NODE_ENV);
console.log("- NEXTAUTH_URL:", nextConfig.env.NEXTAUTH_URL);
console.log("- VERCEL_ENV:", process.env.VERCEL_ENV || "development");
console.log("- VERCEL_URL:", process.env.VERCEL_URL || "localhost");

module.exports = nextConfig;
