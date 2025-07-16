import { expect } from "@playwright/test";
import { test } from '../fixtures/fixtures';

test.describe('Login Page', () => {
    test('Should log in using valid credentials', async ({ loginPage }) => {
        const VALID_EMAIL = 'testing@qa.com'
        const VALID_PASSWORD = 'qatesting'

        await loginPage.fillAndSubmitLoginForm(VALID_EMAIL, VALID_PASSWORD);
        await loginPage.successfulLogin();
    })

    test('Should not log in using incorrect credentials', async ({ loginPage }) => {
        const INCORRECT_EMAIL = 'testasd@qa.com'
        const INCORRECT_PASSWORD = 'incorrectpassword123'

        await loginPage.fillAndSubmitLoginForm(INCORRECT_EMAIL, INCORRECT_PASSWORD);
        await expect(loginPage.authorizationErrorMessage).toBeVisible();     
    })

    test('Should not log in using invalid credentials', async ({ loginPage }) => {
        const INVALID_EMAIL = 'testasdqa.com'
        const INVALID_PASSWORD = 'asdjiasjidasd'

        await loginPage.fillEmail(INVALID_EMAIL)
        await loginPage.fillPassword(INVALID_PASSWORD)
        await expect(loginPage.emailErrorMessage).toBeVisible();
        await expect(loginPage.submitButton).toBeDisabled();
    }) 
    
    test('Should not log in using empty credentials', async({ loginPage }) => {
        await expect(loginPage.submitButton).toBeDisabled();
    })
})