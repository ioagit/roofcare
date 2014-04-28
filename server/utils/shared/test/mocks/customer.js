var mongoose  = require('mongoose')
    , Monky     = require('monky')
    , monky     = new Monky(mongoose)
    , path = require('path')
    ,faker = require('Faker')
    ,lookups = require(path.join(process.cwd(), 'server', 'models', 'lookups'))
    ,customer = require(path.join(process.cwd(), 'server', 'models', 'Customer'));


monky.factory('Customer', {

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

    },

    function (err) {

    if (err)
        console.log(err);
} );

module.exports.mock = monky;