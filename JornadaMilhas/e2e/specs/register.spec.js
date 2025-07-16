import { test } from "@playwright/test";
import { RegisterPage } from "../Pages/RegisterPage";

test.describe('Register Page', () => {
    test('Should log in with valid credentials', async ( {page} ) => {
        const registerPage = new RegisterPage(page);
        await registerPage.visitPage();
        await registerPage.fillForm();
    })
})