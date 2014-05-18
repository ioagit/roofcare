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

var build = function(sourceAddress, callback) {
    var entity = {
        street: sourceAddress.street,
        city: sourceAddress.city,
        state: sourceAddress.state,
        zipCode: sourceAddress.zipCode || '',
        country: sourceAddress.country || 'Germany'
    };

    var location = getFormattedAddress(entity);
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
var getFormattedAddress = function(source) {
    var address = util.format('%s %s', source.street, source.city);
    if (source.state != null && source.state != "") address += ' ' + source.state;
    if (source.country != null && source.country != "")
        address += ' ' + source.country;
    else
        address += ' Germany';

    return address + ' ' + source.zipCode;
};
var refresh = function(originalAddress, currentAddress, callback) {
    var isDirty =  (
        currentAddress.street !== originalAddress.street ||
        currentAddress.city !== originalAddress.city ||
        currentAddress.state !== originalAddress.state ||
        currentAddress.zipCode !== originalAddress.zipCode ||
        currentAddress.country !== originalAddress.country
    );

    if (isDirty) {
        var location = getFormattedAddress(currentAddress);
        geocoder.geocode(location, function(err, geoData) {
            if (err)
                callback(err, null);
            else
                callback (null, [geoData[0].longitude, geoData[0].latitude]);
        });
    }
    else
        callback(null, originalAddress.coordinates);
};

module.exports = {
    Definition: rawSchema,
    Build: build,
    GetFormattedAddress: getFormattedAddress,
    RefreshCoordinates: refresh
};