'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import {
  TrendingUp,
  Scale,
  ShieldCheck,
  Clock,
  Zap,
  Award,
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const t = useTranslations('whyUs');

  const leftFeatures = [
    {
      id: 'economic',
      title: t('economic.title'),
      subtitle: t('economic.subtitle'),
      desc: t('economic.desc'),
      icon: <TrendingUp className="w-5 h-5 text-red-500 group-hover:text-white transition-colors" />,
      arcOffset: 'lg:translate-x-6 xl:translate-x-10',
    },
    {
      id: 'professional',
      title: t('professional.title'),
      subtitle: t('professional.subtitle'),
      desc: t('professional.desc'),
      icon: <Scale className="w-5 h-5 text-red-500 group-hover:text-white transition-colors" />,
      arcOffset: 'lg:translate-x-0',
    },
    {
      id: 'security',
      title: t('security.title'),
      subtitle: t('security.subtitle'),
      desc: t('security.desc'),
      icon: <ShieldCheck className="w-5 h-5 text-red-500 group-hover:text-white transition-colors" />,
      arcOffset: 'lg:translate-x-8 xl:translate-x-12',
    },
  ];

  const rightFeatures = [
    {
      id: 'time',
      title: t('time.title'),
      subtitle: t('time.subtitle'),
      desc: t('time.desc'),
      icon: <Clock className="w-5 h-5 text-red-500 group-hover:text-white transition-colors" />,
      arcOffset: 'lg:-translate-x-6 xl:-translate-x-10',
    },
    {
      id: 'emergency',
      title: t('emergency.title'),
      subtitle: t('emergency.subtitle'),
      desc: t('emergency.desc'),
      icon: <Zap className="w-5 h-5 text-red-500 group-hover:text-white transition-colors" />,
      arcOffset: 'lg:translate-x-0',
    },
    {
      id: 'satisfaction',
      title: t('satisfaction.title'),
      subtitle: t('satisfaction.subtitle'),
      desc: t('satisfaction.desc'),
      icon: <Award className="w-5 h-5 text-red-500 group-hover:text-white transition-colors" />,
      arcOffset: 'lg:-translate-x-8 xl:-translate-x-12',
    },
  ];

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-black overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-red-600/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <Container className="relative z-10 space-y-16 sm:space-y-20">
        {/* Section Heading */}
        <SectionHeading
          tag={t('tag')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        {/* 2. DESKTOP RADIAL/CURVED LAYOUT: Left Arc, Center Flawless Person, Right Arc */}
        <div className="hidden lg:grid grid-cols-12 gap-4 xl:gap-8 items-center">
          
          {/* Left Arc Features (Text right-aligned, Icon right) */}
          <div className="col-span-4 space-y-14 xl:space-y-16">
            {leftFeatures.map((item, idx) => (
              <div
                key={item.id}
                data-aos="fade-right"
                data-aos-delay={idx * 150}
                className={`flex items-center justify-end gap-3.5 xl:gap-4 group cursor-pointer transition-transform duration-300 ${item.arcOffset}`}
              >
                <div className="text-right space-y-1 max-w-[270px]">
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-red-500 font-mono">
                      {item.subtitle}
                    </span>
                  </div>
                  <h3 className="text-base xl:text-lg font-bold text-white group-hover:text-red-500 transition-colors drop-shadow-sm">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed drop-shadow-xs">
                    {item.desc}
                  </p>
                </div>

                {/* Circle Icon Button */}
                <div className="w-12 h-12 xl:w-13 xl:h-13 rounded-full bg-zinc-950 border border-zinc-800 group-hover:border-red-600 group-hover:bg-red-600 flex items-center justify-center shrink-0 shadow-xl shadow-black/80 group-hover:scale-105 transition-all duration-300">
                  {item.icon}
                </div>
              </div>
            ))}
          </div>

          {/* Center: Flawless Seamless Person on Black Background */}
          <div className="col-span-4 relative flex items-center justify-center">
            <div
              data-aos="zoom-in"
              data-aos-duration="800"
              className="relative w-full max-w-[340px] xl:max-w-[380px] h-[520px] xl:h-[580px] flex items-end justify-center pointer-events-none"
            >
              {/* Subtle aura behind person */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-600/15 rounded-full blur-3xl -z-10" />

              {/* 100% Transparent Cutout Female Lawyer */}
              <Image
                src="/lawyer-person.png"
                alt="Professional Lawyer"
                width={380}
                height={580}
                className="w-auto h-full object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]"
                priority
              />
            </div>
          </div>

          {/* Right Arc Features (Icon left, Text left-aligned) */}
          <div className="col-span-4 space-y-14 xl:space-y-16">
            {rightFeatures.map((item, idx) => (
              <div
                key={item.id}
                data-aos="fade-left"
                data-aos-delay={idx * 150}
                className={`flex items-center justify-start gap-3.5 xl:gap-4 group cursor-pointer transition-transform duration-300 ${item.arcOffset}`}
              >
                {/* Circle Icon Button */}
                <div className="w-12 h-12 xl:w-13 xl:h-13 rounded-full bg-zinc-950 border border-zinc-800 group-hover:border-red-600 group-hover:bg-red-600 flex items-center justify-center shrink-0 shadow-xl shadow-black/80 group-hover:scale-105 transition-all duration-300">
                  {item.icon}
                </div>

                <div className="text-left space-y-1 max-w-[270px]">
                  <div className="flex items-center justify-start gap-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-red-500 font-mono">
                      {item.subtitle}
                    </span>
                  </div>
                  <h3 className="text-base xl:text-lg font-bold text-white group-hover:text-red-500 transition-colors drop-shadow-sm">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed drop-shadow-xs">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. MOBILE & TABLET LAYOUT (6 cards, person hidden) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:hidden">
          {[...leftFeatures, ...rightFeatures].map((item, idx) => (
            <div
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={(idx % 2) * 100}
              className="p-5 sm:p-6 rounded-none bg-zinc-950/80 border border-zinc-800/90 hover:border-red-600/50 backdrop-blur-md space-y-3.5 transition-all group shadow-xl shadow-black/60"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-none bg-zinc-900 border border-zinc-800 group-hover:border-red-600 group-hover:bg-red-600 flex items-center justify-center transition-colors">
                  {item.icon}
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-red-500 font-mono">
                  {item.subtitle}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white group-hover:text-red-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
