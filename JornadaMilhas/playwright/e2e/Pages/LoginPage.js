import { expect } from "@playwright/test";
import { ENDPOINTS } from "../constants/endpoints";

export class LoginPage {
    
    constructor(page){
        this.page = page;
        this.pageHeader = page.getByText('Login', { exact: true });
        this.emailField = page.getByTestId('input-email');
        this.passwordField = page.getByTestId('input-senha');
        this.submitButton = page.getByTestId('botao-acessar-conta');
    }

    async visitPage(){
        await this.page.goto(ENDPOINTS.login);
        await expect(this.page).toHaveURL(ENDPOINTS.login);
        await expect(this.pageHeader).toBeVisible();
        await expect(this.pageHeader).toHaveText('Login');
    }

    async fillEmail(email){
        await this.emailField.fill(email);
    }

    async fillPassword(password){
        await this.passwordField.fill(password);
    }

    async clickSubmitButton(){
        await this.submitButton.click();
    }

    async fillAndSubmitLoginForm(email, password){
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        if(await this.submitButton.isEnabled()){
            await this.clickSubmitButton();
        }   
    }

    async successfulLogin(){
        await expect(this.page).toHaveURL(ENDPOINTS.home);
    }

    async invalidLoginErrorMessage() {
        const errorMessage = this.page.getByText('Você não está autorizado a');
        await expect(errorMessage).toBeVisible();
    }
}