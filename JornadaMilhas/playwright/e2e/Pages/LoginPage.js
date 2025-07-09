import { expect } from "@playwright/test";

export class LoginPage {
    
    constructor(page){
        this.page = page;
    }

    get fieldEmail() {
        return this.page.getByTestId('input-email');
    }

    get fieldPassword() {
        return this.page.getByTestId('input-senha');
    }

    get submitButton(){
        return this.page.getByTestId('botao-acessar-conta')
    }

    async visitPage(){
        await this.page.goto('/auth/login');
        await expect(this.page).toHaveURL('/auth/login')
        const pageHeader = this.page.getByText('Login', { exact: true });
        await expect(pageHeader).toHaveText('Login');
    }

    async fillEmail(email){
        await this.fieldEmail.fill(email);
    }

    async fillPassword(password){
        await this.fieldPassword.fill(password);
    }

    async clickSubmitButton(){
        await this.submitButton.click();
    }

    async fillAndSubmitLoginForm(email, password){
        await this.fieldEmail.fill(email);
        await this.fieldPassword.fill(password);
        if(await this.submitButton.isEnabled()){
            await this.clickSubmitButton();
        }   
    }

    async successfulLogin(){
        await expect(this.page).toHaveURL('/home');
    }

    async invalidLoginErrorMessage() {
        const errorMessage = this.page.getByText('Você não está autorizado a');
        await expect(errorMessage).toBeVisible();
    }
}