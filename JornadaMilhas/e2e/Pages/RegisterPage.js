import { expect } from "@playwright/test";
import { ENDPOINTS } from "../constants/endpoints";
import BaseRegisterProfileForm from "./BaseRegisterProfileForm";

export class RegisterPage extends BaseRegisterProfileForm {
    
    constructor(page){
        super(page);
        this.page = page;
        this.pageHeader = page.getByText('Crie sua conta'); 
        this.termsCheckbox = page.getByRole('checkbox', { name: 'Li e aceito os termos e condições deste cadastro' })
        this.submitButton = page.getByRole('button', { name: 'CADASTRAR' });
        this.duplicatedEmailErrorMessage = page.getByText('Ocorreu um erro desconhecido');
    }

    async visitPage(){
        await this.page.goto(ENDPOINTS.register);
        await expect(this.page).toHaveURL(ENDPOINTS.register)  
        await expect(this.pageHeader).toBeVisible();
    }

    async checkTermBox(){
        await this.termsCheckbox.check();
    }

    async submitForm(){
        await this.submitButton.click();
    }

    async registerUser(user){
        await this.fillForm(user);
        await this.checkTermBox();
        await this.submitForm();
    }

    async expectDuplicatedEmailErrorMessage(){
        await expect(this.duplicatedEmailErrorMessage).toBeVisible();
        await expect(this.duplicatedEmailErrorMessage).toHaveText('Ocorreu um erro desconhecido');
    }
}