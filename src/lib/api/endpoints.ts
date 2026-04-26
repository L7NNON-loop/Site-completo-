import { apiRequest } from './client';
import {
  fallbackBet,
  fallbackCashout,
  fallbackCredit,
  fallbackLogs,
  fallbackRound,
  fallbackServices,
  fallbackStats
} from './fallbacks';
import type {
  CrashBetRequest,
  CrashBetResponse,
  CrashCashoutRequest,
  CrashCashoutResponse,
  CrashRoundRequest,
  CrashRoundResponse,
  CreditRequest,
  CreditResponse,
  LogItem,
  Service,
  Stats
} from '@/types/api';

async function withFallback<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export const api = {
  getServices: () => withFallback<Service[]>(() => apiRequest<Service[]>('/api/services'), fallbackServices),
  updateServiceStatus: (id: string, online: boolean) =>
    withFallback<Service>(
      () =>
        apiRequest<Service>(`/api/services/${id}/status`, {
          method: 'POST',
          body: JSON.stringify({ online })
        }),
      { id, name: `Serviço ${id}`, category: 'fallback', online }
    ),
  creditUser: (payload: CreditRequest) =>
    withFallback<CreditResponse>(
      () => apiRequest<CreditResponse>('/api/users/credit', { method: 'POST', body: JSON.stringify(payload) }),
      { ...fallbackCredit, balance: fallbackCredit.balance + payload.amount }
    ),
  getStats: () => withFallback<Stats>(() => apiRequest<Stats>('/api/stats'), fallbackStats),
  crashRound: (payload: CrashRoundRequest) =>
    withFallback<CrashRoundResponse>(
      () => apiRequest<CrashRoundResponse>('/api/games/crash/round', { method: 'POST', body: JSON.stringify(payload) }),
      fallbackRound
    ),
  crashBet: (payload: CrashBetRequest) =>
    withFallback<CrashBetResponse>(
      () => apiRequest<CrashBetResponse>('/api/games/crash/bet', { method: 'POST', body: JSON.stringify(payload) }),
      fallbackBet
    ),
  crashCashout: (payload: CrashCashoutRequest) =>
    withFallback<CrashCashoutResponse>(
      () =>
        apiRequest<CrashCashoutResponse>('/api/games/crash/cashout', { method: 'POST', body: JSON.stringify(payload) }),
      fallbackCashout
    ),
  getLogs: () => withFallback<LogItem[]>(() => apiRequest<LogItem[]>('/api/logs'), fallbackLogs)
};
