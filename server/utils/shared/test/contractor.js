var mongoose  = require('mongoose')
    , Monky     = require('monky')
    , monky     = new Monky(mongoose)
    , path = require('path')
    ,faker = require('Faker')
    ,lookups = require(path.join(process.cwd(), 'server', 'models', 'lookups'))
    ,encrypt = require(path.join(process.cwd(), 'server', 'utils', 'encryption'))
    ,contractor = require(path.join(process.cwd(), 'server', 'models', 'Contractor'));


monky.factory('Contractor', {

        //From User Schema
        username: '#n' + 'username',
        salt:  '12345',
        hashed_pwd: encrypt.hashPwd('12345', 'password'),
        password: 'password',
        roles: new Array([lookups.roles.contractor]),

        //From Person Schema
        contactInfo: {
              firstName: faker.Name.firstName(),
              lastName: faker.Name.lastName(),
              salutation: 'Mr',
              email: faker.Internet.email(),
              phone: faker.PhoneNumber.phoneNumberFormat(0)
       },

       //From Contractor Schema
       address: mongoose.Types.ObjectId(),

       jobs: [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()]

    },

    function (err) {

    if (err)
        console.log(err);
} );

module.exports.mock = monky;