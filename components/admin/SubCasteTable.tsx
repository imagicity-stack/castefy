import { SubCasteMaster } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { EditIcon, TrashIcon } from '@/app/shared/icons';

interface Props {
  data: SubCasteMaster[];
  onEdit: (row: SubCasteMaster) => void;
  onDelete: (row: SubCasteMaster) => void;
}

export function SubCasteTable({ data, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3">Sub caste</th>
            <th className="px-4 py-3">Caste</th>
            <th className="px-4 py-3">Sort</th>
            <th className="px-4 py-3">Active</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white text-sm">
          {data.map((row) => (
            <tr key={row.id}>
              <td className="px-4 py-3 font-medium">{row.subCasteName}</td>
              <td className="px-4 py-3">{row.casteId}</td>
              <td className="px-4 py-3">{row.sortOrder}</td>
              <td className="px-4 py-3">{row.isActive ? 'Yes' : 'No'}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" onClick={() => onEdit(row)} aria-label="Edit">
                    <EditIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" onClick={() => onDelete(row)} aria-label="Delete">
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
