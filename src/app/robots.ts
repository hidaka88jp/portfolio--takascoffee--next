import type { MetadataRoute } from 'next';

if (!process.env.SITE_URL) {
  throw new Error('SITE_URL is not defined');
}

export default function robots(): MetadataRoute.Robots {
  if (process.env.NODE_ENV !== 'production') {
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        disallow: ['/'],
      },
    ],
    sitemap: `${process.env.SITE_URL!.replace(/\/$/, '')}/sitemap.xml`,
  };
}
