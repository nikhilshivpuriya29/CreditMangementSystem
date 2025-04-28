
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Inter } from 'next/font/google'; // Import Inter
import './globals.css';
import { Toaster } from '@/components/ui/toaster'; // Import Toaster
import { SidebarProvider } from '@/components/ui/sidebar'; // Import SidebarProvider

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Configure Inter font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // Define a CSS variable for Inter
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vyapar Sahayak', // Update title
  description: 'Digitizing Traditional Ledger Management for SMBs', // Update description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning> {/* Move suppressHydrationWarning to html tag for broader coverage */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} font-sans antialiased`} // Add inter variable and set default font to sans
        suppressHydrationWarning={true} // Keep on body as well, although html might suffice
      >
        <SidebarProvider> {/* Wrap content with SidebarProvider */}
          {children}
        </SidebarProvider>
        <Toaster /> {/* Add Toaster component */}
      </body>
    </html>
  );
}

