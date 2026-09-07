'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Container } from './Container';
import { siteConfig } from '@/config/site';
import { MessageSquare, Phone } from 'lucide-react';

interface ConsultationBannerProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export const ConsultationBanner: React.FC<ConsultationBannerProps> = ({
  title,
  subtitle,
  className = '',
}) => {
  const currentLocale = useLocale();

  const defaultTitle =
    currentLocale === 'uz'
      ? 'Loyihangiz va Biznesingiz Uchun Konsultatsiya Oling'
      : currentLocale === 'ru'
      ? 'Получите консультацию для вашего проекта'
      : 'Get a Consultation for Your Project';

  const defaultSubtitle =
    currentLocale === 'uz'
      ? 'Mutaxassislarimiz sizga eng maqbul va qonuniy yechimni tanlashda yordam beradi. Bepul konsultatsiya uchun biz bilan bog‘laning!'
      : currentLocale === 'ru'
      ? 'Наши специалисты помогут вам выбрать оптимальное решение. Свяжитесь с нами для бесплатной консультации!'
      : 'Our legal experts will help you choose the optimal solution. Contact us for a free legal consultation!';

  return (
    <section
      className={`relative py-20 sm:py-28 bg-[#08090d] border-t border-zinc-900 overflow-hidden text-center ${className}`}
    >
      {/* Subtle Red Grid Pattern (Kataklar qizil, ko'zni og'ritmaydigan) */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(220, 38, 38, 0.20) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(220, 38, 38, 0.20) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 90% 75% at 50% 50%, black 30%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 75% at 50% 50%, black 30%, transparent 95%)',
        }}
      />

      {/* Ambient Red Depth Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[350px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none z-0" />

      <Container className="relative z-10 max-w-4xl mx-auto space-y-6 sm:space-y-7">
        {/* Main Title */}
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
          {title || defaultTitle}
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm md:text-base text-zinc-300 font-medium max-w-2xl mx-auto leading-relaxed">
          {subtitle || defaultSubtitle}
        </p>

        {/* Action Buttons: Ariza Qoldirish + 1 Phone Number (Sharp Rectangular) */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md sm:max-w-none mx-auto">
          {/* White Button: Ariza Qoldirish */}
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 min-h-[46px] rounded-none bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-xs sm:text-sm tracking-wide shadow-xl shadow-black/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-center"
          >
            <MessageSquare className="w-4 h-4 text-zinc-950" />
            <span>
              {currentLocale === 'uz'
                ? 'Ariza qoldirish'
                : currentLocale === 'ru'
                ? 'Оставить заявку'
                : 'Submit Request'}
            </span>
          </Link>

          {/* Outlined Phone */}
          <a
            href={`tel:${siteConfig.phoneClean}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 min-h-[46px] rounded-none border border-white/25 hover:border-red-600 bg-black/40 hover:bg-red-600/10 text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md cursor-pointer text-center"
          >
            <Phone className="w-4 h-4 text-red-500" />
            <span>{siteConfig.phone}</span>
          </a>
        </div>
      </Container>
    </section>
  );
};
