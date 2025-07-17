import { expect } from "@playwright/test";
import { generateRandomUser } from "../factories/userFactory";
import { test } from "../fixtures/fixtures";
import { ENDPOINTS } from "../constants/endpoints";


test.describe('Register Page', () => {
    test('Should complete registration with valid data', async ({ registerPage }) => {
        const randomUser = generateRandomUser();
        console.log(randomUser);
        
        await expect(registerPage.submitButton).toBeDisabled();
        await registerPage.fillForm(randomUser);
        await expect(registerPage.termsCheckbox).toBeChecked();
        await expect(registerPage.submitButton).toBeEnabled();
        await registerPage.submitForm();
        await expect(registerPage.page).toHaveURL(ENDPOINTS.login);
    });
})