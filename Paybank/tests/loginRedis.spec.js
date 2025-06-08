import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashPage } from '../pages/DashPage';
import { cleanJobs, getJob } from '../support/redis';

test('Should insert a valid 2FA code and log in using Redis', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const dashPage = new DashPage(page)

  const account = {
    cpf: '00000014141',
    password: '147258'
  }

  await cleanJobs();

  await loginPage.visitPage();
  await loginPage.fillCPFAndContinue(account.cpf)
  await loginPage.fillPasswordAndContinue(account.password)

  //Checkpoint Strategy
  await page.getByRole('heading', {name:'Verificação em duas etapas'}).waitFor({timeout: 3000})

  const code = await getJob()
  await loginPage.fill2FACodeAndVerify(code)

  await expect(await dashPage.checkAccountBalance()).toContainText('R$')
});