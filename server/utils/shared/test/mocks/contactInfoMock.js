/**
 * Created by christophererker on 6/6/14.
 */
var mongoose  = require('mongoose'),
    path = require('path'),
    faker = require('Faker'),
    lookups = require(path.join(process.cwd(), 'server', 'models', 'lookups')),
    _ = require('underscore');

function build()
{
    var entity = {
            firstName: faker.Name.firstName(),
            lastName: faker.Name.lastName(),
            salutation: faker.random.array_element(_.values(lookups.salutation) ),
            email: faker.Internet.email(),
            phone: faker.PhoneNumber.phoneNumberFormat(0)
        };

    return entity;
}

module.exports = {
    build: build
}