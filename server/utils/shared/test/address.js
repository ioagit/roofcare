/**
 * Created by isuarez on 4/18/2014.
 */

var mongoose  = require('mongoose')
    , Monky     = require('monky')
    , monky     = new Monky(mongoose)
    , path = require('path')
    , contractor = require(path.join(process.cwd(), 'server', 'models', 'Address'));


monky.factory('Address', {

    Latitude: 25.781653,
    Longitude: -80.130808,
    Street: '1020 Ocean Drive',
    City: 'Miami Beach',
    State: 'FL',
    Country: 'USA',
    ZipCode: '33139'

}, function (err) {
    if (err)
        console.log(err);
} );

module.exports.mock = monky;
