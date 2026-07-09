import { Suspense } from 'react';
import MenuDetailContent from '@/components/menu/MenuDetailContent';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default function MenuDetailPage({ params }: Props) {
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
      <MenuDetailContent params={params} />
    </Suspense>
  );
}
