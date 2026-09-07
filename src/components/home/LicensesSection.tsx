'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Container } from '../common/Container';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';

const LICENSES = [
  { id: 1, src: '/litsenzya1.jpg', alt: 'Litsenziya 1' },
  { id: 2, src: '/litsenzya2.jpg', alt: 'Litsenziya 2' },
];

export const LicensesSection: React.FC<{ className?: string }> = ({ className = '' }) => {
  const locale = useLocale();
  const [selectedLicense, setSelectedLicense] = useState<number | null>(null);

  const title =
    locale === 'ru'
      ? 'Лицензии и Свидетельства'
      : locale === 'en'
      ? 'Licenses & Certificates'
      : 'Litsenziyalar va Guvohnomalar';

  const handleNext = () => {
    if (selectedLicense === null) return;
    const nextIdx = selectedLicense === LICENSES.length ? 1 : selectedLicense + 1;
    setSelectedLicense(nextIdx);
  };

  const handlePrev = () => {
    if (selectedLicense === null) return;
    const prevIdx = selectedLicense === 1 ? LICENSES.length : selectedLicense - 1;
    setSelectedLicense(prevIdx);
  };

  const currentLic = LICENSES.find((l) => l.id === selectedLicense);

  return (
    <section
      className={`py-14 sm:py-20 bg-black border-t border-zinc-900 relative overflow-hidden ${className}`}
    >
      {/* Ambient Red Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/5 rounded-full blur-[160px] pointer-events-none" />

      <Container className="relative z-10 space-y-8 sm:space-y-10">
        {/* Simple Clean Title */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase">
            {title}
          </h2>
        </div>

        {/* 2 License Images Grid — Clean, Badgeless, Pure Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {LICENSES.map((lic) => (
            <div
              key={lic.id}
              onClick={() => setSelectedLicense(lic.id)}
              className="group relative bg-[#0a0c13] border border-zinc-800 hover:border-red-600 transition-all duration-300 overflow-hidden shadow-2xl cursor-pointer p-3 sm:p-4"
            >
              <div className="relative aspect-[3/4] w-full bg-zinc-950 overflow-hidden border border-zinc-800/80">
                <Image
                  src={lic.src}
                  alt={lic.alt}
                  fill
                  className="object-contain p-1 filter contrast-105 group-hover:scale-102 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 450px"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 bg-red-600 text-white flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Lightbox Modal for Full-Size Inspection */}
      {currentLic && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedLicense(null)}
        >
          <div
            className="relative bg-[#0a0c13] border border-zinc-800 max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-950">
              <span className="text-xs font-bold uppercase text-white tracking-wider">
                {title} — {currentLic.id}
              </span>
              <button
                onClick={() => setSelectedLicense(null)}
                className="p-1.5 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative flex-1 min-h-[480px] sm:min-h-[640px] bg-zinc-950 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
              <Image
                src={currentLic.src}
                alt={currentLic.alt}
                fill
                className="object-contain"
                priority
              />

              {/* Navigation arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/70 border border-zinc-800 text-white hover:bg-red-600 transition-colors cursor-pointer shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/70 border border-zinc-800 text-white hover:bg-red-600 transition-colors cursor-pointer shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
