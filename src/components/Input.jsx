import React, { forwardRef } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../utils/formatters';

export const Input = forwardRef(function Input(
  {
    label,
    error,
    helperText,
    icon: Icon,
    iconPosition = 'left',
    className = '',
    containerClassName = '',
    id,
    disabled = false,
    ...props
  },
  ref
) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={cn('w-full flex flex-col gap-1.5', containerClassName)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-slate-700 tracking-wide"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && iconPosition === 'left' && (
          <div className="absolute left-3 text-slate-400 pointer-events-none flex items-center">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={cn(
            'w-full px-3.5 py-2 text-sm text-slate-900 bg-white border rounded-xl placeholder:text-slate-400 transition-all duration-150',
            'border-slate-300 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 shadow-subtle',
            'disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed',
            error && 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10 text-rose-900',
            Icon && iconPosition === 'left' && 'pl-9',
            Icon && iconPosition === 'right' && 'pr-9',
            className
          )}
          {...props}
        />

        {Icon && iconPosition === 'right' && (
          <div className="absolute right-3 text-slate-400 pointer-events-none flex items-center">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      {error ? (
        <span className="text-xs text-rose-600 font-medium">{error}</span>
      ) : helperText ? (
        <span className="text-xs text-slate-500">{helperText}</span>
      ) : null}
    </div>
  );
});

export function SearchInput({
  value,
  onChange,
  onClear,
  placeholder = 'Search anything...',
  className = '',
  ...props
}) {
  return (
    <div className="relative flex items-center w-full">
      <Search className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          'w-full pl-10 pr-9 py-2 text-sm text-slate-900 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl placeholder:text-slate-400 transition-all duration-150',
          'focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 shadow-subtle',
          className
        )}
        {...props}
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

export function Select({
  label,
  options = [],
  value,
  onChange,
  className = '',
  id,
}) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={selectId} className="text-xs font-semibold text-slate-700">
          {label}
        </label>
      )}
      <select
        id={selectId}
        value={value}
        onChange={onChange}
        className={cn(
          'w-full px-3.5 py-2 text-sm text-slate-800 bg-white border border-slate-300 rounded-xl transition-all duration-150',
          'focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 shadow-subtle cursor-pointer',
          className
        )}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function Toggle({ enabled, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between py-2">
      {(label || description) && (
        <div className="flex flex-col pr-4">
          {label && <span className="text-sm font-medium text-slate-900">{label}</span>}
          {description && <span className="text-xs text-slate-500">{description}</span>}
        </div>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-500/30',
          enabled ? 'bg-brand-600' : 'bg-slate-300'
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            enabled ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>
    </div>
  );
}

export default Input;
