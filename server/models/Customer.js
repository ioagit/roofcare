/**
 * Created by isuarez on 3/28/2014.
 */

// Customer Model
var mongoose = require('mongoose'),
    path = require('path'),
    validator = require(path.join(process.cwd(), 'server', 'config', 'validator')),
    contactInfo = require(path.join(process.cwd(), 'server', 'models', 'contactInfo')),
    extend = require('mongoose-schema-extend'),
    BaseSchema = require(path.join(process.cwd(), 'server', 'models', 'BaseSchema'));

var schema =  BaseSchema.extend(
    {
        contactInfo: contactInfo
    }
);

schema.statics.FindByFirstOrLastName = function(name, callback)
{
    var namesCriteria =[ {'contactInfo.firstName': name}, {'contactInfo.lastName': name}];
    this.find({})
        .or(namesCriteria)
        .exec(function (err, coll) {
            callback(coll);
        });
};

var model = mongoose.model('Customer', schema);
module.exports = {
    Model: model,
    Schema : schema
};