import { motion } from 'framer-motion';
import React from 'react';

export function OnboardingShell({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass card-shadow w-full max-w-2xl rounded-3xl p-6">
      <div className="mb-4 space-y-1">
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        {subtitle && <p className="text-sm text-slate-600">{subtitle}</p>}
      </div>
      {children}
    </motion.div>
  );
}
