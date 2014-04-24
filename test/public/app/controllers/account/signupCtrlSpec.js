/**
 * Created by isuarez on 4/23/14.
 */


var should = require('should')
    ,expect = require("chai").expect
    ,sinon = require('sinon')
    ,path = require('path')
    ,q = require('q');

//dependencies
var authSvc = require(path.join(process.cwd(), 'public', 'app', 'services', 'authSvc'))()
    ,notifierSvc = require(path.join(process.cwd(), 'public', 'app', 'services', 'notifierSvc'))()
    ,ctrlFactory =   require(path.join(process.cwd(), 'public', 'app', 'controllers', 'account', 'signupCtrl'));


describe.only("Client Signup Controller", function() {

    var notifySpy;
    var authSvcStub;



    beforeEach(function() {

       //init the notify service


      //create spies
        notifySpy = sinon.spy(notifierSvc, 'notify' );
        authSvcStub = sinon.stub(authSvc, "createUser").returns(q.resolve(true));



    })

    afterEach(function(){
        notifySpy.restore();
        authSvcStub.restore();
    });

    it('should try to create a user', function() {
        var $scope = {email:'',password:'pass',fname:'',lname:''};

        var signupCtrl = ctrlFactory($scope, authSvc, notifierSvc, {});

        $scope.signup();
        expect($scope).to.have.property('email');
        expect(notifySpy.calledOnce).to.be.true;
        expect(authSvcStub.calledOnce).to.be.true;


    })

});
