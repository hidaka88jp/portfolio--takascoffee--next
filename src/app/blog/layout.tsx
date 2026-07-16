import PageHero from '@/components/shared/PageHero';

type Props = {
  children: React.ReactNode;
};

export default function BlogLayout({ children }: Props) {
  return (
    <div className='flex flex-col gap-16'>
      <PageHero title='BLOG' imageSrc='/common/blog-hero.webp' />
      {children}
    </div>
  );
}
