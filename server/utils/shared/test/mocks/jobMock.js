/**
 * Created by isuarez on 4/27/14.
 */

var mongoose  = require('mongoose')
    , path = require('path')
    ,faker = require('Faker')
    ,Job =  require(path.join(process.cwd(), 'server', 'models', 'Job')).Model
    ,lookups = require(path.join(process.cwd(), 'server', 'models', 'lookups'))
    ,_ = require('underscore');

function build() {

    return  new Job(
        {
            Contractor: mongoose.Types.ObjectId(),
            Customer: mongoose.Types.ObjectId(),
            OnSiteContact: {
                firstName: faker.Name.firstName(),
                lastName: faker.Name.lastName(),
                salutation: faker.random.name_prefix ,
                email: faker.Internet.email(),
                phone: faker.PhoneNumber.phoneNumberFormat(0)
            },
            //Dates are from now for the next two weeks
            StartDate: faker.Date.between(new Date(), new Date(+new Date + 12096e5)),
            Status: faker.random.array_element(_.values(lookups.jobStatus) ),
            WorkSite:  mongoose.Types.ObjectId(),
            OrderType: faker.random.array_element(_.values(lookups.orderType) ),
            RoofType: faker.random.array_element(_.values(lookups.roofType) )
        });

}

module.exports = {
   build: build
}
