import Hero from '@/components/top/Hero';
import Concept from '@/components/top/Concept';
import Recommended from '@/components/top/Recommended';
import TopBlog from '@/components/top/TopBlog';

export default function Home() {
  return (
    <div className='flex flex-col gap-16'>
      <Hero />
      <Concept />
      <Recommended />
      <TopBlog />
    </div>
  );
}
