var mongoose = require('mongoose'),
    path = require('path'),
    faker = require('Faker'),
    encrypt = require(path.join(process.cwd(), 'server', 'utils', 'encryption')),
    lookups = require(path.join(process.cwd(), 'server', 'models', 'lookups')),
    addressMock = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'mocks', 'addressMock')),
    Contractor = require(path.join(process.cwd(), 'server', 'models', 'Contractor')).Model;

function build() {

    return new Contractor({
            //From User Schema
            username: faker.Internet.email(),
            salt: '12345',
            hashed_pwd: encrypt.hashPwd('12345', 'password'),
            password: 'password',
            roles: [lookups.roles.contractor],
            distanceCharge: 3,

            //From Person Schema
            contactInfo: {
                firstName: faker.Name.firstName(),
                lastName: faker.Name.lastName(),
                salutation: 'Mr',
                email: faker.Internet.email(),
                phone: faker.PhoneNumber.phoneNumberFormat(0)
            },

            //From Contractor Schema
            address: addressMock.build()
        }
    );
}

module.exports.build = build;