import React from 'react';
import { GlowBadge } from './GlowBadge';

interface SectionHeadingProps {
  tag?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  tag,
  title,
  subtitle,
  centered = true,
  className = '',
}) => {
  return (
    <div
      data-aos="fade-up"
      className={`max-w-3xl space-y-4 ${
        centered ? 'mx-auto text-center' : 'text-left'
      } ${className}`}
    >
      {tag && <GlowBadge icon>{tag}</GlowBadge>}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
