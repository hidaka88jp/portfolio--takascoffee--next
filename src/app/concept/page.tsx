// src/app/concept/page.tsx
import { Suspense } from 'react';

import { ConceptContent } from '@/components/concept/ConceptContent';

export default function ConceptPage() {
  return (
    <>
      <section>
        <Suspense fallback={<p>Loading concept...</p>}>
          <ConceptContent />
        </Suspense>
      </section>
    </>
  );
}
