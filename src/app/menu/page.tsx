import PageHero from '@/components/shared/PageHero';
import LinkButton from '@/components/shared/LinkButton';

export default function MenuPage() {
  return (
    <div className='flex flex-col gap-16'>
      <PageHero title='MENU' imageSrc='/common/menu-hero.webp' />
      <p>menu</p>
      <div className='flex justify-center'>
        <LinkButton href='/'>TOP</LinkButton>
      </div>
    </div>
  );
}
