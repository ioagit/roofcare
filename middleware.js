/**
 * Created by isuarez on 2/7/14.
 */

'use strict'

var connect = require('connect'),
    util = require('util');

var myFunc;
myFunc = function myFunc(req, res, next) {

    console.log(util.format('Request %s with method %s', req.url, req.method));
    next();
};

//Test edit


var server = connect()
    .use(myFunc)
    .use(function onRequest(req, res) {
        var chunk = 'Hello from connect11';
        res.end(chunk);


    }).listen(3000);

