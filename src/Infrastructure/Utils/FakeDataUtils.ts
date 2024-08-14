import { SexType, faker } from '@faker-js/faker';

export default class FakeDataUtils {
    static GetFirstName(gender: string) {
        return faker.person.firstName(<SexType>gender);
    }

    static GetLastName(gender: string) {
        return faker.person.lastName(<SexType>gender);
    }

    static GenerateRandomFemaleFirstAndLastName(gender: string) {
        return faker.person.fullName({ sex: <SexType>gender });
    }

    static GenerateRandomGuid() {
        return faker.string.uuid();
    }

    static GenerateRandomNumber(lenght: number = 14) {
        return faker.string.numeric(lenght);
    }

    static GetEmptyGuid() {
        return '00000000-0000-0000-0000-000000000000';
    }

    static GetFakeDob() {
        return faker.date.birthdate({ min: 18, max: 65, mode: 'age' });
    }

    static GenerateRandomNumberBetween(min: number, max: number) {
        return faker.number.int({ min, max });
    }

    static GetStreetAddress() {
        return faker.location.streetAddress();
    }
}
