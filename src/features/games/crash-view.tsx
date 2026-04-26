'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api/endpoints';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function CrashView() {
  const [roundId, setRoundId] = useState('');
  const [betId, setBetId] = useState('');
  const [multiplier, setMultiplier] = useState(1);
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState('');

  const roundMutation = useMutation({
    mutationFn: api.crashRound,
    onSuccess: (data) => {
      setRoundId(data.roundId);
      setMultiplier(data.multiplier);
      setResult(`Rodada ${data.roundId} criada (${data.multiplier}x)`);
    }
  });

  const betMutation = useMutation({
    mutationFn: api.crashBet,
    onSuccess: (data) => {
      setBetId(data.betId);
      setResult(`Aposta registrada. Potencial: ${data.potentialWin}`);
    }
  });

  const cashoutMutation = useMutation({
    mutationFn: api.crashCashout,
    onSuccess: (data) => {
      setResult(`Cashout concluído. Prêmio: ${data.payout} | saldo: ${data.balance}`);
    }
  });

  return (
    <div className="space-y-4">
      <div className="rounded border p-4">
        <h2 className="mb-3 font-semibold">Controle de rodada crash</h2>
        <div className="grid gap-3 md:grid-cols-4">
          <div>
            <Label htmlFor="crash-user">Usuário</Label>
            <Input id="crash-user" value={userId} onChange={(e) => setUserId(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="crash-amount">Valor da aposta</Label>
            <Input id="crash-amount" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
          </div>
          <div>
            <Label htmlFor="crash-multi">Multiplicador</Label>
            <Input id="crash-multi" type="number" value={multiplier} onChange={(e) => setMultiplier(Number(e.target.value))} />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button onClick={() => roundMutation.mutate({})}>Gerar rodada</Button>
          <Button variant="outline" onClick={() => betMutation.mutate({ userId, amount, roundId })}>
            Apostar
          </Button>
          <Button variant="outline" onClick={() => cashoutMutation.mutate({ userId, betId, multiplier })}>
            Cashout
          </Button>
        </div>
      </div>
      <div className="rounded border p-4 text-sm">
        <p>Round atual: {roundId || '-'}</p>
        <p>Bet atual: {betId || '-'}</p>
        <p>Resultado: {result || 'Sem operações'}</p>
      </div>
    </div>
  );
}
