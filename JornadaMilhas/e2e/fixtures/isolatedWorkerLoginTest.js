import path from "path";
import fs from "fs";
import { test } from "./fixtures";
import { RegisterPage } from "../Pages/RegisterPage";
import { LoginPage } from "../Pages/LoginPage";
import { generateRandomUser } from "../factories/userFactory";
import { expect } from "@playwright/test";

export const loggedTest = test.extend({
    loginInfoFile: [async ({ browser }, use) => {
        const id = test.info().parallelIndex;
        const filePath = path.resolve(test.info().project.outputDir, `.auth/user-${id}.json`);

        if(fs.existsSync(filePath)){
            await use(filePath);
            return;
        }

        const page = await browser.newPage({ storageState: undefined});
        const registerPage = new RegisterPage(page);
        const loginPage = new LoginPage(page);
        const newUser = generateRandomUser();
        await page.goto('http://localhost:4200/auth/cadastro');
        await registerPage.registerUser(newUser);
        await expect(page).toHaveURL('http://localhost:4200/auth/login');
        await loginPage.fillAndSubmitLoginForm(newUser.email, newUser.password);
        await expect(page).toHaveURL('http://localhost:4200/home');

        await page.context().storageState({path: filePath});

        await use(filePath);
        await page.close();
    }, { scope: "worker" }],
    storageState: ({ loginInfoFile }, use) => use(loginInfoFile)
});