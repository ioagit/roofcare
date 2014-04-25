/**
 * Created by isuarez on 4/23/14.
 */


var should = require('should')
    ,expect = require("chai").expect
    ,sinon = require('sinon')
    ,path = require('path')
    ,q = require('q')
    angular = require('angular');

//dependencies
var authSvc = require(path.join(process.cwd(), 'public', 'app', 'services', 'authSvc'))()
    ,notifierSvc = require(path.join(process.cwd(), 'public', 'app', 'services', 'notifierSvc'))()
    ,ctrlFactory =   require(path.join(process.cwd(), 'public', 'app', 'controllers', 'account', 'signupCtrl'));


describe.only("Client Signup Controller", function() {

    var notifyStub;
    var authSvcStub;
    var locationStub;



    beforeEach(function() {

       //init the notify service


      //create spies
        notifyStub = sinon.stub(notifierSvc, 'notify').returns(true);
        authSvcStub = sinon.stub(authSvc, "createUser").returns(q.resolve(true));
        locationStub = sinon.stub({path: function(value) { return value; }});



    })

    afterEach(function(){
        notifyStub.restore();
        authSvcStub.restore();
    });

    it('should try to create a user', function() {
        var $scope = {email:'',password:'pass',fname:'',lname:''};

        var signupCtrl = ctrlFactory($scope, authSvc, notifierSvc, locationStub);

        $scope.signup();
        expect($scope).to.have.property('email');
        sinon.assert.calledOnce(authSvcStub);
        //sinon.assert.calledOnce(notifyStub);
        //sinon.assert.calledOnce(locationStub);



    })

});
