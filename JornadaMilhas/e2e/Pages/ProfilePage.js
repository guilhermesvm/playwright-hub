import { expect } from "@playwright/test";
import { ENDPOINTS } from "../constants/endpoints";
import { formatDateEN } from "../utils/formatDate";
import BaseRegisterProfileForm from "./BaseRegisterProfileForm";

export class ProfilePage extends BaseRegisterProfileForm {
    constructor(page){
        super(page);
        this.page = page;
        this.pageBanner = page.getByRole('img', { name: 'Banner da tela de perfil' });
        this.pageHeader = page.getByRole('heading', { name: 'Dados pessoais' });
        this.signOutButton = page.getByRole('button', { name: 'DESLOGAR' });
        this.submitUpdateButton = page.getByRole('button', { name: 'ATUALIZAR' })
    }

    async visitPage(){
        await this.page.goto(ENDPOINTS.profile);
        await expect(this.page).toHaveURL(ENDPOINTS.profile);
        await expect(this.pageHeader).toBeVisible();
        await expect(this.pageHeader).toHaveText('Dados pessoais');
    }

    async updateUser(body){
        await this.fillForm(body);
    }

    async submitUpdateForm(){
        await this.submitUpdateButton.click();
    }

    async successfulUpdate(){
        await expect(this.page).toHaveURL(ENDPOINTS.home);
    }

    async assertSuccessfulDataUpdate(body){
        const normalizedBody = {
            ...body,
            birthDate: formatDateEN(body.birthDate),   
            email: await this.getEmailInputValue(),  
            confirmEmail: "",
            password: "",                              
            confirmPassword: ""                  
        };

         const fieldMap = {
            name: this.nameInput,
            birthDate: this.birthDateInput,
            cpf: this.cpfInput,
            city: this.cityInput,
            phone: this.phoneNumberInput,
            state: this.stateSelect,
            email: this.emailInput,
            password: this.passwordInput,
            confirmEmail: this.confirmEmailInput,       
            confirmPassword: this.confirmPasswordInput 
        };

        if(normalizedBody.gender !== undefined){
            expect(this.radioGender[normalizedBody.gender]).toBeChecked();
        }

        for(const [key, locator] of Object.entries(fieldMap)){
            if(normalizedBody[key] !== undefined){
                await expect(locator).toHaveValue(normalizedBody[key]);
            }
        }
    }
}