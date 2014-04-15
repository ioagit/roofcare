/**
 * Created by isuarez on 4/4/2014.
 */

var mongoose  = require('mongoose'),
    path = require('path'),
    encrypt = require(path.join(process.cwd(), 'server', 'utils', 'encryption'));


//adding the user model for User Model registration with Moongoose
var users = require(path.join(process.cwd(),'server','models','Users'));
require(path.join(process.cwd(),'server','models','PhysicalAddress'));

var User = users.Model;
var PhysicalAddress = mongoose.model('PhysicalAddress');

var testLocations = {
    Heerdter: {
        Latitude: 51.2395808,
        Longitude: 6.7273549,
        Street: 'Heerdter Lohweg 83',
        City: 'Düsseldorf',
        Country: 'Germany',
        ZipCode: '40549'
    },
    AcademyOfArts: {
        Latitude: 52.5163081,
        Longitude: 13.3795345,
        Street: 'Pariser Platz 4',
        City: 'Berlin',
        Country: 'Germany',
        ZipCode: '10117'
    }
};

var testUsers =  {

    admin: {

        username: 'verita',
        password: 'verita',
        firstName: 'Vera',
        lastName: 'Suarez',
        roles: ['admin']
    },

    contractor: {

        username: 'rimita',
        password: 'rimita',
        firstName: 'Rima',
        lastName: 'Gerhard',
        roles: ['contractor']
    },

    contractor1: {

        username: 'rimita1',
        password: 'rimita1',
        firstName: 'testContractorFirstName',
        lastName: 'testContractorLastName',
        roles: ['contractor']
    },

    modifiedContractor1: {

        username: 'rimita1',
        password: 'rimita1',
        firstName: 'modifiedContractor1First',
        lastName: 'modifiedContractor1FirstLast',
        roles: ['contractor', 'testRole']
    },

    user: {

        username: 'ioaioa',
        password: 'ioaioa',
        firstName: 'Ioa',
        lastName: 'Suarez',
        roles: []
    },

    crazy: {

        username: '?/.><";:\'|{}+=-_(_)*&^%$#@!`~"',
        password: '?/.><";:\'|{}+=-_(_)*&^%$#@!`~"',
        firstName: 'testUserFirstName',
        lastName: 'testUserLastName',
        roles: []
    },

    invalid: {

        username: 'ioaioa1',
        password: 'ioaioa1',
        firstName: '',
        lastName: 'l',
        roles: []
    }

};

function createTestLocations() {
    return function(done) {
    PhysicalAddress.find({}).exec(
        function(err,collection) {

        if (err) return done(err);
        if (collection.length === 0) {
            PhysicalAddress.create(testLocations.Heerdter, testLocations.AcademyOfArts, done);
        }
        else {
            return done();
        }
    })
 }
}

function removeAllLocations() {
    return function(done) {
        PhysicalAddress.remove({}, done);
    };
}

function createDefaultUsers(callBack) {
function createTempDefaultUsers() {
    return function(done) {
        addHashedProperties(testUsers.admin);
        addHashedProperties(testUsers.contractor);
        addHashedProperties(testUsers.user);

        //Adding it to an array
        User.create(testUsers.admin, testUsers.contractor, testUsers.user, done);
    };
}
function createDefaultUsers() {
    return function(done) {
        User.find({}).exec(function (err, collection) {
            if (err) return callBack(err);

            if (collection.length === 0) {
                addHashedProperties(testUsers.admin);
                addHashedProperties(testUsers.contractor);
                addHashedProperties(testUsers.user);

                //Adding it to an array
                User.create(testUsers.admin, testUsers.contractor, testUsers.user, function (err, result) {
                    return callBack(err, result);
                });
            }
            else {
                callBack(null, "User collection already exists.");
            }
        })
};

function createUser(data,done) {
    addHashedProperties(data);
    User.create(data, function(err, data) {

        testData.users.modifiedContractor1.id =  data.id;
        done()

    });
}

function removeAllUsers(callBack) {
        User.remove({}, function(err, result) {
            return callBack(err, result);
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

function handlerError(err, obj) {
    if (err) {
        console.log(err);
    }
}

var testData = {
    createTestLocations: createTestLocations,
    createDefaultUsers: createDefaultUsers,
    createTempDefaultUsers: createTempDefaultUsers,
    createUser: createUser,
    removeAllUsers: removeAllUsers,
    removeUser: removeUser,
    removeAllLocations: removeAllLocations,
    users : testUsers,
    locations: testLocations
};



module.exports = testData;