import { generateRandomUser } from "../factories/userFactory";
import { test } from "../fixtures/fixtures";

test.describe('Smoke - Full User Flow', () => {
    test('Should register an user and login successfully', async ({ loginPage, registerPage}) => {
        const randomUser = generateRandomUser();
        await registerPage.registerUser(randomUser);
        await loginPage.fillAndSubmitLoginForm(randomUser.email, randomUser.password);
        await loginPage.successfulLogin();
    })
});