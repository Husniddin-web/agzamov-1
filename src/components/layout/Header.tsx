'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { navLinks, siteConfig } from '@/config/site';
import { Locale } from '@/types';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileHeader } from './MobileHeader';
import {
  PhoneCall,
  Clock,
  Mail,
  Home,
  ArrowRight,
} from 'lucide-react';

export const Header: React.FC = () => {
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Smooth hysteresis: hides topbar at 60px, reveals when returning above 30px
      if (scrollY > 60) {
        setIsScrolled(true);
      } else if (scrollY < 30) {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter out 'home' text link because Home is handled by the dedicated Red Home Icon button on desktop
  const navigationItems = navLinks.filter((item) => item.key !== 'home');

  return (
    <>
      {/* 1. DEDICATED MOBILE HEADER (Mobile only: Burger Menu -> Logo -> Language Switcher) */}
      <MobileHeader />

      {/* 2. DESKTOP HEADER (Visible on md+ screens) */}
      <header className="hidden md:block fixed top-0 inset-x-0 z-50 w-full transition-all duration-300">
        {/* TOP BAR (Collapsible on scroll) */}
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out bg-white border-b border-zinc-200 ${
            isScrolled
              ? 'grid-rows-[0fr] opacity-0 border-b-0 pointer-events-none'
              : 'grid-rows-[1fr] opacity-100 pointer-events-auto'
          }`}
        >
          <div className="overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
              {/* Top Bar Logo */}
              <Link
                href="/"
                className="flex items-center gap-3 shrink-0 group"
                title="AGZAMOV LEGAL GROUP"
              >
                <div className="relative w-11 h-11 shrink-0 flex items-center justify-center">
                  <Image
                    src="/logo1-crop.png"
                    alt="Agzamov Legal Group"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg lg:text-xl font-black tracking-wider text-zinc-950 leading-tight group-hover:text-red-600 transition-colors">
                    AGZAMOV
                  </span>
                  <span className="text-[10px] tracking-[0.25em] font-extrabold text-red-600 uppercase leading-none">
                    LEGAL GROUP
                  </span>
                </div>
              </Link>

              {/* Right Contact Info Items */}
              <div className="flex items-center gap-6 lg:gap-8">
                {/* Phone */}
                <a
                  href={`tel:${siteConfig.phoneClean}`}
                  className="flex items-center gap-2.5 text-xs lg:text-sm font-bold text-zinc-900 hover:text-red-600 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-full border border-red-200 bg-red-50 flex items-center justify-center text-red-600 shrink-0 shadow-xs group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <span>{siteConfig.phone}</span>
                </a>

                {/* Opening time */}
                <div className="hidden lg:flex items-center gap-2.5 text-xs lg:text-sm font-semibold text-zinc-800">
                  <div className="w-9 h-9 rounded-full border border-red-200 bg-red-50 flex items-center justify-center text-red-600 shrink-0 shadow-xs">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span>{siteConfig.workingHours[locale]}</span>
                </div>

                {/* Email */}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2.5 text-xs lg:text-sm font-bold text-zinc-900 hover:text-red-600 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-full border border-red-200 bg-red-50 flex items-center justify-center text-red-600 shrink-0 shadow-xs group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>{siteConfig.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* NAVIGATION BAR (Sticky & Smooth) */}
        <div
          className={`transition-colors duration-300 shadow-lg ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-md border-b border-zinc-200'
              : 'bg-[#0b0e14] border-b border-zinc-800'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-stretch justify-between">
            <div className="flex items-stretch gap-4">
              {/* Scrolled Logo (Reveals smoothly when sticky) */}
              <div
                className={`flex items-center transition-all duration-300 overflow-hidden ${
                  isScrolled ? 'max-w-[240px] opacity-100 mr-4' : 'max-w-0 opacity-0 mr-0'
                }`}
              >
                <Link
                  href="/"
                  className="flex items-center gap-2.5 shrink-0 group py-2"
                  title="AGZAMOV LEGAL GROUP"
                >
                  <div className="relative w-9 h-9 shrink-0 flex items-center justify-center">
                    <Image
                      src="/logo1-crop.png"
                      alt="Agzamov Legal Group"
                      width={38}
                      height={38}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm sm:text-base font-black tracking-wider text-zinc-950 leading-tight">
                      AGZAMOV
                    </span>
                    <span className="text-[8px] tracking-[0.2em] font-extrabold text-red-600 uppercase leading-none">
                      LEGAL GROUP
                    </span>
                  </div>
                </Link>
              </div>

              {/* Red Home Icon Button */}
              <Link
                href="/"
                className="bg-red-600 hover:bg-red-700 text-white flex items-center justify-center px-5 transition-colors cursor-pointer shrink-0"
                title={tNav('home')}
              >
                <Home className="w-5 h-5" />
              </Link>

              {/* Main Navigation Links */}
              <nav className="flex items-stretch">
                {navigationItems.map((item) => {
                  const isActive = pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      className={`flex items-center whitespace-nowrap px-3 lg:px-4 py-3.5 text-xs font-bold tracking-wider uppercase transition-all duration-200 border-b-2 ${
                        isActive
                          ? 'border-red-600 text-red-600 bg-red-500/10'
                          : isScrolled
                          ? 'border-transparent text-zinc-800 hover:text-red-600 hover:bg-zinc-100/60'
                          : 'border-transparent text-zinc-200 hover:text-red-500 hover:bg-white/[0.04]'
                      }`}
                    >
                      {tNav(item.key as 'about' | 'services' | 'team' | 'news' | 'contact')}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right Section: Language Switcher + GET A QUOTE CTA */}
            <div className="flex items-center gap-3">
              <LanguageSwitcher isScrolled={isScrolled} />

              {/* GET A QUOTE CTA Button */}
              <Link
                href="/contact"
                className="group flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider px-4 sm:px-5 h-9 transition-all shadow-md shadow-red-600/20 shrink-0"
              >
                <span>{tCommon('getQuote')}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
