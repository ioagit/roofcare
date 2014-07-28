/**
 * Created by isuarez on 3/6/14.
 */

//Setting the rootPath
var  path = require('path');
var rootPath = path.normalize(__dirname + '/../../');


//var mailInfo =  {
//    service: 'Mandrill',
//        auth: {
//        user: 'app24367544@heroku.com',
//        pass:'0V9OHO7slJb6Mdg2FIZ7pA'
//    },
//    defaultFromAddress: 'Roofcare  <roofcare.de@gmail.com>'
//};

var mailInfo =  {
    service: 'GMAIL',
        auth: {
        user: 'roofcare.de@gmail.com',
            pass:'r1c0r1c0'
    },
    defaultFromAddress: 'Roofcare  <roofcare.de@gmail.com>'
};
module.exports = {

    development: {
      //db:  'mongodb://roofcareuser:roofcarepwd@ds033559.mongolab.com:33559/roofcare',
        db:  'mongodb://localhost/rcdb',
        rootPath: rootPath,
        port: process.env.PORT || 3000,
        mailer: mailInfo

    },
    test: {
        //db:  'mongodb://roofcareuser:roofcarepwd@ds033559.mongolab.com:33559/roofcare',
        //db:  'mongodb://localhost/rcdb',

        db:  'mongodb://localhost/testdb',
        rootPath: rootPath,
        port: 3000,
        mailer: mailInfo
    },
    production: {

        db:  'mongodb://roofcareuser:roofcarepwd@ds033559.mongolab.com:33559/roofcare',
        rootPath: rootPath,
        port: process.env.PORT || 80,
        mailer: mailInfo
    }

};