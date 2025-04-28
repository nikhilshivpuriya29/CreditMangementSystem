// app/layout.tsx

import type { Metadata } from 'next';
// Import fonts from their specific paths and ensure they are called as functions
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider } from '@/components/ui/sidebar';


// Initialize fonts correctly by CALLING the imported functions
const geistSans = GeistSans({
  variable: '--font-geist-sans',
  // Subsets might not be applicable or needed for Geist fonts, removed for now
  // subsets: ['latin'],
});

const geistMono = GeistMono({
  variable: '--font-geist-mono',
 // Subsets might not be applicable or needed for Geist fonts, removed for now
 // subsets: ['latin'],
});

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
    // Keep suppressHydrationWarning on html tag
    <html lang="en" suppressHydrationWarning>
      <body
        // Combine font variables correctly
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} font-sans antialiased`}
      >
        <SidebarProvider> {/* Wrap content with SidebarProvider */}
          {children}
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
