import Image from 'next/image';
import { getTopBlogPosts } from '@/lib/wordpress';

export default async function TopBlogList() {
  const topBlogPosts = await getTopBlogPosts();

  return (
    <div>
      <ul className='flex flex-col gap-6'>
        {topBlogPosts.map((post) => (
          <li key={post.slug} className='flex flex-col gap-2'>
            <a href={`/blog/${post.slug}`}>
              <h3 className='text-lg font-bold'>{post.title}</h3>
              <p className='text-sm text-gray-500'>{post.publishedAt}</p>
              {post.imageUrl && (
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  className='mt-2 h-48 w-full object-cover'
                  width={600}
                  height={400}
                />
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
