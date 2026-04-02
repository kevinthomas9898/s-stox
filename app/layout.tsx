import type { Metadata } from 'next';
import { Roboto, Roboto_Mono, Geist } from 'next/font/google';
import './globals.css';
import AppProviders from '@/providers/AppProviders';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-geist'});

const roboto = Roboto({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SmartStox | Intelligent Trading Platform',
  description:
    'Real-time market insights, AI-powered analytics, and portfolio management.',
  icons: {
    icon: '/logo-icon.png',
  },
};

/**
 * Root Layout.
 * This file is required, but we move `lang` and `dir` to `[locale]/layout.tsx`.
 * We wrap the app with AppProviders (TanStack Query).
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={cn("h-full", "antialiased", roboto.variable, robotoMono.variable, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
