import Link from 'next/link';

type Props = {
  previousSlug?: string;
  nextSlug?: string;
  backHref: string;
};

export default function BlogNavigation({ previousSlug, nextSlug, backHref }: Props) {
  const baseClass =
    'font-display hover:bg-primary relative block bg-black py-3 text-center text-sm text-white transition-colors duration-75 ease-in-out';

  const sideButtonClass = `${baseClass} w-11 sm:w-40 sm:px-6`;
  const backButtonClass = `${baseClass} w-fit px-6 sm:w-40`;

  return (
    <nav aria-label='Blog post navigation' className='mt-16'>
      <ul className='grid grid-cols-[2.75rem_1fr_2.75rem] sm:grid-cols-3'>
        <li className='flex justify-start'>
          {previousSlug && (
            <Link
              href={`/blog/${previousSlug}`}
              aria-label='Previous blog post'
              className={sideButtonClass}
            >
              <span aria-hidden='true'>&lt;</span>
              <span className='ml-1.5 hidden sm:inline'>Previous</span>
              <span
                aria-hidden='true'
                className='absolute top-1/2 right-0 hidden h-px w-6 -translate-y-1/2 bg-white sm:block'
              />
            </Link>
          )}
        </li>

        <li className='flex justify-center'>
          <Link href={backHref} className={backButtonClass}>
            Back to List
            <span
              aria-hidden='true'
              className='absolute top-1/2 right-0 hidden h-px w-6 -translate-y-1/2 bg-white sm:block'
            />
          </Link>
        </li>

        <li className='flex justify-end'>
          {nextSlug && (
            <Link
              href={`/blog/${nextSlug}`}
              aria-label='Next blog post'
              className={sideButtonClass}
            >
              <span className='mr-1.5 hidden sm:inline'>Next</span>
              <span aria-hidden='true'>&gt;</span>
              <span
                aria-hidden='true'
                className='absolute top-1/2 right-0 hidden h-px w-6 -translate-y-1/2 bg-white sm:block'
              />
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
