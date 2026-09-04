import React from 'react';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Container } from '@/components/common/Container';
import { ContactForm } from '@/components/forms/ContactForm';
import { siteConfig } from '@/config/site';
import { Locale } from '@/types';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building,
} from 'lucide-react';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactPageProps) {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tContact = await getTranslations({ locale, namespace: 'contactPage' });
  return {
    title: `${tNav('contact')} — AGZAMOV LEGAL GROUP`,
    description: tContact('subtitle'),
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tContact = await getTranslations({ locale, namespace: 'contactPage' });
  const currentLocale = locale as Locale;

  return (
    <div className="pt-28 pb-20 bg-black min-h-screen text-zinc-300">
      {/* 1. Header Banner */}
      <section className="py-16 border-b border-zinc-900 relative overflow-hidden">
        <Container className="relative z-10 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            {tContact('title')}
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {tContact('subtitle')}
          </p>
        </Container>
      </section>

      {/* 2. Main Form & Contact Channels Grid */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Column: Direct Info & Addresses (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* 24/7 Hotline Card */}
              <div className="p-6 rounded-none bg-zinc-950 border border-zinc-800 space-y-2">
                <span className="text-[11px] font-bold text-red-500 uppercase tracking-wider block">
                  {tContact('emergencyBadge')}
                </span>
                <p className="text-xs text-zinc-400">
                  {tContact('emergencyDesc')}
                </p>
                <a
                  href={`tel:${siteConfig.emergencyPhoneClean}`}
                  className="block text-xl sm:text-2xl font-black text-white hover:text-red-500 transition-colors mt-1"
                >
                  {siteConfig.emergencyPhone}
                </a>
              </div>

              {/* Office Details */}
              <div className="p-6 rounded-none bg-zinc-950 border border-zinc-800 space-y-5">
                <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-zinc-800/80 pb-3">
                  <Building className="w-5 h-5 text-red-600" />
                  <span>{tContact('officeTitle')}</span>
                </h2>

                <ul className="space-y-4 text-xs sm:text-sm text-zinc-300">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] text-zinc-500 font-semibold uppercase">{tContact('addressLabel')}</p>
                      <p className="mt-0.5 leading-relaxed">{siteConfig.address[currentLocale]}</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] text-zinc-500 font-semibold uppercase">{tContact('phonesLabel')}</p>
                      <p className="mt-0.5">
                        <a href={`tel:${siteConfig.phoneClean}`} className="hover:text-red-500 transition-colors font-semibold">
                          {siteConfig.phone}
                        </a>
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] text-zinc-500 font-semibold uppercase">{tContact('emailLabel')}</p>
                      <p className="mt-0.5">
                        <a href={`mailto:${siteConfig.email}`} className="hover:text-red-500 transition-colors">
                          {siteConfig.email}
                        </a>
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] text-zinc-500 font-semibold uppercase">{tContact('workingHoursLabel')}</p>
                      <p className="mt-0.5">{siteConfig.workingHours[currentLocale]}</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Social Channels */}
              <div className="flex items-center gap-4 pt-2">
                <a
                  href={siteConfig.social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-bold text-zinc-300 hover:text-sky-400 transition-colors"
                >
                  <Image src="/telegram.webp" alt="Telegram" width={24} height={24} />
                  <span>Telegram</span>
                </a>

                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-bold text-zinc-300 hover:text-pink-400 transition-colors"
                >
                  <Image src="/instagram.webp" alt="Instagram" width={24} height={24} />
                  <span>Instagram</span>
                </a>

                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-bold text-zinc-300 hover:text-blue-400 transition-colors"
                >
                  <Image src="/facebook.webp" alt="Facebook" width={24} height={24} />
                  <span>Facebook</span>
                </a>
              </div>
            </div>

            {/* Right Column: Clean Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-none bg-zinc-950 border border-zinc-800 shadow-2xl space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {tContact('onlineRequestTitle')}
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                    {tContact('onlineRequestDesc')}
                  </p>
                </div>

                <ContactForm />
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* 3. Interactive Map */}
      <section className="py-8">
        <Container>
          <div className="w-full h-80 sm:h-96 rounded-none overflow-hidden border border-zinc-800 shadow-2xl">
            <iframe
              src={siteConfig.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="AGZAMOV LEGAL GROUP Ofisi Xaritada"
            />
          </div>
        </Container>
      </section>
    </div>
  );
}
