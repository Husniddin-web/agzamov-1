import React from 'react';

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
      {tag && (
        <div
          className={`flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-red-500 ${
            centered ? 'justify-center' : 'justify-start'
          }`}
        >
          <span className="w-1.5 h-1.5 bg-red-600 shrink-0" />
          <span>{tag}</span>
        </div>
      )}
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
