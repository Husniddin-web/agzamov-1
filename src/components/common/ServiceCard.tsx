'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { LegalServiceItem, Locale } from '@/types';
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

export interface ServiceCardProps {
  service: LegalServiceItem;
  index: number;
  className?: string;
  dataAos?: string;
  dataAosDelay?: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  index,
  className = '',
  dataAos,
  dataAosDelay,
}) => {
  const locale = useLocale() as Locale;
  const t = useTranslations('services');
  const tServicesPage = useTranslations('servicesPage');

  return (
    <Link
      href={`/services/${service.slug}`}
      data-aos={dataAos}
      data-aos-delay={dataAosDelay}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-none border border-zinc-800/80 hover:border-red-600/60 bg-gradient-to-b from-[#0d1017] to-[#07090e] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer p-6 sm:p-8 ${className}`}
    >
      {/* Top subtle razor line that illuminates red on hover */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-red-600/0 to-transparent group-hover:via-red-600 transition-all duration-500" />

      {/* Ambient subtle light sheen */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-600/[0.03] rounded-none blur-3xl group-hover:bg-red-600/[0.08] transition-all duration-500 pointer-events-none" />

      <div>
        {/* TOP ROW: Editorial Index + Icon + Metric Box (Sharp Rectangular) */}
        <div className="flex items-center justify-between gap-4 mb-7">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-none bg-zinc-900/90 border border-zinc-800 group-hover:border-red-600/40 flex items-center justify-center transition-colors duration-300">
              {iconMap[service.iconName] || <Scale className="w-6 h-6 text-red-500" />}
            </div>
            <span className="text-xs font-mono font-bold text-zinc-600 tracking-wider">
              0{index + 1}
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-none bg-zinc-900/60 border border-zinc-800/80 text-[11px] font-mono font-medium text-zinc-400 group-hover:text-zinc-200 group-hover:border-zinc-700 transition-colors">
            <span className="w-1.5 h-1.5 rounded-none bg-red-500" />
            <span>
              {service.casesCount}+ {tServicesPage('casesSuffix')}
            </span>
          </div>
        </div>

        {/* TITLE & ESSENTIAL INFO */}
        <div className="space-y-3.5">
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug group-hover:text-red-500 transition-colors">
            {service.title[locale]}
          </h3>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3 font-normal">
            {service.shortDesc[locale]}
          </p>

          {/* Key features checklist (Top 2 advantages) */}
          {service.features[locale] && service.features[locale].length > 0 && (
            <ul className="space-y-2.5 pt-4 border-t border-zinc-800/80">
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

      {/* BOTTOM ACTION ROW: Unified clean luxury interaction (Sharp Square Arrow Box) */}
      <div className="pt-5 mt-6 border-t border-zinc-800/80 flex items-center justify-between">
        <span className="text-xs font-semibold text-zinc-400 group-hover:text-white uppercase tracking-wider transition-colors">
          {t('learnMore')}
        </span>

        <div
          className="w-9 h-9 rounded-none border border-zinc-800 bg-zinc-900/80 text-zinc-400 group-hover:border-red-600 group-hover:bg-red-600 group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 shadow-sm"
          aria-hidden="true"
        >
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
};
