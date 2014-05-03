/**
 * Created by isuarez on 3/28/2014.
 */

// Customer Model
var mongoose = require('mongoose'),
    path = require('path'),
    extend = require('mongoose-schema-extend'),
    validator = require(path.join(process.cwd(), 'server', 'config', 'validator')),
    contactInfo = require(path.join(process.cwd(), 'server', 'models', 'contactInfo')),
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