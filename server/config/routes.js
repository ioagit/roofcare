/**
 * Created by isuarez on 3/6/14.
 */
var passport = require('passport');

module.exports =  function(server) {


    server.get('/partials/*', function(req, res) {
        res.render('../../public/app/' + req.params);
    });

    server.post('/login', function (req, res, next) {
        var auth = passport.authenticate('local', function(err, user)
            {
                if (err) { return next(err); }
                if (!user) {  res.send({success:false}) }

                //Login success
                req.logIn(user, function (err) {
                    if (err) { return next(err); }
                    res.send({success:true, user: user});
                })

            }

        );
        auth(req, res, next);
    });

    server.get('*', function(req, res) {

        res.render('index.jade', {
                locals : {
                    title : 'Index page'
                    ,description: 'Page Description'
                    ,author: 'IOA'
                    ,analyticssiteid: 'XXXXXXX'

                }
            }
        );

    });

}
