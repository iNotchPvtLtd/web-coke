const nextConfig = {
  output: 'export', // Ensures a static export build
  distDir: 'dist',  // Output directory for the build

  images: {
    unoptimized: true, // Required for static export (disables Next's image optimization)
    domains: [
      'imakesite.s3.eu-north-1.amazonaws.com',
      process.env.STRAPI_API_URL
        ? new URL(process.env.STRAPI_API_URL).hostname
        : 'localhost'
    ]
  },

  assetPrefix: process.env.NODE_ENV === 'production'
    ? 'https://imakesite.s3.eu-north-1.amazonaws.com/templates/coke'
    : '',

  trailingSlash: true, // Ensures URLs have trailing slashes (important for static hosting)

  basePath: '/templates/coke', // Needed if you're deploying the site under this S3 subfolder

  env: {
    STRAPI_API_URL: process.env.STRAPI_API_URL || 'http://localhost:1337',
    GRAPESJS_ENABLED: process.env.GRAPESJS_ENABLED || 'false'
  },

  experimental: {
    appDir: true // Keep this if you're using the App Router
  }
};

export default nextConfig;




