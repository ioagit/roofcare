/**
* Created by isuarez on 4/27/14.
*/


var mongoose  = require('mongoose')
    , path = require('path')
    , async = require('async')
    , _ = require('underscore')

    //Models
    ,Job =  require(path.join(process.cwd(), 'server', 'models', 'Job')).Model
    ,Contractor =  require(path.join(process.cwd(), 'server', 'models', 'Contractor')).Model
    ,Address =  require(path.join(process.cwd(), 'server', 'models', 'Address')).Model
    ,Customer =  require(path.join(process.cwd(), 'server', 'models', 'Customer')).Model;



   //Mocks
   contractorMock =  require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'mocks','contractorMock'));
   addressMock = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'mocks', 'addressMock'));
   customerMock =   require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'mocks', 'customerMock'));
   jobMock = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'mocks', 'jobMock'));


var contractorList = [];

//Some helper functions
function build(builder, options) {

    var obj = builder();

    if (options)
        obj = _.extend(obj, options);

    return obj;
}


function create(builder, options, callback) {

    var obj = build(builder, options);
    obj.save(function (err, obj) {
        callback(err, obj)
    });
}

function buildList(builder, n) {

    var list = [];

    for (var i = 0; i < n; i+= 1)
        list.push(build(builder));

    return list;

}

function seedOneContractor(n, done) {

    if (!n) n = 10;

    //Getting all the lists
    var customerAddressList = buildList(addressMock.build, n);
    var contractorAddressList = buildList(addressMock.build, n);

    var customerList  = buildList(customerMock.build, n);
    contractorList.push( build(contractorMock.build, {username: 'contractor1'}));
    var jobList  = buildList(jobMock.build, n);

    //Assigning contractor addresses
    for (var i = 0; i < contractorList.length; i += 1)
        contractorList[i].address = contractorAddressList[i];

    //Jobs
    for ( i = 0; i < n; i += 1) {
        jobList[i].Contractor = contractorList[0];
        jobList[i].Customer = customerList[i];
        jobList[i].WorkSite = customerAddressList[i];
    }

    async.series([
            function(callback) { Address.create(customerAddressList, callback); },
            function(callback) { Address.create(contractorAddressList, callback); },
            function(callback) { Customer.create(customerList, callback) },
            function(callback) { Contractor.create(contractorList, callback)},
            function(callback) { Job.create(jobList, callback); }
        ],
        function (err, results) {
            done(err, results)
        });
}

module.exports = {
    seedOneContractor: seedOneContractor
};