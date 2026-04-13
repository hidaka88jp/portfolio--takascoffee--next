import Link from 'next/link';

export default function LinkButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className='font-display hover:bg-primary relative w-55 bg-black px-6 py-3 text-center text-sm text-white transition-colors duration-75 ease-in-out sm:w-60'
    >
      <span>{children}</span>
      <span
        aria-hidden='true'
        className='absolute top-1/2 right-0 h-px w-6 -translate-y-1/2 bg-white'
      />
    </Link>
  );
}
