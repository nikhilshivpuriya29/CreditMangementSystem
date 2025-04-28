
// app/layout.tsx

import type { Metadata } from 'next';
// Only import Inter font from next/font/google
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
    // Keep suppressHydrationWarning on html tag
    <html lang="en" suppressHydrationWarning>
      <body
        // Use only Inter font variable and Tailwind's font-sans utility
        className={`${inter.variable} font-sans antialiased`}
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
