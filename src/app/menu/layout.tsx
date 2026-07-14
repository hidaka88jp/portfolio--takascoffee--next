import PageHero from '@/components/shared/PageHero';

type Props = {
  children: React.ReactNode;
};

export default function MenuLayout({ children }: Props) {
  return (
    <div className='flex flex-col gap-16'>
      <PageHero title='MENU' imageSrc='/common/menu-hero.webp' />
      {children}
    </div>
  );
}
