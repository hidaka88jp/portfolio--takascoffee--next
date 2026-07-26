import type { MetadataRoute } from 'next';
import { getMenuSitemapEntries, getBlogSitemapEntries } from '@/lib/wordpress';

if (!process.env.SITE_URL) {
  throw new Error('SITE_URL is not defined');
}

const siteUrl = process.env.SITE_URL.replace(/\/$/, '');

const buildUrl = (path = '') => `${siteUrl}${path}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [menuEntries, blogEntries] = await Promise.all([
    getMenuSitemapEntries(),
    getBlogSitemapEntries(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
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

  const menuPages: MetadataRoute.Sitemap = menuEntries.map((entry) => ({
    url: buildUrl(`/menu/${entry.slug}`),
    lastModified: entry.lastModified,
  }));

  const blogPages: MetadataRoute.Sitemap = blogEntries.map((entry) => ({
    url: buildUrl(`/blog/${entry.slug}`),
    lastModified: entry.lastModified,
  }));

  return [...staticPages, ...menuPages, ...blogPages];
}
