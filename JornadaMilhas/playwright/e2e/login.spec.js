import test, { expect } from "@playwright/test";
import { LoginPage } from "./Pages/LoginPage";

test.describe('Login Page', () => {
    test('Should log in using valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.visitPage();

        const VALID_EMAIL = 'testing@qa.com'
        const VALID_PASSWORD = 'qatesting'

        await loginPage.fillAndSubmitLoginForm(VALID_EMAIL, VALID_PASSWORD);
        await loginPage.successfulLogin();
    })

    test('Should not log in using incorrect credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.visitPage();

        const INCORRECT_EMAIL = 'testasd@qa.com'
        const INCORRECT_PASSWORD = 'incorrectpassword123'

        await loginPage.fillAndSubmitLoginForm(INCORRECT_EMAIL, INCORRECT_PASSWORD);
        const errorMessage = page.getByText('Você não está autorizado a acessar este recurso');
        await expect(errorMessage).toBeVisible();     
    })

    test('Should not log in using invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.visitPage();

        const INVALID_EMAIL = 'testasdqa.com'
        const INVALID_PASSWORD = 'asdjiasjidasd'

        await loginPage.fillEmail(INVALID_EMAIL)
        await loginPage.fillPassword(INVALID_PASSWORD)

        const fieldErrorMessage = page.getByText('E-mail inválido');
        await expect(fieldErrorMessage).toBeVisible();
        await expect(loginPage.submitButton).toBeDisabled();
    }) 
    
    test('Should not log in using empty credentials', async({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.visitPage();
        await expect(loginPage.submitButton).toBeDisabled();
    })
})