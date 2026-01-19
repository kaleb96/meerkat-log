import { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => {
  const baseUrl = 'https://meerkat-log.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
};
export default robots;
