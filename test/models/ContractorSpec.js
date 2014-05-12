/**
 * Created by isuarez on 4/17/14.
 */

var expect = require('chai').expect,
    path = require('path'),
    async = require('async'),
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
        contractor.save(function(err, r) {
            expect(err).to.be.null;
            contractor.remove(done);
        });
    });

    it.skip ('should find the closest contractor to specified address', function(done){
        var contractor;
        var oldCoordinates;
        Contractor.find({username: 'contractor1'}, function(err, found){
            contractor = found;
            Address.findById(contractor.address, function(err, address)
            {
                oldCoordinates = address.Coordinates;
                address.Coordinates = [ -80.130808, 25.781653];
                address.save();
            });
        });
        done();
    })
});