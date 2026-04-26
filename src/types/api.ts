export type Service = {
  id: string;
  name: string;
  category: string;
  online: boolean;
  updatedAt?: string;
};

export type Stats = {
  activeUsers: number;
  totalBalance: number;
  onlineServices: number;
  offlineServices: number;
  activity: Array<{ date: string; value: number }>;
};

export type LogItem = {
  id: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  service: string;
  message: string;
  timestamp: string;
};

export type CreditRequest = { userId: string; amount: number };
export type CreditResponse = { success: boolean; balance: number; message?: string };

export type CrashRoundRequest = { seed?: string };
export type CrashRoundResponse = { roundId: string; multiplier: number; status: string };

export type CrashBetRequest = { userId: string; amount: number; roundId: string };
export type CrashBetResponse = { betId: string; balance: number; potentialWin: number };

export type CrashCashoutRequest = { userId: string; betId: string; multiplier: number };
export type CrashCashoutResponse = { payout: number; balance: number; status: string };
