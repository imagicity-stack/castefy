import type { ReactNode } from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/admin" className="text-lg font-semibold text-brand-700">
            Castefy Admin
          </Link>
          <nav className="flex gap-4 text-sm text-slate-600">
            <Link href="/admin/caste">Castes</Link>
            <Link href="/admin/subcaste">Sub caste</Link>
            <Link href="/admin/moderation">Moderation</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
