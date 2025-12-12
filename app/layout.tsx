import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { inter } from './theme';

export const metadata: Metadata = {
  title: 'Castefy | Intent-first, verified discovery',
  description: 'Swipe with intent. Built for authenticity and community trust.',
  manifest: '/manifest.json'
};

export const viewport = {
  themeColor: '#f97316'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className + ' bg-white min-h-screen'}>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
