import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { MantineProvider } from '@mantine/core';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import Navbar from '@/components/layout/Navbar';
import { cache } from 'react';

// Cache messages to prevent reloading on every HMR
const getCachedMessages = cache(async (locale: string) => {
  return await getMessages();
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getCachedMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <MantineProvider defaultColorScheme="dark">
        <div lang={locale} className="flex flex-col min-h-screen">
          <Navbar />
          <main className="grow">{children}</main>
        </div>
      </MantineProvider>
    </NextIntlClientProvider>
  );
}
