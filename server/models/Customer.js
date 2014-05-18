/**
 * Created by isuarez on 3/28/2014.
 */

// Customer Model
var mongoose = require('mongoose'),
    path = require('path'),
    extend = require('mongoose-schema-extend'),
    validator = require(path.join(process.cwd(), 'server', 'config', 'validator')),
    contactInfo = require(path.join(process.cwd(), 'server', 'models', 'contactInfo')),
    PersonSchema = require(path.join(process.cwd(), 'server', 'models', 'PersonSchema'));

var schema =  PersonSchema;

var model = mongoose.model('Customer', schema);
module.exports = {
    Model: model,
    Schema : schema
};