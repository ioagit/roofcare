exports.home = function (req, res) {

    res.render('index.jade', {
        locals : {
            title : 'Index page'
            ,description: 'Page Description'
            ,author: 'IOA'
            ,analyticssiteid: 'XXXXXXX'
            ,mongoMessage: mongoMessage
        }
    });

};