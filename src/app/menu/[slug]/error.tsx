'use client';

import LinkButton from '@/components/shared/LinkButton';

export default function MenuDetailError() {
  return (
    <div className='px-4'>
      <div className='mx-auto flex max-w-240 flex-col gap-16 text-center'>
        <p>Menu item could not be loaded.</p>
        <div className='flex justify-center'>
          <LinkButton href='/menu'>MENU</LinkButton>
        </div>
      </div>
    </div>
  );
}
