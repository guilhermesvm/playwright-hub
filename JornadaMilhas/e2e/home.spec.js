import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('Should visit initial page and check titles', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Jornada Milhas/);

    const ticketsTitle = page.getByTestId('titulo-passagens');
    await expect(ticketsTitle).toBeVisible();

    const saleTitle = page.getByTestId('titulo-promocoes');
    await expect(saleTitle).toBeVisible();

    const testimonyTitle = page.getByTestId('titulo-depoimentos');
    await expect(testimonyTitle).toBeVisible();
  })
})