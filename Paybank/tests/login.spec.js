import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { getLatest2FACode } from '../support/db';
import { DashPage } from '../pages/DashPage';

test('Should display an error when 2FA code is invalid', async ({ page }) => {
  const loginPage = new LoginPage(page)

  const account = {
    cpf: '00000014141',
    password: '147258'

  }
  await loginPage.visitPage();
  await loginPage.fillCPFAndContinue(account.cpf)
  await loginPage.fillPasswordAndContinue(account.password)
  await loginPage.fill2FACodeAndVerify('12123123124')
  await expect(page.locator('span')).toContainText('Código inválido. Por favor, tente novamente.');
});

test('Should insert a valid 2FA code and log in', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const dashPage = new DashPage(page)

  const account = {
    cpf: '00000014141',
    password: '147258'
  }

  await loginPage.visitPage();
  await loginPage.fillCPFAndContinue(account.cpf)
  await loginPage.fillPasswordAndContinue(account.password)
  await page.waitForTimeout(3000)
  const code = await getLatest2FACode();
  await loginPage.fill2FACodeAndVerify(code)
  await page.waitForTimeout(2000)
  expect(await dashPage.checkAccountBalance()).toContainText('R$')
});