import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getBlogPostBySlug } from '@/lib/wordpress';
import { formatDate } from '@/lib/date';
import BlogNavigation from '@/components/blog/BlogNavigation';

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    from?: string | string[];
  }>;
};

export default async function BlogDetailContent({ params, searchParams }: Props) {
  const { slug } = await params;
  const blogPost = await getBlogPostBySlug(slug);

  if (!blogPost) {
    notFound();
  }

  const { from } = await searchParams;

  const backHref =
    typeof from === 'string' && (from === '/blog' || /^\/blog\?page=[1-9]\d*$/.test(from))
      ? from
      : '/blog';

  return (
    <div className='px-4'>
      <div className='mx-auto max-w-160'>
        <h2 className='mb-2 text-2xl font-semibold'>{blogPost.title}</h2>
        <div className='mb-3 h-1 w-8 bg-black' />
        <p className='mb-6'>{formatDate(blogPost.publishedAt)}</p>
        <div className='relative mb-8 aspect-square overflow-hidden sm:aspect-auto sm:h-120'>
          <Image
            src={blogPost.image?.url ?? '/common/placeholder.webp'}
            alt={blogPost.image?.alt ?? ''}
            className='object-cover'
            fill
            sizes='(min-width: 640px) 640px, 100vw'
          />
        </div>
        <div className='content' dangerouslySetInnerHTML={{ __html: blogPost.content }} />
        <BlogNavigation
          previousSlug={blogPost.previousSlug}
          nextSlug={blogPost.nextSlug}
          backHref={backHref}
        />
      </div>
    </div>
  );
}
