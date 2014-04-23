/**
 * Created by isuarez on 4/23/2014.
 */

var should = require('should');
var expect = require("chai").expect;
var path = require('path');


//dependencies
var toastr = {};
var authSvc = require(path.join(process.cwd(), 'public', 'app', 'services',  'authSvc')),
    notifierSvc = require(path.join(process.cwd(), 'public', 'app', 'services',  'notifierSvc'));



var ctrl = require(path.join(process.cwd(), 'public', 'app', 'controllers', 'account', 'signupCtrl'));

describe.skip('Signup Controller', function() {

    var scope;
    var location;

    beforeEach(function() {
        //Creating spies

    })

})
