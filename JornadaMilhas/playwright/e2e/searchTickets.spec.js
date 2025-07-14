import { test,  expect } from "@playwright/test";
import { HomePage } from "./Pages/HomePage";
import { SearchPage } from "./Pages/SearchPage";
import { normalizeToTitleCase } from "./utils/normalizeToTitleCase";

test.describe('Search Plane Tickets', () => {
    test('Should only search for one-way ticket', async ({ page }) => {
        const homePage = new HomePage(page);
        const searchPage = new SearchPage(page);

        await homePage.visitPage();
        await homePage.clickOneWayButton();

        await homePage.openPassengerModal();
        await homePage.setAdultPassenger(3);
        await homePage.setChildPassenger(2);
        await homePage.setInfantPassenger(2);
        await homePage.closePassengerModal();

        let origin = 'minas gerais';
        let destination  = 'rio de janeiro';
        await homePage.fillRoute(origin, destination);

        const randomDate = '07/12/2025';
        await homePage.setDepartureDate(randomDate);
        await expect(homePage.returnDateField).toBeDisabled();
        await homePage.submitSearch();

        origin = normalizeToTitleCase(origin);
        destination = normalizeToTitleCase(destination);
        await searchPage.isDisplayingTrip('Somente ida', origin, destination);
    })
})