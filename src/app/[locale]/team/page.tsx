import React from 'react';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Container } from '@/components/common/Container';
import { GlowBadge } from '@/components/common/GlowBadge';
import { Button } from '@/components/common/Button';
import { mockWorkers } from '@/data/mockData';
import { Locale } from '@/types';
import { Mail, Phone, ShieldCheck, ArrowRight } from 'lucide-react';

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
  const tTeam = await getTranslations({ locale, namespace: 'teamPage' });
  const currentLocale = locale as Locale;

  return (
    <div className="pt-28 pb-20 bg-black min-h-screen">
      {/* Banner */}
      <section className="py-16 border-b border-zinc-900 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-700/10 blur-[150px] pointer-events-none" />

        <Container className="relative z-10 text-center space-y-5">
          <GlowBadge icon>{tTeam('badge')}</GlowBadge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            {tTeam('title')}
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            {tTeam('subtitle')}
          </p>
        </Container>
      </section>

      {/* Team Profiles Grid */}
      <section className="py-20">
        <Container className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mockWorkers.map((worker) => (
              <div
                key={worker.id}
                className="bento-card p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start group"
              >
                {/* Photo Column */}
                <div className="relative h-64 sm:h-72 w-full sm:w-52 shrink-0 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
                  <Image
                    src={worker.image}
                    alt={worker.name}
                    fill
                    className="object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    sizes="(max-width: 640px) 100vw, 250px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="px-2.5 py-1 rounded-full bg-black/80 border border-red-600/40 text-[10px] font-bold text-red-500 uppercase tracking-wider backdrop-blur-md">
                      {worker.experience[currentLocale]}
                    </span>
                  </div>
                </div>

                {/* Details Column */}
                <div className="flex-1 space-y-4 flex flex-col justify-between h-full">
                  <div className="space-y-2">
                    <h2 className="text-xl font-extrabold text-white group-hover:text-red-500 transition-colors">
                      {worker.name}
                    </h2>
                    <p className="text-xs font-semibold text-red-500">
                      {worker.position[currentLocale]}
                    </p>
                    {worker.specialization && (
                      <p className="text-xs text-zinc-400 font-mono">
                        {tTeam('specialization')}: {worker.specialization[currentLocale]}
                      </p>
                    )}
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-2">
                      {worker.bio[currentLocale]}
                    </p>
                  </div>

                  {/* Contacts & Direct Action */}
                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {worker.phone && (
                        <a
                          href={`tel:${worker.phone}`}
                          className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-red-600/50 hover:bg-red-600/10 transition-colors"
                          title={worker.phone}
                        >
                          <Phone className="w-4 h-4 text-red-600" />
                        </a>
                      )}
                      {worker.email && (
                        <a
                          href={`mailto:${worker.email}`}
                          className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-red-600/50 hover:bg-red-600/10 transition-colors"
                          title={worker.email}
                        >
                          <Mail className="w-4 h-4 text-red-600" />
                        </a>
                      )}
                    </div>

                    <Button href="/contact" size="sm" variant="outline">
                      {tTeam('bookAppointment')}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Careers Callout */}
      <section className="py-20 bg-zinc-950/60 border-t border-zinc-900">
        <Container>
          <div className="bento-card p-8 sm:p-12 border-red-600/40 text-center max-w-4xl mx-auto space-y-6">
            <ShieldCheck className="w-12 h-12 text-red-600 mx-auto" />
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {tTeam('joinUsTitle')}
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl mx-auto">
              {tTeam('joinUsDesc')}
            </p>
            <Button
              href="mailto:hr@agzamovlegal.uz"
              size="md"
              variant="primary"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {tTeam('sendResume')}
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
