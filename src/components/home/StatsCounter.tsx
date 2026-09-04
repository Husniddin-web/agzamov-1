import React from 'react';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site';
import { Award, Briefcase, Users, CheckCircle2 } from 'lucide-react';

export const StatsCounter: React.FC = () => {
  const t = useTranslations('stats');

  const stats = [
    {
      value: `${siteConfig.stats.experienceYears}+`,
      label: t('experience'),
      icon: <Award className="w-5 h-5 text-red-600" />,
    },
    {
      value: `${siteConfig.stats.successfulCases}+`,
      label: t('cases'),
      icon: <Briefcase className="w-5 h-5 text-red-600" />,
    },
    {
      value: `${siteConfig.stats.corporatePartners}+`,
      label: t('partners'),
      icon: <Users className="w-5 h-5 text-red-600" />,
    },
    {
      value: `${siteConfig.stats.winRatePercent}%`,
      label: t('winRate'),
      icon: <CheckCircle2 className="w-5 h-5 text-red-600" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="relative p-5 sm:p-6 rounded-2xl bg-black/45 backdrop-blur-xl border border-white/10 hover:border-red-600/40 shadow-xl transition-all duration-300 group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="p-2 rounded-xl bg-red-600/15 border border-red-600/30 group-hover:scale-110 transition-transform">
              {stat.icon}
            </span>
            <span className="text-xs text-zinc-400 font-mono">0{idx + 1}</span>
          </div>
          <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white group-hover:text-red-500 transition-colors">
            {stat.value}
          </div>
          <p className="mt-2 text-xs sm:text-sm text-zinc-300 font-medium leading-snug">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};
