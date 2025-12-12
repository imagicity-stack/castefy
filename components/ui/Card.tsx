import clsx from 'clsx';
import React from 'react';

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={clsx('glass card-shadow rounded-3xl p-4', className)}>{children}</div>;
}
