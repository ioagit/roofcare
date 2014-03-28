/**
 * Created by isuarez on 3/28/2014.
 */

var User = require('mongoose').model('User'),
    encrypt = require('../utils/encryption');

exports.getUsers = function (req, res) {

    User.find( {}).exec(function (err, collection) {

            res.send(collection);

        } // End Exec Callback
    ) //Close Exec function
};

exports.createUser = function(req, res, next) {

    var userData = req.body;
    userData.salt = encrypt.createSalt();
    userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);

    User.create(userData, function(err, user) {

        if (err) {
            //Checking for duplicate user
            if (err.toString().indexOf('E11000') > -1) {
                err =  new Error('Duplicated Username');
            }

            res.status(400);
            return res.send({reason: err.toString()});
        }

        req.logIn(user, function(err) {

            if (err) { return next(err)}

            res.send(user);

        });



    });


}