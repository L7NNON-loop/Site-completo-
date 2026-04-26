import { describe, expect, it } from 'vitest';
import { toCurrency } from '../../src/lib/utils';

describe('toCurrency', () => {
  it('formata BRL', () => {
    expect(toCurrency(10)).toContain('10');
  });
});
