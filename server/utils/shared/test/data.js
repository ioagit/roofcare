/**
 * Created by isuarez on 4/4/2014.
 */

var mongoose  = require('mongoose'),
    path = require('path'),
    encrypt = require(path.join(process.cwd(), 'server', 'utils', 'encryption'));


//adding the user model for User Model registration with Mongoose
var users = require(path.join(process.cwd(),'server','models','Users'));
var addresses = require(path.join(process.cwd(),'server','models','Address'));
var lookups = require(path.join(process.cwd(),'server','models','lookups'));
var async = require('async');
var jobs  = require(path.join(process.cwd(),'server','models','Job'));
var contractors = require(path.join(process.cwd(),'server','models','Contractor'));
var customers = require(path.join(process.cwd(),'server','models','Customer'));

var Address = addresses.Model;
var Job = jobs.Model;
var User = users.Model;
var Contractor = contractors.Model;
var Customer = customers.Model;

var testLocations = {
    Heerdter: {
        coordinates: [ 6.7273549, 51.2395808],
        street: 'Heerdter Lohweg 83',
        city: 'Düsseldorf',
        zipCode: '40549'
    },
    AcademyOfArts: {
        coordinates: [13.3795345,52.5163081],
        street: 'Pariser Platz 4',
        city: 'Berlin',
        zipCode: '10117'
    },
    Sonoma: {
        coordinates: [ -80.378167, 25.826017],
        street: '11209 NW 57th Ln',
        city: 'Doral',
        state: 'FL',
        country: 'USA',
        zipCode: '33178'
    },
    OceanDrive: {
        coordinates: [ -80.130808, 25.781653],
        street: '1020 Ocean Drive',
        city: 'Miami Beach',
        state: 'FL',
        country: 'USA',
        zipCode: '33139'
    },
    DolphinMall: {
        coordinates: [ -80.380602, 25.787894],
        street: '11401 NW 12th St',
        city: 'Miami',
        state: 'FL',
        country: 'USA',
        zipCode: '33172'
    },
    TheEnclave: {
        coordinates: [ -80.370002, 25.813993],
        street: '4320 NW 107th Ave  Apt 103',
        city: 'Doral',
        state: 'FL',
        country: 'USA',
        zipCode: '33178'
    },
    FisherIsland: {
        coordinates: [ -80.14074, 25.761615],
        street: '18 Fisher Island Dr',
        city: 'Miami Beach',
        state: 'FL',
        country: 'USA',
        zipCode: '33109'
    }

};
var testUsers =  {

    admin: {

        contactInfo: {
            firstName: 'Vera',
            lastName: 'Suarez',
            email: 'verita@verita.com',
            phone: '123-345'
        },

        username: 'verita',
        password: 'verita',
        roles: ['admin']
    },

    contractor: {

        contactInfo: {
            firstName: 'Rima',
            lastName: 'Gerhard',
            email: 'rimita@rimita.com',
            phone: '123-344'
        },

        username: 'rimita',
        password: 'rimita',
        roles: ['contractor']
    },

    contractor1: {

        contactInfo: {
            firstName: 'rimita1',
            lastName: 'rimita1',
            email: 'rimita1@verita.com',
            phone: '123-333'
        },

        username: 'rimita1',
        password: 'rimita1',
        roles: ['contractor']
    },

    modifiedContractor1: {

        contactInfo: {
            firstName: 'modifiedContractor1First',
            lastName: 'modifiedContractor1FirstLast',
            email: 'rimitas1@verita.com',
            phone: '123-3343'
        },

        username: 'rimita1',
        password: 'rimita1',
        roles: ['contractor', 'testRole']
    },

    user: {

        contactInfo: {
            firstName: 'ioa',
            lastName: 'ioa',
            email: 'ioa@ioa.com',
            phone: '123-33243'
        },

        username: 'ioaioa',
        password: 'ioaioa',

        roles: []
    },

    crazy: {

        contactInfo: {
            firstName: 'testUserFirstName',
            lastName: 'testUserLastName',
            email: 'crazy@verita.com',
            phone: '12223-3343'
        },

        username: '?/.><";:\'|{}+=-_(_)*&^%$#@!`~"',
        password: '?/.><";:\'|{}+=-_(_)*&^%$#@!`~"',
        roles: []
    },

    invalid: {

        contactInfo: {
            firstName: '',
            lastName: 'l',
            email: '',
            phone: ''
        },

        username: 'ioaioa1',
        password: 'ioaioa1',
        roles: []
    }

};
var testJobs = {
   job1: {
       StartDate: '2014-04-19 10:00AM',
       Status: lookups.jobStatus.requestAccepted,
       Contractor: 1,
       Customer:1,
       OnSiteContact:1,
       WorkSite:1
   }
};

function createTestLocations(callback) {

    Address.create(testLocations.Heerdter,
        testLocations.AcademyOfArts,
        testLocations.Sonoma,
        testLocations.OceanDrive,
        testLocations.DolphinMall,
        testLocations.TheEnclave,
        testLocations.FisherIsland,
        callback);
}
function removeAllLocations(callback) {
    Address
        .find({})
        .where('street')
        .in([
            testLocations.Heerdter.street,
            testLocations.AcademyOfArts.street,
            testLocations.Sonoma.street,
            testLocations.OceanDrive.street,
            testLocations.DolphinMall.street,
            testLocations.TheEnclave.street,
            testLocations.FisherIsland.street
        ])
        .remove(callback);
}

function removeAllJobs(callback) {
    Job.remove({}, function(err, result) { return callback(err, result); });
}
function removeAllUsers(callback) {
    User.remove({}, function(err, result) { return callback(err, result); });
}

function createDefaultUsers(callback) {

    User.find({}).exec(function (err, collection) {
        if (err) return callBack(err);

        if (collection.length === 0) {
            addHashedProperties(testUsers.admin);
            addHashedProperties(testUsers.contractor);
            addHashedProperties(testUsers.user);

            //Adding it to an array
            User.create(testUsers.admin, testUsers.contractor, testUsers.user, function (err, result) {
                return callback(err, result);
            });
        }
        else {
            callback(null, "User collection already exists.");
        }
    })
}
function createUser(data,done) {
    addHashedProperties(data);
    User.create(data, function(err, data) {

        testData.users.modifiedContractor1.id =  data.id;
        done()

    });
}


function removeUser(data,done) {
    User.remove({username: data.username}, done);
}

function addHashedProperties(obj) {

    var salt, hash;
    salt = encrypt.createSalt();
    hash = encrypt.hashPwd(salt, obj.password);
    obj.salt = salt;
    obj.hashed_pwd = hash;

}

var testData = {
    createTestLocations: createTestLocations,
    createDefaultUsers: createDefaultUsers,
    createUser: createUser,
    removeAllUsers: removeAllUsers,
    removeUser: removeUser,
    removeAllLocations: removeAllLocations,
    removeAllJobs: removeAllJobs,
    users : testUsers,
    jobs: testJobs,
    locations: testLocations
};

module.exports = testData;