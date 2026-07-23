import { Suspense } from 'react';
import BlogDetailContent from '@/components/blog/BlogDetailContent';

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    from?: string | string[];
  }>;
};

export default async function BlogDetailPage({ params, searchParams }: Props) {
  const { from } = await searchParams;

  const backHref =
    typeof from === 'string' && (from === '/blog' || /^\/blog\?page=[2-9]$/.test(from))
      ? from
      : '/blog';

  return (
    <Suspense
      fallback={
        <div className='px-4'>
          <div className='mx-auto max-w-240'>
            <p>Loading menu...</p>
          </div>
        </div>
      }
    >
      <BlogDetailContent params={params} backHref={backHref} />
    </Suspense>
  );
}
