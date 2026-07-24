import LinkButton from '@/components/shared/LinkButton';
import Image from 'next/image';

export default function NotFound() {
  return (
    <section className='mt-5 px-4'>
      <div className='mx-auto flex max-w-240 justify-center'>
        <div className='mb-10 grid grid-cols-1 gap-6 text-center sm:grid-cols-2 sm:gap-1'>
          <Image
            src='/common/404.webp'
            height={1440}
            width={1920}
            alt=''
            sizes='(max-width: 640px) 480px, 50vw'
            className='sm:order-2'
            loading='eager'
          />
          <div className='flex flex-col items-center justify-center sm:order-1'>
            <h1 className='mb-2 text-4xl font-bold'>404 - Not Found</h1>
            <div className='mb-6 h-1 w-8 bg-black' aria-hidden='true' />
            <p className='mb-6'>Sorry, the page you’re looking for doesn’t exist.</p>
            <div className='flex justify-center'>
              <LinkButton href='/'>Back to TOP</LinkButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
