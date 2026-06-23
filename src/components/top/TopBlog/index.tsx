import { Suspense } from 'react';
import TopSectionTitle from '@/components/shared/TopSectionTitle';
import LinkButton from '@/components/shared/LinkButton';
import TopBlogList from '../TopBlogList';

export default async function TopBlog() {
  return (
    <section className='flex flex-col gap-10 overflow-x-hidden pb-16'>
      <TopSectionTitle title='BLOG' />
      <Suspense fallback={<div className='mx-auto w-fit'>Loading...</div>}>
        <TopBlogList />
      </Suspense>
      <div className='flex justify-center'>
        <LinkButton href='/blog'>BLOG</LinkButton>
      </div>
    </section>
  );
}
