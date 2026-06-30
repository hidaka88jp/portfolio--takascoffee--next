import { Suspense } from 'react';

import ConceptContent from '@/components/concept/ConceptContent';
import PageHero from '@/components/shared/PageHero';

export default function ConceptPage() {
  return (
    <section className='flex flex-col gap-16'>
      <PageHero title='CONCEPT' imageSrc='/common/concept-hero.webp' />
      <Suspense fallback={<p>Loading concept...</p>}>
        <ConceptContent />
      </Suspense>
    </section>
  );
}
