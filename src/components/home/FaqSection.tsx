'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { mockFaqs } from '@/data/mockData';
import { Locale } from '@/types';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const t = useTranslations('faq');
  const locale = useLocale() as Locale;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-700/5 blur-[160px] pointer-events-none" />

      <Container className="relative z-10 space-y-10 sm:space-y-16">
        <SectionHeading
          tag={t('tag')}
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="max-w-3xl mx-auto space-y-4">
          {mockFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={faq.id}
                data-aos="fade-up"
                data-aos-delay={idx * 80}
                className="bento-card rounded-none overflow-hidden transition-all duration-300 border border-zinc-800/90 bg-[#0c0d12]"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-6 sm:p-7 text-left gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3 text-base sm:text-lg font-bold text-white group-hover:text-zinc-200 transition-colors">
                    <span className="h-1.5 w-1.5 bg-red-600 shrink-0" />
                    <span>{faq.question[locale]}</span>
                  </span>

                  <span
                    className={`p-2 rounded-none bg-zinc-900 border border-zinc-800 text-zinc-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 bg-red-600 text-white font-bold border-red-600' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-0 text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/80 mt-1 animate-in fade-in-50 duration-200">
                    <p className="pt-4">{faq.answer[locale]}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
