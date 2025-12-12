export const metadata = {
  title: 'Offline | Castefy'
};

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-white px-6 text-center">
      <div className="glass card-shadow max-w-md rounded-3xl p-8">
        <h1 className="text-2xl font-semibold text-slate-900">You are offline</h1>
        <p className="mt-3 text-sm text-slate-600">
          We cached the essentials. Reconnect to refresh your stack, chat, and profile.
        </p>
      </div>
    </main>
  );
}
