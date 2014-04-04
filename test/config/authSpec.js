
var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');
var auth = require('../../server/config/auth.js');

describe('Auth Module', function () {

    var req,res,next;

    before(function() {
            req = {
                body: {
                    username: 'verita',
                    password: 'verita'
                },
                isAuthenticated: function () {
                    return true;
                }
            };
            res = {};
            next = function () {
                console.log('Done!');
            };
        }

        );


  xdescribe('authenticate', function() {

      //auth.authenticate(req,res,next);





  });


   xdescribe('requiresApiLogin', function() {
       it('should return 403 for non authenticated users', function() {

         req.isAuthenticated = function () {
             return false;
         };



          auth.requiresApiLogin(req, res, next);
          res.should.have.property('status');
          res.status.should.equal(403);

       })
   });
});
