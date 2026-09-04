import React from 'react';

interface GlowBadgeProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const GlowBadge: React.FC<GlowBadgeProps> = ({ children, className = '', icon }) => {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-red-600/30 bg-red-600/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-red-500 backdrop-blur-md glow-primary-sm ${className}`}
    >
      {icon && <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />}
      {children}
    </div>
  );
};
