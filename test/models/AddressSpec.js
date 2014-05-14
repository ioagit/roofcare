/**
 * Created by cerker on 4/13/14.
 */

var mongoose = require('mongoose');
var expect = require('chai').expect;
var assert = require('chai').assert;
var path = require('path');
var async = require('async');
var testData = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'data'));
var addresses = require(path.join(process.cwd(), 'server', 'models', 'Address'));

describe('Address Model', function () {

    var Address = addresses.Model;

    before( function(done){
       testData.createTestLocations(done);
    });

    after( function(done){
        testData.removeAllLocations(done);
    });

    it('Should return a full Address from user entered location information', function(done){
        Address.Build({street: '1 River Pl', city:'New York', state: 'NY', zipCode:'10036', country: 'USA'}, function(result)
        {
            expect(result).to.not.be.null;
            expect(result.Street).to.eq('1 River Place');
            console.log(result);
            done();
        })
    });

    it('Should Find The Address For Fisher Island In Mongo', function(done) {
        var fisherIsland = testData.locations.FisherIsland;
        expect(fisherIsland).to.not.be.null;
        Address.findOne({ Coordinates: fisherIsland.Coordinates},
            function (err, addr) {
                expect(addr).not.to.be.null;
                done();
               });
    });

    it('Should refresh Lat/Long only if address has changed', function(done){
        var oceanDrive = testData.locations.OceanDrive;

        var sourceAddress;
        async.series(
            [
                function(callback) {
                    Address.findOne({ Coordinates: oceanDrive.Coordinates}, function (err, found) {
                        sourceAddress = found;
                        sourceAddress.save(function(){

                            expect(sourceAddress.Latitude).to.eq(oceanDrive.Coordinates[1]);
                            expect(sourceAddress.Longitude).to.eq(oceanDrive.Coordinates[0]);
                            sourceAddress.Street = '27 E Star Island Dr';
                            sourceAddress.City = 'Miami Beach';
                            sourceAddress.State = 'FL';
                            sourceAddress.ZipCode = '33139';
                            callback();
                        });

                    });
                },
                function(callback){
                    Address.UpdateIfNeeded(sourceAddress, callback);
                },
                function(callback) {
                    Address.findById(sourceAddress.id, function (err, found) {
                        sourceAddress = found;
                        expect(sourceAddress.Latitude).not.to.eq(oceanDrive.Coordinates[1]);
                        expect(sourceAddress.Longitude).not.to.eq(oceanDrive.Coordinates[0]);
                        callback();
                    })
                }
            ],
            function () {
                sourceAddress.Street = oceanDrive.Street;
                sourceAddress.Latitude = oceanDrive.Coordinates[1];
                sourceAddress.Longitude = oceanDrive.Coordinates[0];
                sourceAddress.save(done);
            });
    });

    it('Latitude property should update Coordinates Field', function(){
        var address = new Address();
        address.Latitude = 25;
        expect(address.Latitude).to.eq(25);
        expect(address.Coordinates[1]).to.eq(25);
    });

    it('Longitude property should update Coordinates Field', function(){
        var address = new Address();
        address.Longitude = 25;
        expect(address.Longitude).to.eq(25);
        expect(address.Coordinates[0]).to.eq(25);
    });

    it('Should Be Allowed To Add A New PhyscialAddress In Mongo', function(done) {

        var coord = {Coordinates: [0.1, 0.1]};
        var model, model2, temp;

        async.series([
            function(callback) {
                Address.remove(coord, callback);
            },
            function(callback) {
                temp = { Street:'1616 MockingBird Ln', City:'Miami',ZipCode: '11111', Country:'USA', Coordinates:[0.1,0.1] };
                Address.create(temp, callback);
            },
            function(callback) {
                Address.findOne(coord, function(err,obj) {
                    model = obj;
                    console.log(obj);
                    expect(model).to.not.be.null;
                    model.ZipCode='22222';
                    callback();
                });
            },
            function(callback) {
                Address.findOne(coord, function(err,obj) {
                    model2 = obj;
                    expect(model2).to.not.be.null;
                    expect(model2.ZipCode).to.eq('11111');
                    callback();
                });
            }
        ],
        function () {
            Address.remove(coord, done);
        });
    });

    it('Get Formatted Address Should Return A String With Correct Data', function() {
        var academy = testData.locations.AcademyOfArts;
        Address.findOne({Coordinates: academy.Coordinates}, function (err, addr) {
            expect(addr).not.to.be.null;
            var f = addr.getFormattedAddress();
            expect(f).to.eq('Pariser Platz 4 Berlin Germany 10117');
        })
    });

    it('Return closest location including distance', function(done){
        var univision = [ -80.350437, 25.813146];

        Address.aggregate([
            {
                $geoNear: {
                    near: univision,
                    distanceField: "distance",
                    maxDistance: 3,
                    spherical: false,
                    distanceMultiplier: 112,
                    includeLocs: "Coordinates",
                    num: 1
                }
            }
        ], function(err, result){
            console.log(err);
            console.log(result);
            expect(result[0].distance).to.be.above(0);
            done();
        });

    });

    it('Find The closest location to Univision', function() {
        var univision = [ -80.350437, 25.813146];

        Address.find( { Coordinates: { $near : univision , $maxDistance : 50} },
            function (err, addr) {
                expect(addr).not.to.be.null;
                assert(addr.length > 0, "At least one address was found");
                console.log(addr[0]);
                expect(addr[0].Coordinates[0]).to.eq(testData.locations.TheEnclave.Coordinates[0]);
                expect(addr[0].Coordinates[1]).to.eq(testData.locations.TheEnclave.Coordinates[1]);
            });
    })
});