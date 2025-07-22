import { test as base } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";
import { HomePage } from "../Pages/HomePage";
import { SearchPage } from "../Pages/SearchPage";
import { RegisterPage } from "../Pages/RegisterPage";
import { ProfilePage } from "../Pages/ProfilePage";

export const test = base.extend({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.visitPage();
        await use(homePage);
    },
    searchPage: async ({ page }, use) => {
        const searchPage = new SearchPage(page);
        //await searchPage.visitPage();
        await use(searchPage);
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.visitPage();
        await use(loginPage);
    },
    registerPage: async ({ page }, use) => {
        const registerPage = new RegisterPage(page);
        await registerPage.visitPage();
        await use(registerPage);
    },
    profilePage: async({ page }, use) => {
        const profilePage = new ProfilePage(page);
        await profilePage.visitPage();
        await use(profilePage);
    }

});