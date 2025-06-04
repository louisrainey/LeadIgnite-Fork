/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
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
	},
	env: {
		NEXTAUTH_URL: process.env.VERCEL_URL
			? `https://${process.env.VERCEL_URL}`
			: "http://localhost:3000",
	},
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "x-middleware-cache",
						value: "no-cache",
					},
				],
			},
		];
	},
};

// Ensure environment variables are loaded at build time
console.log("Next.js Config - NEXTAUTH_URL:", nextConfig.env.NEXTAUTH_URL);

module.exports = nextConfig;
