import { expect } from "@playwright/test";
import { ENDPOINTS } from "../constants/endpoints";
import BaseRegisterProfileForm from "./BaseRegisterProfileForm";

export class ProfilePage extends BaseRegisterProfileForm {
    constructor(page){
        super(page);
        this.page = page;
        this.pageBanner = page.getByRole('img', { name: 'Banner da tela de perfil' });
        this.pageHeader = page.getByRole('heading', { name: 'Dados pessoais' });
        this.signOutButton = page.getByRole('button', { name: 'DESLOGAR' });

    }

    async visitPage(){
        await this.page.goto(ENDPOINTS.profile);
        await expect(this.page).toHaveURL(ENDPOINTS.profile);
        await expect(this.pageHeader).toBeVisible();
        await expect(this.pageHeader).toHaveText('Dados pessoais');
    }
}