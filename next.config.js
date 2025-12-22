/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');

dotenv.config();


const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
          {
        protocol: 'http',
        hostname: 'localhost',
        port: '3045',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ignitingminds.org',
        port: '',
        pathname: '/**',
      },
      // Some image URLs come without a slash after the domain ("ignitingminds.orguploads"),
      // so allow that hostname as well to avoid runtime errors.
      {
        protocol: 'https',
        hostname: 'ignitingminds.orguploads',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.ignitingminds.org',
        port: '',
        pathname: '/**',
      },
	  {
        protocol: 'https',
        hostname: 'api.walkforgreen.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'igbucket.ap-south-1.linodeobjects.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "imo-dev-uploads.s3.ap-south-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "imo-qa-uploads.s3.ap-south-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
  key: 'Strict-Transport-Security',
  value: "max-age=31536000; includeSubDomains; preload"    
},
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Content-Security-Policy',
            // value: [
            //   "default-src 'self'",
            //   "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://code.jquery.com https://cdnjs.cloudflare.com https://www.googletagmanager.com https://www.google-analytics.com https://www.gstatic.com https://maps.googleapis.com",
            //   "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
            //   "img-src 'self' data: https: blob:",
            //   "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com data:",
            //   "connect-src 'self' http://localhost:3045 http://localhost:3030 https://api.ignitingminds.org https://qa.api.ignitingminds.org https://api.walkforgreen.org https://www.google-analytics.com https://analytics.google.com https://maps.googleapis.com",
            //   "frame-src 'self' https://www.youtube.com https://www.facebook.com https://www.instagram.com",
            //   "object-src 'none'",
            //   "media-src 'self' https:",
            //   "worker-src 'self' blob:",
            //   "child-src 'self' blob:",
            //   "form-action 'self'",
            //   "base-uri 'self'",
            //   "manifest-src 'self'",
            //   "upgrade-insecure-requests"
            // ].join('; ')
              value: [
                  "default-src 'self'",
                  // Razorpay REQUIRED
                  "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://checkout.razorpay.com https://code.jquery.com https://cdnjs.cloudflare.com https://www.googletagmanager.com https://www.google-analytics.com https://www.gstatic.com https://maps.googleapis.com",
                  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
                  // Razorpay images
                  "img-src 'self' data: https: blob: https://razorpay.com https://imo-dev-uploads.s3.ap-south-1.amazonaws.com https://imo-qa-uploads.s3.ap-south-1.amazonaws.com",
                  "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com data:",
                  // Razorpay API + analytics
                  "connect-src 'self' http://localhost:3045 http://localhost:3005 http://localhost:3030 https://api.ignitingminds.org https://qa.api.ignitingminds.org https://api.walkforgreen.org https://api.razorpay.com https://lumberjack.razorpay.com https://www.google-analytics.com https://analytics.google.com https://maps.googleapis.com https://imo-dev-uploads.s3.ap-south-1.amazonaws.com https://imo-qa-uploads.s3.ap-south-1.amazonaws.com",
                  // Razorpay popup requires BOTH:
                  "frame-src 'self' https://www.youtube.com https://www.facebook.com https://www.instagram.com https://checkout.razorpay.com https://api.razorpay.com",
                  "object-src 'none'",
                  "media-src 'self' https:",
                  "worker-src 'self' blob:",
                  "child-src 'self' blob:",
                  "form-action 'self'",
                  "base-uri 'self'",
                  "manifest-src 'self'",
                  "upgrade-insecure-requests"
              ].join('; ')
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/im-proxy/:path*',
        destination: 'https://api.ignitingminds.org/:path*',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/js/timer.js',
        destination: '/not-found',
        permanent: false,
      }
      // Redirect uppercase/mixed-case to lowercase URLs
     
      // Common URL variations
     
     
    ];
  },
    env: {
        LOGO_BLACK: process.env.NEXT_PUBLIC_LOGO_BLACK,
        LOGO_WHITE: process.env.NEXT_PUBLIC_LOGO_WHITE,
        API_ROUTE: process.env.NEXT_PUBLIC_API_ROUTE,
        API_ROUTE2: process.env.NEXT_PUBLIC_API_ROUTE2,
        USER_ID: process.env.NEXT_PUBLIC_USER_ID,
        CLIENT_ID: process.env.NEXT_PUBLIC_CLIENT_ID,
        BROWSER_ID: process.env.NEXT_PUBLIC_BROWSER_ID,
      },
};

module.exports = nextConfig;
