import type { MetadataRoute } from 'next';

if (!process.env.SITE_URL) {
  throw new Error('SITE_URL is not defined');
}

const siteUrl = process.env.SITE_URL.replace(/\/$/, '');

const buildUrl = (path = '') => `${siteUrl}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: buildUrl('/'),
      lastModified: new Date('2026-04-07'),
    },
    {
      url: buildUrl('/concept'),
      lastModified: new Date('2026-04-07'),
    },
    {
      url: buildUrl('/menu'),
      lastModified: new Date('2026-04-07'),
    },
    {
      url: buildUrl('/blog'),
      lastModified: new Date('2026-04-07'),
    },
  ];
}
