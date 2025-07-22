import { User } from "../models/User";
import { Faker, pt_BR } from "@faker-js/faker";
import { Gender } from "../models/User";

const faker = new Faker({locale: pt_BR})

export function generateRandomUser(){
    return new User({
        name: faker.person.fullName(),
        birthDate: faker.date.birthdate(),
        gender: faker.helpers.enumValue(Gender),
        cpf: faker.string.numeric(11),
        phone: faker.string.numeric(11),
        city: faker.location.city(),
        state: faker.location.state(),
        email: faker.internet.email(),
        password: faker.internet.password()
    })
}