import { expect } from "@playwright/test";
import { ENDPOINTS } from "../constants/endpoints";

export class HomePage {

    constructor(page){
        this.page = page;
        this.pageHeader = page.getByTestId('titulo-passagens');
        this.oneWayButton = page.getByTestId('botao-somente-ida');
        this.openPassengerModalBtn = page.getByTestId('abrir-modal-passageiros');
        this.incrementAdultBtn = page.getByTestId('seletor-passageiro-adultos').getByRole('button', { name: 'Ícone do operador de adição' });
        this.incrementChildBtn = page.getByTestId('seletor-passageiro-criancas').getByRole('button', { name: 'Ícone do operador de adição' });
        this.incrementInfantBtn = page.getByTestId('seletor-passageiro-bebes').getByRole('button', { name: 'Ícone do operador de adição' })
        this.closePassengerModalBtn = page.getByTestId('fechar-modal-passageiros');
        this.dropdownFieldOrigin = page
        
            .getByTestId('campo-dropdown-origem')
            .getByLabel('Origem');
            
        this.dropdownFieldDestination = page
            .getByTestId('campo-dropdown-destino')
            .getByLabel('Destino');

        this.departureDateField = page.getByTestId('campo-data-ida');
        this.returnDateField = page.getByText('Data da volta');
        this.searchButton = page.getByTestId('botao-buscar-passagens');
        this.ticketsTitle = page.getByTestId('titulo-passagens');
        this.saleTitle = page.getByTestId('titulo-promocoes');
        this.statementTitle = page.getByTestId('titulo-depoimentos');
    }

    async visitPage(){
        await this.page.goto(ENDPOINTS.root);
        await expect(this.page).toHaveURL(ENDPOINTS.home)
        await expect(this.pageHeader).toBeVisible();
        await expect(this.pageHeader).toHaveText('Passagens');
    }

    async clickOneWayButton(){
        await this.oneWayButton.click();
    }

    async openPassengerModal(){
        await this.openPassengerModalBtn.click();
    }

    async setAdultPassenger(quantity){
        for(let i = 1; i < quantity; i++){
            await this.incrementAdultBtn.click();
        }
    
    }

    async setChildPassenger(quantity){
        for(let i = 0; i < quantity; i++){
            await this.incrementChildBtn.click();
        }
    }

     async setInfantPassenger(quantity){
        for(let i = 0; i < quantity; i++){
            await this.incrementInfantBtn.click();
        }
    }
    async closePassengerModal(){
        await this.closePassengerModalBtn.click();
    }

    async fillRoute(origin, destination){
        await this.dropdownFieldOrigin.fill(origin);
        await this.dropdownFieldOrigin.press('Enter');

        await this.dropdownFieldDestination.fill(destination);
        await this.dropdownFieldDestination.press('Enter');
    }

    async setDepartureDate(date){
        //const formattedDate = new Intl.DateTimeFormat('en-US').format(date)
        await this.departureDateField.fill(date);
    }

    async submitSearch(){
        await this.searchButton.click();
    }
}