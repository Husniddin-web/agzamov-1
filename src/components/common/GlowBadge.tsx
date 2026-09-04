import React from 'react';

interface GlowBadgeProps {
  children: React.ReactNode;
  className?: string;
  icon?: boolean | React.ReactNode;
}

export const GlowBadge: React.FC<GlowBadgeProps> = ({ children, className = '', icon }) => {
  return (
    <div
      className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-red-500 ${className}`}
    >
      {icon && <span className="w-1.5 h-1.5 bg-red-600 shrink-0" />}
      <span>{children}</span>
    </div>
  );
};
