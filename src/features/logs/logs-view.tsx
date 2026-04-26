'use client';

import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/endpoints';
import { getEventSource } from '@/lib/api/client';
import type { LogItem } from '@/types/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { toDateTime } from '@/lib/utils';

function downloadFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function LogsView() {
  const { data = [] } = useQuery({ queryKey: ['logs'], queryFn: api.getLogs });
  const [logs, setLogs] = useState<LogItem[]>(data);
  const [level, setLevel] = useState('all');
  const [service, setService] = useState('');

  useEffect(() => setLogs(data), [data]);

  useEffect(() => {
    const source = getEventSource('/events');
    source.onmessage = (event) => {
      try {
        const log = JSON.parse(event.data) as LogItem;
        setLogs((prev) => [log, ...prev].slice(0, 500));
      } catch {
        // ignore malformed events
      }
    };
    source.onerror = () => source.close();
    return () => source.close();
  }, []);

  const filtered = useMemo(
    () =>
      logs.filter(
        (item) =>
          (level === 'all' || item.level === level) &&
          (!service || item.service.toLowerCase().includes(service.toLowerCase()))
      ),
    [logs, level, service]
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-2 md:grid-cols-4">
        <Select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="all">Todos níveis</option>
          <option value="info">Info</option>
          <option value="warn">Warn</option>
          <option value="error">Error</option>
          <option value="debug">Debug</option>
        </Select>
        <Input placeholder="Filtrar serviço" value={service} onChange={(e) => setService(e.target.value)} />
        <Button
          variant="outline"
          onClick={() =>
            downloadFile(
              'logs.csv',
              filtered.map((l) => `${l.timestamp},${l.level},${l.service},${l.message}`).join('\n'),
              'text/csv'
            )
          }
        >
          Exportar CSV
        </Button>
        <Button variant="outline" onClick={() => downloadFile('logs.json', JSON.stringify(filtered, null, 2), 'application/json')}>
          Exportar JSON
        </Button>
      </div>
      <div className="space-y-2">
        {filtered.map((log) => (
          <div key={`${log.id}-${log.timestamp}`} className="rounded border p-3 text-sm">
            <strong>[{log.level.toUpperCase()}]</strong> {log.service} - {log.message}
            <div className="text-xs text-muted-foreground">{toDateTime(log.timestamp)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
