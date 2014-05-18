/**
 * Created by isuarez on 3/28/2014.
 */

var mongoose = require('mongoose'),
    path = require('path'),
    validator = require(path.join(process.cwd(), 'server', 'config', 'validator')),
    lookUps = require(path.join(process.cwd(), 'server', 'models', 'lookUps'));
    physicalAddress = require(path.join(process.cwd(), 'server', 'models', 'Address'));

var schema = new mongoose.Schema({

    address: physicalAddress.Definition,

    roofType: {
        type: String,
        default: lookUps.roofType.steep
    },

    type: {
        type: String,
        default: lookUps.prototype.singleFamily
    }

});

var model = mongoose.model('Property', schema);

module.exports = {
  Model: model,
  Schema : schema
}