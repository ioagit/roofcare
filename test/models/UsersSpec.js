/**
 * Created by isuarez on 3/31/14.
 */


var mongoose  = require('mongoose');
var expect = require('chai').expect;

var userModel = require('../../server/models/Users');

describe('User Model', function() {

    var User;

    before(function(done) {
        User = mongoose.model('User');
        done();
    })

    it('should return true for has Role Admin', function() {

        User.roles = ['admin'];

       // expect(User.hasRole('admin')).to.be.true;


    })

});