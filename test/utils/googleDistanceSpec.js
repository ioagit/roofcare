/**
 * Created by christopher erker on 6/8/14.
 */

var expect = require('chai').expect,
    path = require('path'),
    async = require('async'),
    testData = require(path.join(process.cwd(), 'server', 'utils', 'shared','test', 'data' )),
    geo = require(path.join(process.cwd(), 'server', 'utils','geo' )),
    gm = require('googlemaps');

describe('Module - Google Distance', function () {

    it('return a correct result for 2 given coordinates', function(done) {

        var rico = testData.locations.RicoAddress.coordinates;
        var origins = '51.2395808,6.7273549',
            destinations = rico[1] + ',' + rico[0],
            sensor = false,
            mode = 'driving',
            alternatives = false,
            avoid = false,
            units = 'metric',
            language = 'de-de';

        var callback = function(err, data) {
            if (err) return console.log(err);
            var travel = data.rows[0].elements[0];
            expect(Math.round(travel.distance.value/1000)).to.be.eq(632);
            done();
        };

        gm.distance (origins, destinations, callback, sensor, mode, alternatives, avoid, units, language);
    });

    it ('return static map from location', function(){

        var origin = testData.locations.RicoAddress.coordinates;
        var destination = testData.locations.Address02.coordinates;

        var originCoord = origin[1] + ',' + origin[0];
        var destCoord = destination[1] + ',' + destination[0];

        var center = [ (origin[1] + destination[1])/2, (origin[0] + destination[0])/2 ];

        var markers = [
            { 'location': originCoord, color:'red', label: 'O' },
            { 'location': destCoord, 'color': 'green', 'label': 'D' }
        ];

        var map = gm.staticMap(center, false, '200x200', false, false, 'roadmap', markers);
        expect(map).to.not.be.null;
    });

    it ('return coordinates from street location', function(done) {
        var callback = function(err, r) {
            console.log(r);
            expect(r.results[0].geometry.location.lat).to.eq(41.8781136);
            expect(r.results[0].geometry.location.lng).to.eq(-87.6297982);
            done();
        };

        gm.geocode('Chicago , Il , USA', callback, 'false');
    });

    describe('geo', function() {

        it ('should return a properly formatted address object', function(done) {
            geo.getAddress('1 River Pl New York NY 10036', function(err, address) {
                if (err) done(err);
                expect(address.city).to.eq('New York City');
                expect(address.country).to.eq('USA');
                console.log(address);

                done();
            })
        });

        it('Should return a full Address from user entered location information in Munich', function(done){
            geo.getAddress('Putzbrunner-Str 173 81739 München',
                function(err, address)
                {
                    expect(address).to.not.be.null;
                    expect(address.city).to.eq('München');
                    console.log(address);
                    done();
                })
        });

        it ('should return the driving distance for 2 locations', function(done){

            var destination = testData.locations.RicoAddress.coordinates;
            var origin = [6.7273549,51.2395808];

            geo.getDrivingDistance(origin, destination, function(err, distance) {
                if (err) done(err);
                expect(distance).to.eq(632.49);
                done();
            })
        });

        it('originCoordinates should return an error', function(done) {
            geo.getDrivingDistance(null, false, function (err, distance) {
                expect(err).to.not.be.null;
                expect(err.message).to.eq('originCoordinates are not valid');
                expect(distance).to.be.null;
                done();
            });
        });

        it('destinationCoordinates should return an error', function(done){
            geo.getDrivingDistance(testData.locations.RicoAddress.coordinates, false, function(err, distance) {
                expect(err).to.not.be.null;
                expect(err.message).to.eq('destinationCoordinates are not valid');
                expect(distance).to.be.null;
                done();
            });
        });

        it('getStaticMap should return a map url', function(){

            var map = geo.getStaticMap(
                testData.locations.RicoAddress.coordinates,
                testData.locations.Address02.coordinates);

            expect(map).to.not.be.null;
            expect(map).to.have.string('http://maps.googleapis.com/maps/api/staticmap?');
            expect(map).to.have.string('zoom=false');
        })
    });
});