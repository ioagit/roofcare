var expect = require('chai').expect;
var assert= require('chai').assert;
var path = require('path');
var async = require('async');

var geocoder = require('node-geocoder').getGeocoder('google', 'http');

/*
 http://blog.stephenwyattbush.com/2011/07/16/geocoding-with-nodejs

 https://www.npmjs.org/package/node-geocoder
*/

describe('Geocoder tests', function () {

    it('Find geo location data for the city of Alanta, GA', function(done) {
        var geoData;

        geocoder.geocode('29 champs elysée paris', function(err, data) {
            geoData = data[0];
            assert(geoData !== null, 'Geo data should not be null');
            //assert(geoData.country === 'France', 'location should be in france');
            console.log(geoData);
            done();
        });
    });
});

