import Image from 'next/image';
import Link from 'next/link';
import { getTopBlogPosts } from '@/lib/wordpress';

export default async function TopBlogList() {
  const topBlogPosts = await getTopBlogPosts();

  return (
    <ul className='mx-auto grid w-fit grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3'>
      {topBlogPosts.map((post) => {
        const imageSrc = post.imageUrl ? post.imageUrl : '/common/blog-placeholder.webp';

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
              <p className='font-display text-sm text-gray-500 group-hover:opacity-50 group-focus-visible:opacity-50'>
                {post.publishedAt}
              </p>
              <h3 className='text-lg font-medium group-hover:opacity-50 group-focus-visible:opacity-50'>
                {post.title}
              </h3>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
