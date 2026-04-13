import Hero from '@/components/top/Hero';
import Concept from '@/components/top/Concept';

export default function Home() {
  return (
    <div className='flex flex-col gap-16'>
      <Hero />
      <Concept />
    </div>
  );
}
