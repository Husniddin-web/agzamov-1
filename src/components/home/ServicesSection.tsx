'use client';

import React from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Container } from '../common/Container';
import { mockServices } from '@/data/mockData';
import { Locale } from '@/types';
import { Link } from '@/i18n/routing';
import {
  Building2,
  Scale,
  ShieldAlert,
  Coins,
  Landmark,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  ShieldAlert: <ShieldAlert className="w-6 h-6 text-red-500 stroke-[1.6]" />,
  Building2: <Building2 className="w-6 h-6 text-red-500 stroke-[1.6]" />,
  Scale: <Scale className="w-6 h-6 text-red-500 stroke-[1.6]" />,
  Landmark: <Landmark className="w-6 h-6 text-red-500 stroke-[1.6]" />,
  Coins: <Coins className="w-6 h-6 text-red-500 stroke-[1.6]" />,
};

export const ServicesSection: React.FC = () => {
  const t = useTranslations('services');
  const tServicesPage = useTranslations('servicesPage');
  const locale = useLocale() as Locale;

  return (
    <section className="relative bg-[#06080e] border-t border-zinc-900 overflow-hidden text-zinc-300">
      {/* 1. TOP HEADER HERO BANNER (Hero 2 Courtroom Photo with smooth fade & balanced contrast) */}
      <div className="relative pt-24 pb-48 sm:pb-56 overflow-hidden">
        {/* Background Image: Hero 2 Courtroom Image */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <Image
            src="/hero-court.jpg"
            alt="Agzamov Legal Practice"
            fill
            className="object-cover object-center opacity-85 filter contrast-105 brightness-95"
            sizes="100vw"
            priority
          />
          {/* Subtle light overlay keeping the courtroom clearly visible and sharp */}
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#06080e]/60 via-transparent to-[#06080e]" />
        </div>

        <Container className="relative z-10 text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto px-4">
          <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.25em] text-red-500 block drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {t('tag')}
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            {t('title')}
          </h2>

          <p className="text-xs sm:text-sm text-zinc-100 leading-relaxed max-w-2xl mx-auto pt-1 font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            «{t('subtitle')}»
          </p>
        </Container>
      </div>

      {/* 2. OVERLAPPING SERVICES CARDS (Senior-Level Quiet Luxury UI/UX) */}
      <div className="-mt-28 sm:-mt-36 lg:-mt-40 pb-16 sm:pb-24 lg:pb-32 relative z-20">
        <Container>
          {/* Centered cards layout: 3 on row 1, 2 centered on row 2 on desktop */}
          <div className="flex flex-wrap justify-center gap-6 lg:gap-8 items-stretch">
            {mockServices.map((service, idx) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="w-full md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4rem)/3)] group relative flex flex-col justify-between overflow-hidden border border-zinc-800/80 hover:border-zinc-700 bg-gradient-to-b from-[#0d1017] to-[#07090e] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer p-7 sm:p-8"
              >
                {/* Senior UX: Refined top edge razor line that activates on hover */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-red-600/0 to-transparent group-hover:via-red-600 transition-all duration-500" />

                {/* Ambient subtle light sheen */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-600/[0.03] rounded-full blur-3xl group-hover:bg-red-600/[0.08] transition-all duration-500 pointer-events-none" />

                <div>
                  {/* TOP ROW: Editorial Index + Icon + Metric Pill */}
                  <div className="flex items-center justify-between gap-4 mb-7">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-zinc-900/90 border border-zinc-800 group-hover:border-zinc-700 flex items-center justify-center transition-colors duration-300">
                        {iconMap[service.iconName] || <Scale className="w-6 h-6 text-red-500" />}
                      </div>
                      <span className="text-xs font-mono font-bold text-zinc-600 tracking-wider">
                        0{idx + 1}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900/60 border border-zinc-800/80 text-[11px] font-mono font-medium text-zinc-400 group-hover:text-zinc-200 group-hover:border-zinc-700 transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      <span>{service.casesCount}+ {tServicesPage('casesSuffix')}</span>
                    </div>
                  </div>

                  {/* TITLE & ESSENTIAL INFO */}
                  <div className="space-y-3.5">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug group-hover:text-zinc-100 transition-colors">
                      {service.title[locale]}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3 font-normal">
                      {service.shortDesc[locale]}
                    </p>

                    {/* Key features checklist (Top 2 advantages) */}
                    {service.features[locale] && service.features[locale].length > 0 && (
                      <ul className="space-y-2.5 pt-4 border-t border-zinc-850">
                        {service.features[locale].slice(0, 2).map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-300/85">
                            <CheckCircle2 className="w-3.5 h-3.5 text-zinc-500 group-hover:text-red-500 transition-colors shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* BOTTOM ACTION ROW: Unified clean luxury interaction */}
                <div className="pt-5 mt-6 border-t border-zinc-850 flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-400 group-hover:text-white uppercase tracking-wider transition-colors">
                    {t('learnMore')}
                  </span>

                  <div
                    className="w-9 h-9 rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-400 group-hover:border-white group-hover:bg-white group-hover:text-zinc-950 flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 shadow-sm"
                    aria-hidden="true"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom CTA to all services */}
          <div className="pt-14 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-zinc-950 border border-zinc-800 hover:border-red-600 text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-200 shadow-xl group"
            >
              <span>{t('allServices')}</span>
              <ArrowRight className="w-4 h-4 text-red-500 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Container>
      </div>
    </section>
  );
};
