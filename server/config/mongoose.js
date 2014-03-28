/**
 * Created by isuarez on 3/6/14.
 */

var mongoose  = require('mongoose'),
    encrypt = require('../utils/encryption');

module.exports = function(config) {

    //Connecting to MongoDB
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.on('open', function callback() {
        console.log('testdb is now open');
    });

    var userSchema = new mongoose.Schema({firstName: String, lastName: String, username: String, salt: String, hashed_pwd: String, roles: [String]});
    userSchema.methods = {
        authenticate: function(passwordToMatch) {
          return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    }
    var User =  mongoose.model('User', userSchema);


    function handlerError(err, obj) {
        if (err) {
            console.log(err);
        }
    }

    //Defining a handleCreation
    function handleDocumentCreation(err, obj) {
        if (err) {
           handlerError()
           return;
        }

        console.log(JSON.stringify(obj));
    }

    User.find({}).exec(function(err, collection) {

            if (err) {
                handlerError();
                return;
            }

         if (collection.length === 0) {
             var salt, hash;
             salt = encrypt.createSalt();
             hash = encrypt.hashPwd(salt, 'verita');

             User.create({firstName:'Verita', lastName: 'Suarez', username:'verita', salt: salt,hashed_pwd: hash, roles: ['admin'] }, handleDocumentCreation);

             salt = encrypt.createSalt();
             hash = encrypt.hashPwd(salt, 'rimita');
             User.create({firstName:'Rima', lastName: 'Gerhard', username:'rimita', salt: salt, hashed_pwd: hash }, handleDocumentCreation);

             salt = encrypt.createSalt();
             hash = encrypt.hashPwd(salt, 'ioaioa');
             User.create({firstName:'Ioa', lastName: 'Suarez', username:'ioaioa',  salt: salt, hashed_pwd: hash,  roles: ['']   }, handleDocumentCreation);

         }

       }
    )

}
