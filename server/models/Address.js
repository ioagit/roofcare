/**
 * Created by cerker on 4/11/14.
 */

var geocoder = require('node-geocoder').getGeocoder('google', 'https');
var mongoose  = require('mongoose'),
    path = require('path'),
    validator = require(path.join(process.cwd(), 'server', 'config', 'validator')),
    util = require('util');

var rawSchema = {
    coordinates: {type: [Number, Number], index: '2d', default:[0,0], required:true},
    street : {type: String, required:true},
    city: {type: String, required:true},
    state: {type: String, required:false},
    zipCode: {type: String, required:false},
    country: {type: String, required:true, default: 'Germany'}
};

var schema = new mongoose.Schema(rawSchema);

schema.virtual('latitude')
    .get(function() { return this.coordinates[1]; })
    .set(function(val) { this.coordinates[1] = val; });

schema.virtual('longitude')
    .get(function(){ return this.coordinates[0];})
    .set(function(val) { this.coordinates[0] = val; });

schema.methods = {

    getFormattedAddress: function() {
        var address = util.format('%s %s', this.street, this.city);
        if (this.state != null && this.state != "") address += ' ' + this.state;
        if (this.country != null && this.country != "") address += ' ' + this.country;
        address += ' ' + this.zipCode;
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

            if (entity.street !== sourceAddress.street)
            {
                entity.street = sourceAddress.street;
                isDirty = true;
            }
            if (entity.city !== sourceAddress.city)
            {
                entity.city = sourceAddress.city;
                isDirty = true;
            }
            if (entity.state !== sourceAddress.state)
            {
                entity.state = sourceAddress.state;
                isDirty = true;
            }
            if (entity.zipCode !== sourceAddress.zipCode)
            {
                entity.zipCode = sourceAddress.zipCode;
                isDirty = true;
            }
            if (entity.country !== sourceAddress.country)
            {
                entity.country = sourceAddress.country;
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
                        entity.coordinates = [geoData.longitude, geoData.latitude];
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
    entity.street = sourceAddress.street;
    entity.city = sourceAddress.city;
    entity.state = sourceAddress.state;
    entity.zipCode = sourceAddress.zipCode || '';
    entity.country = sourceAddress.country || 'Germany';

    var location = entity.getFormattedAddress();
    geocoder.geocode(location, function(err, data) {
        var geoData = data[0];
        if (geoData.countryCode == 'DE')
            entity.street = geoData.streetName + ' ' + geoData.streetNumber;
        else
            entity.street = geoData.streetNumber + ' ' + geoData.streetName;

        entity.city = geoData.city;
        entity.country = geoData.country;
        entity.state = geoData.state;
        entity.zipCode = geoData.zipcode;
        entity.latitude = geoData.latitude;
        entity.longitude = geoData.longitude;
        callback(entity);
    });
};

var model =  mongoose.model('Address', schema);

module.exports = {
    Model:  model,
    Schema: schema,
    Definition: rawSchema
};
