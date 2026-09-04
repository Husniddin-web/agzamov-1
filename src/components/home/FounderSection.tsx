import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Container } from '../common/Container';
import { GlowBadge } from '../common/GlowBadge';
import { Button } from '../common/Button';
import { Quote, Award, CheckCircle, ArrowRight } from 'lucide-react';

export const FounderSection: React.FC = () => {
  const t = useTranslations('founder');

  return (
    <section className="py-24 bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-red-700/10 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Founder Photo & Credentials (5 cols) */}
          <div data-aos="fade-right" className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              {/* Outer decorative ring */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-red-600/30 via-transparent to-red-600/10 blur-lg -z-10" />

              <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
                <div className="relative h-[480px] w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1000&q=80"
                    alt="Bobur Agzamov - Managing Partner"
                    fill
                    className="object-cover object-top filter grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </div>

                {/* Floating Experience Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/85 border border-red-600/40 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-red-600/20 text-red-500">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">
                        {t('name')}
                      </p>
                      <p className="text-xs text-red-500">
                        {t('experience')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Philosophy, Quote & Signature (7 cols) */}
          <div data-aos="fade-left" className="lg:col-span-7 space-y-8 text-left">
            <GlowBadge icon>{t('tag')}</GlowBadge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {t('title')}
            </h2>

            {/* Quote block */}
            <div className="relative p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border-l-4 border-l-red-600 border border-zinc-800/80 space-y-4">
              <Quote className="w-10 h-10 text-red-600/40" />
              <blockquote className="text-lg sm:text-xl italic font-light text-zinc-200 leading-relaxed">
                {t('quote')}
              </blockquote>
              <div className="pt-2">
                <p className="text-base font-bold text-white">
                  {t('name')}
                </p>
                <p className="text-xs font-semibold text-red-500 uppercase tracking-wider">
                  {t('role')}
                </p>
              </div>
            </div>

            {/* Core Values checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <CheckCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>Har bir ishga individual strategiya</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <CheckCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>100% Advokatlik siri kafolati</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <CheckCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>Oliy sudgacha bo&apos;lgan to&apos;liq vakillik</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <CheckCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>Natijaga qaratilgan murosasiz himoya</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Button href="/about" variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                Biz haqimizda batafsil
              </Button>
              <Button href="/team" variant="outline">
                Jamoa a&apos;zolari bilan tanishish
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
