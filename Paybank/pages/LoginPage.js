export class LoginPage {
    constructor(page) {
        this.page = page
    }

    async visitPage(){
        await this.page.goto('http://paybank-mf-auth:3000/')
    }

    async fillCPFAndContinue(cpf){
        await this.page.getByRole('textbox', { name: 'Digite seu CPF' }).fill(cpf);
        await this.page.getByRole('button', { name: 'Continuar' }).click();
    }

    async fillPasswordAndContinue(password){
        for(const digit of password){
            await this.page.getByRole('button', { name: digit }).click();
        }
        await this.page.getByRole('button', { name: 'Continuar' }).click();
    }

    async fill2FACodeAndVerify(code){
        await this.page.getByRole('textbox', { name: '000000' }).fill(code);
        await this.page.getByRole('button', { name: 'Verificar' }).click();
    } 
}