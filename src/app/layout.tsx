import type { Metadata, Viewport } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

if (!process.env.SITE_URL) {
  throw new Error('SITE_URL is not defined');
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL),
  title: {
    template: "%s | Taka's Coffee",
    default: "Taka's Coffee",
  },
  description: 'A cozy coffee experience',

  openGraph: {
    type: 'website',
    siteName: "Taka's Coffee",
    description: 'A cozy coffee experience',
    images: [
      {
        url: '/ogp.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${inter.variable} ${montserrat.variable}`}>
      <body className='flex min-h-screen flex-col font-sans antialiased'>
        <Header />
        <main className='flex-1'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
