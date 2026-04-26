import { z } from 'zod';

export const serviceSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string().default('geral'),
  online: z.boolean(),
  updatedAt: z.string().optional()
});

export const statsSchema = z.object({
  activeUsers: z.number(),
  totalBalance: z.number(),
  onlineServices: z.number(),
  offlineServices: z.number(),
  activity: z.array(z.object({ date: z.string(), value: z.number() })).default([])
});

export const logSchema = z.object({
  id: z.string(),
  level: z.enum(['info', 'warn', 'error', 'debug']),
  service: z.string(),
  message: z.string(),
  timestamp: z.string()
});

export const creditFormSchema = z.object({
  userId: z.string().min(1, 'Informe o usuário'),
  amount: z.coerce.number().positive('Valor precisa ser positivo')
});

export const crashRoundSchema = z.object({ seed: z.string().optional() });
export const crashBetSchema = z.object({
  userId: z.string().min(1),
  roundId: z.string().min(1),
  amount: z.coerce.number().positive()
});
export const crashCashoutSchema = z.object({
  userId: z.string().min(1),
  betId: z.string().min(1),
  multiplier: z.coerce.number().positive()
});
