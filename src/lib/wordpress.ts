import { convert } from 'html-to-text';

type RawTopRecommendedMenu = {
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

type TopRecommendedMenu = {
  slug: string;
  title: string;
  imageUrl?: string;
};

type RawBlogPost = {
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

type BlogPost = {
  slug: string;
  title: string;
  publishedAt: string;
  imageUrl?: string;
};

type RawAcfImage = {
  id: number;
  url: string;
  alt: string;
  width: number;
  height: number;
};

type RawConceptPage = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  acf: {
    section1_title: string;
    section1_image: RawAcfImage;
    section1_text: string;
    section2_title: string;
    section2_image: RawAcfImage;
    section2_text: string;
  };
};

type ConceptSection = {
  title: string;
  text: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

type ConceptPage = {
  title: string;
  sections: ConceptSection[];
};

type RawMenuItem = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf: {
    price: number;
  };
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
      alt_text?: string;
    }[];
    'wp:term'?: {
      slug: string;
    }[][];
  };
};

type MenuItem = {
  id: number;
  slug: string;
  title: string;
  description: string;
  categorySlug: string;
  price: number;
  imageUrl?: string;
  imageAlt: string;
};

type RawMenuDetail = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf: {
    price: number;
    recommended_items: number[] | '';
  };
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
      alt_text?: string;
    }[];
    'wp:term'?: {
      slug: string;
    }[][];
  };
};

type RawRecommendedMenuItem = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
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
      alt_text?: string;
    }[];
  };
};

type RecommendedMenuItem = {
  id: number;
  slug: string;
  title: string;
  image?: {
    url: string;
    alt: string;
  };
};

type MenuDetail = {
  id: number;
  slug: string;
  title: string;
  description: string;
  price: number;
  image?: {
    url: string;
    alt: string;
  };
  recommendedItems: RecommendedMenuItem[];
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

export async function getTopBlogPosts(): Promise<BlogPost[]> {
  const apiBaseUrl = process.env.WORDPRESS_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error('WORDPRESS_API_BASE_URL is not defined');
  }

  try {
    const response = await fetch(`${apiBaseUrl}/posts?_embed&per_page=3&orderby=date&order=desc`);

    if (!response.ok) {
      throw new Error('Failed to fetch top blog posts');
    }

    const rawData: RawBlogPost[] = await response.json();

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

export async function getConceptPage(): Promise<ConceptPage | null> {
  const apiBaseUrl = process.env.WORDPRESS_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error('WORDPRESS_API_BASE_URL is not defined');
  }

  try {
    const res = await fetch(
      `${apiBaseUrl}/pages?slug=concept&_fields=id,slug,title,acf&acf_format=standard`
    );

    if (!res.ok) {
      throw new Error('Failed to fetch concept page');
    }

    const pages: RawConceptPage[] = await res.json();
    const page = pages[0];

    if (!page) {
      return null;
    }

    return {
      title: page.title.rendered,
      sections: [
        {
          title: page.acf.section1_title,
          text: page.acf.section1_text,
          image: {
            src: page.acf.section1_image.url,
            alt: page.acf.section1_image.alt || page.acf.section1_title,
            width: page.acf.section1_image.width,
            height: page.acf.section1_image.height,
          },
        },
        {
          title: page.acf.section2_title,
          text: page.acf.section2_text,
          image: {
            src: page.acf.section2_image.url,
            alt: page.acf.section2_image.alt || page.acf.section2_title,
            width: page.acf.section2_image.width,
            height: page.acf.section2_image.height,
          },
        },
      ],
    };
  } catch (error) {
    console.error('Error fetching concept page:', error);
    return null;
  }
}

export async function getMenuItems(): Promise<MenuItem[]> {
  const apiBaseUrl = process.env.WORDPRESS_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error('WORDPRESS_API_BASE_URL is not defined');
  }

  try {
    const res = await fetch(`${apiBaseUrl}/menu?_embed&per_page=100`);

    if (!res.ok) {
      throw new Error('Failed to fetch menu items');
    }

    const rawData: RawMenuItem[] = await res.json();

    const menuItems = rawData.map((item) => {
      const featuredMedia = item._embedded?.['wp:featuredmedia']?.[0];

      const imageUrl =
        featuredMedia?.media_details?.sizes?.full?.source_url ?? featuredMedia?.source_url;

      const category = item._embedded?.['wp:term']?.[0]?.[0];

      return {
        id: item.id,
        slug: item.slug,
        title: item.title.rendered,
        categorySlug: category?.slug ?? '',
        description: convert(item.content.rendered, {
          wordwrap: false,
        }),
        price: item.acf.price,
        imageUrl,
        imageAlt: featuredMedia?.alt_text ?? '',
      };
    });

    return menuItems;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
}

export async function getMenuItemBySlug(slug: string): Promise<MenuDetail | null> {
  const apiBaseUrl = process.env.WORDPRESS_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error('WORDPRESS_API_BASE_URL is not defined');
  }

  try {
    const res = await fetch(`${apiBaseUrl}/menu?slug=${encodeURIComponent(slug)}&_embed`);

    if (!res.ok) {
      throw new Error('Failed to fetch menu item by slug');
    }

    const rawData: RawMenuDetail[] = await res.json();
    const item = rawData[0];

    if (!item) {
      return null;
    }

    const featuredMedia = item._embedded?.['wp:featuredmedia']?.[0];
    const imageUrl =
      featuredMedia?.media_details?.sizes?.full?.source_url ?? featuredMedia?.source_url;

    const recommendedIds = Array.isArray(item.acf.recommended_items)
      ? item.acf.recommended_items
      : [];

    let recommendedItems: RecommendedMenuItem[] = [];

    // Fetch recommended items if there are any
    if (recommendedIds.length > 0) {
      const recommendedRes = await fetch(
        `${apiBaseUrl}/menu?include=${recommendedIds.join(',')}&orderby=include&_embed`
      );

      if (!recommendedRes.ok) {
        throw new Error('Failed to fetch recommended menu items');
      }

      const rawRecommendedItems: RawRecommendedMenuItem[] = await recommendedRes.json();

      recommendedItems = rawRecommendedItems.map((recommendedItem) => {
        const featuredMedia = recommendedItem._embedded?.['wp:featuredmedia']?.[0];

        const recommendedImageUrl =
          featuredMedia?.media_details?.sizes?.full?.source_url ?? featuredMedia?.source_url;

        return {
          id: recommendedItem.id,
          slug: recommendedItem.slug,
          title: recommendedItem.title.rendered,
          image: recommendedImageUrl
            ? {
                url: recommendedImageUrl,
                alt: featuredMedia?.alt_text ?? '',
              }
            : undefined,
        };
      });
    }

    return {
      id: item.id,
      slug: item.slug,
      title: item.title.rendered,
      description: convert(item.content.rendered, {
        wordwrap: false,
      }),
      price: item.acf.price,
      image: imageUrl
        ? {
            url: imageUrl,
            alt: featuredMedia?.alt_text ?? '',
          }
        : undefined,
      recommendedItems,
    };
  } catch (error) {
    console.error('Error fetching menu item by slug:', error);
    throw error;
  }
}
