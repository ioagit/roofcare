/**
 * Created by christophererker on 6/16/14.
 */

'use strict';

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var path = require('path'),
    nodemailer = require('nodemailer'),
    emailTemplates = require('email-templates'),
    config = require(path.join(process.cwd(), 'server', 'config','config'))[env],
    templatesDir = path.resolve(__dirname, '..', 'views/mailer');


var EmailAddressRequiredError = new Error('email address required');

// create a defaultTransport using gmail and authentication that are stored in the `config.js` file.
var defaultTransport = nodemailer.createTransport('SMTP', {
    service: config.mailer.service,
    auth: {
        user: config.mailer.auth.user,
        pass: config.mailer.auth.pass
    }
});

exports.sendOne = function (templateName, locals, fn) {
    // make sure that we have an user email
    if (!locals.email) {
        return fn(EmailAddressRequiredError);
    }
    // make sure that we have a message
    if (!locals.subject) {
        return fn(EmailAddressRequiredError);
    }
    emailTemplates(templatesDir, function (err, template) {
        if (err) {
            console.log(err);
            return fn(err);
        }
        // Send a single email
        template(templateName, locals, function (err, html, text) {
            if (err) {
                //console.log(err);
                return fn(err);
            }
            // if we are testing don't send out an email instead return
            // success and the html and txt strings for inspection
            if (env === 'test') {
                return fn(null, '250 2.0.0 OK 1350452502 s5sm19782310obo.10', html, text);
            }
            var transport = defaultTransport;
            transport.sendMail({
                from: config.mailer.defaultFromAddress,
                to: locals.email,
                subject: locals.subject,
                html: html,
                // generateTextFromHTML: true,
                text: text
            }, function (err, responseStatus) {
                if (err) {
                    return fn(err);
                }
                return fn(null, responseStatus.message, html, text);
            });
        });
    });
};
