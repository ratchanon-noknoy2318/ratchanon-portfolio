const BASE_URL = 'https://ratchanon-portfolio.vercel.app';

export default function sitemap() {
  const routes = [
    '',
    '/about',
    '/contact',
    '/all-activities',
    '/all-projects',
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}