import { Suspense } from 'react';

import LinkButton from '@/components/shared/LinkButton';
import BlogList from '@/components/blog/BlogList';

type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function BlogPage({ searchParams }: PageProps) {
  return (
    <div className='flex flex-col gap-16'>
      <Suspense
        fallback={
          <div className='px-4'>
            <div className='mx-auto max-w-240'>
              <p>Loading blog...</p>
            </div>
          </div>
        }
      >
        <BlogList searchParams={searchParams} />
      </Suspense>
      <div className='flex justify-center'>
        <LinkButton href='/'>TOP</LinkButton>
      </div>
    </div>
  );
}
