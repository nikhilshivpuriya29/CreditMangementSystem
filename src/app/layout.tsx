
// app/layout.tsx

import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans'; // Correct import for Geist Sans
import { GeistMono } from 'geist/font/mono'; // Correct import for Geist Mono
import { Inter } from 'next/font/google'; // Keep Inter font

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider } from '@/components/ui/sidebar';

// Initialize fonts correctly using the imported objects
const geistSans = GeistSans({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = GeistMono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

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
    // Add suppressHydrationWarning to the html tag to handle potential browser extension interference
    <html lang="en" suppressHydrationWarning>
      <body
        // Combine all font variables and set default font family
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} font-sans antialiased`}
        // No need for suppressHydrationWarning here if it's on the html tag
      >
        <SidebarProvider> {/* Wrap content with SidebarProvider */}
          {children}
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}

