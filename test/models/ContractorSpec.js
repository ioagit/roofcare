/**
 * Created by isuarez on 4/17/14.
 */

var expect = require('chai').expect;
var assert= require('chai').assert;
var path = require('path');

var contractor = require(path.join(process.cwd(), 'server', 'models', 'Contractor'));
var addresses = require(path.join(process.cwd(), 'server', 'models', 'Address')).Model;
var mockContractor =  require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'mocks','contractorMock'));
var addressMock =  require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'mocks', 'addressMock'));


describe.skip('Contractor', function() {

    var address;

    beforeEach(function(done) {
        var suite = this;
        addressMock.create( function(err, obj) {
            if (err) return done(err);
            address = obj;
            done();
        });
    });
    afterEach(function(done) {
        addresses.remove({id: address.id}, function(err, result) {
            return done(err, result);
        });
    });


    it('should not save without username', function(done) {
        mockContractor.build('Contractor', function(err, contractor) {
            contractor.username = undefined;
            contractor.save(function(err) {
                expect(err).not.to.be.null;
                done();
                // Expect err
            });
        });
    });

    it('should save contractor with valid data', function(done) {
        mockContractor.build('Contractor', function(err, contractor) {
            contractor.save(done);
        });
    });

});

// Alternatively one can create a new user using before hook
describe('Contractor', function() {

});



