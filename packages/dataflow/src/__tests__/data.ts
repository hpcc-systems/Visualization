import * as faker from "faker";
import { expect } from "chai";

faker.seed(123);

export function person() {
    return {
        "fname": faker.name.firstName(),
        "lname": faker.name.lastName(),
        "age": faker.random.number(50) + 16,
        "job": faker.name.jobType(),
        "username": faker.internet.userName(),
        "email": faker.internet.email(),
        "address": {
            "street": faker.address.streetName(),
            "suite": faker.address.secondaryAddress(),
            "city": faker.address.city(),
            "zipcode": faker.address.zipCode(),
            "state": faker.address.stateAbbr(),
            "geo": {
                "lat": faker.address.latitude(),
                "lng": faker.address.longitude()
            }
        },
        "phone": faker.phone.phoneNumber(),
        "website": faker.internet.domainName(),
        "company": {
            "name": faker.company.companyName(),
            "catchPhrase": faker.company.catchPhrase(),
            "bs": faker.company.bs()
        }
    };
}
export type Person = ReturnType<typeof person>;

export function* people(total = 1000) {
    for (let i = 0; i < total; ++i) {
        yield person();
    }
}

function personLite() {
    return {
        "fname": faker.name.firstName(),
        "lname": faker.name.lastName(),
        "zipcode": faker.address.zipCode(),
        "state": faker.address.stateAbbr()
    };
}
export type PersonLite = ReturnType<typeof person>;

export function* peopleLite(total = 1000) {
    for (let i = 0; i < total; ++i) {
        yield personLite();
    }
}

export const population: Person[] = [...people()];

describe("data", () => {
    it("generate", () => {
        expect(population).to.have.lengthOf(1000);
    });
});
