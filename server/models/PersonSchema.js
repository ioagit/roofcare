/**
 * Created by isuarez on 4/17/2014.
 */

var mongoose = require('mongoose'),
    path = require('path'),
    contactInfo = require(path.join(process.cwd(), 'server', 'models', 'contactInfo')),
    extend = require('mongoose-schema-extend'),
    BaseSchema = require(path.join(process.cwd(), 'server', 'models', 'BaseSchema'));

var schema = BaseSchema.extend({
    contactInfo: contactInfo
});

schema.virtual('fullName').get(function () {
     return this.contactInfo.firstName + ' ' + this.contactInfo.lastName;
});

schema.virtual('fullName').set(function (name) {
     var split = name.split(' ');
    this.contactInfo.firstName = split[0];
    this.contactInfo.lastName = split[1];
});

schema.statics.FindByFirstOrLastName = function(name, callback)
{
    var namesCriteria =[ {'contactInfo.firstName': name}, {'contactInfo.lastName': name}];
    this.find({})
        .or(namesCriteria)
        .exec(function (err, coll) {
            callback(coll);
        });
};

module.exports = schema;