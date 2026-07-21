import { Suspense } from 'react';
import BlogDetailContent from '@/components/blog/BlogDetailContent';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default function BlogDetailPage({ params }: Props) {
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
      <BlogDetailContent params={params} />
    </Suspense>
  );
}
