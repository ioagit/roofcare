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