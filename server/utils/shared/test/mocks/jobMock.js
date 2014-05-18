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

function build() {

    var address = addressMock.build();
    var j =  new Job(
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
            //Dates are from now for the next two weeks
            startDate: faker.Date.between(new Date(), new Date(+new Date + 12096e5)),
            status: faker.random.array_element(_.values(lookups.jobStatus) ),
            workSite:  address,
            orderType: faker.random.array_element(_.values(lookups.orderType) ),
            roofType: faker.random.array_element(_.values(lookups.roofType) ),
            propertyType: faker.random.array_element(_.values(lookups.propertyType) )
        });

    return j;
}

module.exports = {
   build: build
}
