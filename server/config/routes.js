/**
 * Created by isuarez on 3/6/14.
 */
var auth = require('./auth');

module.exports =  function(server) {


    server.get('/partials/*', function(req, res) {
        res.render('../../public/app/' + req.params);
    });

    server.post('/login', auth.authenticate);

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
