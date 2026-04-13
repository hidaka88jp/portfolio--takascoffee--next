import Image from 'next/image';

export default function Hero() {
  return (
    <div className='relative h-125 w-full overflow-hidden sm:h-171.25'>
      <Image
        src='/top/hero-top.webp'
        alt=''
        fill
        sizes='(max-width: 640px) 200vw, 100vw'
        className='object-cover'
        priority
      />
    </div>
  );
}
