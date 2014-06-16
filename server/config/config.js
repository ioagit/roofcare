/**
 * Created by isuarez on 3/6/14.
 */

//Setting the rootPath
var  path = require('path');
var rootPath = path.normalize(__dirname + '/../../');


module.exports = {

    development: {
        db:  'mongodb://localhost/rcdb',
        rootPath: rootPath,
        port: process.env.PORT || 3000,
        mailer: {
            service: 'GMAIL',
            auth: {
                user: 'roofcare.de@gmail.com',
                password:'r1c0r1c0'
            },
            defaultFromAddress: 'Roofcare  <roofcare.de@gmail.com>'
        }
    },
    test: {
        //db:  'mongodb://roofcareuser:roofcarepwd@ds033559.mongolab.com:33559/roofcare',
        //db:  'mongodb://localhost/rcdb',

        db:  'mongodb://localhost/testdb',
        rootPath: rootPath,
        port: 3000,
        mailer: {
            service: 'GMAIL',
            auth: {
                user: 'roofcare.de@gmail.com',
                password:'r1c0r1c0'
            },
            defaultFromAddress: 'Roofcare  <roofcare.de@gmail.com>'
        }
    },
    production: {

        db:  'mongodb://roofcareuser:roofcarepwd@ds033559.mongolab.com:33559/roofcare',
        rootPath: rootPath,
        port: process.env.PORT || 80,
        mailer: {
            service: 'GMAIL',
            auth: {
                user: 'roofcare.de@gmail.com',
                password:'r1c0r1c0'
            },
            defaultFromAddress: 'Roofcare  <roofcare.de@gmail.com>'
        }
    }

};
