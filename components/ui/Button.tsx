import { motion } from 'framer-motion';
import clsx from 'clsx';
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'outline';
  loading?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = 'primary', loading, ...props }, ref) => {
    const base = clsx(
      'inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2',
      {
        'bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-500': variant === 'primary',
        'border border-slate-200 bg-white text-slate-900 hover:bg-slate-50': variant === 'outline',
        'text-brand-700 hover:bg-brand-50': variant === 'ghost'
      },
      className
    );
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        className={base}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? 'Loading...' : children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
