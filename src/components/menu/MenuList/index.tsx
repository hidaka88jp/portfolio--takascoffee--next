import Image from 'next/image';

import { getMenuItems } from '@/lib/wordpress';
import Link from 'next/link';

export default async function MenuList() {
  const menuItems = await getMenuItems();

  if (menuItems.length === 0) {
    return (
      <div className='px-4'>
        <div className='mx-auto flex max-w-240 justify-center'>
          <p>Menu items are currently unavailable.</p>
        </div>
      </div>
    );
  }

  const CATEGORY_ORDER = ['drink', 'food', 'dessert'];

  const sortedMenuItems = [...menuItems].sort(
    (a, b) => CATEGORY_ORDER.indexOf(a.categorySlug) - CATEGORY_ORDER.indexOf(b.categorySlug)
  );

  return (
    <div className='px-4'>
      <ul className='mx-auto flex max-w-240 flex-col gap-10 sm:gap-12'>
        {sortedMenuItems.map((item) => (
          <li key={item.id}>
            <Link href={`/menu/${item.slug}`} className='flex flex-col gap-4 sm:flex-row sm:gap-8'>
              {item.imageUrl && (
                <div className='relative aspect-4/3 w-full shrink-0 overflow-hidden sm:w-70'>
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    fill
                    sizes='(min-width: 640px) 280px, 100vw'
                    className='w-full object-cover object-center'
                  />
                </div>
              )}
              <div>
                <h3 className='mb-2 text-lg font-semibold'>{item.title}</h3>
                <p className='mb-4'>${item.price.toFixed(2)}</p>
                <div dangerouslySetInnerHTML={{ __html: item.description }} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
