import { expect } from "@playwright/test";
import { ENDPOINTS } from "../constants/endpoints";
import { formatDateEN } from "../utils/formatDate";

export class RegisterPage {
    
    constructor(page){
        this.page = page;
        this.pageHeader = page.getByText('Crie sua conta'); 
        this.nameInput = page.getByRole('textbox', { name: 'Nome' });
        this.birthDateInput = page.getByRole('textbox', { name: 'Data de Nascimento' });
        this.cpfInput = page.getByRole('textbox', { name: 'CPF' })
        this.cityInput = page.getByRole('textbox', { name: 'Cidade' })
        this.phoneNumberInput = page.getByRole('textbox', { name: 'Telefone' })
        this.stateSelect = page.getByRole('combobox', { name: 'Estado' })
        this.emailInput = page.getByRole('textbox', { name: 'E-mail', exact: true })
        this.passwordInput = page.getByRole('textbox', { name: 'Senha', exact: true })
        this.confirmEmailInput = page.getByRole('textbox', { name: 'Confirmar E-mail' })
        this.confirmPasswordInput = page.getByRole('textbox', { name: 'Confirmar Senha' })
        this.termsCheckbox = page.getByRole('checkbox', { name: 'Li e aceito os termos e condições deste cadastro' })
        
        this.submitButton = page.getByRole('button', { name: 'CADASTRAR' });
        this.duplicatedEmailErrorMessage = page.getByText('Ocorreu um erro desconhecido')

    }

    getGenderRadio(gender){
        return this.page.getByRole('radio', { name: gender });
    }

    async visitPage(){
        await this.page.goto(ENDPOINTS.register);
        await expect(this.page).toHaveURL(ENDPOINTS.register)  
        await expect(this.pageHeader).toBeVisible();
    }

    async fillForm(user){
        const {
            name,
            birthDate,
            gender,
            cpf,
            city,
            phone,
            state,
            email,
            password,
            confirmEmail = email,       
            confirmPassword = password  
        } = user;

        await this.nameInput.fill(name);
        await this.birthDateInput.fill(formatDateEN(birthDate));
        await this.getGenderRadio(gender).check();
        await this.cpfInput.fill(cpf);
        await this.cityInput.fill(city);
        await this.phoneNumberInput.fill(phone);
        await this.stateSelect.fill(state);
        await this.stateSelect.press('Enter');
        await this.emailInput.fill(email)
        await this.confirmEmailInput.fill(confirmEmail);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(confirmPassword);
        await this.termsCheckbox.check();
    }

    async submitForm(){
        await this.submitButton.click();
    }

    async registerUser(user){
        await this.fillForm(user);
        await this.submitForm();
    }

    async expectDuplicatedEmailErrorMessage(){
        await expect(this.duplicatedEmailErrorMessage).toBeVisible();
        await expect(this.duplicatedEmailErrorMessage).toHaveText('Ocorreu um erro desconhecido');
    }
}