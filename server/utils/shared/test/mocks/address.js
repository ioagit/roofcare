/**
 * Created by isuarez on 4/18/2014.
 */

var mongoose  = require('mongoose')
    , Monky     = require('monky')
    , monky     = new Monky(mongoose)
    , path = require('path')
    ,faker = require('Faker')
    , Address = require(path.join(process.cwd(), 'server', 'models', 'Address'));


monky.factory('Address',

    {
            Coordinates: new Array([faker.Address.latitude(), faker.Address.longitude()]),
            Street: faker.Address.streetAddress(),
            City: faker.Address.city(),
            State: faker.Address.usState(),
            Country: 'USA',
            ZipCode: faker.Address.zipCode()
    },

    function (err) {

        if (err)
            console.log(err);
    } );





module.exports.mock = monky;
