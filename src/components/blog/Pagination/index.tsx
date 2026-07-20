import Link from 'next/link';
import clsx from 'clsx';

type Props = {
  currentPage: number;
  totalPages: number;
};

type PaginationItem = number | 'left-ellipsis' | 'right-ellipsis';

const getPageHref = (page: number) => (page === 1 ? '/blog' : `/blog?page=${page}`);

const getPaginationItems = (currentPage: number, totalPages: number): PaginationItem[] => {
  if (totalPages <= 3) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const items: PaginationItem[] = [1];

  let startPage = Math.max(2, currentPage - 1);
  let endPage = Math.min(totalPages - 1, currentPage + 1);

  if (currentPage <= 2) {
    startPage = 2;
    endPage = Math.min(3, totalPages - 1);
  }

  if (currentPage >= totalPages - 1) {
    startPage = Math.max(2, totalPages - 2);
    endPage = totalPages - 1;
  }

  if (startPage > 2) {
    items.push('left-ellipsis');
  }

  for (let page = startPage; page <= endPage; page++) {
    items.push(page);
  }

  if (endPage < totalPages - 1) {
    items.push('right-ellipsis');
  }

  items.push(totalPages);

  return items;
};

export default function Pagination({ currentPage, totalPages }: Props) {
  const pages = getPaginationItems(currentPage, totalPages);

  const baseClass =
    'flex size-8 shrink-0 items-center justify-center border border-black sm:size-10';

  return (
    <nav aria-label='Blog pagination'>
      <ul className='flex items-center justify-center gap-1.5 sm:gap-3'>
        <li>
          {currentPage > 1 ? (
            <Link
              href={getPageHref(currentPage - 1)}
              aria-label='Previous page'
              className={`${baseClass} hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2`}
            >
              <span aria-hidden='true'>&lt;</span>
            </Link>
          ) : (
            <span className={`${baseClass} opacity-20`} aria-hidden='true'>
              &lt;
            </span>
          )}
        </li>

        {pages.map((page) => {
          if (typeof page !== 'number') {
            return (
              <li key={page}>
                <span
                  className='flex h-10 w-3 shrink-0 items-end justify-center sm:h-10 sm:w-10'
                  aria-hidden='true'
                >
                  …
                </span>
              </li>
            );
          }

          return (
            <li key={page}>
              <Link
                href={getPageHref(page)}
                aria-current={page === currentPage ? 'page' : undefined}
                className={clsx(
                  baseClass,
                  page === currentPage
                    ? 'bg-black text-white'
                    : 'hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2'
                )}
              >
                {page}
              </Link>
            </li>
          );
        })}

        <li>
          {currentPage < totalPages ? (
            <Link
              href={getPageHref(currentPage + 1)}
              aria-label='Next page'
              className={`${baseClass} hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2`}
            >
              <span aria-hidden='true'>&gt;</span>
            </Link>
          ) : (
            <span className={`${baseClass} opacity-20`} aria-hidden='true'>
              &gt;
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
