/**
 * Created by cerker on 4/11/14.
 */

var mongoose  = require('mongoose'),
    path = require('path'),
    sprintf = require('sprintf').sprintf,
    validator = require(path.join(process.cwd(), 'server', 'config', 'validator'));

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
        var address = sprintf('%(Street) %(City)');
        if (Country != null && Country != "")
            address += ' ' +Country;
        address += ' ' + ZipCode;
    }
};

var PhysicalAddress =  mongoose.model('PhysicalAddress', physicalAddressSchema);

