/**
 * Created by isuarez on 4/17/14.
 */

var expect = require('chai').expect;
var path = require('path');
var contractor = require(path.join(process.cwd(), 'server', 'models', 'Contractor'));
var mock =  require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'mocks','contractorMock'));
var addressMock =  require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'mocks', 'addressMock'));

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
});