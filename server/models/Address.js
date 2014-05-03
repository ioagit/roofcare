/**
 * Created by cerker on 4/11/14.
 */

var geocoder = require('node-geocoder').getGeocoder('google', 'https');
var mongoose  = require('mongoose'),
    path = require('path'),
    validator = require(path.join(process.cwd(), 'server', 'config', 'validator')),
    util = require('util');

var schema = new mongoose.Schema({
    Coordinates: {type: [Number, Number], index: '2dsphere', default:[0,0], required:true},
    Street : {type: String, required:true},
    City: {type: String, required:true},
    State: {type: String, required:false},
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
    }
};
schema.set('toJSON', { getters: true, virtuals: false });

schema.statics.Build = function(sourceAddress, callback)
{
    var entity = new this();
    entity.Street = sourceAddress.street;
    entity.City = sourceAddress.city;
    entity.State = sourceAddress.state;
    entity.ZipCode = sourceAddress.zipCode || '';
    entity.Country = sourceAddress.country || 'Germany';

    var location = entity.getFormattedAddress();
    geocoder.geocode(location, function(err, data) {
        var geoData = data[0];
        if (geoData.countryCode == 'DE')
            entity.Street = geoData.streetName + ' ' + geoData.streetNumber;
        else
            entity.Street = geoData.streetNumber + ' ' + geoData.streetName;

        entity.City = geoData.city;
        entity.Country = geoData.country;
        entity.State = geoData.state;
        entity.ZipCode = geoData.zipcode;
        entity.Latitude = geoData.latitude;
        entity.Longitude = geoData.longitude;
        callback(entity);
    });
};

var model =  mongoose.model('Address', schema);
module.exports.Model = model;
module.exports.Schema = schema;
