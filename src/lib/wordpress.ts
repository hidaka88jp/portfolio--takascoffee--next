export type RawTopRecommendedMenu = {
  slug: string;
  title: { rendered: string };
  menu_order: number;
  acf: { recommended: boolean };
  _embedded?: {
    'wp:featuredmedia'?: {
      media_details?: {
        sizes?: {
          full?: {
            source_url: string;
          };
        };
      };
      source_url?: string;
    }[];
  };
};

export type TopRecommendedMenu = {
  slug: string;
  title: string;
  imageUrl?: string;
};

export type RawTopBlogPost = {
  slug: string;
  title: { rendered: string };
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: {
      media_details?: {
        sizes?: {
          full?: {
            source_url: string;
          };
        };
      };
      source_url?: string;
    }[];
  };
};

export type TopBlogPost = {
  slug: string;
  title: string;
  publishedAt: string;
  imageUrl?: string;
};

export async function getRecommendedMenus(): Promise<TopRecommendedMenu[]> {
  const apiBaseUrl = process.env.WORDPRESS_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error('WORDPRESS_API_BASE_URL is not defined');
  }

  try {
    const response = await fetch(`${apiBaseUrl}/menu?_embed`);

    if (!response.ok) {
      throw new Error('Failed to fetch recommended menu');
    }

    const rawData: RawTopRecommendedMenu[] = await response.json();

    const data = rawData
      .filter((item) => item.acf.recommended)
      .sort((a, b) => a.menu_order - b.menu_order)
      .map((item) => {
        const featuredMedia = item._embedded?.['wp:featuredmedia']?.[0];
        const imageUrl =
          featuredMedia?.media_details?.sizes?.full?.source_url ?? featuredMedia?.source_url;

        return {
          slug: item.slug,
          title: item.title.rendered,
          imageUrl,
        };
      });

    return data;
  } catch (error) {
    console.error('Error fetching recommended menu:', error);
    return [];
  }
}

export async function getTopBlogPosts(): Promise<TopBlogPost[]> {
  const apiBaseUrl = process.env.WORDPRESS_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error('WORDPRESS_API_BASE_URL is not defined');
  }

  try {
    const response = await fetch(`${apiBaseUrl}/posts?_embed&per_page=3&orderby=date&order=desc`);

    if (!response.ok) {
      throw new Error('Failed to fetch top blog posts');
    }

    const rawData: RawTopBlogPost[] = await response.json();

    const data = rawData.map((item) => {
      const featuredMedia = item._embedded?.['wp:featuredmedia']?.[0];
      const imageUrl =
        featuredMedia?.media_details?.sizes?.full?.source_url ?? featuredMedia?.source_url;

      return {
        slug: item.slug,
        title: item.title.rendered,
        publishedAt: item.date,
        imageUrl,
      };
    });

    return data;
  } catch (error) {
    console.error('Error fetching top blog posts:', error);
    return [];
  }
}
