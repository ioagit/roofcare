/**
 * Created by cerker on 4/13/14.
 */

var mongoose = require('mongoose');
var expect = require('chai').expect;
var path = require('path');
var async = require('async');

var testData = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'data'));

var addresses = require(path.join(process.cwd(), 'server', 'models', 'PhysicalAddress'));

describe('PhysicalAddress Model', function () {

    var PhysicalAddress = addresses.Model;

    it('Should Find The Address For The Academy Of Arts In Mongo', function() {
        var academy = testData.locations.AcademyOfArts;
        expect(academy).to.not.be.null;
        PhysicalAddress.findOne({ Latitude: academy.Latitude, Longitude: academy.Longitude },
            function (err, addr) {
                expect(addr).not.to.be.null;
               });
    });

    it('Should Be Allowed To Add A New PhyscialAddress In Mongo', function(done) {

        var model, model2, temp;

        async.series([
            function(callback) {
                temp = {Latitude:0.1, Longitude:0.1, Street:'1616 MockingBird Ln', City:'Miami',ZipCode: '11111', Country:'USA' };
                PhysicalAddress.create(temp, callback);
            },
            function(callback) {
                PhysicalAddress.findOne({Latitude:0.1, Longitude:0.1}, function(err,obj) {
                    model = obj;
                    expect(model).to.not.be.null;
                    model.ZipCode='22222';
                    callback();
                });
            },
            function(callback) {
                PhysicalAddress.findOne({Latitude:0.1, Longitude:0.1}, function(err,obj) {
                    model2=obj;
                    expect(model2).to.not.be.null;
                    expect(model2.ZipCode).to.eq('11111');
                    callback();
                });
            }
        ],
        function (err, results) {
            PhysicalAddress.remove({Latitude:0.1, Longitude:0.1}, done);
        });
    });

    it('Get Formatted Address Should Return A String With Correct Data', function() {
        var academy = testData.locations.AcademyOfArts;
        PhysicalAddress.findOne(                {
            Latitude: academy.Latitude,
            Longitude: academy.Longitude
        }, function (err, addr) {

            expect(addr).not.to.be.null;
            var f = addr.getFormattedAddress();
            expect(f).to.eq('Pariser Platz 4 Berlin Germany 10117');
        })
    });
});