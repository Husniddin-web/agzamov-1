'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Container } from '../common/Container';
import { ContactForm } from '../forms/ContactForm';
import { siteConfig } from '@/config/site';
import { Locale } from '@/types';
import { Phone, MapPin, Clock } from 'lucide-react';

export const ConsultationCta: React.FC = () => {
  const t = useTranslations('contact');
  const tCommon = useTranslations('common');
  const locale = useLocale() as Locale;

  return (
    <section id="consultation" className="py-16 sm:py-24 bg-[#06080d] border-t border-zinc-900 relative overflow-hidden">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Direct Channels & Information (6 cols) */}
          <div data-aos="fade-right" className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {t('title')}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-lg">
                {t('subtitle')}
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-2">
              {/* Phone */}
              <a
                href={`tel:${siteConfig.phoneClean}`}
                className="p-4 rounded-none bg-zinc-950/80 border border-zinc-800/80 hover:border-red-600/40 flex items-center gap-4 group transition-all"
              >
                <Phone className="w-6 h-6 text-red-500 shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-[11px] text-zinc-400 font-semibold uppercase tracking-wider">
                    {tCommon('callByPhone')}
                  </p>
                  <p className="text-base sm:text-lg font-black text-white group-hover:text-red-500 transition-colors mt-0.5">
                    {siteConfig.phone}
                  </p>
                </div>
              </a>

              {/* Telegram */}
              <a
                href={siteConfig.social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-none bg-zinc-950/80 border border-zinc-800/80 hover:border-sky-500/40 flex items-center gap-4 group transition-all"
              >
                <Image
                  src="/telegram.webp"
                  alt="Telegram"
                  width={26}
                  height={26}
                  className="shrink-0 group-hover:scale-110 transition-transform"
                />
                <div>
                  <p className="text-[11px] text-zinc-400 font-semibold uppercase tracking-wider">
                    {t('telegram')}
                  </p>
                  <p className="text-base sm:text-lg font-black text-white group-hover:text-sky-400 transition-colors mt-0.5">
                    @miralisherhimoya
                  </p>
                </div>
              </a>

              {/* Address */}
              <div className="p-4 rounded-none bg-zinc-950/80 border border-zinc-800/80 flex items-start gap-4">
                <MapPin className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] text-zinc-400 font-semibold uppercase tracking-wider">
                    {tCommon('officeAddress')}
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-300 mt-0.5 leading-relaxed">
                    {siteConfig.address[locale]}
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-center gap-2.5 px-4 text-xs text-zinc-400">
                <Clock className="w-4 h-4 text-zinc-500" />
                <span>{siteConfig.workingHours[locale]}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Form Container (6 cols) */}
          <div data-aos="fade-left" className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-none bg-zinc-950/90 border border-zinc-800/80 shadow-2xl space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  {tCommon('requestLegalHelp')}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  {tCommon('requestLegalHelpDesc')}
                </p>
              </div>

              <ContactForm />
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};
