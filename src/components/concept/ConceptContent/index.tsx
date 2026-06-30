import Image from 'next/image';
import clsx from 'clsx';

import { getConceptPage } from '@/lib/wordpress';

export default async function ConceptContent() {
  const conceptPage = await getConceptPage();

  if (!conceptPage) {
    return (
      <div className='px-4'>
        <div className='mx-auto flex max-w-240 justify-center'>
          <p>Concept content is currently unavailable.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='px-4'>
      <div className='mx-auto flex max-w-240 flex-col gap-10'>
        {conceptPage.sections.map((section, index) => (
          <section
            key={`concept-section-${index}`}
            className={clsx(
              'flex flex-col gap-4 sm:gap-8',
              index % 2 === 1 ? 'sm:flex-row-reverse' : 'sm:flex-row'
            )}
          >
            <div className='flex flex-col gap-4 sm:flex-1'>
              <h2 className='text-xl font-semibold'>{section.title}</h2>
              <div className='h-1 w-14 bg-black' />
              <p>{section.text}</p>
            </div>
            <Image
              src={section.image.src}
              alt={section.image.alt}
              width={section.image.width}
              height={section.image.height}
              sizes='(min-width: 640px) 380px, 100vw'
              className='w-full shrink-0 object-cover object-center sm:w-95'
            />
          </section>
        ))}
      </div>
    </div>
  );
}
