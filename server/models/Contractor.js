/**
 * Created by isuarez on 4/17/2014.
 */

// Customer Model
var mongoose = require('mongoose'),
    path = require('path'),
    validator = require(path.join(process.cwd(), 'server', 'config', 'validator')),
    extend = require('mongoose-schema-extend'),
    UserSchema = require(path.join(process.cwd(), 'server', 'models', 'UserSchema'));

var _schema =  UserSchema.extend
({

    contactInfo: contactInfo,
    address: { type : mongoose.Schema.ObjectId,
               ref : 'Property'
             },
    jobs: []

});

_schema.methods = {


};

var _model = mongoose.model('Contractor', _schema);


module.exports = {
    Model: _model,
    Schema : _schema
}


