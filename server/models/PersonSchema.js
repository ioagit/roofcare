/**
 * Created by isuarez on 4/17/2014.
 */

    var mongoose = require('mongoose'),
        path = require('path'),
        contactInfo = require(path.join(process.cwd(), 'server', 'models', 'contactInfo')),
        extend = require('mongoose-schema-extend'),
        BaseSchema = require(path.join(process.cwd(), 'server', 'models', 'BaseSchema'));

    var _schema = BaseSchema.extend({

        contactInfo: contactInfo

    });

    _schema.virtual('fullName').get(function () {
         return this.contactInfo.firstName + ' ' + this.contactInfo.lastName;
    });

    _schema.virtual('fullName').set(function (name) {
         var split = name.split(' ');
        this.contactInfo.firstName = split[0];
        this.contactInfo.lastName = split[1];
    });

    module.exports = _schema;
