/**
* Created by isuarez on 4/27/14.
*/

var mongoose  = require('mongoose'),
    path = require('path'),
    async = require('async'),
    _ = require('underscore'),
    testData = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'data')),

    //Models
    Job =  require(path.join(process.cwd(), 'server', 'models', 'Job')).Model,
    Contractor =  require(path.join(process.cwd(), 'server', 'models', 'Contractor')).Model,
    Address =  require(path.join(process.cwd(), 'server', 'models', 'Address')).Model,
    lookUps = require(path.join(process.cwd(), 'server', 'models', 'lookups')),

    //Mocks
    contractorMock =  require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'mocks','contractorMock')),
    addressMock = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'mocks', 'addressMock')),
    jobMock = require(path.join(process.cwd(), 'server', 'utils', 'shared', 'test', 'mocks', 'jobMock'));

//Some helper functions
function build(builder, options) {

    var obj = builder();

    if (options) obj = _.extend(obj, options);

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
    var contractor =  build(contractorMock.build,
        {
            username: 'contractor1',
            contactInfo: {
                firstName: 'Rico',
                lastName: 'Gerhard',
                phone: '123-333',
                email: 'rico.gerhard@gmail.com'
            }

        });

    contractor.address =  testData.locations.RicoAddress;
    var jobList  = buildList(jobMock.build, n);

    jobList[n-2].status =  lookUps.jobStatus.requestAccepted;
    jobList[n-1].status =  lookUps.jobStatus.requestAccepted;

    //Jobs
    for (var i = 0; i < n; i += 1) {
        jobList[i].contractor = contractor;
    }

    async.series([
            function(callback) { Contractor.create(contractor, callback)},
            function(callback) { Job.create(jobList, callback); }
        ],
        function (err, results) {
            done(err, results)
        });
}

module.exports = {
    seedOneContractor: seedOneContractor
};