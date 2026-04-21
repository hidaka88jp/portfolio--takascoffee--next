export type RawTopRecommendedMenu = {
  slug: string;
  title: { rendered: string };
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

export async function getRecommendedMenus(): Promise<TopRecommendedMenu[]> {
  try {
    const response = await fetch(`${process.env.WORDPRESS_API_BASE_URL}/menu?_embed`);

    if (!response.ok) {
      throw new Error('Failed to fetch recommended menu');
    }

    const rawData: RawTopRecommendedMenu[] = await response.json();

    const data = rawData
      .filter((item) => item.acf.recommended)
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
