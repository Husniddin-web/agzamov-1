import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AosInit } from '@/components/common/AosInit';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    template: '%s | AGZAMOV LEGAL GROUP',
    default: 'AGZAMOV LEGAL GROUP — Professional Yuridik Xizmatlar va Advokatura',
  },
  description:
    'Toshkentda yuqori toifali advokatlar va yuridik konsalting. Korporativ huquq, iqtisodiy sudlar, jinoiy himoya va soliq nizolari bo‘yicha ishonchli yechimlar.',
  keywords: [
    'advokat Toshkent',
    'yurist Toshkent',
    'yuridik xizmatlar',
    'korporativ huquq',
    'iqtisodiy sud',
    'jinoiy himoya',
    'Agzamov Legal Group',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);

  // Providing all messages to the client side
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} dark scroll-smooth`}>
      <body className={`${inter.className} min-h-screen bg-black text-zinc-100 flex flex-col font-sans selection:bg-red-600 selection:text-black antialiased`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <AosInit />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
