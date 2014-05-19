/**
 * Created by cerker on 4/13/14.
 */

var mongoose = require('mongoose'),
    expect = require('chai').expect,
    path = require('path'),
    async = require('async'),
    testData = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'data')),
    Address = require(path.join(process.cwd(), 'server', 'models', 'Address'));

describe('Model - Address', function () {

    it('Should return a full Address from user entered location information', function(done){
        Address.Build({street: '1 River Pl', city:'New York', state: 'NY', zipCode:'10036', country: 'USA'}, function(result)
        {
            expect(result).to.not.be.null;
            expect(result.street).to.eq('1 River Place');
            console.log(result);
            done();
        })
    });

    it('Should refresh Lat/Long only if address has changed', function(done){
        var oceanDrive = testData.locations.OceanDrive;
        var destination =  {
            coordinates: [oceanDrive.coordinates[0], oceanDrive.coordinates[1]],
            street: '27 E Star Island Dr',
            city: 'Miami Beach',
            state: 'FL',
            zipCode: '33139'
        };

        Address.RefreshCoordinates(oceanDrive, destination, function(err, coordinates){
            expect(err).to.be.null;
            expect(coordinates[1]).not.to.eq(oceanDrive.coordinates[1]);
            expect(coordinates[0]).not.to.eq(oceanDrive.coordinates[0]);
            done();
        });
    });

    it('Get Formatted Address Should Return A String With Correct Data', function() {
        var academy = testData.locations.AcademyOfArts;
        var f = Address.GetFormattedAddress(academy);
        expect(f).to.eq('Pariser Platz 4 Berlin Germany 10117');
    });
});