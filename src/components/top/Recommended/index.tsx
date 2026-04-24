import { Suspense } from 'react';
import TopSectionTitle from '@/components/shared/TopSectionTitle';
import RecommendedList from '../RecommendedList';
import LinkButton from '@/components/shared/LinkButton';

export default async function Recommended() {
  return (
    <section className='bg-surface-muted flex flex-col gap-10 overflow-x-hidden py-16'>
      <TopSectionTitle title='RECOMMENDED' />
      <Suspense fallback={<div className='mx-auto w-fit'>Loading...</div>}>
        <RecommendedList />
      </Suspense>
      <div className='flex justify-center'>
        <LinkButton href='/menu'>MENU</LinkButton>
      </div>
    </section>
  );
}
