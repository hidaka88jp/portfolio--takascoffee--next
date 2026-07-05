import { Suspense } from 'react';

import PageHero from '@/components/shared/PageHero';
import LinkButton from '@/components/shared/LinkButton';
import MenuList from '@/components/menu/MenuList';

export default function MenuPage() {
  return (
    <div className='flex flex-col gap-16'>
      <PageHero title='MENU' imageSrc='/common/menu-hero.webp' />
      <Suspense
        fallback={
          <div className='px-4'>
            <div className='mx-auto max-w-240'>
              <p>Loading concept...</p>
            </div>
          </div>
        }
      >
        <MenuList />
      </Suspense>
      <div className='flex justify-center'>
        <LinkButton href='/'>TOP</LinkButton>
      </div>
    </div>
  );
}
