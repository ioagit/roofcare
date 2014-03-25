/**
 * Created by isuarez on 3/6/14.
 */
var auth = require('./auth')
    mongoose = require('mongoose')
    User = mongoose.model('User');

module.exports =  function(server) {

    server.get('/api/users', auth.requiresRole('admin'), function (req, res) {

        User.find( {}).exec(function (err, collection) {

                res.send(collection);

            } // End Exec Callback
        ) //Close Exec function
    });
    
    server.get('/partials/*', function(req, res) {
        res.render('../../public/app/' + req.params);
    });

    server.post('/login', auth.authenticate);
    server.post('/logout', function(req, res) {
        req.logout();
        res.end();
    });


    server.get('*', function(req, res) {

        res.render('index.jade', {

                locals : {
                    currentUser: req.user
                    ,title : 'Index page'
                    ,description: 'Page Description'
                    ,author: 'IOA'
                    ,analyticssiteid: 'XXXXXXX'

                }
            }
        );

    });

}
