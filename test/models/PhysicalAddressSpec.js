/**
 * Created by cerker on 4/13/14.
 */

var mongoose = require('mongoose');
var expect = require('chai').expect;
var path = require('path');

var testData = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'data'));

require(path.join(process.cwd(), 'server', 'models', 'PhysicalAddress'));

describe('PhysicalAddress Model', function () {

    var PhysicalAddress;

    before(function (done) {
        PhysicalAddress = mongoose.model('PhysicalAddress');
        done();
    });


    it('Should Find The Address For The Academy Of Arts In Mongo', function() {
        var academy = testData.locations.AcademyOfArts;
        expect(academy).to.not.be.null;
        PhysicalAddress.findOne({ Latitude: academy.Latitude, Longitude: academy.Longitude },
            function (err, addr) {
                expect(addr).to.be.null;
               })
    });


    it('Get Formatted Address Should Return A String With Correct Data', function() {
        var academy = testData.locations.AcademyOfArts;
        PhysicalAddress.findOne(                {
            Latitude: academy.Latitude,
            Longitude: academy.Longitude
        }, function (err, addr) {
            var f = addr.getFormattedAddress();
            expect(f).to.eq('Pariser Platz 22 4 Berlin Germany 10117');
        })
    });

    it('dummy test should appear', function () {
        expect(1+1 == 2).to.be.true;
        expect(1+1 ==3).to.be.false;
    });

});