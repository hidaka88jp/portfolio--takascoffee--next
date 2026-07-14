import { Suspense } from 'react';
import MenuDetailContent from '@/components/menu/MenuDetailContent';
import LinkButton from '@/components/shared/LinkButton';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default function MenuDetailPage({ params }: Props) {
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
        <MenuDetailContent params={params} />
      </Suspense>
      <div className='flex justify-center'>
        <LinkButton href='/menu'>MENU</LinkButton>
      </div>
    </div>
  );
}
