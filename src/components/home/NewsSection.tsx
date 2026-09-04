'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Container } from '../common/Container';
import { mockNews } from '@/data/mockData';
import { Locale } from '@/types';
import { Link } from '@/i18n/routing';
import { ArrowRight, Clock, User } from 'lucide-react';

export const NewsSection: React.FC = () => {
  const t = useTranslations('news');
  const tCommon = useTranslations('common');
  const locale = useLocale() as Locale;

  const mainArticle = mockNews[0];
  const sideArticles = mockNews.slice(1, 3);

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-black border-t border-zinc-900 relative overflow-hidden text-zinc-300">
      <Container className="relative z-10 space-y-10 sm:space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-zinc-900 pb-6 sm:pb-8">
          <div className="space-y-2 max-w-2xl text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
              {t('title')}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          <Link
            href="/news"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold uppercase tracking-wider transition-all duration-200 shadow-lg shadow-red-600/25 shrink-0 group w-full sm:w-auto"
          >
            <span>{tCommon('allNews')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Asymmetrical 2-Column News Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Left Column: Big Featured Article (7 cols) */}
          {mainArticle && (
            <div data-aos="fade-right" className="lg:col-span-7 group flex flex-col justify-between space-y-4 sm:space-y-5">
              <Link href={`/news/${mainArticle.slug}`} className="block relative h-[260px] sm:h-[340px] lg:h-[420px] w-full overflow-hidden border border-zinc-800/90 bg-zinc-950">
                <Image
                  src={mainArticle.thumbnail}
                  alt={mainArticle.title[locale]}
                  fill
                  className="object-cover group-hover:scale-105 filter brightness-95 contrast-105 transition-all duration-700"
                  sizes="(max-width: 1024px) 100vw, 700px"
                  priority
                />
                
                {/* Clean Editorial Date Badge (Glassmorphism + Subtle Red Dot) */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/85 backdrop-blur-md border border-zinc-700/60 text-zinc-300 text-xs font-mono tracking-wider shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-none bg-red-600 shrink-0" />
                    <Clock className="w-3 h-3 text-zinc-400" />
                    <span>{mainArticle.createdAt}</span>
                  </span>
                </div>
              </Link>

              {/* Text & Metadata */}
              <div className="space-y-3 text-left">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white group-hover:text-zinc-200 transition-colors leading-tight">
                  <Link href={`/news/${mainArticle.slug}`}>
                    {mainArticle.title[locale]}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3">
                  {mainArticle.excerpt[locale]}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-zinc-900 text-xs">
                  <span className="flex items-center gap-2 text-zinc-400 font-medium">
                    <User className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{mainArticle.author}</span>
                  </span>

                  <Link
                    href={`/news/${mainArticle.slug}`}
                    className="font-bold text-zinc-300 hover:text-white uppercase tracking-wider inline-flex items-center gap-2 transition-colors group/link"
                  >
                    <span>{tCommon('readMore')}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-red-500 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Right Column: 2 Stacked Articles (5 cols) */}
          <div data-aos="fade-left" className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            {sideArticles.map((article) => (
              <div key={article.id} className="group space-y-3.5 text-left">
                <Link href={`/news/${article.slug}`} className="block relative h-[180px] sm:h-[200px] w-full overflow-hidden border border-zinc-800/90 bg-zinc-950">
                  <Image
                    src={article.thumbnail}
                    alt={article.title[locale]}
                    fill
                    className="object-cover group-hover:scale-105 filter brightness-95 contrast-105 transition-all duration-700"
                    sizes="(max-width: 1024px) 100vw, 500px"
                  />
                  {/* Clean Editorial Date Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/85 backdrop-blur-md border border-zinc-700/60 text-zinc-300 text-[11px] font-mono tracking-wider shadow-md">
                      <span className="w-1 h-1 rounded-none bg-red-600 shrink-0" />
                      <Clock className="w-3 h-3 text-zinc-400" />
                      <span>{article.createdAt}</span>
                    </span>
                  </div>
                </Link>

                <div className="space-y-2">
                  <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-zinc-200 transition-colors leading-snug line-clamp-2">
                    <Link href={`/news/${article.slug}`}>
                      {article.title[locale]}
                    </Link>
                  </h4>

                  <Link
                    href={`/news/${article.slug}`}
                    className="font-bold text-xs text-zinc-400 hover:text-white uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors group/link pt-0.5"
                  >
                    <span>{tCommon('readMore')}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-red-500 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>

      </Container>
    </section>
  );
};
