/**
 * Created by isuarez on 4/4/2014.
 */

var mongoose  = require('mongoose'),
    path = require('path'),
    encrypt = require(path.join(process.cwd(), 'server', 'utils', 'encryption'));


//adding the user model for User Model registration with Moongoose
var users = require(path.join(process.cwd(),'server','models','Users'));
var addresses = require(path.join(process.cwd(),'server','models','Address'));
var lookups = require(path.join(process.cwd(),'server','models','lookups'));
var User = users.Model;
var Address = addresses.Model;

var testLocations = {
    Heerdter: {
        Coordinates: [51.2395808, 6.7273549],
        Street: 'Heerdter Lohweg 83',
        City: 'Düsseldorf',
        ZipCode: '40549'
    },
    AcademyOfArts: {
        Coordinates: [52.5163081, 13.3795345],
        Street: 'Pariser Platz 4',
        City: 'Berlin',
        ZipCode: '10117'
    },
    Sonoma: {
        Coordinates: [25.826017, -80.378167],
        Street: '11209 NW 57th Ln',
        City: 'Doral',
        State: 'FL',
        Country: 'USA',
        ZipCode: '33178'
    },
    OceanDrive: {
        Coordinates: [25.781653, -80.130808],
        Street: '1020 Ocean Drive',
        City: 'Miami Beach',
        State: 'FL',
        Country: 'USA',
        ZipCode: '33139'
    },
    DolphinMall: {
        Coordinates: [25.787894, -80.380602],
        Street: '11401 NW 12th St',
        City: 'Miami',
        State: 'FL',
        Country: 'USA',
        ZipCode: '33172'
    },
    TheEnclave: {
        Coordinates: [25.813993, -80.370002],
        Street: '4320 NW 107th Ave  Apt 103',
        City: 'Doral',
        State: 'FL',
        Country: 'USA',
        ZipCode: '33178'
    },
    FisherIsland: {
        Coordinates: [25.761615, -80.14074],
        Street: '18 Fisher Island Dr',
        City: 'Miami Beach',
        State: 'FL',
        Country: 'USA',
        ZipCode: '33109'
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
function createTestJobs(callback) {

    var  contractor
        ,customers
        ,WorkSite;

    return null;
    //Creating the contractor


}
function createTestLocations(callback) {

    Address.find({}).exec(
        function(err,collection) {

        if (err) return callback(err);
        if (collection.length === 0) {
            Address.create(testLocations.Heerdter,
                testLocations.AcademyOfArts,
                testLocations.Sonoma,
                testLocations.OceanDrive,
                testLocations.DolphinMall,
                testLocations.TheEnclave,
                testLocations.FisherIsland,
                function (err, result) {
                return callback(err, result);
            });
        }
        else {
            callback(null, "Default physical address collection already exists.");
        }
    })
}

function removeAllLocations(callback) {
    Address.remove({}, function(err, result) {
        return callback(err, result);
    });
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

function removeAllUsers(callback) {
    User.remove({}, function(err, result) {
        return callback(err, result);
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
    users : testUsers,
    jobs: testJobs,
    locations: testLocations
};

module.exports = testData;