'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Container } from '../common/Container';
import { siteConfig, navLinks } from '@/config/site';
import { Locale } from '@/types';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');
  const tServices = useTranslations('services');
  const locale = useLocale() as Locale;

  const practiceKeys = ['corporate', 'disputes', 'criminal', 'tax', 'ip', 'realestate'];

  return (
    <footer className="relative bg-[#05070a] border-t border-zinc-800 pt-20 pb-12 overflow-hidden text-zinc-300">
      {/* 1. FULL BACKGROUND: JUDGE GAVEL & LAW BOOKS (High visibility & clarity, authentic wood texture) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <Image
          src="/gavel-bg.jpg"
          alt="Judge Gavel Background"
          fill
          className="object-cover object-center w-full h-full opacity-75 sm:opacity-85 filter contrast-125 brightness-100"
          sizes="100vw"
        />
        {/* Soft balanced gradient overlay to ensure text remains crisp while gavel is clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#05070a]/90 via-[#05070a]/65 to-[#05070a]/90" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/80 via-transparent to-[#05070a]/95" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-zinc-800/80">
          {/* Col 1: Brand & Description & Socials (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative flex items-center justify-center h-11 w-11 transition-transform duration-200 group-hover:scale-105">
                <Image
                  src="/logo1-crop.png"
                  alt="Agzamov Legal Group"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-wider text-white uppercase leading-none">
                  AGZAMOV
                </span>
                <span className="text-[10px] tracking-[0.25em] font-extrabold text-red-600 uppercase mt-1">
                  LEGAL GROUP
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-sm">
              {t('description')}
            </p>

            {/* Direct Phone Contact */}
            <div className="pt-2">
              <span className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                {tCommon('directCall')}
              </span>
              <a
                href={`tel:${siteConfig.phoneClean}`}
                className="text-lg sm:text-xl font-black text-white hover:text-red-500 transition-colors tracking-tight mt-0.5 inline-block"
              >
                {siteConfig.phone}
              </a>
            </div>

            {/* Real Branded Social Media Icons */}
            <div className="pt-2 flex items-center gap-4">
              <a
                href={siteConfig.social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-80 hover:opacity-100 hover:scale-110 transition-all"
                aria-label="Telegram"
              >
                <Image
                  src="/telegram.webp"
                  alt="Telegram"
                  width={30}
                  height={30}
                  className="w-7 h-7 object-contain"
                />
              </a>

              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-80 hover:opacity-100 hover:scale-110 transition-all"
                aria-label="Instagram"
              >
                <Image
                  src="/instagram.webp"
                  alt="Instagram"
                  width={30}
                  height={30}
                  className="w-7 h-7 object-contain"
                />
              </a>

              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-80 hover:opacity-100 hover:scale-110 transition-all"
                aria-label="Facebook"
              >
                <Image
                  src="/facebook.webp"
                  alt="Facebook"
                  width={30}
                  height={30}
                  className="w-7 h-7 object-contain"
                />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white border-b border-zinc-800 pb-2.5">
              {t('navigation')}
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-red-600 group-hover:w-2 transition-all" />
                    <span>{tNav(link.key as 'home' | 'about' | 'services' | 'team' | 'news' | 'contact')}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Legal Practice Areas (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white border-b border-zinc-800 pb-2.5">
              {t('practiceAreas')}
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {practiceKeys.map((key) => (
                <li key={key}>
                  <Link
                    href="/services"
                    className="text-zinc-400 hover:text-white transition-colors flex items-center justify-between group"
                  >
                    <span>{tServices(`${key}.title` as 'corporate.title' | 'disputes.title' | 'criminal.title' | 'tax.title' | 'ip.title' | 'realestate.title')}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-red-500 transition-colors" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Office Details & Working Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white border-b border-zinc-800 pb-2.5">
              {t('contactInfo')}
            </h3>
            <ul className="space-y-3.5 text-xs sm:text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span className="text-zinc-300 leading-snug">
                  {siteConfig.address[locale]}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-red-600 shrink-0" />
                <a
                  href={`tel:${siteConfig.phoneClean}`}
                  className="text-zinc-300 hover:text-red-500 transition-colors font-medium"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-red-600 shrink-0" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-zinc-300 hover:text-red-500 transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-3 pt-1 border-t border-zinc-800/80">
                <Clock className="w-4 h-4 text-red-600 shrink-0" />
                <span className="text-zinc-400 text-xs">
                  {siteConfig.workingHours[locale]}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar (Copyright & Legal) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            © {new Date().getFullYear()} AGZAMOV LEGAL GROUP. {t('allRightsReserved')}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-zinc-300 transition-colors">
              {t('privacy')}
            </Link>
            <span className="text-zinc-700">•</span>
            <Link href="/terms" className="hover:text-zinc-300 transition-colors">
              {t('terms')}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
