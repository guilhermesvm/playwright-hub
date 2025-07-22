import { expect } from "@playwright/test";
import { generateRandomUser } from "../factories/userFactory";
import { test } from "../fixtures/fixtures";
import { ENDPOINTS } from "../constants/endpoints";


test.describe('Register Page', () => {
    let randomUser;

    test.beforeEach(async () => {
        randomUser = generateRandomUser();
        console.log(randomUser);
    })
    test('Should complete registration with valid data', async ({ registerPage }) => {
        await expect(registerPage.submitButton).toBeDisabled();
        await registerPage.fillForm(randomUser);
        await registerPage.checkTermBox();
        await expect(registerPage.termsCheckbox).toBeChecked();
        await expect(registerPage.submitButton).toBeEnabled();
        await registerPage.submitForm();
        await expect(registerPage.page).toHaveURL(ENDPOINTS.login);
    });

    test('Should not register an user with an already used email', async ({ registerPage }) => {
        await expect(registerPage.submitButton).toBeDisabled();
        await registerPage.registerUser(randomUser);
        await expect(registerPage.page).toHaveURL(ENDPOINTS.login);

        await registerPage.visitPage();
        await registerPage.registerUser(randomUser);
        await registerPage.expectDuplicatedEmailErrorMessage();
    })
})