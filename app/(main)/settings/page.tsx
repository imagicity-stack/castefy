'use client';

import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import toast from 'react-hot-toast'; // <--- Add this line

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [dailyStack, setDailyStack] = useState(true);
  const [loading, setLoading] = useState(false); // <--- Add this

  // Add this entire function
  const handleSave = () => {
    setLoading(true);
    // Simulate an API call
    setTimeout(() => {
      toast.success('Settings updated!');
      setLoading(false);
    }, 800);
  };
  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-50 to-white px-4 py-6">
      <div className="mx-auto max-w-xl space-y-4">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <div className="glass card-shadow space-y-4 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Notifications</p>
              <p className="text-sm text-slate-600">Chat, matches, verification updates.</p>
            </div>
            <input type="checkbox" checked={notifications} onChange={() => setNotifications((v) => !v)} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Daily stack refresh</p>
              <p className="text-sm text-slate-600">Enable pull to refresh for discovery.</p>
            </div>
            <input type="checkbox" checked={dailyStack} onChange={() => setDailyStack((v) => !v)} />
          </div>
          <Button className="w-full">Save</Button>
        </div>
      </div>
    </main>
  );
}
