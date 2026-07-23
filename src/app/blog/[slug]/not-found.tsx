import LinkButton from '@/components/shared/LinkButton';

export default function BlogNotFound() {
  return (
    <div className='px-4'>
      <div className='mx-auto flex max-w-240 flex-col gap-16 text-center'>
        <p>Blog post not found.</p>
        <div className='flex justify-center'>
          <LinkButton href='/blog'>Blog List</LinkButton>
        </div>
      </div>
    </div>
  );
}
