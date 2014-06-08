/**
 * Created by christopher erker on 6/8/14.
 */

var expect = require('chai').expect,
    assert = require('chai').assert,
    path = require('path'),
    async = require('async'),
    testData = require(path.join(process.cwd(), 'server', 'utils', 'shared','test', 'data' )),
    distance = require('google-distance');

describe('Module - Google Distance', function () {

    it ('return a correct result for 2 given coordinates', function(done) {

        var rico = testData.locations.RicoAddress.coordinates;
        var params = {
            mode: 'driving',
            units: 'metric',
            language: 'de-de',
            origin: '51.2395808,6.7273549',
            destination: rico[1] + ',' + rico[0]
        }

        distance.get(
            params,
            function(err, data) {
                if (err) return console.log(err);
                console.log(data);
                expect(data.distanceValue).to.be.eq(632481);
                done();
            });

    });

});