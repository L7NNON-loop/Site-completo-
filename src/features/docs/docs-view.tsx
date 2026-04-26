'use client';

import { useState } from 'react';
import { apiRequest } from '@/lib/api/client';
import { Button } from '@/components/ui/button';

const endpoints = [
  ['GET', '/api/services'],
  ['POST', '/api/services/:id/status'],
  ['POST', '/api/users/credit'],
  ['GET', '/api/stats'],
  ['POST', '/api/games/crash/round'],
  ['POST', '/api/games/crash/bet'],
  ['POST', '/api/games/crash/cashout'],
  ['GET', '/api/logs'],
  ['GET', '/events']
] as const;

export function DocsView() {
  const [response, setResponse] = useState('');

  const testEndpoint = async (method: string, path: string) => {
    try {
      const testPath = path.includes(':id') ? '/api/services/demo/status' : path;
      const res = await apiRequest(testPath, {
        method,
        body: method === 'POST' ? JSON.stringify({ online: true }) : undefined
      });
      setResponse(JSON.stringify(res, null, 2));
    } catch (error) {
      setResponse(String(error));
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Documentação interativa</h2>
      <div className="space-y-2">
        {endpoints.map(([method, path]) => (
          <div key={path} className="flex items-center justify-between rounded border p-3">
            <div>
              <strong>{method}</strong> {path}
            </div>
            <Button size="sm" variant="outline" onClick={() => testEndpoint(method, path)}>
              Testar endpoint
            </Button>
          </div>
        ))}
      </div>
      <pre className="overflow-auto rounded border bg-muted p-3 text-xs">{response || 'Nenhum teste executado.'}</pre>
    </div>
  );
}
