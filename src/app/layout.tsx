
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Use Inter as primary font
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ThemeProvider } from "@/components/theme-provider"; // Import ThemeProvider

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
}: Readonly<{ // Use Readonly for props type
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased`} // Use Inter font variable
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
         >
            <SidebarProvider> {/* Wrap content with SidebarProvider */}
            {children}
            </SidebarProvider>
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
