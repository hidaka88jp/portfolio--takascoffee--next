import Link from 'next/link';
import Image from 'next/image';
import { RiExternalLinkLine } from 'react-icons/ri';

export default function Footer() {
  return (
    <footer className='bg-primary flex flex-col items-center justify-center gap-12 px-4 pt-12 pb-8 text-white'>
      <Link href='/'>
        <Image
          src='/common/logo-footer.png'
          alt="Taka's Coffee"
          width={325}
          height={50}
          className='h-auto w-56 sm:w-64'
        />
      </Link>
      <address className='space-y-1 text-center font-medium not-italic'>
        <a href='tel:0123456789'>TEL 01-2345-6789</a>
        <p>OPEN Fri-Sun 11:00-16:00</p>
      </address>
      <div className='text-center text-sm'>
        <p className='mb-5'>&copy; 2026 Takanori Hidaka</p>
        <p>Taka&apos;s Coffee is a fictional project created for portfolio purposes.</p>
        <p>
          Design inspiration: Implemented in React, the UI design inspired by HTML/CSS coding
          exercises from{' '}
          <a
            href='https://moshashugyo.com/lessons/cafe'
            className='underline transition-opacity hover:opacity-80'
            target='_blank'
            rel='noopener noreferrer'
          >
            Mosha Shugyo
            <RiExternalLinkLine size={16} className='ml-px inline' aria-hidden='true' />
          </a>
        </p>
      </div>
    </footer>
  );
}
