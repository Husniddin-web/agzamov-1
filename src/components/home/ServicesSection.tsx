'use client';

import React from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Container } from '../common/Container';
import { ServiceCard } from '../common/ServiceCard';
import { mockServices } from '@/data/mockData';
import { Locale } from '@/types';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

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
              <ServiceCard
                key={service.id}
                service={service}
                index={idx}
                className="w-full md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4rem)/3)]"
                dataAos="fade-up"
                dataAosDelay={idx * 100}
              />
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
