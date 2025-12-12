import React from 'react';
import clsx from 'clsx';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string; error?: string; options: { label: string; value: string }[] };

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ label, error, className, options, ...props }, ref) => {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
      {label && <span>{label}</span>}
      <select
        ref={ref}
        className={clsx(
          'rounded-xl border border-slate-200 bg-white px-3 py-2 text-base shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200',
          className
        )}
        {...props}
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
});
Select.displayName = 'Select';
