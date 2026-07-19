import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPosts } from '@/lib/wordpress';
import { formatDate } from '@/lib/date';
import Pagination from '@/components/blog/Pagination';

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function BlogList({ searchParams }: Props) {
  const { page } = await searchParams;
  const pageNumber = Number(page ?? '1');

  if (!Number.isInteger(pageNumber) || pageNumber < 1) {
    notFound();
  }

  const blogPosts = await getBlogPosts(pageNumber);

  if (!blogPosts) {
    notFound();
  }

  return (
    <div className='flex flex-col gap-12 px-4'>
      <ul className='mx-auto grid w-fit max-w-240 grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3'>
        {blogPosts.posts.map((post) => {
          const imageSrc = post.imageUrl ?? '/common/blog-placeholder.webp';

          return (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className='group focus-visible:outline-primary flex flex-col gap-2 focus-visible:outline-2 focus-visible:outline-offset-4'
              >
                <div className='relative h-75 w-75 overflow-hidden'>
                  <Image src={imageSrc} alt='' className='object-cover' fill sizes='300px' />
                  <div className='absolute inset-0 bg-white opacity-0 transition duration-300 ease-in-out group-hover:opacity-50 group-focus-visible:opacity-50' />
                </div>
                <p className='font-display text-sm text-gray-500 transition duration-300 ease-in-out group-hover:opacity-50 group-focus-visible:opacity-50'>
                  {formatDate(post.publishedAt)}
                </p>
                <h2 className='text-lg font-medium transition duration-300 ease-in-out group-hover:opacity-50 group-focus-visible:opacity-50'>
                  {post.title}
                </h2>
              </Link>
            </li>
          );
        })}
      </ul>
      <Pagination currentPage={pageNumber} totalPages={blogPosts.totalPages} />
    </div>
  );
}
