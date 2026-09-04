'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { heroSlides } from '@/data/mockData';
import { Locale } from '@/types';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const locale = useLocale() as Locale;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  // Autoplay slider every 6.5 seconds unless user hovers
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6500);

    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  // Refresh AOS when slide changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('aos').then((AOS) => {
        AOS.default.refresh();
      });
    }
  }, [currentSlide]);

  const slide = heroSlides[currentSlide];

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-[#06080d]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. SLIDER BACKGROUND IMAGES WITH TRANSITIONS */}
      {heroSlides.map((item, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-0' : 'opacity-0 -z-10 pointer-events-none'
            }`}
          >
            <Image
              src={item.bgImage}
              alt={item.titleWhite[locale] || 'Advocate'}
              fill
              priority={index === 0}
              className={`object-cover object-center opacity-95 filter contrast-105 brightness-100 transition-transform duration-[7000ms] ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
              sizes="100vw"
            />
            {/* Lighter, open overlay: allows the background images to breathe while keeping text sharp */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06080d]/80 via-transparent to-transparent" />
          </div>
        );
      })}

      {/* 2. MAIN HERO CONTENT (Left Aligned matching the screenshot) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 md:pt-40 lg:pt-44 pb-16 sm:pb-24">
        <div className="max-w-3xl lg:max-w-4xl space-y-5 sm:space-y-8" key={currentSlide}>
          {/* Huge Hero Title */}
          <h1
            data-aos="fade-up"
            data-aos-duration="700"
            data-aos-delay="100"
            className="text-2xl sm:text-4xl md:text-5xl lg:text-[66px] font-black text-white leading-[1.12] sm:leading-[1.08] tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]"
          >
            {slide.titleWhite[locale] || slide.titleWhite.uz}{' '}
            <span className="text-red-600 block sm:inline drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
              {slide.titleRed[locale] || slide.titleRed.uz}
            </span>
          </h1>

          {/* Description Subtitle */}
          <p
            data-aos="fade-up"
            data-aos-duration="700"
            data-aos-delay="200"
            className="text-zinc-100 text-xs sm:text-base md:text-lg leading-relaxed max-w-2xl font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
          >
            {slide.description[locale] || slide.description.uz}
          </p>

          {/* CTA Action Buttons */}
          <div
            data-aos="fade-up"
            data-aos-duration="700"
            data-aos-delay="300"
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto"
          >
            {/* Secondary Button: Outlined style */}
            <Link
              href={slide.secondaryCtaLink}
              className="border-2 border-white/80 hover:border-red-600 hover:bg-white/10 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-8 py-3.5 sm:py-4 text-center transition-all duration-200"
            >
              {slide.secondaryCtaText[locale] || slide.secondaryCtaText.uz}
            </Link>

            {/* Primary Button: Solid Red with Arrow */}
            <Link
              href={slide.primaryCtaLink}
              className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-8 py-3.5 sm:py-4 flex items-center justify-center gap-2.5 transition-all duration-200 shadow-lg shadow-red-600/30 group"
            >
              <span>{slide.primaryCtaText[locale] || slide.primaryCtaText.uz}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* 3. RIGHT SIDE VERTICAL SLIDER CONTROLS (Exactly as on screenshot) */}
      <div className="absolute right-4 sm:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col items-center gap-6">
        {/* Navigation Indicator Bars */}
        <div className="flex flex-col items-center gap-3">
          {heroSlides.map((_, idx) => {
            const isSelected = idx === currentSlide;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 cursor-pointer rounded-full ${
                  isSelected
                    ? 'w-7 sm:w-9 h-1.5 bg-red-600 shadow-md shadow-red-600/50'
                    : 'w-3 h-1.5 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            );
          })}
        </div>

        {/* Counter Number Display (01 / 03) */}
        <div className="text-[11px] font-mono tracking-widest text-zinc-400 flex items-center gap-1 select-none">
          <span className="text-white font-bold text-xs">
            0{currentSlide + 1}
          </span>
          <span>/</span>
          <span>0{heroSlides.length}</span>
        </div>

        {/* Previous / Next Arrow Buttons */}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={prevSlide}
            className="w-8 h-8 rounded-full border border-white/20 bg-black/40 hover:bg-red-600 hover:border-red-600 text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="w-8 h-8 rounded-full border border-white/20 bg-black/40 hover:bg-red-600 hover:border-red-600 text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4. MOBILE SLIDER CONTROLS (Bottom Center on small devices) */}
      <div className="sm:hidden absolute bottom-4 inset-x-0 z-20 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={prevSlide}
          className="p-2 rounded-full bg-black/60 border border-white/20 text-white"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              className={`h-1 rounded-full transition-all ${
                idx === currentSlide ? 'w-6 bg-red-600' : 'w-2 bg-white/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={nextSlide}
          className="p-2 rounded-full bg-black/60 border border-white/20 text-white"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
