import React from 'react';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Container } from '@/components/common/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { GlowBadge } from '@/components/common/GlowBadge';
import { Button } from '@/components/common/Button';
import { mockServices } from '@/data/mockData';
import { Locale } from '@/types';
import { Link } from '@/i18n/routing';
import {
  Building2,
  Scale,
  ShieldAlert,
  Coins,
  Lightbulb,
  Landmark,
  ArrowRight,
  CheckCircle2,
  FileSearch,
  Compass,
  Gavel,
  Trophy,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-6 h-6 text-red-600" />,
  Scale: <Scale className="w-6 h-6 text-red-600" />,
  ShieldAlert: <ShieldAlert className="w-6 h-6 text-red-600" />,
  Coins: <Coins className="w-6 h-6 text-red-600" />,
  Lightbulb: <Lightbulb className="w-6 h-6 text-red-600" />,
  Landmark: <Landmark className="w-6 h-6 text-red-600" />,
};

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
  const tCommon = await getTranslations({ locale, namespace: 'common' });
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
    <div className="pt-28 pb-20 bg-black min-h-screen">
      {/* Banner */}
      <section className="py-16 border-b border-zinc-900 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-700/10 blur-[150px] pointer-events-none" />

        <Container className="relative z-10 text-center space-y-5">
          <GlowBadge icon>{tServices('badge')}</GlowBadge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            {tServices('title')}
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            {tServices('subtitle')}
          </p>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <Container className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockServices.map((service, idx) => (
              <div
                key={service.id}
                className="bento-card p-8 flex flex-col justify-between group"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-xl bg-red-600/10 border border-red-600/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-red-600/20 transition-all">
                      {iconMap[service.iconName]}
                    </div>
                    <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
                      {service.casesCount}+ {tServices('casesSuffix')}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors">
                    {service.title[locale as Locale]}
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {service.shortDesc[locale as Locale]}
                  </p>

                  {/* All Features */}
                  <ul className="space-y-2.5 pt-3 border-t border-zinc-800/80">
                    {service.features[locale as Locale].map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-800 flex items-center justify-between">
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-xs font-bold text-red-500 hover:text-red-400 flex items-center gap-1.5 uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                  >
                    <span>{tCommon('learnMore')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-xs font-mono text-zinc-600">0{idx + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4-Step Process Section */}
      <section className="py-20 bg-zinc-950/60 border-y border-zinc-900">
        <Container className="space-y-16">
          <SectionHeading
            tag={tServices('workflowTag')}
            title={tServices('workflowTitle')}
            subtitle={tServices('workflowSubtitle')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step) => (
              <div key={step.step} className="bento-card p-6 sm:p-7 space-y-4 relative">
                <span className="text-3xl font-black text-red-600/40 font-mono">
                  {step.step}
                </span>
                <div className="h-10 w-10 rounded-lg bg-red-600/10 flex items-center justify-center">
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

      {/* Consultation Banner */}
      <section className="py-20">
        <Container>
          <div className="bento-card p-8 sm:p-12 border-red-600/40 text-center max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {tServices('ctaTitle')}
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl mx-auto">
              {tServices('ctaDesc')}
            </p>
            <Button href="/contact" size="lg" variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
              {tServices('ctaButton')}
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
