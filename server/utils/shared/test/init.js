/**
 * Created by isuarez on 4/6/14.
 */
var request = require('supertest');
var path = require('path');

function initServer() {


    var env = 'test';
    var config = require(path.join(process.cwd(), 'server', 'config', 'config'))[env];

    var server = require(path.join(process.cwd(), 'server'))(config);
    server.listen(config.port);

}

var agent;
agent = request.agent('http://localhost:' + 3000);

module.exports = {
    agent: agent,
    initServer: initServer
};

