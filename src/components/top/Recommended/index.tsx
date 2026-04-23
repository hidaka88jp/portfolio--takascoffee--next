import Link from 'next/link';
import Image from 'next/image';
import { getRecommendedMenus } from '@/lib/wordpress';
import TopSectionTitle from '@/components/shared/TopSectionTitle';

export default async function Recommended() {
  const recommendedMenus = await getRecommendedMenus();

  return (
    <section className='bg-surface-muted overflow-x-hidden py-16'>
      <TopSectionTitle title='RECOMMENDED' />

      <div className='overflow-x-auto'>
        <ul className='mx-auto flex w-fit gap-8'>
          {recommendedMenus.map((menu) => (
            <li key={menu.slug} className='relative h-52 w-52 shrink-0 overflow-hidden'>
              <Link href={`/menu/${menu.slug}`} className='block h-full w-full'>
                {menu.imageUrl && (
                  <Image
                    src={menu.imageUrl}
                    alt={menu.title}
                    sizes='208px'
                    fill
                    className='object-cover'
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
