import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';


test.describe('Home Page', () => {
  test('Should visit initial page and check titles', async ({ homePage }) => {
    await expect(homePage.page).toHaveTitle(/Jornada Milhas/);
    await expect(homePage.ticketsTitle).toBeVisible();
    await expect(homePage.saleTitle).toBeVisible();
    await expect(homePage.statementTitle).toBeVisible();
  })
})