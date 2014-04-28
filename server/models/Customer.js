/**
 * Created by isuarez on 4/17/2014.
 */

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

var _schema =  BaseSchema.extend
({

    contactInfo: contactInfo


});

_schema.methods = {


};

var _model = mongoose.model('Customer', _schema);


module.exports = {
    Model: _model,
    Schema : _schema
}


