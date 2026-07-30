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

type BlogPostsResult = {
  posts: BlogPost[];
  totalPages: number;
};

type RawBlogDetail = {
  date: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: {
      alt_text?: string;
      source_url?: string;
      media_details?: {
        sizes?: {
          full?: {
            source_url: string;
          };
        };
      };
    }[];
  };
};

type RawAdjacentBlogPost = {
  slug: string;
};

type BlogDetail = {
  title: string;
  publishedAt: string;
  content: string;
  image?: {
    url: string;
    alt: string;
  };
  previousSlug?: string;
  nextSlug?: string;
};

type WordPressErrorResponse = {
  code?: string;
};

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

export async function getBlogPosts(page: number): Promise<BlogPostsResult | null> {
  const apiBaseUrl = process.env.WORDPRESS_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error('WORDPRESS_API_BASE_URL is not defined');
  }

  try {
    const res = await fetch(
      `${apiBaseUrl}/posts?_embed&per_page=6&page=${page}&orderby=date&order=desc`
    );

    if (!res.ok) {
      const errorData = (await res.json()) as WordPressErrorResponse;

      if (res.status === 400 && errorData.code === 'rest_post_invalid_page_number') {
        return null;
      }

      throw new Error('Failed to fetch blog posts');
    }

    const rawPosts: RawBlogPost[] = await res.json();
    const totalPages = Number(res.headers.get('X-WP-TotalPages') ?? '0');

    const posts = rawPosts.map((item) => {
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

    return { posts, totalPages };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}

async function getAdjacentBlogPostSlug(
  url: string,
  direction: 'previous' | 'next'
): Promise<string | undefined> {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch ${direction} blog post: ${res.status}`);
    }

    const posts: RawAdjacentBlogPost[] = await res.json();

    return posts[0]?.slug;
  } catch (error) {
    console.error(`Error fetching ${direction} blog post:`, error);

    return undefined;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogDetail | null> {
  const apiBaseUrl = process.env.WORDPRESS_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error('WORDPRESS_API_BASE_URL is not defined');
  }

  try {
    const res = await fetch(`${apiBaseUrl}/posts?slug=${encodeURIComponent(slug)}&_embed`);

    if (!res.ok) {
      throw new Error(`Failed to fetch blog post by slug: ${res.status}`);
    }

    const rawPosts: RawBlogDetail[] = await res.json();
    const post = rawPosts[0];

    if (!post) {
      return null;
    }

    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];

    const imageUrl =
      featuredMedia?.media_details?.sizes?.full?.source_url ?? featuredMedia?.source_url;

    const encodedDate = encodeURIComponent(post.date);

    const [previousSlug, nextSlug] = await Promise.all([
      getAdjacentBlogPostSlug(
        `${apiBaseUrl}/posts?before=${encodedDate}&per_page=1&orderby=date&order=desc&_fields=slug`,
        'previous'
      ),
      getAdjacentBlogPostSlug(
        `${apiBaseUrl}/posts?after=${encodedDate}&per_page=1&orderby=date&order=asc&_fields=slug`,
        'next'
      ),
    ]);

    return {
      title: post.title.rendered,
      publishedAt: post.date,
      content: post.content.rendered,
      image: imageUrl
        ? {
            url: imageUrl,
            alt: featuredMedia?.alt_text ?? '',
          }
        : undefined,
      previousSlug,
      nextSlug,
    };
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);

    throw error;
  }
}
