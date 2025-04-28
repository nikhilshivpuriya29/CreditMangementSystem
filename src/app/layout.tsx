// app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Import Inter from google fonts
import { GeistSans } from 'geist/font/sans'; // Import Geist Sans
import { GeistMono } from 'geist/font/mono'; // Import Geist Mono
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider } from '@/components/ui/sidebar';


// Initialize Inter font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vyapar Sahayak',
  description: 'Digitizing Traditional Ledger Management for SMBs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}> {/* Add Geist variables to html tag */}
      <body
        className={`${inter.variable} font-sans antialiased`} // Use Inter as the base font
      >
        <SidebarProvider> {/* Wrap content with SidebarProvider */}
          {children}
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
