import { Inter } from 'next/font/google';
import './globals.css';
import ClerkAuthProvider from '@/components/auth/clerk-provider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'StudyHome',
  description: 'The all-in-one Student Management Platform',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClerkAuthProvider suppressHydrationWarning>
          <main className="min-h-screen">{children}</main>
          <Toaster />
        </ClerkAuthProvider>
      </body>
    </html>
  );
}
