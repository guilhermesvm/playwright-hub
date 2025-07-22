import { Gender } from "../models/User";
import { formatDateEN } from "../utils/formatDate";

export default class BaseRegisterProfileForm{
    constructor(page){
        this.page = page;
        this.nameInput = page.getByRole('textbox', { name: 'Nome' });
        this.birthDateInput = page.getByRole('textbox', { name: 'Data de Nascimento' });
        this.radioMaleGender = page.getByRole('radio', { name: 'Masculino' });
        this.radioFemaleGender = page.getByRole('radio', { name: 'Feminino' });
        this.radioOtherGender = page.getByRole('radio', { name: 'Prefiro não informar' });

        this.radioGender = {
            [Gender.MALE]: this.radioMaleGender,
            [Gender.FEMALE]: this.radioFemaleGender,
            [Gender.OTHER]: this.radioOtherGender
        }
        this.cpfInput = page.getByRole('textbox', { name: 'CPF' })
        this.cityInput = page.getByRole('textbox', { name: 'Cidade' })
        this.phoneNumberInput = page.getByRole('textbox', { name: 'Telefone' })
        this.stateSelect = page.getByRole('combobox', { name: 'Estado' })
        this.emailInput = page.getByRole('textbox', { name: 'E-mail', exact: true })
        this.passwordInput = page.getByRole('textbox', { name: 'Senha', exact: true })
        this.confirmEmailInput = page.getByRole('textbox', { name: 'Confirmar E-mail' })
        this.confirmPasswordInput = page.getByRole('textbox', { name: 'Confirmar Senha' })
        this.submitButton = page.getByRole('button', { name: 'CADASTRAR' });
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
        const genderRadioLocator = this.radioGender[gender];
        await genderRadioLocator.check();
        await this.cpfInput.fill(cpf);
        await this.cityInput.fill(city);
        await this.phoneNumberInput.fill(phone);
        await this.stateSelect.fill(state);
        await this.stateSelect.press('Enter');
        await this.emailInput.fill(email)
        await this.confirmEmailInput.fill(confirmEmail);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(confirmPassword); 
    }

    async submitForm(){
        await this.submitButton.click();
    }
}