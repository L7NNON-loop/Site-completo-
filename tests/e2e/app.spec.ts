import { expect, test } from '@playwright/test';

test('login + serviços + crash flow', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Usuário').fill('admin');
  await page.getByLabel('Senha').fill('123');
  await page.getByRole('button', { name: 'Entrar' }).click();

  await expect(page).toHaveURL(/dashboard/);
  await page.getByRole('link', { name: 'Serviços' }).click();
  await expect(page.getByText('Todas categorias')).toBeVisible();

  await page.getByRole('button', { name: 'Alternar' }).first().click();

  await page.getByRole('link', { name: 'Usuários' }).click();
  await page.getByLabel('ID do usuário').fill('user-1');
  await page.getByLabel('Valor').fill('100');
  await page.getByRole('button', { name: 'Creditar' }).click();

  await page.getByRole('link', { name: 'Crash' }).click();
  await page.getByLabel('Usuário').fill('user-1');
  await page.getByLabel('Valor da aposta').fill('10');
  await page.getByRole('button', { name: 'Gerar rodada' }).click();
  await page.getByRole('button', { name: 'Apostar' }).click();
  await page.getByRole('button', { name: 'Cashout' }).click();

  await expect(page.getByText('Resultado:')).toBeVisible();
});
