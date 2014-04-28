
var mongoose  = require('mongoose')
    , path = require('path')
    ,faker = require('Faker')
    ,lookups = require(path.join(process.cwd(), 'server', 'models', 'lookups'))
   ,Customer = require(path.join(process.cwd(), 'server', 'models', 'Customer')).Model;

function build() {

    return  new Customer(
        {
            //From User Schema
            roles: new Array([lookups.roles.customer]),

            //From Person Schema
            contactInfo: {
                firstName: faker.Name.firstName(),
                lastName: faker.Name.lastName(),
                salutation: faker.random.name_prefix ,
                email: faker.Internet.email(),
                phone: faker.PhoneNumber.phoneNumberFormat(0)
            },

            //From Contractor Schema
            address: mongoose.Types.ObjectId()
        });

}



module.exports = {
    build: build
}
