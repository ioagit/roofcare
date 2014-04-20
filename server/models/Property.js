/**
 * Created by isuarez on 4/17/2014.
 */

/**
 * Created by isuarez on 3/28/2014.
 */

var mongoose = require('mongoose'),
    path = require('path'),
    validator = require(path.join(process.cwd(), 'server', 'config', 'validator')),
    lookUps = require(path.join(process.cwd(), 'server', 'models', 'lookUps'));
    phisicalAddress = require(path.join(process.cwd(), 'server', 'models', 'Address'));

var _schema = new mongoose.Schema({

    address: [phisicalAddress.Schema],

    roofType: {
        type: String,
        default: lookUps.roofType.steep
    },

    type: {
        type: String,
        default: lookUps.prototype.singleFamily
    }

});

_schema.methods = {


};

var _model = mongoose.model('Property', _schema);

module.exports = {
  Model: _model,
  Schema : _schema
}


