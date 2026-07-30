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
