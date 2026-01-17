const BASE_URL = 'https://ratchanon-portfolio.vercel.app';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/', // Block API routes
          '/_next/', // Block Next.js internal paths
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}