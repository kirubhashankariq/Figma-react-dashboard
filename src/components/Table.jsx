import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../utils/formatters';
import Button from './Button';

export function Table({ children, className = '', containerClassName = '' }) {
  return (
    <div className={cn('w-full overflow-x-auto rounded-xl border border-slate-200/80 bg-white shadow-subtle', containerClassName)}>
      <table className={cn('w-full text-left border-collapse text-xs sm:text-sm', className)}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children, className = '' }) {
  return (
    <thead className={cn('bg-slate-50/80 border-b border-slate-200 text-slate-500 font-medium text-xs tracking-wider uppercase', className)}>
      {children}
    </thead>
  );
}

export function TableBody({ children, className = '' }) {
  return (
    <tbody className={cn('divide-y divide-slate-100 text-slate-700', className)}>
      {children}
    </tbody>
  );
}

export function TableRow({ children, className = '', hover = true, onClick }) {
  return (
    <tr
      onClick={onClick}
      className={cn(
        'transition-colors duration-150',
        hover && 'hover:bg-slate-50/70',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </tr>
  );
}

export function TableHead({ children, className = '', ...props }) {
  return (
    <th
      className={cn('px-4 py-3 font-semibold text-slate-600 text-2xs tracking-wider uppercase', className)}
      {...props}
    >
      {children}
    </th>
  );
}

export function TableCell({ children, className = '', ...props }) {
  return (
    <td
      className={cn('px-4 py-3.5 whitespace-nowrap align-middle', className)}
      {...props}
    >
      {children}
    </td>
  );
}

export function TablePagination({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize = 10,
  onPageChange,
  className = '',
}) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 bg-white border-t border-slate-100 text-xs text-slate-500',
        className
      )}
    >
      <div>
        Showing <span className="font-semibold text-slate-700">{startItem}</span> to{' '}
        <span className="font-semibold text-slate-700">{endItem}</span> of{' '}
        <span className="font-semibold text-slate-700">{totalItems}</span> entries
      </div>

      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          icon={ChevronLeft}
          className="px-2"
        />
        <span className="px-2 font-medium text-slate-700">
          Page {currentPage} of {totalPages || 1}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          icon={ChevronRight}
          className="px-2"
        />
      </div>
    </div>
  );
}

export default Table;
