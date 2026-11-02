import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency, formatNumber, cn } from '../utils/formatters';
import Card from './Card';

export default function StatCard({
  title,
  value,
  change,
  isPositive = true,
  timeframe = 'vs last month',
  type = 'currency',
  icon: Icon,
  iconColor = 'text-brand-600 bg-brand-50 border-brand-100',
  className = '',
}) {
  const formattedValue =
    type === 'currency'
      ? formatCurrency(value)
      : type === 'percent'
      ? `${value}%`
      : formatNumber(value);

  return (
    <Card hover className={cn('p-5 flex flex-col justify-between relative group', className)}>
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
          {title}
        </span>
        {Icon && (
          <div
            className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center border transition-transform duration-200 group-hover:scale-110',
              iconColor
            )}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Main Metric Value */}
      <div className="mt-3">
        <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {formattedValue}
        </div>
      </div>

      {/* Footer / Trend Indicator */}
      <div className="mt-4 flex items-center gap-2 pt-2 border-t border-slate-100/80">
        <span
          className={cn(
            'inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-md gap-0.5',
            isPositive
              ? 'text-emerald-700 bg-emerald-50 border border-emerald-200/50'
              : 'text-rose-700 bg-rose-50 border border-rose-200/50'
          )}
        >
          {isPositive ? (
            <ArrowUpRight className="w-3.5 h-3.5" />
          ) : (
            <ArrowDownRight className="w-3.5 h-3.5" />
          )}
          {Math.abs(change)}%
        </span>
        <span className="text-xs text-slate-400 font-normal">{timeframe}</span>
      </div>
    </Card>
  );
}
