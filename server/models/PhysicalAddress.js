/**
 * Created by cerker on 4/11/14.
 */

var mongoose  = require('mongoose'),
    path = require('path'),
    validator = require(path.join(process.cwd(), 'server', 'config', 'validator')),
    util = require('util');

var physicalAddressSchema = new mongoose.Schema({
    Latitude: {type: Number, required:true},
    Longitude: {type: Number, required:true},
    Street : {type: String, required:true},
    City: {type: String, required:true},
    ZipCode: {type: String, required:false},
    Country: {type: String, required:true}
});

physicalAddressSchema.methods = {

    getFormattedAddress: function() {
        var address = util.format('%s %s', this.Street, this.City);
        if (this.Country != null && this.Country != "")
            address += ' ' + this.Country;
        address += ' ' + this.ZipCode;
        return address;
    }
};

var _model =  mongoose.model('PhysicalAddress', physicalAddressSchema);
module.exports.Model = _model;