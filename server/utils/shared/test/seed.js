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
    ,Customer =  require(path.join(process.cwd(), 'server', 'models', 'Customer')).Model



   //Mocks
   contractorMock =  require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'mocks','contractorMock'));
   addressMock = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'mocks', 'addressMock'));
   customerMock =   require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'mocks', 'customerMock'));
   jobMock = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'mocks', 'jobMock'));


var customerAddressList
    , contractorAddressLIst
    , customerList
    , contractorList = new Array()
    , jobList


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

    var list = new Array();

    for (var i = 0; i < n; i+= 1)
        list.push(build(builder));

    return list;

}

function createList(model, builder, n, callback) {
    return model.create(buildList(builder, n), function(err, list) {
        callback(err, list);
    })
}


function createAddresses(n, targetList, callback) {

    createList(Address, addressMock.build, n, function (err, list) {
        targetList = list;
        callback();
    });


}

function createCustomers(n, callback) {

    createList(Customer, customerMock.build, n, function (err, list) {
        customerList = list;
        callback();
    });

}

function createContractors(n, callback) {

    contractorList = buildList(contractorMock.build,  n);

    for (var i = 0; i < n; i += 1)
         contractorList[n].address = contractorAddressLIst[n];

        //Persist contractors
    Contractor.create(contractorList, function (err, result) {
            return callback(err, result);
        });


    };



function createJobs(n, callback) {

     jobList = buildList(jobMock.build,  n);

       for (var i = 0; i < n; i += 1) {
            jobList[n].Contractor = contractorList[n];
            jobList[n].Customer = customerList[n];
            jobList[n].WorkSite = customerAddressList[n];
        }

        //persisting the job
        Job.create(jobList, function (err, result) {
            return callback(err, result);
        });


};

function seedOneContractor(n, done) {

    if (!n)
        n=10;

    //Getting all the lists
    customerAddressList = buildList(addressMock.build, n);
    contractorAddressLIst = buildList(addressMock.build, n);
    customerList  = buildList(customerMock.build, n);
    contractorList.push( build(contractorMock.build, {username: 'contractor1'}));
    jobList  = buildList(jobMock.build, n);

    //Assining contractor addresses
    for (var i = 0; i < contractorList.length; i += 1)
        contractorList[i].address = contractorAddressLIst[i];


    //Jobs
    for (var i = 0; i < n; i += 1) {
        jobList[i].Contractor = contractorList[0];
        jobList[i].Customer = customerList[i];
        jobList[i].WorkSite = customerAddressList[i];
    }


    async.series([
            function(callback) { Address.create(customerAddressList, callback); },
            function(callback) { Address.create(contractorAddressLIst, callback); },
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
}