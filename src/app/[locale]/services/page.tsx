import React from 'react';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { PageHeader } from '@/components/common/PageHeader';
import { ServiceCard } from '@/components/common/ServiceCard';
import { ConsultationBanner } from '@/components/common/ConsultationBanner';
import { FaqSection } from '@/components/home/FaqSection';
import { mockServices } from '@/data/mockData';
import {
  FileSearch,
  Compass,
  Gavel,
  Trophy,
} from 'lucide-react';

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ServicesPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  return {
    title: `${t('services')} — AGZAMOV LEGAL GROUP`,
    description:
      'Korporativ huquq, sud nizolari, jinoiy himoya, soliq auditi va intellektual mulk bo‘yicha professional yuridik xizmatlar.',
  };
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tServices = await getTranslations({ locale, namespace: 'servicesPage' });

  const workflowSteps = [
    {
      step: '01',
      title: tServices('workflow.step1.title'),
      desc: tServices('workflow.step1.desc'),
      icon: <FileSearch className="w-6 h-6 text-red-600" />,
    },
    {
      step: '02',
      title: tServices('workflow.step2.title'),
      desc: tServices('workflow.step2.desc'),
      icon: <Compass className="w-6 h-6 text-red-600" />,
    },
    {
      step: '03',
      title: tServices('workflow.step3.title'),
      desc: tServices('workflow.step3.desc'),
      icon: <Gavel className="w-6 h-6 text-red-600" />,
    },
    {
      step: '04',
      title: tServices('workflow.step4.title'),
      desc: tServices('workflow.step4.desc'),
      icon: <Trophy className="w-6 h-6 text-red-600" />,
    },
  ];

  return (
    <div className="pb-20 bg-black min-h-screen">
      {/* 1. Page Header with Thematic Background (Clean: No Badge, No Subtitle) */}
      <PageHeader
        title={tServices('title')}
        bgImage="/headers/header-services.jpg"
        breadcrumbs={[
          { label: tNav('home'), href: '/' },
          { label: tNav('services') },
        ]}
      />

      {/* 2. Services Grid (Reusable Main Page ServiceCards) */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {mockServices.map((service, idx) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={idx}
                dataAos="fade-up"
                dataAosDelay={idx * 80}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* 3. 4-Step Process Section (Sharp Rectangular Quiet Luxury) */}
      <section className="py-20 bg-[#080a0f] border-y border-zinc-900">
        <Container className="space-y-16">
          <SectionHeading
            tag={tServices('workflowTag')}
            title={tServices('workflowTitle')}
            subtitle={tServices('workflowSubtitle')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step) => (
              <div
                key={step.step}
                className="p-6 sm:p-7 space-y-4 relative rounded-none bg-[#0c0d14] border border-zinc-800/80 hover:border-red-600/60 shadow-lg transition-all"
              >
                <span className="text-3xl font-black text-red-600/40 font-mono">
                  {step.step}
                </span>
                <div className="h-10 w-10 rounded-none bg-red-600/10 border border-red-600/30 flex items-center justify-center">
                  {step.icon}
                </div>
                <h3 className="text-base font-bold text-white">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Consultation Banner (Red Grid, matching Team Page) */}
      <ConsultationBanner />

      {/* 5. FAQ Section */}
      <FaqSection />
    </div>
  );
}
