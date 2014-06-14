/**
 * Created by isuarez on 4/4/2014.
 */

var mongoose  = require('mongoose'),
    path = require('path'),
    encrypt = require(path.join(process.cwd(), 'server', 'utils', 'encryption'));


//adding the user model for User Model registration with Mongoose
var users = require(path.join(process.cwd(),'server','models','Users')),
    addresses = require(path.join(process.cwd(),'server','models','Address')),
    lookups = require(path.join(process.cwd(),'server','models','lookups')),
    async = require('async'),
    jobs  = require(path.join(process.cwd(),'server','models','Job')),
    contractors = require(path.join(process.cwd(),'server','models','Contractor'));

var Address = addresses.Model;
var Job = jobs.Model;
var User = users.Model;
var Contractor = contractors.Model;

var testLocations = {
    Heerdter: {
        coordinates: [ 6.7273549, 51.2395808],
        street: 'Heerdter Lohweg 83',
        city: 'Düsseldorf',
        zipCode: '40549'
    },
    AcademyOfArts: {
        coordinates: [13.3795345, 52.5163081],
        street: 'Pariser Platz 4',
        city: 'Berlin',
        zipCode: '10117'
    },
    RicoAddress: {
        coordinates: [11.666816, 48.068948],
        street: 'Jahnstraße 35',
        city: 'Ottobrunn',
        country: 'Germany',
        zipCode: '85521'
    },
    Address01: {
        coordinates: [ 11.655148, 48.093719],
        street: 'Putzbrunner-Str 173',
        city: 'München',
        country: 'Germany',
        zipCode: '81739'
    },
    Address02: {
        coordinates: [ 11.493581, 48.116641],
        street: 'Gräfelfingerstr 47',
        city: 'München',
        country: 'Germany',
        zipCode: '81375'
    },
    Address03: {
        coordinates: [ 11.599540, 48.025020],
        street: 'Meilerweg 14',
        city: 'Oberhaching',
        country: 'Germany',
        zipCode: '82041'
    },
    Address04: {
        coordinates: [ 11.689344, 48.059643],
        street: 'Geranienstraße 26',
        city: 'Hohenbrunn',
        country: 'Germany',
        zipCode: '85521'
    },
    Address05: {
        coordinates: [ 11.453384, 48.113561],
        street: 'Lena-Christ-Straße 50',
        city: 'Martinsried',
        country: 'Germany',
        zipCode: '82152'
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
            firstName: 'Rico',
            lastName: 'Gerhard',
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
    createDefaultUsers: createDefaultUsers,
    createUser: createUser,
    removeAllUsers: removeAllUsers,
    removeUser: removeUser,
    removeAllJobs: removeAllJobs,
    users : testUsers,
    locations: testLocations
};

module.exports = testData;