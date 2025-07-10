import { expect } from "@playwright/test";

export class HomePage {

    constructor(page){
        this.page = page;
        this.pageHeader = page.getByTestId('titulo-passagens');
        this.oneWayButton = page.getByRole('button', { name: 'SOMENTE IDA' });
        this.passengerModal = page.getByTestId('abrir-modal-passageiros');
        this.incrementAdultBtn = page.getByTestId('seletor-passageiro-adultos').getByRole('button', { name: 'Ícone do operador de adição' });
        this.incrementKidsBtn = page.getByTestId('seletor-passageiro-criancas').getByRole('button', { name: 'Ícone do operador de adição' });
        this.incrementBabyBtn = page.getByTestId('seletor-passageiro-bebes').getByRole('button', { name: 'Ícone do operador de adição' });
        this.dropdownFieldOrigin = page
            .getByTestId('campo-dropdown-origem')
            .getByLabel('Origem');
    }

    async visitPage(){
        await this.page.goto('/');
        await expect(this.page).toHaveURL('/home')
        await expect(this.pageHeader).toBeVisible();
        await expect(this.pageHeader).toHaveText('Passagens');
    }

    async openPassengerModal(){
        await this.passengerModal.click();
        const adultCount = this.page.getByText('1', { exact: true });
        await expect(adultCount).toBeVisible();
        await this.incrementAdultBtn.click();
        await expect(this.page.getByText('2', { exact: true })).toBeVisible();

    }
}