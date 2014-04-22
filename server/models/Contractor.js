/**
 * Created by isuarez on 4/17/2014.
 */

// Customer Model
var mongoose = require('mongoose'),
    path = require('path'),
    validator = require(path.join(process.cwd(), 'server', 'config', 'validator')),
    extend = require('mongoose-schema-extend'),
    UserSchema = require(path.join(process.cwd(), 'server', 'models', 'Users')).Schema;

var _schema =  UserSchema.extend
({
    address: { type : mongoose.Schema.ObjectId, ref : 'Property' }
});

_schema.methods = {


};

var _model = mongoose.model('Contractor', _schema);

module.exports = {
    Model: _model,
    Schema : _schema
}