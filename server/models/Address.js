/**
 * Created by cerker on 4/11/14.
 */

var geocoder = require('node-geocoder').getGeocoder('google', 'https');
var mongoose  = require('mongoose'),
    path = require('path'),
    validator = require(path.join(process.cwd(), 'server', 'config', 'validator')),
    util = require('util');

var rawSchema = {
    Coordinates: {type: [Number, Number], index: '2d', default:[0,0], required:true},
    Street : {type: String, required:true},
    City: {type: String, required:true},
    State: {type: String, required:false},
    ZipCode: {type: String, required:false},
    Country: {type: String, required:true, default: 'Germany'}
};

var schema = new mongoose.Schema(rawSchema);

var latitudeProp = schema.virtual('Latitude');
latitudeProp.get(function() { return this.Coordinates[1]; });
latitudeProp.set(function(val) { this.Coordinates[1] = val; });

var longitudeProp = schema.virtual('Longitude');
longitudeProp.get(function(){ return this.Coordinates[0];});
longitudeProp.set(function(val) { this.Coordinates[0] = val; });

schema.methods = {

    getFormattedAddress: function() {
        var address = util.format('%s %s', this.Street, this.City);
        if (this.State != null && this.State != "") address += ' ' + this.State;
        if (this.Country != null && this.Country != "") address += ' ' + this.Country;
        address += ' ' + this.ZipCode;
        return address;
    }
};
schema.set('toJSON', { getters: true, virtuals: false });

schema.statics.UpdateIfNeeded = function(sourceAddress, callback) {
    var that = this;

    that.findById(sourceAddress.id, function (err, entity) {
        if (err) {
            callback(err);
        } else {

            var isDirty = false;

            if (entity.Street !== sourceAddress.Street)
            {
                entity.Street = sourceAddress.Street;
                isDirty = true;
            }
            if (entity.City !== sourceAddress.City)
            {
                entity.City = sourceAddress.City;
                isDirty = true;
            }
            if (entity.State !== sourceAddress.State)
            {
                entity.State = sourceAddress.State;
                isDirty = true;
            }
            if (entity.ZipCode !== sourceAddress.ZipCode)
            {
                entity.ZipCode = sourceAddress.ZipCode;
                isDirty = true;
            }
            if (entity.Country !== sourceAddress.Country)
            {
                entity.Country = sourceAddress.Country;
                isDirty = true;
            }

            if (isDirty)
            {
                var location = entity.getFormattedAddress();
                geocoder.geocode(location, function(err, data) {
                    if (err)
                        callback(err);
                    else {
                        var geoData = data[0];
                        entity.Coordinates = [geoData.longitude, geoData.latitude];
                        entity.save(callback);
                    }
                });
            }
            else
                callback();
        }
    })
};

schema.statics.Build = function(sourceAddress, callback) {
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
module.exports.Definition = rawSchema;
