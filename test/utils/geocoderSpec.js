/**
 * Created by christopher erker on 4/8/14.
 */

var expect = require('chai').expect,
    assert = require('chai').assert,
    path = require('path'),
    async = require('async'),
    gm = require('googlemaps');

describe('Module - Google-Maps', function () {

    it ('Find geo location data for the street in Germany', function(done) {

        var callback = function(err, data) {
            var geoData = data.results[0];
            var ac = geoData.address_components;

            expect(ac[0].types[0]).to.eq('street_number');
            expect(ac[0].long_name).to.eq('89');

            expect(ac[1].types[0]).to.eq('route');
            expect(ac[1].long_name).to.eq('Heerdter Lohweg');

            expect(ac[3].types[0]).to.eq('locality');
            expect(ac[3].long_name).to.eq('Düsseldorf');

            expect(ac[6].types[0]).to.eq('country');
            expect(ac[6].long_name).to.eq('Deutschland');

            expect(ac[7].types[0]).to.eq('postal_code');
            expect(ac[7].long_name).to.eq('40549');
            done();
        };

        var address = 'Heerdter Lohweg 89 Dusseldorf Germany 40549';
//        exports.geocode = function(address, callback, sensor, bounds, region, language)
        gm.geocode(address, callback, 'false', '', '', 'de');
    });

    //Latitude = 51.2395808, longitude = 6.7273549
    it('Find address from Geo Location', function(done) {
        var callback = function(err, data) {
            var raw = data.results[0];
            var geoData = raw.address_components;

            expect(geoData !== null, 'Geo data should not be null');
            expect(geoData[6].long_name).to.eq('Deutschland');
            expect(geoData[3].long_name).to.eq('Düsseldorf');
            expect(geoData[7].long_name).to.eq('40549');
            expect(geoData[1].long_name).to.eq('Heerdter Lohweg');
            expect(geoData[0].long_name).to.eq('89');
            done();
        };

        gm.reverseGeocode('51.2395808, 6.7273549' , callback , 'false' , 'de')

    })
});
