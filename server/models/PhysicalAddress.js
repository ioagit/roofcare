/**
 * Created by cerker on 4/11/14.
 */

var mongoose  = require('mongoose'),
    path = require('path'),
    validator = require(path.join(process.cwd(), 'server', 'config', 'validator')),
    util = require('util');

var physicalAddressSchema = new mongoose.Schema({
    Longitude: {type: Number, required:true},
    Latitude: {type: Number, required:true},
    geo: {type: [Number], index: '2d'},
    Street : {type: String, required:true},
    City: {type: String, required:true},
    ZipCode: {type: String, required:false},
    Country: {type: String, required:true, default: 'Germany'}
});

physicalAddressSchema.methods = {

    getFormattedAddress: function() {
        var address = util.format('%s %s', this.Street, this.City);
        if (this.Country != null && this.Country != "")
            address += ' ' + this.Country;
        address += ' ' + this.ZipCode;
        return address;
    },
    closest: function(callback) {
        return this.model('Place').find({geo: { $nearSphere: this.geo, $maxDistance: 0.01} }, callback);
    }
};

var _model =  mongoose.model('PhysicalAddress', physicalAddressSchema);
module.exports.Model = _model;
module.exports.Schema = physicalAddressSchema;
