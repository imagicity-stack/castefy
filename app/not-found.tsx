import Link from 'next/link';
import { SparklesIcon } from './shared/icons';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-brand-50 to-white px-6 py-16">
      <div className="glass card-shadow w-full max-w-xl rounded-3xl p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
          <SparklesIcon className="h-7 w-7" />
        </div>
        <h1 className="mt-6 text-3xl font-semibold text-slate-900">Page not found</h1>
        <p className="mt-3 text-base text-slate-600">
          The link you followed doesn&apos;t exist anymore. Head back to the main experience or sign in to continue.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-3 text-white shadow-lg transition hover:bg-brand-700"
          >
            Go to home
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full border border-brand-200 px-5 py-3 text-brand-700 transition hover:bg-brand-50"
          >
            Continue with phone
          </Link>
        </div>
      </div>
    </main>
  );
}
