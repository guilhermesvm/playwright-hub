export const Gender = Object.freeze({
    MALE: 'Masculino',
    FEMALE: 'Feminino',
    OTHER: 'Prefiro não informar'
});

export class User {
    constructor({ name, birthDate, gender, cpf, phone, city, state, email, password }){
        this.name = name;
        this.birthDate = birthDate;
        this.gender = gender;
        this.cpf = cpf;
        this.phone = phone;
        this.city = city;
        this.state = state;
        this.email = email;
        this.password = password;
    }
}