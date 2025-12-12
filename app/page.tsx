import Link from 'next/link';
import { motion } from 'framer-motion';
import { SparklesIcon, ArrowRightIcon } from './shared/icons';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-50 to-white">
      <section className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-700 shadow">
            <SparklesIcon className="h-4 w-4" /> Intent-first matchmaking
          </div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Castefy keeps discovery honest, respectful, and verified.
          </h1>
          <p className="text-lg text-slate-600">
            Phone-verified profiles, admin-curated caste data, and swipe mechanics you already love.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/login"
            className="rounded-full bg-brand-600 px-6 py-3 text-white shadow-lg transition hover:bg-brand-700"
          >
            Start with phone number
          </Link>
          <Link href="/login" className="inline-flex items-center gap-2 text-brand-600">
            See the experience <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </motion.div>
        <div className="grid gap-6 rounded-3xl bg-white/80 p-8 shadow-xl md:grid-cols-3">
          {[
            {
              title: 'Verified-first',
              text: 'Every journey begins with OTP and clear intent. Admin review keeps quality high.'
            },
            { title: 'Admin curated castes', text: 'Caste and sub caste lists flow from admin-managed masters.' },
            { title: 'PWA ready', text: 'Install on mobile, enjoy offline shell, and smooth microinteractions.' }
          ].map((card) => (
            <motion.div
              key={card.title}
              className="glass card-shadow rounded-2xl p-5 text-left"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 200, damping: 16 }}
            >
              <h3 className="mb-2 text-lg font-semibold">{card.title}</h3>
              <p className="text-sm text-slate-600">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
