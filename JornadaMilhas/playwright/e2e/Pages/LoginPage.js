import { expect } from "@playwright/test";

export class LoginPage {
    constructor(page){
        this.page = page;
    }

    async visitPage(){
        await this.page.goto('/auth/login');
        await expect(this.page).toHaveURL('/auth/login')
        const pageHeader = this.page.getByText('Login', { exact: true });
        await expect(pageHeader).toHaveText('Login');
    }

    async submitLoginForm(email, password){
        const fieldEmail = this.page.getByTestId('input-email');
        const fieldPassword = this.page.getByTestId('input-senha');
        const submitFormButton = this.page.getByTestId('botao-acessar-conta');

        await fieldEmail.fill(email);
        await fieldPassword.fill(password);
        await submitFormButton.click();
    }

    async successfulLogin(){
        await expect(this.page).toHaveURL('/home');
    }
}