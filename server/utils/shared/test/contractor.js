var mongoose  = require('mongoose')
    , Monky     = require('monky')
    , monky     = new Monky(mongoose)
    , path = require('path')
    , contractor = require(path.join(process.cwd(), 'server', 'models', 'Contractor'));


monky.factory('Contractor', { username: 'monkyContractor', salt:'monkycontractor'}, function (err) {
    if (err)
        console.log(err);
} );

module.exports.mock = monky;