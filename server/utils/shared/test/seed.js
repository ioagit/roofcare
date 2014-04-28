///**
// * Created by isuarez on 4/27/14.
// */
//
//
//var mongoose  = require('mongoose')
//    , Monky     = require('monky')
//    , monky     = new Monky(mongoose)
//    , path = require('path')
//    , async = require('async')
//
//    //Models
//    ,Job =  require(path.join(process.cwd(), 'server', 'models', 'Job'))
//    ,Contractor =  require(path.join(process.cwd(), 'server', 'models', 'Contractor'))
//
//   //Monky
//   require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'mocks','contractor')).mock;
//   addressMock = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'mocks', 'address'));
//   require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'mocks', 'customer')).mock;
//   require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'mocks', 'job')).mock;
//
//
//var customerAddressList
//    , contractorAddressLIst
//    , customerList
//    , contractorList
//    , jobList
//
//function createAddresses(n, targetList, callback) {
//
//    addressMock.createList(n, function (err, list) {
//        targetList = list;
//        callback();
//    });
//
//
//}
//
//function createCustomers(n, callback) {
//
//    monky.createList('Customer', n, function (err, list) {
//        customerList = list;
//        callback();
//
//    });
//
//}
//
//function createContractors(n, callback) {
//
//    monky.build('Contractor', n, function (err, list) {
//        contractorList = list;
//
//        for (var i = 0; i < n; i += 1)
//            contractorList[n].address = contractorAddressLIst[n];
//
//        //Persist contractors
//        Contractor.create(contractorList, function (err, result) {
//            return callback(err, result);
//        });
//
//
//    });
//
//}
//
//function createJobs(n, callback) {
//
//    monky.build('Job', n, function (err, list) {
//        jobList = list;
//
//        for (var i = 0; i < n; i += 1) {
//            jobList[n].Contractor = contractorList[n];
//            jobList[n].Customer = customerList[n];
//            jobList[n].WorkSite = customerAddressList[n];
//
//        }
//
//        //persisting the job
//        Job.create(jobList, function (err, result) {
//            return callback(err, result);
//        });
//
//    })
//};
//
//function seedOneContractor() {
//
//    async.series([
//            function(callback) { createAddresses(10,  customerAddressList, callback); },
//            function(callback) { createAddresses(1,  contractorAddressLIst, callback); },
//            function(callback) { createCustomers(10, callback); },
//            function(callback) { createContractors(1, callback); },
//            function(callback) { createJobs(10, callback); }
//        ],
//        function () {callback();});
//
//}
//
//module.exports = {
//
//    seedOneContractor: seedOneContractor()
//}