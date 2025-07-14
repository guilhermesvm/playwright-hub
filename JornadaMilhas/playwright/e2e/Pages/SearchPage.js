import { expect } from "@playwright/test";

export class SearchPage {
    constructor(page){
        this.page = page;
        this.oneWayText = page.getByTestId('texto-ida-volta')
        this.originContainer = page.getByTestId('container-origem');
        this.destinationContainer = page.getByTestId('container-destino');
        this.purchaseButton = page.getByTestId('botao-comprar');
        this.departureDate = page.getByTestId('texto-data-ida')
    }

    async isDisplayingTrip(ticketType, origin, destination, departureDate){
        await expect(this.oneWayText).toHaveText(ticketType);
        await expect(this.originContainer).toContainText(origin);
        await expect(this.destinationContainer).toContainText(destination);
        await expect(this.departureDate).toContainText(departureDate);
        await expect(this.purchaseButton).toBeVisible();
        await expect(this.purchaseButton).toBeEnabled();
    }
}