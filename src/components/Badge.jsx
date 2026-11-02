import React from 'react';
import { cn } from '../utils/formatters';

const badgeVariants = {
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
  warning: 'bg-amber-50 text-amber-700 border-amber-200/60',
  danger: 'bg-rose-50 text-rose-700 border-rose-200/60',
  info: 'bg-indigo-50 text-indigo-700 border-indigo-200/60',
  neutral: 'bg-slate-100 text-slate-700 border-slate-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200/60',
};

const dotColors = {
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-rose-500',
  info: 'bg-indigo-500',
  neutral: 'bg-slate-400',
  purple: 'bg-purple-500',
};

export default function Badge({
  children,
  variant = 'neutral',
  hasDot = false,
  className = '',
  size = 'md',
}) {
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 rounded-md font-medium',
    md: 'text-xs px-2.5 py-1 rounded-lg font-medium',
    lg: 'text-sm px-3 py-1.5 rounded-lg font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 border leading-none tracking-wide select-none',
        badgeVariants[variant] || badgeVariants.neutral,
        sizeClasses[size] || sizeClasses.md,
        className
      )}
    >
      {hasDot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full shrink-0',
            dotColors[variant] || 'bg-slate-400'
          )}
        />
      )}
      {children}
    </span>
  );
}
