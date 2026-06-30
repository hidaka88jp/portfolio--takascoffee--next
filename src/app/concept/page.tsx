import { Suspense } from 'react';

import ConceptContent from '@/components/concept/ConceptContent';
import PageHero from '@/components/shared/PageHero';
import LinkButton from '@/components/shared/LinkButton';

export default function ConceptPage() {
  return (
    <div className='flex flex-col gap-16'>
      <PageHero title='CONCEPT' imageSrc='/common/concept-hero.webp' />
      <Suspense
        fallback={
          <div className='px-4'>
            <div className='mx-auto max-w-240'>
              <p>Loading concept...</p>
            </div>
          </div>
        }
      >
        <ConceptContent />
      </Suspense>
      <div className='flex justify-center'>
        <LinkButton href='/'>TOP</LinkButton>
      </div>
    </div>
  );
}
