import { test,  expect } from "@playwright/test";
import { HomePage } from "./Pages/HomePage";

test.describe('Search Plane Tickets', () => {
    test('Should only search for one-way ticket', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.visitPage();
        await homePage.clickOneWayButton();

        await homePage.openPassengerModal();
        await homePage.setAdultPassenger(3);
        await homePage.setChildPassenger(2);
        await homePage.setInfantPassenger(2);
        await homePage.closePassengerModal();

        const origin = 'rio grande do sul';
        const destination  = 'santa catarina';
        await homePage.setOriginAndDestination(origin, destination);
        await homePage.setDepartureDate(new Date());
        await homePage.searchForTickets();
    })
})