/**
 * Created by isuarez on 3/28/2014.
 */
var mongoose  = require('mongoose'),
    encrypt = require('../utils/encryption');


var userSchema = new mongoose.Schema(
    {firstName: {type: String, required: '{PATH} is required!'},
     lastName: {type: String, required: '{PATH} is required!'},
     username: {type: String, required: '{PATH} is required!', unique: true},
     salt: {type: String, required: '{PATH} is required!'},
     hashed_pwd: {type: String, required: '{PATH} is required!'},
     roles: [String]});

userSchema.methods = {

    authenticate: function(passwordToMatch) {
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    hasRole: function(role) {
        return this.roles.indexOf(role) > -1;
    },
    isAdmin: function() {
        return this.hasRole('admin');
    },
    isContractor: function() {
        return this.hasRole('contractor');
    }
};

var User =  mongoose.model('User', userSchema);


function handlerError(err, obj) {
    if (err) {
        console.log(err);
    }
};

//Defining a handleCreation
function handleDocumentCreation(err, obj) {
    if (err) {
        handlerError()
        return;
    }

    console.log(JSON.stringify(obj));
};

function createDefaultUsers() {
    User.find({}).exec(function (err, collection) {

            if (err) {
                handlerError();
                return;
            }

            if (collection.length === 0) {
                var salt, hash;
                salt = encrypt.createSalt();
                hash = encrypt.hashPwd(salt, 'verita');

                User.create({firstName: 'Verita', lastName: 'Suarez', username: 'verita', salt: salt, hashed_pwd: hash, roles: ['admin'] }, handleDocumentCreation);

                salt = encrypt.createSalt();
                hash = encrypt.hashPwd(salt, 'rimita');
                User.create({firstName: 'Rima', lastName: 'Gerhard', username: 'rimita', salt: salt, hashed_pwd: hash }, handleDocumentCreation);

                salt = encrypt.createSalt();
                hash = encrypt.hashPwd(salt, 'ioaioa');
                User.create({firstName: 'Ioa', lastName: 'Suarez', username: 'ioaioa', salt: salt, hashed_pwd: hash, roles: ['']   }, handleDocumentCreation);

            }

        }
    )
};

exports.createDefaultUsers = createDefaultUsers;