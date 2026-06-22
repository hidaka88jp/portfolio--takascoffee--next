import TopSectionTitle from '@/components/shared/TopSectionTitle';
import LinkButton from '@/components/shared/LinkButton';

export default function TopBlog() {
  return (
    <section className='flex flex-col gap-10 overflow-x-hidden py-16'>
      <TopSectionTitle title='BLOG' />
      <div className='flex justify-center'>
        <LinkButton href='/blog'>BLOG</LinkButton>
      </div>
    </section>
  );
}
