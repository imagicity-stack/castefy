import React from 'react';
import clsx from 'clsx';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string };

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, error, className, ...props }, ref) => {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
      {label && <span>{label}</span>}
      <input
        ref={ref}
        className={clsx(
          'rounded-xl border border-slate-200 bg-white px-3 py-2 text-base shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200',
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
});
Input.displayName = 'Input';
