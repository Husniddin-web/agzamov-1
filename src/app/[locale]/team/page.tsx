import React from 'react';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Container } from '@/components/common/Container';
import { PageHeader } from '@/components/common/PageHeader';
import { ConsultationBanner } from '@/components/common/ConsultationBanner';
import { FaqSection } from '@/components/home/FaqSection';
import { mockWorkers } from '@/data/mockData';
import { Locale } from '@/types';

interface TeamPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: TeamPageProps) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tTeam = await getTranslations({ locale, namespace: 'teamPage' });
  return {
    title: `${tNav('team')} — AGZAMOV LEGAL GROUP`,
    description: tTeam('subtitle'),
  };
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tTeam = await getTranslations({ locale, namespace: 'teamPage' });
  const currentLocale = locale as Locale;

  return (
    <div className="bg-black min-h-screen">
      {/* 1. Page Header (Clean: No Badge, No Description) */}
      <PageHeader
        title={tTeam('title')}
        bgImage="/headers/header-team.jpg"
        breadcrumbs={[
          { label: tNav('home'), href: '/' },
          { label: tNav('team') },
        ]}
      />

      {/* 2. Team Cards Grid (Sharp Rectangular Cards: Photo + Centered Name & Position) */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {mockWorkers.map((worker) => (
              <div
                key={worker.id}
                className="group flex flex-col rounded-none bg-[#0a0b0f] border border-zinc-800/80 hover:border-red-600/60 shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Lawyer Photo - Sharp Rectangular */}
                <div className="relative h-80 sm:h-96 w-full rounded-none overflow-hidden bg-zinc-900">
                  <Image
                    src={worker.image}
                    alt={worker.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 filter grayscale contrast-105 group-hover:grayscale-0 transition-all duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                  />
                  {/* Soft bottom vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0f] via-transparent to-transparent opacity-85 group-hover:opacity-40 transition-opacity" />
                </div>

                {/* Centered Name & Position */}
                <div className="p-5 text-center space-y-1.5 border-t border-zinc-900/80 bg-[#0a0b0f]">
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-red-500 transition-colors tracking-tight leading-snug">
                    {worker.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-medium">
                    {worker.position[currentLocale]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Red Grid Consultation Section (Single Unified Eye-Friendly Banner) */}
      <ConsultationBanner />

      {/* 4. FAQ Section */}
      <FaqSection />
    </div>
  );
}
