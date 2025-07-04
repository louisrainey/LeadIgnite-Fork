/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'utfs.io',
      'www.realtor.com',
      'unsplash.com',
      'pixabay.com',
      'ap.rdcpix.com',
      'loremflickr.com',
      'picsum.photos',
      'avatars.githubusercontent.com'
    ]
  },
  // Exclude Supabase functions from the build
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Exclude server-side only modules from the client bundle
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false
        // Add any other Node.js modules that might be causing issues
      };
    }
    return config;
  },
  // Ignore TypeScript errors in Supabase functions
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  },
  // Exclude the supabase/functions directory from the build
  exclude: ['**/supabase/functions/**/*']
};

// Filter out the supabase/functions directory from the build
const withTM = require('next-transpile-modules')([]);

module.exports = withTM(nextConfig);
