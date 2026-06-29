// src/components/concept/ConceptContent.tsx
import Image from 'next/image';

import { getConceptPage } from '@/lib/wordpress';

export async function ConceptContent() {
  const conceptPage = await getConceptPage();

  if (!conceptPage) {
    return (
      <section>
        <p>Concept content is currently unavailable.</p>
      </section>
    );
  }

  return (
    <div>
      {conceptPage.sections.map((section) => (
        <div key={section.title}>
          <Image
            src={section.image.src}
            alt={section.image.alt}
            width={section.image.width}
            height={section.image.height}
            sizes='(min-width: 768px) 50vw, 100vw'
          />

          <div>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
