import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { TokenProvider } from '../components/TokenContext';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Faculty Folio',
  description: 'An Effective & ML Powered system for faculty appraisal and real time management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <link rel='icon' href='/favicon.ico' sizes='any' />
      <body className={inter.className}>
        <TokenProvider>
          <Toaster position='top-center' />
          {children}
        </TokenProvider>
      </body>
    </html>
  );
}
