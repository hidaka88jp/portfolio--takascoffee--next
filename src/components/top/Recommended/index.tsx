import { getRecommendedMenus } from '@/lib/wordpress';
import TopSectionTitle from '@/components/shared/TopSectionTitle';

export default async function Recommended() {
  const recommendedMenus = await getRecommendedMenus();

  return (
    <section>
      <TopSectionTitle title='RECOMMENDED' />

      {recommendedMenus.map((menu) => (
        <p key={menu.title}>{menu.title}</p>
      ))}
    </section>
  );
}
