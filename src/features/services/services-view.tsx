'use client';

import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { toast } from 'sonner';
import { api } from '@/lib/api/endpoints';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import type { Service } from '@/types/api';

const columnHelper = createColumnHelper<Service>();

export function ServicesView() {
  const [category, setCategory] = useState('all');
  const queryClient = useQueryClient();
  const { data = [] } = useQuery({ queryKey: ['services'], queryFn: api.getServices });

  const mutation = useMutation({
    mutationFn: ({ id, online }: { id: string; online: boolean }) => api.updateServiceStatus(id, online),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Status atualizado');
    },
    onError: () => toast.error('Falha ao atualizar serviço')
  });

  const categories = useMemo(() => ['all', ...new Set(data.map((item) => item.category))], [data]);
  const filtered = category === 'all' ? data : data.filter((s) => s.category === category);

  const table = useReactTable({
    data: filtered,
    columns: [
      columnHelper.accessor('name', { header: 'Serviço' }),
      columnHelper.accessor('category', { header: 'Categoria' }),
      columnHelper.accessor('online', {
        header: 'Status',
        cell: (ctx) => (ctx.getValue() ? '✅ Online' : '❌ Offline')
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Ações',
        cell: ({ row }) => (
          <Button
            size="sm"
            variant="outline"
            onClick={() => mutation.mutate({ id: row.original.id, online: !row.original.online })}
          >
            Alternar
          </Button>
        )
      })
    ],
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="space-y-4">
      <div className="max-w-xs">
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === 'all' ? 'Todas categorias' : c}
            </option>
          ))}
        </Select>
      </div>
      <div className="overflow-x-auto rounded border">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th className="p-2 text-left" key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
