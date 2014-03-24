/**
 * Created by isuarez on 3/7/14.
 */

var should = require('should');
var assert = require('assert');

describe('Test Framework', function () {

        it('should have mocha installed and running.', function () {
            assert.equal(true, true);
        })
        it('should have the should library installed and running for fluent testing', function () {
            true.should.eql(true);
        })


    }

)

describe('Async testing', function() {

    var result = false;
    beforeEach(function (done) {
        setTimeout(function () {
            result = true;
            //complete the asyn beforeEach
            done();
        }), 2000
    });

    it('should be true after async function is done', function(done) {
        result.should.eql(true);
        done();
    });

} )