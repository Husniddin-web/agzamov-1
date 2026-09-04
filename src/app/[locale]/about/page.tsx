import React from 'react';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Container } from '@/components/common/Container';
import { GlowBadge } from '@/components/common/GlowBadge';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Button } from '@/components/common/Button';
import {
  ShieldCheck,
  Scale,
  Target,
  HeartHandshake,
  ArrowRight,
} from 'lucide-react';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tAbout = await getTranslations({ locale, namespace: 'aboutPage' });
  return {
    title: `${tNav('about')} — AGZAMOV LEGAL GROUP`,
    description: tAbout('description'),
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'aboutPage' });

  const values = [
    {
      title: t('values.professionalism.title'),
      desc: t('values.professionalism.desc'),
      icon: <Scale className="w-6 h-6 text-red-600" />,
    },
    {
      title: t('values.confidentiality.title'),
      desc: t('values.confidentiality.desc'),
      icon: <ShieldCheck className="w-6 h-6 text-red-600" />,
    },
    {
      title: t('values.strategy.title'),
      desc: t('values.strategy.desc'),
      icon: <Target className="w-6 h-6 text-red-600" />,
    },
    {
      title: t('values.integrity.title'),
      desc: t('values.integrity.desc'),
      icon: <HeartHandshake className="w-6 h-6 text-red-600" />,
    },
  ];

  return (
    <div className="pt-28 pb-20 bg-black min-h-screen">
      {/* Hero Banner for About */}
      <section className="relative py-16 border-b border-zinc-900 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-700/10 blur-[150px] pointer-events-none" />

        <Container className="relative z-10 text-center space-y-5">
          <GlowBadge icon>{t('badge')}</GlowBadge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            {t('titlePrefix')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-rose-600 text-glow">
              {t('titleHighlight')}
            </span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </Container>
      </section>

      {/* Main Story & Inception */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Column (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
                <div className="relative h-[480px] w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80"
                    alt="Agzamov Legal Group Office"
                    fill
                    className="object-cover filter contrast-105"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-black/90 border border-red-600/40 backdrop-blur-md">
                  <p className="text-3xl font-black text-red-600">{t('experienceBadge')}</p>
                  <p className="text-xs text-zinc-300 font-medium mt-1">
                    {t('experienceDesc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Story Text Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <SectionHeading
                tag={t('historyTag')}
                title={t('historyTitle')}
                centered={false}
              />

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {t('historyP1')}
              </p>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {t('historyP2')}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-3">
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <p className="text-2xl font-black text-white">{t('casesCount')}</p>
                  <p className="text-xs text-zinc-400 mt-1">{t('casesLabel')}</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <p className="text-2xl font-black text-red-600">{t('winRate')}</p>
                  <p className="text-xs text-zinc-400 mt-1">{t('winRateLabel')}</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Values Bento */}
      <section className="py-20 bg-zinc-950/70 border-y border-zinc-900">
        <Container className="space-y-16">
          <SectionHeading
            tag={t('valuesTag')}
            title={t('valuesTitle')}
            subtitle={t('valuesSubtitle')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => (
              <div key={idx} className="bento-card p-8 group flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-xl bg-red-600/10 border border-red-600/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-red-600/20 transition-all">
                    {v.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-red-500 transition-colors">
                    {v.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-zinc-800/80">
                  <span className="text-xs font-mono text-zinc-600">0{idx + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Founder Callout */}
      <section className="py-20">
        <Container>
          <div className="bento-card p-8 sm:p-12 border-red-600/40 relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-6">
              <GlowBadge icon>{t('founderTag')}</GlowBadge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {t('founderQuote')}
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {t('founderDesc')}
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Button href="/contact" variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                  {t('contactLawyer')}
                </Button>
                <Button href="/team" variant="outline">
                  {t('ourTeamMembers')}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
