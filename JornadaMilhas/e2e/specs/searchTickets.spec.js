import { expect } from "@playwright/test";
import { normalizeToTitleCase } from "../utils/normalizeToTitleCase";
import { test } from "../fixtures/fixtures";

test.describe('Search Plane Tickets', () => {
    test('Should only search for one-way ticket', async ({ homePage, searchPage }) => {
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
        const departureDate = '12/07'
        await searchPage.isDisplayingTrip('Somente ida', origin, destination, departureDate);
    })
})