/**
 * Created by isuarez on 3/6/14.
 */

var mongoose  = require('mongoose'),
    crypto = require('crypto');

module.exports = function(config) {

    //Connecting to MongoDB
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.on('open', function callback() {
        console.log('testdb is now open');
    });

    var userSchema = new mongoose.Schema({firstName: String, lastName: String, username: String, salt: String, hashed_pwd: String});
    userSchema.methods = {
        authenticate: function(passwordToMatch) {
          return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
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
             salt = createSalt();

             User.create({firstName:'Verita', lastName: 'Suarez', username:'verita', salt: salt,hashed_pwd: hashPwd(salt, 'verita') }, handleDocumentCreation);

             salt = createSalt();
             User.create({firstName:'Rima', lastName: 'Gerhard', username:'rimita', salt: salt, hashed_pwd: hashPwd(salt, 'rimita') }, handleDocumentCreation);

             salt = createSalt();
             User.create({firstName:'Ioa', lastName: 'Suarez', username:'ioaioa',  salt: salt, hashed_pwd: hashPwd(salt, 'ioaioa')  }, handleDocumentCreation);

         }



        }
    )

    function createSalt() {
        return crypto.randomBytes(128).toString('base64');
    }

    function hashPwd(salt, pwd) {
        var hmac = crypto.createHmac('sha1', salt);
        return hmac.update(pwd).digest('hex');
    }
}
