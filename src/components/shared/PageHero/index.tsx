import Image from 'next/image';

type Props = {
  title: string;
  imageSrc: string;
};

export default function PageHero({ title, imageSrc }: Props) {
  return (
    <div className='relative h-45 w-full overflow-hidden sm:h-115'>
      <Image src={imageSrc} alt='' fill sizes='100vw' className='object-cover' priority />
      <div className='absolute inset-0 flex items-center'>
        <div className='mx-auto w-full max-w-300 px-5 sm:px-20'>
          <h1 className='font-display text-2xl font-light text-white sm:text-4xl'>{title}</h1>
        </div>
      </div>
    </div>
  );
}
