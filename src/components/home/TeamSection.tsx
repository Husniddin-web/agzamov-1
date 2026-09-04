'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Container } from '../common/Container';
import { mockWorkers } from '@/data/mockData';
import { Locale } from '@/types';
import {
  Quote,
  ArrowLeft,
  ArrowRight,
  Mail,
  Phone,
} from 'lucide-react';

export const TeamSection: React.FC = () => {
  const tNav = useTranslations('nav');
  const tTeam = useTranslations('team');
  const locale = useLocale() as Locale;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const workers = mockWorkers.filter((w) => w.isActive);

  const changeLawyer = (nextIndex: number) => {
    if (nextIndex === currentIndex || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(nextIndex);

    setTimeout(() => {
      setDisplayIndex(nextIndex);
      setIsTransitioning(false);
    }, 220);
  };

  const handlePrev = () => {
    const nextIdx = currentIndex === 0 ? workers.length - 1 : currentIndex - 1;
    changeLawyer(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = currentIndex === workers.length - 1 ? 0 : currentIndex + 1;
    changeLawyer(nextIdx);
  };

  const currentDisplayWorker = workers[displayIndex] || workers[0];

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-black border-t border-zinc-900 relative overflow-hidden text-zinc-300">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[180px] pointer-events-none" />

      <Container className="relative z-10 space-y-10 sm:space-y-16">
        {/* Section Header (Clean, Badgeless, Senior UI/UX) */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
            {tNav('team')}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            {tTeam('subtitle')}
          </p>
        </div>

        {/* Main 2-Column Sharp-Rectangular Team Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Lawyer Portrait with 700ms Butter-Smooth Cross-Dissolve */}
          <div data-aos="fade-right" className="lg:col-span-5 relative">
            <div className="relative border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden">
              <div className="relative h-[360px] sm:h-[440px] lg:h-[520px] w-full">
                {workers.map((worker, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <div
                      key={worker.id}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        isActive
                          ? 'opacity-100 scale-100 z-10 pointer-events-auto'
                          : 'opacity-0 scale-105 z-0 pointer-events-none'
                      }`}
                    >
                      <Image
                        src={worker.image}
                        alt={worker.name}
                        fill
                        className="object-cover object-top filter grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
                        sizes="(max-width: 1024px) 100vw, 500px"
                        priority={idx === 0}
                      />
                    </div>
                  );
                })}
                {/* Subtle bottom shadow vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20 pointer-events-none" />
              </div>
            </div>

            {/* Sharp Mini-Thumbnails under photo for direct click */}
            <div className="flex items-center justify-center gap-3 pt-4">
              {workers.map((worker, idx) => (
                <button
                  key={worker.id}
                  type="button"
                  onClick={() => changeLawyer(idx)}
                  className={`relative w-12 h-12 sm:w-14 sm:h-14 border transition-all cursor-pointer ${
                    idx === currentIndex
                      ? 'border-red-600 scale-105 shadow-md shadow-red-950/40'
                      : 'border-zinc-800 opacity-50 hover:opacity-100 hover:border-zinc-500'
                  }`}
                  aria-label={`Select ${worker.name}`}
                >
                  <Image
                    src={worker.image}
                    alt={worker.name}
                    fill
                    className="object-cover object-top"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Quote, Biography & Sharp Navigation Controls */}
          <div data-aos="fade-left" className="lg:col-span-7 space-y-6 text-left">
            
            {/* Quote Block with smooth cross-fade transition */}
            <div
              className={`space-y-6 transition-all duration-300 ease-out transform ${
                isTransitioning
                  ? 'opacity-0 translate-y-2'
                  : 'opacity-100 translate-y-0'
              }`}
            >
              <div className="p-6 sm:p-8 bg-zinc-950/90 border border-zinc-800/90 shadow-xl space-y-5">
                <Quote className="w-10 h-10 text-red-600/50" />

                <blockquote className="text-base sm:text-lg lg:text-xl italic font-light text-zinc-200 leading-relaxed min-h-[64px] flex items-center">
                  «{currentDisplayWorker.quote ? currentDisplayWorker.quote[locale] : currentDisplayWorker.bio[locale]}»
                </blockquote>

                {/* Name & Title */}
                <div className="pt-3 border-t border-zinc-800/80">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
                    {currentDisplayWorker.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-extrabold text-red-500 uppercase tracking-wider mt-1">
                    {currentDisplayWorker.position[locale]}
                  </p>
                </div>
              </div>

              {/* Bio summary */}
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed min-h-[44px]">
                {currentDisplayWorker.bio[locale]}
              </p>

              {/* Direct Lawyer Contact (Phone & Email) */}
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-zinc-400 border-t border-zinc-900">
                {currentDisplayWorker.phone && (
                  <a
                    href={`tel:${currentDisplayWorker.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-2 hover:text-red-500 transition-colors font-medium"
                  >
                    <Phone className="w-4 h-4 text-red-600" />
                    <span>{currentDisplayWorker.phone}</span>
                  </a>
                )}
                {currentDisplayWorker.email && (
                  <a
                    href={`mailto:${currentDisplayWorker.email}`}
                    className="flex items-center gap-2 hover:text-red-500 transition-colors font-medium"
                  >
                    <Mail className="w-4 h-4 text-red-600" />
                    <span>{currentDisplayWorker.email}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Bottom Sharp Slider Navigation (Next / Prev + Indicator) */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-900">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-zinc-400">
                <span className="text-red-500 text-sm">0{currentIndex + 1}</span>
                <span className="text-zinc-600">/</span>
                <span>0{workers.length}</span>
              </div>

              {/* Sharp Next / Prev Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-12 h-12 bg-zinc-950 border border-zinc-800 hover:border-red-600 hover:bg-red-600 hover:text-white text-zinc-300 flex items-center justify-center transition-all cursor-pointer shadow-md"
                  aria-label={tTeam('prevLawyer')}
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-12 h-12 bg-zinc-950 border border-zinc-800 hover:border-red-600 hover:bg-red-600 hover:text-white text-zinc-300 flex items-center justify-center transition-all cursor-pointer shadow-md"
                  aria-label={tTeam('nextLawyer')}
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
};
