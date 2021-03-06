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
        Address.Build({street: '1 River Pl', city:'New York', state: 'NY', zipCode:'10036', country: 'USA'},
            function(err, result)
        {
            expect(result).to.not.be.null;
            expect(result.street).to.eq('1 River Place');
            done();
        })
    });

    it('Should return a full Address from user entered location information in Munich', function(done){
        Address.Build({street: 'Putzbrunner-Str 173', city:'München', zipCode:'81739'},
            function(err, result)
            {
                expect(result).to.not.be.null;
                expect(result.city).to.eq('München');
                done();
            })
    });


    it('Should refresh Lat/Long only if address has changed', function(done){
        var Address02 = testData.locations.Address02;
        var destination =  {
            coordinates: [Address02.coordinates[0], Address02.coordinates[1]],
            street: '27 E Star Island Dr',
            city: 'Miami Beach',
            state: 'FL',
            zipCode: '33139'
        };

        Address.RefreshCoordinates(Address02, destination, function(err, coordinates){
            expect(err).to.be.null;
            expect(coordinates[1]).not.to.eq(Address02.coordinates[1]);
            expect(coordinates[0]).not.to.eq(Address02.coordinates[0]);
            done();
        });
    });

    it('Get Formatted Address Should Return A String With Correct Data', function() {
        var academy = testData.locations.AcademyOfArts;
        var f = Address.GetFormattedAddress(academy);
        expect(f).to.eq('Pariser Platz 4 Berlin Deutschland 10117');
    });
});