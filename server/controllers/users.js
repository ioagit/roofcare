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

    userData.username = userData.username.toLowerCase();
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


};

exports.updateUser = function(req, res, next) {


    //Getting data from post.
    var userUpdates = req.body;

    //the should use id instead of _id
    if(req.user.id !== userUpdates._id && !req.user.isAdmin()) {
        res.status(403);
        return res.end();

    }

    req.user.username =  userUpdates.username;
    req.user.firstName = userUpdates.firstName;
    req.user.lastame = userUpdates.lastName;

    if (userUpdates.password && userUpdates.password.length > 0) {
        req.user.salt = encrypt.createSalt();
        req.user.hashed_pwd = encrypt.hashPwd(req.user.salt, userUpdates.password);
    }

    req.user.save(function(err) {

        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        }

        //No error. Send current User to Client
        res.send(req.user);




    });


}