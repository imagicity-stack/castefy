'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { SubCasteTable } from '@/components/admin/SubCasteTable';
import { SubCasteMaster, CasteMaster } from '@/lib/types';
import toast from 'react-hot-toast';

export default function SubCastePage() {
  const [castes, setCastes] = useState<CasteMaster[]>([]);
  const [subCastes, setSubCastes] = useState<SubCasteMaster[]>([]);
  const [form, setForm] = useState<SubCasteMaster | null>(null);

  useEffect(() => {
    setCastes([
      { id: 'brahmin', casteName: 'Brahmin', religion: 'Hindu', sortOrder: 1, isActive: true },
      { id: 'rajput', casteName: 'Rajput', religion: 'Hindu', sortOrder: 2, isActive: true }
    ] as CasteMaster[]);
    setSubCastes([
      { id: 'iyer', casteId: 'brahmin', subCasteName: 'Iyer', sortOrder: 1, isActive: true },
      { id: 'iyengar', casteId: 'brahmin', subCasteName: 'Iyengar', sortOrder: 2, isActive: true }
    ] as SubCasteMaster[]);
  }, []);

  const handleSave = () => {
    if (!form) return;
    setSubCastes((prev) => {
      const existing = prev.find((c) => c.id === form.id);
      if (existing) return prev.map((c) => (c.id === form.id ? form : c));
      return [...prev, form];
    });
    setForm(null);
    toast.success('Saved');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Sub castes</h1>
          <p className="text-sm text-slate-600">Linked to parent caste. Users can only pick active options.</p>
        </div>
        <Button
          onClick={() =>
            setForm({ id: '', casteId: castes[0]?.id ?? '', subCasteName: '', sortOrder: 0, isActive: true })
          }
        >
          Add sub caste
        </Button>
      </div>
      {form && (
        <div className="glass card-shadow rounded-2xl p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <Input label="ID" value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} />
            <Input label="Name" value={form.subCasteName} onChange={(e) => setForm({ ...form, subCasteName: e.target.value })} />
            <Select
              label="Caste"
              value={form.casteId}
              onChange={(e) => setForm({ ...form, casteId: e.target.value })}
              options={castes.map((c) => ({ value: c.id, label: `${c.casteName} (${c.religion})` }))}
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
      <SubCasteTable
        data={subCastes}
        onEdit={setForm}
        onDelete={(row) => setSubCastes((prev) => prev.filter((c) => c.id !== row.id))}
      />
    </div>
  );
}
