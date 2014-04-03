
var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');
var auth = require('../../server/config/auth.js');

describe('Auth Module', function () {

  xdescribe('authenticate', function() {

      var req = {body: {username:'verita', password:'verita'}}, res = {};
      var next = function() {console.log('Done!');}

      auth.authenticate(req,res,next);


  });


   xdescribe('requiresApiLogin', function() {
       it('should return 403 for non authenticated users', function() {

          var req = {}, res = {};
          var next = function() {console.log('Done!');}

          auth.requiresApiLogin(req, res, next);
          res.should.have.property('status');
          res.status.should.equal(403);

       })
   });
});
