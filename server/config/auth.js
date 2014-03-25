/**
 * Created by isuarez on 3/22/14.
 */

var passport = require('passport');

exports.authenticate = function (req, res, next) {
    var auth = passport.authenticate('local', function(err, user, info)
        {
            if (err) { return next(err); }
            if (!user) {  res.send({success:false}) }

            //Login success
            req.login(user, function (err) {
                if (err) { return next(err); }
                res.send({success:true, user: user});
            })

        }

    );
    auth(req, res, next);
}

//middleware for security checking
exports.requiresApiLogin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.status(403);
        res.end();
    }
    else {
        next();
    }
}

exports.requiresRole = function (role) {

    return function (req, res, next) {
        if (!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
            res.status(403);
            res.end();
        }
        else {
            next();
        }

    }
}