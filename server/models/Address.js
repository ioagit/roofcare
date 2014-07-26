/**
 * Created by cerker on 4/11/14.
 */

var path = require('path'),
    mongoose  = require('mongoose'),
    geo = require(path.join(process.cwd(), 'server', 'utils','geo' )),
    validator = require(path.join(process.cwd(), 'server', 'config', 'validator')),
    util = require('util'),
    _ = require('underscore');


//The schema for address
var rawSchema = {
    coordinates: {type: [Number, Number], index: '2d', default:[0,0], required:true},
    street : {type: String},
    city: {type: String},
    state: {type: String},
    zipCode: {type: String},
    country: {type: String, default: 'Deutschland'}
};

var areEqual = function (original, current) {
    return current.street === original.street &&
        current.city === original.city &&
        current.state === original.state &&
        current.zipCode === original.zipCode &&
        current.country === original.country;
};

var build = function(sourceAddress, callback) {
    var location = getFormattedAddress(sourceAddress);
    geo.getAddress(location, function(err, address) {
        if (err) return callback(err, sourceAddress);
        callback(null, address);
    });
};

var getFormattedAddress = function(source) {
    var address = util.format('%s %s', source.street, source.city);
    if (source.state != null && source.state != "") address += ' ' + source.state;
    if (source.country != null && source.country != "")
        address += ' ' + source.country;
    else
        address += ' Deutschland';

    return address + ' ' + source.zipCode;
};

var refresh = function(originalAddress, currentAddress, callback) {
    var isEqual =  areEqual(originalAddress, currentAddress);
    if (isEqual)
        callback(null, originalAddress.coordinates);
    else
    {
        var location = getFormattedAddress(currentAddress);
            geo.getAddress(location, function(err, address) {
            if (err)
                callback(err, null);
            else
                callback (null, address.coordinates);
        });
    }
};

module.exports = {
    Definition: rawSchema,
    Build: build,
    Equals: areEqual,
    GetFormattedAddress: getFormattedAddress,
    RefreshCoordinates: refresh
};