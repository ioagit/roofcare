/**
 * Created by isuarez on 3/25/14.
 */
var passport = require('passport')
    ,mongoose = require('mongoose')
    ,LocalStrategy = require('passport-local').Strategy;

var User = mongoose.model('User');

module.exports = function() {


    passport.serializeUser(function(user, done) {
        if (user) {
            done(null, user._id);
        }
    });

    passport.deserializeUser(function(id, done) {

        User.findOne({_id: id}).exec(function (err, user) {
                if (err) {
                    console.log(err);
                    return;
                } //End if Error

                if (user)
                    return done(null, user);
                else
                    return done(null, false);

            } // End Exec Callback
        ) //Close Exec function


    });


    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({username: username}).exec(function (err, user) {
                    if (err) {
                        console.log(err);
                        return done(err);
                    } //End if Error

                    if (!user)
                        return done(null, false, { message: 'Incorrect username.' });

                    if (user.authenticate(password))
                        return done(null, user)
                    else
                        return done(null, false, { message: 'Incorrect password.' });

                } // End Exec Callback
            ) //Close Exec function
        }
    ));


}