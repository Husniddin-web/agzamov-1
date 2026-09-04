import React from 'react';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Container } from '@/components/common/Container';
import { GlowBadge } from '@/components/common/GlowBadge';
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
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tNews = await getTranslations({ locale, namespace: 'newsPage' });
  const currentLocale = locale as Locale;

  return (
    <div className="pt-28 pb-20 bg-black min-h-screen">
      {/* Banner */}
      <section className="py-16 border-b border-zinc-900 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-700/10 blur-[150px] pointer-events-none" />

        <Container className="relative z-10 text-center space-y-5">
          <GlowBadge icon>{tNews('badge')}</GlowBadge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            {tNews('title')}
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            {tNews('subtitle')}
          </p>
        </Container>
      </section>

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
                      <span className="px-3 py-1 rounded-full bg-black/80 border border-red-600/40 text-[10px] font-bold text-red-500 uppercase tracking-wider backdrop-blur-md">
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
    </div>
  );
}
