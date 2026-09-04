'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { navLinks, siteConfig } from '@/config/site';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Locale } from '@/types';
import {
  PhoneCall,
  ShieldCheck,
  ArrowRight,
  MapPin,
  Clock,
} from 'lucide-react';

export const MobileHeader: React.FC = () => {
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close menu on route change without setState in effect
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      {/* FIXED MOBILE HEADER BAR */}
      <header className="fixed top-0 inset-x-0 z-50 h-16 bg-[#06080e]/95 backdrop-blur-lg border-b border-zinc-800/80 px-4 flex items-center justify-between transition-colors">
        {/* 1. ORDER: 1 - BURGER MENU (Animated Bars to X) */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 -ml-1 flex flex-col items-center justify-center gap-1.5 focus:outline-none cursor-pointer group"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 ease-out origin-center ${
              isOpen ? 'rotate-45 translate-y-2 bg-red-500' : 'group-hover:bg-red-500'
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 ease-out ${
              isOpen ? 'opacity-0 scale-x-0' : 'group-hover:bg-red-500'
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 ease-out origin-center ${
              isOpen ? '-rotate-45 -translate-y-2 bg-red-500' : 'group-hover:bg-red-500'
            }`}
          />
        </button>

        {/* 2. ORDER: 2 - LOGO (Centered) */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2.5 select-none"
          title="AGZAMOV LEGAL GROUP"
        >
          <div className="relative w-8 h-8 shrink-0 flex items-center justify-center">
            <Image
              src="/logo1-crop.png"
              alt="Agzamov Legal Group"
              width={34}
              height={34}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-black tracking-wider text-white leading-tight">
              AGZAMOV
            </span>
            <span className="text-[7.5px] tracking-[0.22em] font-extrabold text-red-600 uppercase leading-none">
              LEGAL GROUP
            </span>
          </div>
        </Link>

        {/* 3. ORDER: 3 - LANGUAGE SWITCHER (Right) */}
        <div className="flex items-center shrink-0">
          <LanguageSwitcher isScrolled={false} />
        </div>
      </header>

      {/* FULL-HEIGHT ANIMATED DRAWER & OVERLAY */}
      <div
        className={`fixed inset-0 top-16 z-40 transition-all duration-300 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop Dark Tint */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          onClick={() => setIsOpen(false)}
        />

        {/* Slide-down Menu Container */}
        <div
          className={`relative z-10 w-full max-h-[calc(100vh-4rem)] overflow-y-auto bg-[#090c14] border-b border-zinc-800 shadow-2xl transition-all duration-300 ease-out ${
            isOpen ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0'
          }`}
        >
          <div className="px-5 py-6 space-y-6">
            {/* Primary Navigation Links */}
            <nav className="space-y-1.5">
              {navLinks.map((item) => {
                const isActive =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-4 py-3.5 border transition-all duration-200 uppercase tracking-wider font-extrabold text-xs ${
                      isActive
                        ? 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-600/30'
                        : 'bg-zinc-900/60 text-zinc-200 border-zinc-800/80 hover:bg-zinc-800 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    <span>{tNav(item.key as 'home' | 'about' | 'services' | 'team' | 'news' | 'contact')}</span>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform ${
                        isActive ? 'translate-x-0 text-white' : 'text-zinc-500'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Quick Action Buttons */}
            <div className="space-y-3 pt-2">
              {/* Emergency 24/7 Hotline */}
              <a
                href={`tel:${siteConfig.emergencyPhoneClean}`}
                className="flex items-center justify-between p-3.5 bg-red-950/40 border border-red-800/50 hover:border-red-600 text-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-red-400 font-bold">
                      {tCommon('emergencySupport')}
                    </span>
                    <span className="text-xs font-black tracking-tight text-white">
                      {siteConfig.emergencyPhone}
                    </span>
                  </div>
                </div>
                <PhoneCall className="w-4 h-4 text-red-500 animate-pulse" />
              </a>

              {/* Consultation CTA */}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-red-600/20 transition-all"
              >
                <span>{tCommon('getQuote')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Office Info & Working Hours */}
            <div className="pt-4 border-t border-zinc-800/80 space-y-2.5 text-zinc-400 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span className="leading-snug">{siteConfig.address[locale]}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-red-500 shrink-0" />
                <span>{siteConfig.workingHours[locale]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
