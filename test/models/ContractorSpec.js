/**
 * Created by isuarez on 4/17/14.
 */

var expect = require('chai').expect,
    path = require('path'),
    async = require('async'),
    assert = require('chai').assert,
    testData = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'data')),
    contractor = require(path.join(process.cwd(), 'server', 'models', 'Contractor')),
    address = require(path.join(process.cwd(), 'server', 'models', 'Address')),
    mock =  require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'mocks','contractorMock')),
    addressMock =  require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'mocks', 'addressMock')),
    Contractor = contractor.Model,
    Address = address.Model;

describe('Contractor Model', function() {

    var contractor;
    var univision = [ -80.350437, 25.813146];

    it('should not save without username', function(done) {
        contractor = mock.build();
        contractor.username = undefined;
        contractor.save(function(err) {
            expect(err).not.to.be.null;
            expect(err.name).to.eq('ValidationError');
            done();
        });
    });

    describe('Contractor Entity', function() {

        before(function(done){
            contractor = mock.build();
            contractor.address = testData.locations.OceanDrive;
            contractor.save(done);
        });

        after(function(done){
            contractor.remove(done);
        });

        it('should save contractor with valid data', function(done) {
            Contractor.findById(contractor.id, function(err, entity){
                expect(err).to.be.null;
                expect(entity.id).to.eq(contractor.id);
                contractor = entity;
                done();
            })
        });

        it('Return closest location including distance', function(done){

            Contractor.aggregate([
                {
                    $geoNear: {
                        near: univision,
                        distanceField: "distance",
                        maxDistance: 5,
                        spherical: false,
                        distanceMultiplier: 112,
                        includeLocs: "address.coordinates",
                        uniqueDocs:true,
                        num: 1
                    }
                }
            ], function(err, result){
                console.log(err);
                console.log(result);
                expect(err).to.be.null;
                expect(result[0].distance).to.be.above(0);
                done();
            });
        });

        it('Find The closest location to Univision', function() {

            Contractor.find( { 'address.coordinates': { $near : univision , $maxDistance : 5} },
                function (err, addr) {
                    expect(addr).not.to.be.null;
                    assert(addr.length > 0, "At least one address was found");
                    var found = addr[0];
                    expect(found.address.coordinates[0]).to.eq(testData.locations.OceanDrive.coordinates[0]);
                    expect(found.address.coordinates[1]).to.eq(testData.locations.OceanDrive.coordinates[1]);
                });
        });

        it('latitude property should update coordinates Field', function() {
            contractor.address.latitude = 25;
            expect(contractor.address.latitude).to.eq(25);
            expect(contractor.address.coordinates[1]).to.eq(25);
        });

        it('longitude property should update coordinates Field', function(){
            contractor.address.longitude = 25;
            expect(contractor.address.longitude).to.eq(25);
            expect(contractor.address.coordinates[0]).to.eq(25);
        });
    });

    it('should find the closest contractor to specified address', function(done){
        var oldCoordinates;

        async.series(
            [
                function(callback) {
                    Contractor.find({username: 'contractor1'}, function(err, found){
                        contractor = found[0];
                        callback();
                    });
                },
                function(callback){
                    oldCoordinates = contractor.address.coordinates;
                    contractor.address.coordinates = testData.locations.TheEnclave.coordinates;
                    contractor.save(callback);
                },
                function(callback){
                    Contractor.FindClosest(univision, function(err, result) {
                        expect(err).to.be.null;
                        expect(result.length).to.be.eq(1);
                        var foundContractor = result[0];
                        expect(foundContractor.distance).to.be.gt(1);
                        expect(foundContractor.distance).to.be.lt(2);

                        console.log(' ' + foundContractor._id + ' == ' + contractor.id + '');

                        expect(contractor._id + '').to.eq(foundContractor._id + '');
                        callback();
                    });
                }
            ],
            function() {
                contractor.address.coordinates = oldCoordinates;
                contractor.address.save(done);
            });
    })
});