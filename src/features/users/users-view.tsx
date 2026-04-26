'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '@/lib/api/endpoints';
import { creditFormSchema } from '@/lib/schemas/api';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toCurrency, toDateTime } from '@/lib/utils';

export function UsersView() {
  const [history, setHistory] = useState<Array<{ userId: string; amount: number; at: string }>>([]);
  const form = useForm<z.infer<typeof creditFormSchema>>({ resolver: zodResolver(creditFormSchema) });

  const mutation = useMutation({
    mutationFn: api.creditUser,
    onSuccess: (data, variables) => {
      toast.success(`Novo saldo: ${toCurrency(data.balance)}`);
      setHistory((prev) => [{ userId: variables.userId, amount: variables.amount, at: new Date().toISOString() }, ...prev]);
      form.reset();
    },
    onError: () => toast.error('Falha ao creditar usuário')
  });

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <form className="space-y-3 rounded border p-4" onSubmit={form.handleSubmit((v) => mutation.mutate(v))}>
        <h2 className="font-semibold">Creditar saldo</h2>
        <div>
          <Label htmlFor="userId">ID do usuário</Label>
          <Input id="userId" {...form.register('userId')} />
        </div>
        <div>
          <Label htmlFor="amount">Valor</Label>
          <Input id="amount" type="number" step="0.01" {...form.register('amount')} />
        </div>
        <Button type="submit">Creditar</Button>
      </form>

      <div className="rounded border p-4">
        <h2 className="mb-2 font-semibold">Histórico local</h2>
        <div className="space-y-2 text-sm">
          {history.map((item, idx) => (
            <div key={idx} className="rounded bg-muted p-2">
              Usuário <strong>{item.userId}</strong>: {toCurrency(item.amount)}
              <div className="text-xs text-muted-foreground">{toDateTime(item.at)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
