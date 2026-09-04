import React from 'react';
import { Link } from '@/i18n/routing';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  icon,
  iconPosition = 'right',
  className = '',
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 active:scale-[0.98] cursor-pointer focus:outline-none';

  const sizeStyles = {
    sm: 'px-3.5 py-2 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3.5 text-base gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-red-600 hover:bg-red-700 text-black font-bold shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:-translate-y-0.5',
    secondary:
      'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-zinc-600',
    outline:
      'border border-red-600/50 hover:border-red-600 bg-red-600/5 hover:bg-red-600/15 text-red-500 hover:text-red-400 backdrop-blur-sm',
    ghost:
      'text-zinc-300 hover:text-white hover:bg-white/5',
  };

  const combinedClass = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span>{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span>{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClass}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClass} {...props}>
      {content}
    </button>
  );
};
