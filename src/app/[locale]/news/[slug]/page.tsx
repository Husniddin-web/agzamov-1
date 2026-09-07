import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Container } from '@/components/common/Container';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/common/Button';
import { ConsultationBanner } from '@/components/common/ConsultationBanner';
import { mockNews } from '@/data/mockData';
import { Locale } from '@/types';
import { Link } from '@/i18n/routing';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Send,
} from 'lucide-react';

interface NewsDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const paths: { locale: string; slug: string }[] = [];
  const locales = ['uz', 'ru', 'en'];

  for (const locale of locales) {
    for (const n of mockNews) {
      paths.push({ locale, slug: n.slug });
    }
  }

  return paths;
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tNews = await getTranslations({ locale, namespace: 'newsPage' });

  const article = mockNews.find((n) => n.slug === slug);

  if (!article) {
    notFound();
  }

  const currentLocale = locale as Locale;

  return (
    <div className="pb-20 bg-black min-h-screen">
      {/* 1. Page Header with Thematic Background (Badge-free) */}
      <PageHeader
        title={article.title[currentLocale]}
        bgImage="/headers/header-news.jpg"
        breadcrumbs={[
          { label: tNav('home'), href: '/' },
          { label: tNav('news'), href: '/news' },
          { label: article.category[currentLocale] },
        ]}
      >
        {/* Article Metadata Bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-3 text-xs text-zinc-300">
          <span className="flex items-center gap-1.5 font-medium">
            <User className="w-4 h-4 text-red-500" />
            {article.author}
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <Calendar className="w-4 h-4 text-red-500" />
            {article.createdAt}
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <Clock className="w-4 h-4 text-red-500" />
            {article.readTime} {tNews('readTimeSuffix')}
          </span>
        </div>
      </PageHeader>

      {/* Article Body */}
      <section className="py-12 sm:py-16">
        <Container className="max-w-4xl space-y-10">
          {/* Main Hero Image - Sharp Rectangular */}
          <div className="relative h-72 sm:h-[420px] w-full rounded-none overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
            <Image
              src={article.thumbnail}
              alt={article.title[currentLocale]}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
            />
          </div>

          {/* Excerpt Lead - Sharp Rectangular */}
          <div className="p-6 sm:p-8 rounded-none bg-red-600/10 border-l-4 border-l-red-600 border border-red-600/20 text-base sm:text-lg text-zinc-200 font-medium leading-relaxed italic">
            «{article.excerpt[currentLocale]}»
          </div>

          {/* Text Content */}
          <div className="prose prose-invert max-w-none text-zinc-300 text-base sm:text-lg leading-relaxed space-y-6">
            {article.content[currentLocale].split('\n\n').map((paragraph, pIdx) => (
              <p key={pIdx}>{paragraph}</p>
            ))}
          </div>

          {/* Share & Actions Footer */}
          <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button href="/news" variant="outline" icon={<ArrowLeft className="w-4 h-4" />} iconPosition="left">
              {tNews('backToArticles')}
            </Button>

            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">
                {tNews('share')}
              </span>
              <a
                href={`https://t.me/share/url?url=https://agzamovlegal.uz/news/${article.slug}&text=${encodeURIComponent(
                  article.title[currentLocale]
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-none bg-sky-500/15 border border-sky-500/30 text-sky-400 hover:bg-sky-500 hover:text-white transition-all flex items-center gap-2 text-xs font-bold"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Red Grid Consultation Banner */}
      <ConsultationBanner />
    </div>
  );
}
