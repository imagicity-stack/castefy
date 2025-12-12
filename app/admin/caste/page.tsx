'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { CasteTable } from '@/components/admin/CasteTable';
import { CasteMaster } from '@/lib/types';
import { religions } from '@/lib/constants';
import toast from 'react-hot-toast';

export default function CastePage() {
  const [castes, setCastes] = useState<CasteMaster[]>([]);
  const [form, setForm] = useState<CasteMaster | null>(null);

  useEffect(() => {
    setCastes([
      { id: 'brahmin', casteName: 'Brahmin', religion: 'Hindu', sortOrder: 1, isActive: true },
      { id: 'rajput', casteName: 'Rajput', religion: 'Hindu', sortOrder: 2, isActive: true }
    ] as CasteMaster[]);
  }, []);

  const handleSave = () => {
    if (!form) return;
    setCastes((prev) => {
      const existing = prev.find((c) => c.id === form.id);
      if (existing) {
        return prev.map((c) => (c.id === form.id ? form : c));
      }
      return [...prev, form];
    });
    setForm(null);
    toast.success('Saved');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Castes</h1>
          <p className="text-sm text-slate-600">Admin managed list drives onboarding dropdowns.</p>
        </div>
        <Button onClick={() => setForm({ id: '', casteName: '', religion: 'Hindu', sortOrder: 0, isActive: true })}>Add caste</Button>
      </div>
      {form && (
        <div className="glass card-shadow rounded-2xl p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <Input label="ID" value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} />
            <Input label="Name" value={form.casteName} onChange={(e) => setForm({ ...form, casteName: e.target.value })} />
            <Select
              label="Religion"
              value={form.religion}
              onChange={(e) => setForm({ ...form, religion: e.target.value })}
              options={religions.map((r) => ({ value: r, label: r }))}
            />
            <Input
              label="Sort order"
              type="number"
              value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
            />
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
              Active
            </label>
          </div>
          <div className="mt-3 flex gap-2">
            <Button onClick={handleSave}>Save</Button>
            <Button variant="outline" onClick={() => setForm(null)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
      <CasteTable data={castes} onEdit={setForm} onDelete={(row) => setCastes((prev) => prev.filter((c) => c.id !== row.id))} />
    </div>
  );
}
