/**
 * Created by isuarez on 4/18/2014.
 */

var mongoose  = require('mongoose'),
    path = require('path'),
    faker = require('Faker'),
    Address = require(path.join(process.cwd(), 'server', 'models', 'Address')).Model;

function build() {
    return new Address(buildNonEntity());
}

function buildNonEntity()
{
    var entity = {
        coordinates: [
            parseFloat(faker.Address.longitude()),
            parseFloat(faker.Address.latitude())
        ],
        street: faker.Address.streetAddress(),
        city: faker.Address.city(),
        state: faker.Address.usState(),
        country: 'USA',
        zipCode: faker.Address.zipCode()
    };
   return entity;
}

module.exports = {
    build: build,
    buildNonEntity: buildNonEntity
};
