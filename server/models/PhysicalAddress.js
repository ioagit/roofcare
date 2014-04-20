/**
 * Created by cerker on 4/11/14.
 */

var mongoose  = require('mongoose'),
    path = require('path'),
    validator = require(path.join(process.cwd(), 'server', 'config', 'validator')),
    util = require('util');

var schema = new mongoose.Schema({
    Coordinates: {type: [Number, Number], index: '2d', default:[0,0], required:true},
    Street : {type: String, required:true},
    City: {type: String, required:true},
    ZipCode: {type: String, required:false},
    Country: {type: String, required:true, default: 'Germany'}
});

var latitudeProp = schema.virtual('Latitude');
latitudeProp.get(function() { return this.Coordinates[0]; });
latitudeProp.set(function(val) { this.Coordinates[0] = val; });

var longitudeProp = schema.virtual('Longitude');
longitudeProp.get(function(){ return this.Coordinates[1];});
longitudeProp.set(function(val) { this.Coordinates[1] = val; });

schema.methods = {

    getFormattedAddress: function() {
        var address = util.format('%s %s', this.Street, this.City);
        if (this.Country != null && this.Country != "")
            address += ' ' + this.Country;
        address += ' ' + this.ZipCode;
        return address;
    },
    closest: function(callback) {
        return this.model('PhysicalAddress').find({geo: { $nearSphere: this.geo, $maxDistance: 0.01} }, callback);
    }
};
schema.set('toJSON', { getters: true, virtuals: false });


var _model =  mongoose.model('PhysicalAddress', schema);
module.exports.Model = _model;
module.exports.Schema = schema;
