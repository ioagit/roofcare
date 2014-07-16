/**
 * Created by christopher erker on 6/16/14.
 */

'use strict';

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    path = require('path'),
    nodemailer = require('nodemailer'),
    emailTemplates = require('email-templates'),
    config = require(path.join(process.cwd(), 'server', 'config','config'))[env],
    lookUps = require(path.join(process.cwd(), 'server', 'models', 'lookups')),
    translation = require(path.join(process.cwd(), 'server', 'translation','de-de' )),
    templatesDir = path.resolve(__dirname, '..', 'views/mailer'),
    EmailAddressRequiredError = new Error('email address required'),
    EmailSubjectRequiredError = new Error('subject required'),
    defaultTransport = nodemailer.createTransport(config.mailer.service, {
        service: config.mailer.service,
        auth: {
            user: config.mailer.auth.user,
            pass: config.mailer.auth.pass
        }
    });

var doEmailing = function(templateName, locals, fn) {

  //return fn(null, 'email template is commented now', 'email tempd disabled', 'email temp disabled');

    emailTemplates(templatesDir, function (err, template) {
        if (err) return fn(err);

        // Send a single email
        template(templateName, locals, function (err, html, text) {
            if (err) return fn(err);

            // if we are testing don't send out an email instead return success and the html and txt strings for inspection
            if (env === 'test')
                return fn(null, '250 2.0.0 OK 1350452502 s5sm19782310obo.10', html, text);

            defaultTransport.sendMail({
                from: config.mailer.defaultFromAddress,
                to: locals.email,
                subject: locals.subject,
                html: html,
                generateTextFromHTML: true,
                text: text
            }, function (err, responseStatus) {
                if (err) return fn(err);

                return fn(null, responseStatus.message, html, text);
            });
        });

    });
};

exports.sendEmailsForJob = function (jobModel, callbackFunction) {

    if (callbackFunction == null)
        callbackFunction = function() {};

    var job = jobModel.toObject();

    //formatting job date
    job.startDate =  translation.formatDate(job.startDate);
    var jobStatus = lookUps.propertyFromValue(lookUps.jobStatus, job.status);

    var locals = {
        email: jobModel.customer.email,
        name: "Roofcare",
        subject: translation.email.subject[jobStatus],
        job: job
    };

    if (!locals.email) return callbackFunction(EmailAddressRequiredError);
    if (!locals.subject) return callbackFunction(EmailSubjectRequiredError);

    doEmailing('customer/' + jobStatus, locals, callbackFunction);
    doEmailing('contractor/' + jobStatus, locals, callbackFunction);
};

exports.sendOne = function (templateName, locals, fn) {
    if (!locals.email) return fn(EmailAddressRequiredError);
    if (!locals.subject) return fn(EmailSubjectRequiredError);

    doEmailing(templateName, locals, fn);
};