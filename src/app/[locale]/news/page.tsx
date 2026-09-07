import React from 'react';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Container } from '@/components/common/Container';
import { PageHeader } from '@/components/common/PageHeader';
import { FaqSection } from '@/components/home/FaqSection';
import { ConsultationBanner } from '@/components/common/ConsultationBanner';
import { mockNews } from '@/data/mockData';
import { Locale } from '@/types';
import { Link } from '@/i18n/routing';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface NewsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: NewsPageProps) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tNews = await getTranslations({ locale, namespace: 'newsPage' });
  return {
    title: `${tNav('news')} — AGZAMOV LEGAL GROUP`,
    description: tNews('subtitle'),
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tNews = await getTranslations({ locale, namespace: 'newsPage' });
  const currentLocale = locale as Locale;

  return (
    <div className="bg-black min-h-screen">
      {/* 1. Page Header with Thematic Background */}
      <PageHeader
        title={tNews('title')}
        bgImage="/headers/header-news.jpg"
        breadcrumbs={[
          { label: tNav('home'), href: '/' },
          { label: tNav('news') },
        ]}
      />

      {/* News Grid */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockNews.map((article) => (
              <article
                key={article.id}
                className="bento-card overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 w-full overflow-hidden bg-zinc-900">
                    <Image
                      src={article.thumbnail}
                      alt={article.title[currentLocale]}
                      fill
                      className="object-cover group-hover:scale-105 filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />

                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-none bg-black/85 border border-red-600/40 text-[10px] font-bold text-red-500 uppercase tracking-wider backdrop-blur-md">
                        {article.category[currentLocale]}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-4 text-xs text-zinc-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-red-600" />
                        {article.createdAt}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-red-600" />
                        {article.readTime} {tNews('minutes')}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-white group-hover:text-red-500 transition-colors leading-snug line-clamp-2">
                      <Link href={`/news/${article.slug}`}>
                        {article.title[currentLocale]}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3">
                      {article.excerpt[currentLocale]}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-zinc-800/60 mt-4">
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-xs text-zinc-500 font-mono">
                      {tNews('author')}: {article.author}
                    </span>
                    <Link
                      href={`/news/${article.slug}`}
                      className="text-xs font-bold text-red-500 hover:text-red-400 inline-flex items-center gap-1.5 uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                    >
                      <span>{tCommon('readMore')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* 2. FAQ Section */}
      <FaqSection />

      {/* 3. Contact & Consultation Section */}
      <ConsultationBanner />
    </div>
  );
}
