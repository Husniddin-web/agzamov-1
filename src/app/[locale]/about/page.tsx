import React from 'react';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Container } from '@/components/common/Container';
import { PageHeader } from '@/components/common/PageHeader';
import { ConsultationBanner } from '@/components/common/ConsultationBanner';
import { LicensesSection } from '@/components/home/LicensesSection';
import { PartnersMarquee } from '@/components/home/PartnersMarquee';
import { FaqSection } from '@/components/home/FaqSection';
import { Locale } from '@/types';
import {
  ShieldCheck,
  Scale,
  Target,
  HeartHandshake,
  ArrowRight,
  Award,
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

  const currentLocale = locale as Locale;
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const t = await getTranslations({ locale, namespace: 'aboutPage' });

  const values = [
    {
      title: t('values.professionalism.title'),
      desc: t('values.professionalism.desc'),
      icon: <Scale className="w-5 h-5 text-red-500 shrink-0" />,
    },
    {
      title: t('values.confidentiality.title'),
      desc: t('values.confidentiality.desc'),
      icon: <ShieldCheck className="w-5 h-5 text-red-500 shrink-0" />,
    },
    {
      title: t('values.strategy.title'),
      desc: t('values.strategy.desc'),
      icon: <Target className="w-5 h-5 text-red-500 shrink-0" />,
    },
    {
      title: t('values.integrity.title'),
      desc: t('values.integrity.desc'),
      icon: <HeartHandshake className="w-5 h-5 text-red-500 shrink-0" />,
    },
  ];

  const videoText = {
    title:
      currentLocale === 'uz'
        ? 'AGZAMOV LEGAL GROUP — Faoliyatimiz va Ish Jarayoni'
        : currentLocale === 'ru'
        ? 'AGZAMOV LEGAL GROUP — Наша деятельность и практика'
        : 'AGZAMOV LEGAL GROUP — Practice & Courtroom Advocacy',
    subtitle:
      currentLocale === 'uz'
        ? 'Biznesingiz va shaxsiy manfaatlaringizni himoya qilish tizimimiz hamda yuridik amaliyotimiz haqida qisqa lavha.'
        : currentLocale === 'ru'
        ? 'Краткий видеоматериал о принципах работы, судебном опыте и комплексной защите интересов клиентов.'
        : 'A concise video presentation covering our strategic principles and judicial defense methodology.',
  };

  return (
    <div className="pb-20 bg-black min-h-screen">
      {/* 1. Page Header with Thematic Background (Minimalist: No Badge, No Subtitle) */}
      <PageHeader
        title={`${t('titlePrefix')} ${t('titleHighlight')}`}
        bgImage="/headers/header-about.jpg"
        breadcrumbs={[
          { label: tNav('home'), href: '/' },
          { label: tNav('about') },
        ]}
      />

      {/* 2. YouTube Video Presentation Section (FIRST under PageHeader - No Badge) */}
      <section className="py-20 sm:py-24 bg-black border-b border-zinc-900">
        <Container className="space-y-8 sm:space-y-10">
          {/* Centered Heading (Clean: No Badge) */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {videoText.title}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              {videoText.subtitle}
            </p>
          </div>

          {/* YouTube Video Frame (16:9 Aspect Ratio, Sharp Rectangular Border) */}
          <div className="relative aspect-video w-full max-w-5xl mx-auto rounded-none border border-zinc-800 hover:border-red-600/50 shadow-2xl bg-black overflow-hidden group transition-all">
            <iframe
              src="https://www.youtube.com/embed/UvOZS9YTlR4"
              title="AGZAMOV LEGAL GROUP"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        </Container>
      </section>

      {/* 3. Alternating Story Sections (Clean: No Red Badges, Minimalist 50/50 Split) */}
      <div className="py-20 sm:py-28 space-y-24 sm:space-y-32">
        {/* BLOCK 1: Left Photo, Right Text (History & Mission) */}
        <section>
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Left Column: Image with Sharp Rectangular Frame */}
              <div className="lg:col-span-6 relative">
                <div className="relative h-[380px] sm:h-[480px] w-full rounded-none overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl group">
                  <Image
                    src="/hero-corporate.jpg"
                    alt="Agzamov Legal Group Headquarters"
                    fill
                    className="object-cover object-center filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 600px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Floating Metric Badge (Sharp Rectangular) */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 sm:p-5 rounded-none bg-black/90 border border-zinc-800 backdrop-blur-md flex items-center justify-between">
                    <div>
                      <p className="text-2xl sm:text-3xl font-black text-red-500 font-mono">12+ Yil</p>
                      <p className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider mt-0.5">
                        {t('experienceDesc')}
                      </p>
                    </div>
                    <Award className="w-8 h-8 text-red-500/70" />
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative & Stats (No Red Tag Badge) */}
              <div className="lg:col-span-6 space-y-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                  {t('historyTitle')}
                </h2>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                  {t('historyP1')}
                </p>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                  {t('historyP2')}
                </p>

                {/* Minimalist Stat Blocks (Sharp Rectangular) */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 sm:p-5 rounded-none bg-[#0c0d14] border border-zinc-800/80 hover:border-red-600/50 transition-colors">
                    <p className="text-2xl sm:text-3xl font-black text-white font-mono">{t('casesCount')}</p>
                    <p className="text-xs text-zinc-400 font-medium mt-1">{t('casesLabel')}</p>
                  </div>
                  <div className="p-4 sm:p-5 rounded-none bg-[#0c0d14] border border-zinc-800/80 hover:border-red-600/50 transition-colors">
                    <p className="text-2xl sm:text-3xl font-black text-red-500 font-mono">{t('winRate')}</p>
                    <p className="text-xs text-zinc-400 font-medium mt-1">{t('winRateLabel')}</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* BLOCK 2: Left Text, Right Photo (Managing Partner & Philosophy) */}
        <section className="py-8">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Left Column: Leadership Statement (No Red Tag Badge) */}
              <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                  {t('founderQuote')}
                </h2>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                  {t('founderDesc')}
                </p>

                {/* Author Signature Line */}
                <div className="pt-2 border-l-2 border-red-600 pl-4 space-y-1">
                  <p className="text-base font-bold text-white tracking-wide">
                    Agzamov Bobur Dilshodovich
                  </p>
                  <p className="text-xs text-zinc-400 font-medium">
                    {currentLocale === 'uz'
                      ? 'Boshqaruvchi hamkor, Oliy toifali advokat'
                      : currentLocale === 'ru'
                      ? 'Управляющий партнер, адвокат высшей категории'
                      : 'Managing Partner, Senior Attorney'}
                  </p>
                </div>

                {/* Action CTA Buttons (Sharp Rectangular) */}
                <div className="pt-2 flex flex-wrap items-center gap-3.5">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-none bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    <span>{t('contactLawyer')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/team"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-none border border-zinc-800 hover:border-red-600 bg-zinc-900/60 hover:bg-red-600/10 text-zinc-200 hover:text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <span>{t('ourTeamMembers')}</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Courtroom / Practice Visual */}
              <div className="lg:col-span-6 relative order-1 lg:order-2">
                <div className="relative h-[380px] sm:h-[480px] w-full rounded-none overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl group">
                  <Image
                    src="/hero-court.jpg"
                    alt="Supreme Court Advocacy"
                    fill
                    className="object-cover object-center filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 600px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* BLOCK 3: Left Photo, Right Text (Values & Strategy) */}
        <section>
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Left Column: Defense & Legal Mastery Image */}
              <div className="lg:col-span-6 relative">
                <div className="relative h-[380px] sm:h-[480px] w-full rounded-none overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl group">
                  <Image
                    src="/hero-defense.jpg"
                    alt="Uncompromising Strategic Defense"
                    fill
                    className="object-cover object-center filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 600px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
              </div>

              {/* Right Column: 4 Core Values (No Red Tag Badge) */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2.5">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                    {t('valuesTitle')}
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {t('valuesSubtitle')}
                  </p>
                </div>

                {/* 4 Clean Value Items (Sharp Rectangular) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  {values.map((val, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-none bg-[#0c0d14] border border-zinc-800/80 hover:border-red-600/50 space-y-2 transition-colors shadow-md"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-none bg-red-600/10 border border-red-600/30 flex items-center justify-center">
                          {val.icon}
                        </div>
                        <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                          {val.title}
                        </h3>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                        {val.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>
      </div>

      {/* 4. Licenses Section */}
      <LicensesSection />

      {/* 5. Partners Marquee (Main Page Section - High Credibility) */}
      <PartnersMarquee />

      {/* 6. Consultation Banner (Red Grid, matching Team & Services) */}
      <ConsultationBanner />

      {/* 7. FAQ Section (Main Page Section) */}
      <FaqSection />
    </div>
  );
}
