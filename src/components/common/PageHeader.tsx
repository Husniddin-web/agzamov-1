'use client';

import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Container } from './Container';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  bgImage: string;
  breadcrumbs: BreadcrumbItem[];
  centered?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  title,
  subtitle,
  bgImage,
  breadcrumbs,
  centered = true,
  className = '',
  children,
}) => {
  return (
    <section
      className={`relative pt-36 sm:pt-44 lg:pt-48 pb-24 sm:pb-28 lg:pb-32 overflow-hidden bg-[#06080d] ${className}`}
    >
      {/* 1. RICH BACKGROUND IMAGE (High visibility, bright & vibrant) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src={bgImage}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter contrast-110 brightness-105"
        />

        {/* Soft, open gradients: background image is clearly visible while text pops */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-transparent to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/15" />
      </div>

      {/* 2. AMBIENT RED NEON DEPTH GLOW */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-red-600/15 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* 3. FOREGROUND CONTENT */}
      <Container className="relative z-10">
        <div
          data-aos="fade-up"
          data-aos-duration="600"
          className={`space-y-4 max-w-4xl ${centered ? 'mx-auto text-center' : 'text-left'}`}
        >
          {/* Top Badge Tag: Refined Glassmorphic Pill */}
          {badge && (
            <div className="inline-block">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-red-600/40 backdrop-blur-md shadow-lg shadow-red-950/40">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[11px] sm:text-xs font-mono font-black uppercase tracking-[0.22em] text-red-400">
                  {badge}
                </span>
              </div>
            </div>
          )}

          {/* Main Hero Page Title */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.14] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] break-words">
            {title}
          </h1>

          {/* Subtitle / Description if provided */}
          {subtitle && (
            <p className="text-xs sm:text-sm md:text-base text-zinc-200 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              {subtitle}
            </p>
          )}

          {/* Breadcrumbs Navigation: Glassmorphic Capsule */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className="pt-2 flex justify-center max-w-full">
              <nav
                aria-label="Breadcrumb"
                className="inline-flex items-center justify-center flex-wrap gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-black/65 border border-white/10 backdrop-blur-md shadow-xl text-[11px] sm:text-xs max-w-full"
              >
                {breadcrumbs.map((crumb, idx) => {
                  const isLast = idx === breadcrumbs.length - 1;

                  return (
                    <React.Fragment key={idx}>
                      {idx > 0 && (
                        <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-zinc-400 shrink-0" />
                      )}
                      {crumb.href && !isLast ? (
                        <Link
                          href={crumb.href}
                          className="text-zinc-300 hover:text-white transition-colors font-medium truncate max-w-[140px] sm:max-w-none"
                        >
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className="text-white font-bold truncate max-w-[180px] sm:max-w-none">
                          {crumb.label}
                        </span>
                      )}
                    </React.Fragment>
                  );
                })}
              </nav>
            </div>
          )}

          {/* Additional children if needed */}
          {children}
        </div>
      </Container>

      {/* 4. SLANTED BOTTOM EDGE (Sal qiya pastki kesim + qizil neon chiziq) */}
      <div className="absolute bottom-0 inset-x-0 h-10 sm:h-14 lg:h-16 pointer-events-none overflow-hidden z-20">
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Subtle Razor-Sharp Red Border along the angle */}
          <line
            x1="0"
            y1="60"
            x2="1200"
            y2="0"
            stroke="rgba(220, 38, 38, 0.45)"
            strokeWidth="2"
          />
          {/* Black Fill matching page content background */}
          <polygon
            points="0,60 1200,0 1200,60 0,60"
            className="fill-black"
          />
        </svg>
      </div>
    </section>
  );
};
