import type {
  CrashBetResponse,
  CrashCashoutResponse,
  CrashRoundResponse,
  CreditResponse,
  LogItem,
  Service,
  Stats
} from '@/types/api';

export const fallbackServices: Service[] = [
  { id: 'svc-1', name: 'Gateway PIX', category: 'pagamentos', online: true },
  { id: 'svc-2', name: 'Engine Crash', category: 'games', online: true },
  { id: 'svc-3', name: 'Notificações', category: 'infra', online: false }
];

export const fallbackStats: Stats = {
  activeUsers: 42,
  totalBalance: 12345.67,
  onlineServices: 2,
  offlineServices: 1,
  activity: Array.from({ length: 7 }).map((_, idx) => ({ date: `D-${6 - idx}`, value: 10 + idx * 4 }))
};

export const fallbackLogs: LogItem[] = [
  {
    id: 'log-1',
    level: 'info',
    service: 'mock',
    message: 'API indisponível, exibindo modo fallback.',
    timestamp: new Date().toISOString()
  }
];

export const fallbackCredit: CreditResponse = { success: true, balance: 1000, message: 'Crédito simulado aplicado.' };
export const fallbackRound: CrashRoundResponse = { roundId: 'round-mock', multiplier: 1.5, status: 'created' };
export const fallbackBet: CrashBetResponse = { betId: 'bet-mock', balance: 900, potentialWin: 150 };
export const fallbackCashout: CrashCashoutResponse = { payout: 150, balance: 1050, status: 'cashed_out' };
