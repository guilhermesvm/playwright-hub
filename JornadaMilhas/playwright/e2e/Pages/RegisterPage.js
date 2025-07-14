import { expect } from "@playwright/test";
import { ENDPOINTS } from "../constants/endpoints";

export class RegisterPage {
    constructor(page){
        this.page = page;
    }

    async visitPage(){
        await this.page.goto(ENDPOINTS.register);
        await expect(this.page).toHaveURL(ENDPOINTS.register)
        const pageHeading = this.page.getByText('Crie sua conta');  
        await expect(pageHeading).toBeVisible();
    }

    async fillForm(){
        const fieldName = this.page.getByRole('textbox', { name: 'Nome' });
        await fieldName.fill('Name');

        const birthDate = this.page.getByRole('textbox', { name: 'Data de Nascimento' });
        await birthDate.fill('03/05/2002')
    }
}