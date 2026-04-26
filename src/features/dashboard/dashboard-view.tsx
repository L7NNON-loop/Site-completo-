'use client';

import { useQuery } from '@tanstack/react-query';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { api } from '@/lib/api/endpoints';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toCurrency } from '@/lib/utils';

export function DashboardView() {
  const { data } = useQuery({ queryKey: ['stats'], queryFn: api.getStats, refetchInterval: 15000 });

  const cards = [
    ['Usuários ativos', data?.activeUsers ?? 0],
    ['Saldo total', toCurrency(data?.totalBalance ?? 0)],
    ['Serviços online', data?.onlineServices ?? 0],
    ['Serviços offline', data?.offlineServices ?? 0]
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-4">
        {cards.map(([title, value]) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle className="text-sm">{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">{value}</CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Atividade</CardTitle>
        </CardHeader>
        <CardContent className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data?.activity ?? []}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area dataKey="value" stroke="#111" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
