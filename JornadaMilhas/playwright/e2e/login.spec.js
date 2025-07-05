import test from "@playwright/test";
import { LoginPage } from "./Pages/LoginPage";

test.describe('Login Page', () => {
    test('Should log in using valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.visitPage();
        const VALID_EMAIL = 'testing@qa.com'
        const VALID_PASSWORD = 'qatesting'
        await loginPage.submitLoginForm(VALID_EMAIL, VALID_PASSWORD);
        await loginPage.successfulLogin();
    })
})