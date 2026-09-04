'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { ChevronDown, Check } from 'lucide-react';
import { Locale } from '@/types';

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: 'uz', label: "O'zbek", flag: '🇺🇿' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
];

interface LanguageSwitcherProps {
  isScrolled?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ isScrolled = false }) => {
  const currentLocale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeLang = languages.find((l) => l.code === currentLocale) || languages[0];

  const handleSelect = (code: Locale) => {
    setIsOpen(false);
    router.replace(pathname, { locale: code });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold transition-all cursor-pointer border ${
          isScrolled
            ? 'text-zinc-900 hover:text-black bg-zinc-100 hover:bg-zinc-200 border-zinc-300 hover:border-red-600'
            : 'text-zinc-200 hover:text-white bg-white/[0.08] hover:bg-white/[0.14] border-white/10 hover:border-red-600/50'
        }`}
        aria-expanded={isOpen}
      >
        <span className="text-sm">{activeLang.flag}</span>
        <span className="uppercase tracking-wider font-extrabold">{activeLang.code}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${
            isScrolled ? 'text-zinc-700' : 'text-zinc-400'
          } ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-1.5 w-36 origin-top-right border shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-150 ${
            isScrolled
              ? 'bg-white border-zinc-200 shadow-zinc-400/30'
              : 'bg-zinc-950 border-zinc-800 shadow-black/90'
          }`}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelect(lang.code)}
              className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                currentLocale === lang.code
                  ? isScrolled
                    ? 'bg-red-50 text-red-600 font-bold'
                    : 'bg-red-600/15 text-red-500 font-semibold'
                  : isScrolled
                  ? 'text-zinc-800 hover:bg-zinc-100 hover:text-black'
                  : 'text-zinc-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </span>
              {currentLocale === lang.code && <Check className="w-3.5 h-3.5 text-red-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
