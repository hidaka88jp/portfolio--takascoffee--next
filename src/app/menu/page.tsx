import { Suspense } from 'react';

import LinkButton from '@/components/shared/LinkButton';
import MenuList from '@/components/menu/MenuList';

export default function MenuPage() {
  return (
    <div className='flex flex-col gap-16'>
      <Suspense
        fallback={
          <div className='px-4'>
            <div className='mx-auto max-w-240'>
              <p>Loading menu...</p>
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
