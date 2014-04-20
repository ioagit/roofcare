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

    it('Should return a full Address from user entered location information', function(done){
        Address.Build({street: '1 River Pl', city:'New York', state: 'NY', zipCode:'10036', country: 'USA'}, function(result)
        {
            expect(result).to.not.be.null;
            console.log(result);
            done();
        })
    });

    it('Should Find The Address For The Academy Of Arts In Mongo', function(done) {
        var academy = testData.locations.FisherIsland;
        expect(academy).to.not.be.null;
        Address.findOne({ Coordinates: academy.Coordinates},
            function (err, addr) {
                expect(addr).not.to.be.null;
                done();
               });
    });

    it('Latitude property should update Coordinates Field', function(){
        var address = new Address();
        address.Latitude = 25;
        expect(address.Latitude).to.eq(25);
        expect(address.Coordinates[0]).to.eq(25);
    });

    it('Longitude property should update Coordinates Field', function(){
        var address = new Address();
        address.Longitude = 25;
        expect(address.Longitude).to.eq(25);
        expect(address.Coordinates[1]).to.eq(25);
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
                    model2=obj;
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

    it('Find The closest location to Univision', function() {
        var univision = [25.813146, -80.350437];

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