/**
 * Created by isuarez on 3/25/14.
 */
var passport = require('passport')
    ,path = require('path')
    ,LocalStrategy = require('passport-local').Strategy;

//User Model
require(path.join(process.cwd(), 'server', 'models','Users'));
//Every model that is a descendant of user needs to be included
require(path.join(process.cwd(), 'server', 'models','Contractor'));


module.exports = function(User) {


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
        ); //Close Exec function


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
                        return done(null, user);
                    else
                        return done(null, false, { message: 'Incorrect password.' });

                } // End Exec Callback
            ); //Close Exec function
        }
    ));


};