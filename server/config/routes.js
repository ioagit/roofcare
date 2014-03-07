/**
 * Created by isuarez on 3/6/14.
 */

module.exports =  function(server) {


    server.get('/partials/*', function(req, res) {
        res.render('../../public/app/' + req.params);
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
