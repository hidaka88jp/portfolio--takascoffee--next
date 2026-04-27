import Link from 'next/link';
import Image from 'next/image';
import { getRecommendedMenus } from '@/lib/wordpress';

export default async function RecommendedList() {
  const recommendedMenus = await getRecommendedMenus();

  return (
    <div className='overflow-x-auto'>
      <ul className='mx-auto flex w-fit gap-8'>
        {recommendedMenus.map((menu) => (
          <li key={menu.slug} className='shrink-0'>
            <Link
              href={`/menu/${menu.slug}`}
              className='group focus-visible:outline-primary block focus-visible:outline-2 focus-visible:outline-offset-4'
            >
              <div className='relative h-52 w-52 overflow-hidden'>
                {menu.imageUrl && (
                  <Image
                    src={menu.imageUrl}
                    alt={menu.title}
                    sizes='208px'
                    fill
                    className='object-cover'
                  />
                )}
                <div className='absolute inset-0 bg-white opacity-0 transition duration-300 ease-in-out group-hover:opacity-50 group-focus-visible:opacity-50' />
                <p className='text-primary font-display absolute top-1/2 right-0 left-0 -translate-y-1/2 truncate px-2 text-center font-medium opacity-0 transition duration-300 ease-in-out group-hover:opacity-100 group-focus-visible:opacity-100'>
                  {menu.title}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
