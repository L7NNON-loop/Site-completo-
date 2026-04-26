import { describe, expect, it, vi } from 'vitest';
import { ApiError, apiRequest } from '../../src/lib/api/client';

describe('apiRequest', () => {
  it('retorna payload em sucesso', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        headers: { get: () => 'application/json' },
        json: async () => ({ ok: true })
      })
    );

    const result = await apiRequest('/health');
    expect(result).toEqual({ ok: true });
  });

  it('lança ApiError em falha', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        headers: { get: () => 'application/json' },
        json: async () => ({ message: 'erro' })
      })
    );

    await expect(apiRequest('/x')).rejects.toBeInstanceOf(ApiError);
  });
});
