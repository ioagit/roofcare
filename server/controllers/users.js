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
            return res.send({err: err, reason: err.toString()});
        }

        res.status(200);
        res.send(user);




    });


};

exports.updateUser = function(req, res, next) {


    //Getting data from post.
    var userUpdates = req.body;

    var user_id = userUpdates.id;



    //the should use id instead of _id
    if(req.user.id !== userUpdates.id && !req.user.isAdmin()) {
        res.status(403);
        return res.end();

    }

    if (userUpdates.password && userUpdates.password.length > 0) {

        userUpdates.salt = encrypt.createSalt();
        userUpdates.hashed_pwd = encrypt.hashPwd(req.user.salt, userUpdates.password);
        delete userUpdates.password;
    }

    User.findOneAndUpdate({_id: userUpdates.id}, {$set: userUpdates},  function(err, data) {

        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        };

        if  (req.user.id !== data.id) {
              req.user.username =  data.username;
              req.user.firstName = data.firstName;
              req.user.lastame = data.lastName;
              req.user.roles = data.roles;
            };

        res.send(userUpdates);

    });




}