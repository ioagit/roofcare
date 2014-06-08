var expect = require('chai').expect,
    assert = require('chai').assert,
    path = require('path'),
    async = require('async'),
    geocoder = require('node-geocoder').getGeocoder('google', 'https');

/*
 http://blog.stephenwyattbush.com/2011/07/16/geocoding-with-nodejs

 https://www.npmjs.org/package/node-geocoder
*/

describe('Module - Geocoder', function () {

    it('Find geo location data for the street in Germany', function(done) {
        var address = 'Heerdter Lohweg 89 Dusseldorf Germany 40549';
        geocoder.geocode(address, function(err, data) {
            var geoData = data[0];
            assert(geoData !== null, 'Geo data should not be null');
            assert(geoData.country === 'Germany', 'location should be in Germany');
            done();
        });
    });

    //Latitude = 51.2395808, longitude = 6.7273549
    it('Find address from Geo Location', function(done) {
        var geoData;
        geocoder.reverse(51.2395808, 6.7273549, function(err, data) {
            geoData = data[0];
            assert(geoData !== null, 'Geo data should not be null');
            assert(geoData.country === 'Germany', 'location should be in Germany');
            assert(geoData.city === 'Dusseldorf', 'location should be in Dusseldorf');
            expect(geoData.zipcode).to.eq('40549');
            expect(geoData.streetName).to.eq('Heerdter Lohweg');
            expect(geoData.streetNumber).to.eq('89');
            done();
        });
    })
});