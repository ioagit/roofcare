/**
 * Created by isuarez on 4/27/14.
 */

var mongoose  = require('mongoose'),
    path = require('path'),
    faker = require('Faker'),
    Job =  require(path.join(process.cwd(), 'server', 'models', 'Job')).Model,
    lookups = require(path.join(process.cwd(), 'server', 'models', 'lookups')),
    addressMock = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'mocks', 'addressMock')),
    _ = require('underscore');

var counter = 0;

function build() {

    counter += 1;
    var address = addressMock.build();
    var orderType = faker.random.array_element(_.values(lookups.orderType));

    var j = new Job(
        {
            contractor: mongoose.Types.ObjectId(),
            customer: mongoose.Types.ObjectId(),
            onSiteContact: {
                firstName: faker.Name.firstName(),
                lastName: faker.Name.lastName(),
                salutation: faker.random.array_element(_.values(lookups.salutation) ),
                email: faker.Internet.email(),
                phone: faker.PhoneNumber.phoneNumberFormat(0)
            },

            invoice: {
                number: 'RC' + ("00000000" + counter).slice(-8),
                distanceCharge: Math.floor(Math.random() * 14) + 1,
                fixedPrice: orderType.fee
            },

            //Dates are from now for the next two weeks
            startDate: faker.Date.between(new Date(), new Date(+new Date + 12096e5)),
            status: faker.random.array_element(_.values(lookups.jobStatus) ),
            workSite:  address,
            orderType: orderType.name,
            roofType: faker.random.array_element(_.values(lookups.roofType) ),
            propertyType: faker.random.array_element(_.values(lookups.propertyType) )
        });

    return j;
}

module.exports = {
   build: build
};