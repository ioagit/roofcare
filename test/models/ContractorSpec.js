/**
 * Created by isuarez on 4/17/14.
 */

var expect = require('chai').expect,
    path = require('path'),
    async = require('async'),
    testData = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'data')),
    contractor = require(path.join(process.cwd(), 'server', 'models', 'Contractor')),
    address = require(path.join(process.cwd(), 'server', 'models', 'Address')),
    mock =  require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'mocks','contractorMock')),
    addressMock =  require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'mocks', 'addressMock')),
    Contractor = contractor.Model,
    Address = address.Model;

describe('Contractor Model', function() {

    var contractor;

    it('should not save without username', function(done)
    {
        var contractor = mock.build();
        contractor.username = undefined;
        contractor.save(function(err) {
            expect(err).not.to.be.null;
            expect(err.name).to.eq('ValidationError');
            done();
        });
    });

    it('should save contractor with valid data', function(done) {
        contractor = mock.build();
        contractor.save(function(err) {
            expect(err).to.be.null;
            contractor.remove(done);
        });
    });

    it('should find the closest contractor to specified address', function(done){
        var contractor;
        var oldCoordinates;
        var contractorAddress;
        var foundAddress;

        async.series(
            [
                function(callback) {
                    testData.removeAllLocations(callback);
                },
                function(callback) {
                    Contractor.find({username: 'contractor1'}, function(err, found){
                        contractor = found[0];
                        callback();
                    });
                },
                function(callback){
                    Address.findById(contractor.address, function(err, address)
                    {
                        contractorAddress = address;
                        oldCoordinates = contractorAddress.Coordinates;
                        contractorAddress.Coordinates = testData.locations.OceanDrive.Coordinates;
                        contractorAddress.save(callback);
                    });
                },
                function(callback){
                    var findCoord = testData.locations.FisherIsland.Coordinates;
                    Contractor.FindClosest(findCoord, function(err, result) {
                        expect(err).to.be.null;
                        expect(result.length).to.be.eq(1);
                        foundAddress = result[0];
                        expect(foundAddress.distance).to.be.gt(2);
                        expect(foundAddress.distance).to.be.lt(3);

                        console.log(foundAddress._id + '');
                        //console.log(contractor.address);
                        //console.log(found);
                        callback();
                    });
                },
                function(callback) {
                    Address.findById( foundAddress._id, function(err,result){
                        expect(err).to.be.null;
                        expect(result).not.to.be.null;
                        console.log(result);
                        callback();
                    })
                }
            ],
            function() {
                contractorAddress.Coordinates = oldCoordinates;
                contractorAddress.save(done);
            });
    })
});