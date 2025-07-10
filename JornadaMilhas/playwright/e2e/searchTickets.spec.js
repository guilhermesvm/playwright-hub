import { test,  expect } from "@playwright/test";
import { HomePage } from "./Pages/HomePage";

test.describe('Search Plane Tickets', () => {
    test('Should only search for one-way ticket', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.visitPage();
        await homePage.openPassengerModal();
    })
})