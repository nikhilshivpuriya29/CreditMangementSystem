
// app/layout.tsx

import type { Metadata } from 'next';
// Correct imports for Geist fonts
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
// Keep Inter import from next/font/google
import { Inter } from 'next/font/google';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider } from '@/components/ui/sidebar';

// Initialize Inter font correctly
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // Define variable name for Inter
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
        // Combine GeistSans, GeistMono, and Inter variables
        // Access .variable directly for Geist fonts
        className={`${GeistSans.variable} ${GeistMono.variable} ${inter.variable} font-sans antialiased`}
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

