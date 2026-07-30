import { cacheLife } from 'next/cache';

type RawSitemapEntry = {
  slug: string;
  modified_gmt: string;
};

type SitemapEntry = {
  slug: string;
  lastModified: Date;
};

const formatSitemapEntry = (entry: RawSitemapEntry): SitemapEntry => ({
  slug: entry.slug,
  lastModified: new Date(`${entry.modified_gmt}Z`),
});

export async function getMenuSitemapEntries(): Promise<SitemapEntry[]> {
  'use cache';
  cacheLife('days');

  const apiBaseUrl = process.env.WORDPRESS_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error('WORDPRESS_API_BASE_URL is not defined');
  }

  try {
    const res = await fetch(`${apiBaseUrl}/menu?_fields=slug,modified_gmt&per_page=100`);

    if (!res.ok) {
      throw new Error('Failed to fetch menu sitemap entries');
    }

    const rawEntries: RawSitemapEntry[] = await res.json();
    const entries: SitemapEntry[] = rawEntries.map(formatSitemapEntry);

    return entries;
  } catch (error) {
    console.error('Error fetching menu sitemap entries:', error);
    throw error;
  }
}

export async function getBlogSitemapEntries(): Promise<SitemapEntry[]> {
  'use cache';
  cacheLife('days');

  const apiBaseUrl = process.env.WORDPRESS_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error('WORDPRESS_API_BASE_URL is not defined');
  }

  try {
    const res = await fetch(`${apiBaseUrl}/posts?_fields=slug,modified_gmt&per_page=100&page=1`);

    if (!res.ok) {
      throw new Error('Failed to fetch blog sitemap entries');
    }

    const totalPages = Number(res.headers.get('X-WP-TotalPages') ?? '1');
    const firstPageEntries: RawSitemapEntry[] = await res.json();

    const remainingPageNumbers = Array.from({ length: totalPages - 1 }, (_, index) => index + 2);

    const remainingPageEntries = await Promise.all(
      remainingPageNumbers.map(async (page): Promise<RawSitemapEntry[]> => {
        const response = await fetch(
          `${apiBaseUrl}/posts?_fields=slug,modified_gmt&per_page=100&page=${page}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch blog sitemap entries: page ${page}`);
        }

        return response.json();
      })
    );

    const rawEntries = [firstPageEntries, ...remainingPageEntries].flat();
    const entries: SitemapEntry[] = rawEntries.map(formatSitemapEntry);

    return entries;
  } catch (error) {
    console.error('Error fetching blog sitemap entries:', error);
    throw error;
  }
}
