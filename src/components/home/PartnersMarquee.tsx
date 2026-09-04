'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Container } from '../common/Container';
import { mockPartners } from '@/data/mockData';

export const PartnersMarquee: React.FC = () => {
  const t = useTranslations('partners');

  // Quadruple the items for a seamless continuous scrolling loop
  const marqueeItems = [...mockPartners, ...mockPartners, ...mockPartners, ...mockPartners];

  return (
    <section className="py-20 bg-[#05070a] relative overflow-hidden border-y border-zinc-900">
      <Container className="mb-10 text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight uppercase">
          {t('title')}
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
          {t('subtitle')}
        </p>
      </Container>

      {/* Infinite Marquee Track with gradient fade masks on edges */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left and Right Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-[#05070a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-[#05070a] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-6 sm:gap-8 py-2">
          {marqueeItems.map((partner, idx) => (
            <div
              key={`${partner.id}-${idx}`}
              className="flex items-center justify-center h-20 sm:h-24 min-w-[170px] sm:min-w-[210px] px-6 bg-zinc-950 border border-zinc-800 hover:border-red-600/50 transition-all duration-300 group cursor-pointer shrink-0 shadow-lg"
            >
              <div className="relative h-12 w-full max-w-[140px] flex items-center justify-center">
                <Image
                  src={partner.logoUrl}
                  alt={partner.companyName}
                  fill
                  className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
