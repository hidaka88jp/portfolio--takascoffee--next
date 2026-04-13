import Image from 'next/image';
import TopSectionTitle from '@/components/shared/TopSectionTitle';
import LinkButton from '@/components/shared/LinkButton';

export default function Concept() {
  return (
    <section className='px-4'>
      <div className='mx-auto flex max-w-240 flex-col gap-10'>
        <TopSectionTitle title='CONCEPT' />
        <div className='relative h-48 w-full sm:h-111.75'>
          <Image
            src='/top/top-concept.webp'
            alt=''
            fill
            className='object-cover object-center'
            sizes='(max-width: 960px) 100vw, 960px'
          />
        </div>
        <div className='space-y-4'>
          <p className='text-center font-medium'>“Imagination can take you anywhere.”</p>
          <div className='space-y-1.5 text-left sm:space-y-0.5 sm:text-center'>
            <p>A line I found in a book I opened while waiting for my order.</p>
            <p>In the gentle flow of time, I remember the joy of letting my thoughts wander.</p>
            <p>And in moments like these, a good cup of coffee makes it even better.</p>
          </div>
        </div>
        <div className='flex justify-center'>
          <LinkButton href='/concept'>MORE</LinkButton>
        </div>
      </div>
    </section>
  );
}
