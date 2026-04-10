import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className='sm:flex sm:items-center sm:justify-between'>
      <Link href='/'>
        <Image
          src='/common/logo-header.png'
          alt="Taka's Coffee"
          width={325}
          height={50}
          className='m-4 h-auto w-32 sm:mx-7 sm:w-40'
          priority
        />
      </Link>
      <nav className='bg-primary px-4 py-3 sm:bg-transparent sm:p-0'>
        <ul className='font-display sm:text-primary flex items-center justify-center gap-8 text-white sm:gap-0'>
          <li className='sm:hover:bg-primary sm:px-12 sm:py-3.5 sm:transition sm:duration-250 sm:ease-in-out sm:hover:text-white'>
            <Link href='/concept'>CONCEPT</Link>
          </li>
          <li aria-hidden='true' className='h-4 w-px bg-white sm:hidden' />
          <li className='sm:hover:bg-primary sm:px-12 sm:py-3.5 sm:transition sm:duration-250 sm:ease-in-out sm:hover:text-white'>
            <Link href='/menu'>MENU</Link>
          </li>
          <li aria-hidden='true' className='h-4 w-px bg-white sm:hidden' />
          <li className='sm:hover:bg-primary sm:px-12 sm:py-3.5 sm:transition sm:duration-250 sm:ease-in-out sm:hover:text-white'>
            <Link href='/blog'>BLOG</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
