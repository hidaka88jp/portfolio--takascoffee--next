import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getMenuItemBySlug } from '@/lib/wordpress';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function MenuDetailContent({ params }: Props) {
  const { slug } = await params;
  const menuItem = await getMenuItemBySlug(slug);

  if (!menuItem) {
    notFound();
  }

  return (
    <div className='px-4'>
      <div className='mx-auto max-w-240'>
        <h2 className='mb-2 text-xl font-semibold'>{menuItem.title}</h2>
        <div className='mb-3 h-1 w-8 bg-black' />
        <div className='mb-12 flex flex-col gap-4 sm:flex-row sm:gap-8'>
          <div className='relative h-70 overflow-hidden sm:w-95 sm:shrink-0'>
            <Image
              src={menuItem.image?.url ?? '/common/placeholder.webp'}
              alt={menuItem.image?.alt ?? ''}
              className='object-cover'
              fill
              sizes='(min-width: 640px) 380px, 100vw'
            />
          </div>
          <div className='flex flex-col gap-5'>
            <p className='sm:pt-1.5'>{menuItem.description}</p>
            <p className='font-semibold'>${menuItem.price.toFixed(2)}</p>
          </div>
        </div>

        {menuItem.recommendedItems.length > 0 && (
          <section>
            <h3 className='mb-2 text-xl font-semibold'>RECOMMENDED</h3>
            <div className='mb-3 h-1 w-8 bg-black' />
            <ul className='grid grid-cols-2 gap-6 sm:grid-cols-3'>
              {menuItem.recommendedItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/menu/${item.slug}`}
                    className='group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black'
                  >
                    <div className='relative mb-1.5 h-46 overflow-hidden sm:h-56 sm:w-56 lg:w-72'>
                      <Image
                        src={item.image?.url ?? '/common/placeholder.webp'}
                        alt={item.image?.alt ?? ''}
                        className='object-cover transition-transform duration-300 group-hover:scale-105 group-focus-visible:scale-105'
                        fill
                        sizes='220px'
                      />
                    </div>
                    <p className='font-semibold'>{item.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
