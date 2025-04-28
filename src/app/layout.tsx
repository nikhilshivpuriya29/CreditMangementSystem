// app/layout.tsx

import type { Metadata } from 'next';
// Import fonts from their specific paths and ensure they are called as functions
// Temporarily comment out Geist fonts due to TypeError
// import { GeistSans } from 'geist/font/sans';
// import { GeistMono } from 'geist/font/mono';
import { Inter } from 'next/font/google'; // Keep Inter
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider } from '@/components/ui/sidebar';


// Initialize fonts correctly by CALLING the imported functions
// const geistSans = GeistSans({
//   variable: '--font-geist-sans',
// });

// const geistMono = GeistMono({
//   variable: '--font-geist-mono',
// });

// Initialize Inter font
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
        // Combine font variables correctly - Use only Inter for now
        className={`${inter.variable} font-sans antialiased`}
      >
        <SidebarProvider> {/* Wrap content with SidebarProvider */}
          {children}
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
