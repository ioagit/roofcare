/**
 * Created by isuarez on 4/23/14.
 */


var should = require('should');
var expect = require("chai").expect;
var sinon = require('sinon');
var path = require('path');

//dependencies
var authSvc = require(path.join(process.cwd(), 'public', 'app', 'services', 'authSvc'))()
    ,notifierSvc = require(path.join(process.cwd(), 'public', 'app', 'services', 'notifierSvc'))()
    ,ctrlFactory =   require(path.join(process.cwd(), 'public', 'app', 'controllers', 'account', 'signupCtrl'));


describe.skip("Client Signup Controller", function() {

    var notifySpy;
    var authSvcStub;



    beforeEach(function() {

       //init the notify service


      //create spies
        notifySpy = sinon.spy(notifierSvc, 'notify' );
        authSvcStub = sinon.stub(authSvc, "createUser").returns(then(true));



    })

    afterEach(function(){
        notifySpy.restore();
        authSvcStub.restore();
    });

    it('should try to create a user', function() {
        var scope = {email:'',password:'pass',fname:'',lname:''};

        var signupCtrl = ctrlFactory(scope, notifierSvc, notifierSvc, {});

        scope.signup();
        expect(authSvcStub.calledOnce).to.be.true();
        expect(notifySpy.calledOnce).to.be.true();


    })

});
