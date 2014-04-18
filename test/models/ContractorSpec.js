/**
 * Created by isuarez on 4/17/14.
 */

var expect = require('chai').expect;
var assert= require('chai').assert;
var path = require('path');

var contractor = require(path.join(process.cwd(), 'server', 'models', 'Contractor'));
var monky =  require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'contractor')).mock;


describe.skip('Contractor', function() {
    it('should not save without username', function(done) {
        monky.build('Contractor', function(err, contractor) {
            contractor.name = undefined;
            contractor.save(function(err) {
                expect(err).not.to.be.null;
                done(err);
                // Expect err
            });
        });
    });

    it('should save contractor with valid data', function(done) {
        monky.build('Contractor', function(err, contractor) {
            contractor.save(done);
        });
    });

});

// Alternatively one can create a new user using before hook
describe('Contractor', function() {
    beforeEach(function(done) {
        var suite = this;
        monky.create('Contractor', function(err, contractor) {
            if (err) return done(err);
            suite.contractor = contractor;
            done();
        });
    });
});



