'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Container } from '../common/Container';
import { mockFaqs } from '@/data/mockData';
import { Locale } from '@/types';
import { Plus, Minus, Phone, Send, MessageSquareText } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const t = useTranslations('faq');
  const locale = useLocale() as Locale;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-black border-t border-zinc-900 relative overflow-hidden">
      {/* Subtle ambient illumination */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-red-600/5 blur-[180px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Left Column: Clean Title & Direct Assistance Card */}
          <div data-aos="fade-right" className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-tight">
                {t('title')}
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                {t('subtitle')}
              </p>
            </div>

            {/* Direct Consultation Box */}
            <div className="p-6 sm:p-7 bg-zinc-950 border border-zinc-800 space-y-5 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-red-500 shrink-0">
                  <MessageSquareText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {t('helpTitle')}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    {t('helpSubtitle')}
                  </p>
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed">
                {t('helpDesc')}
              </p>

              <div className="pt-2 flex flex-col gap-2.5">
                <a
                  href="tel:+998951331515"
                  className="flex items-center justify-center gap-2.5 py-3.5 px-4 bg-zinc-900 border border-zinc-800 hover:border-red-600 hover:text-white text-zinc-200 text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-red-500" />
                  <span>+998 95 133 15 15</span>
                </a>
                <a
                  href="https://t.me/s/miralisherhimoya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 py-3.5 px-4 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-red-950/40"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t('writeTelegram')}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Numbered Luxury Accordion */}
          <div data-aos="fade-left" className="lg:col-span-7 space-y-3.5">
            {mockFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={faq.id}
                  className={`transition-all duration-300 border ${
                    isOpen
                      ? 'border-zinc-800 bg-zinc-950 border-l-2 border-l-red-600 shadow-xl'
                      : 'border-zinc-900 bg-[#0c0d12] hover:border-zinc-800'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(idx)}
                    className="w-full flex items-start justify-between p-5 sm:p-6 text-left gap-4 focus:outline-none cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`text-xs sm:text-sm font-mono font-bold tracking-wider pt-0.5 transition-colors ${
                          isOpen ? 'text-red-500' : 'text-zinc-600 group-hover:text-zinc-400'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <span
                        className={`text-sm sm:text-base font-bold transition-colors leading-snug ${
                          isOpen ? 'text-white' : 'text-zinc-200 group-hover:text-white'
                        }`}
                      >
                        {faq.question[locale]}
                      </span>
                    </div>

                    <span
                      className={`w-7 h-7 flex items-center justify-center shrink-0 border transition-all duration-300 ${
                        isOpen
                          ? 'border-red-600 bg-red-600/10 text-red-500'
                          : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 group-hover:text-white group-hover:border-zinc-700'
                      }`}
                    >
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-0 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-900/80 animate-in fade-in duration-200">
                      <p className="pt-4 pl-8 sm:pl-9">{faq.answer[locale]}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </Container>
    </section>
  );
};
