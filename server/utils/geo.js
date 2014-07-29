/**
 * Created by christophererker on 6/14/14.
 */

var path = require('path'),
    _ = require('underscore'),
    gm = require('googlemaps');

function getErrorFromCoordinates(originCoordinates, destinationCoordinates) {
    if (originCoordinates === null || originCoordinates.length != 2 || originCoordinates[0] == 0 || originCoordinates[1] == 0)
        return new Error('originCoordinates are not valid');

    if (destinationCoordinates === null || destinationCoordinates.length != 2 || destinationCoordinates[0] == 0 || destinationCoordinates[1] == 0)
        return new Error('destinationCoordinates are not valid');

    return null;
}

exports.getAddress = function(sourceAddress, callback) {
    gm.geocode(sourceAddress, function(err,data) {

        if (err != null) callback(err, data);

        var geoData = data.results[0];

        var streetNumber = '';
        var streetName = '';
        var streetNumberFirst = false;

        var address = {coordinates: [geoData.geometry.location.lng, geoData.geometry.location.lat]};

        _.each(geoData.address_components, function (val) {
            switch(val.types[0]) {
                case "street_number": streetNumber = val.long_name; break;
                case "route": streetName = val.long_name; break;
                case "locality": address.city = val.long_name; break;
                case "administrative_area_level_1": address.state = val.short_name; break;
                case "country":
                    address.country = val.long_name;
                    streetNumberFirst = val.short_name == 'US';
                    break;
                case "postal_code": address.zipCode = val.long_name; break;
            }
        });

        if (streetNumberFirst)
            address.street = streetNumber + ' ' + streetName;
        else
            address.street = streetName + ' ' + streetNumber;

        callback(null, address);

    }, 'false', '', '', 'de');
};

exports.getDrivingDistance = function(originCoordinates, destinationCoordinates, callback) {

    var error = getErrorFromCoordinates(originCoordinates, destinationCoordinates);
    if (error != null)
        return callback(error, null);

    var origins = originCoordinates[1] + ',' + originCoordinates[0],
        destinations = destinationCoordinates[1] + ',' + destinationCoordinates[0],
        sensor = false,
        mode = 'driving',
        alternatives = false,
        avoid = false,
        units = 'metric',
        language = 'de-de';

    var internalCallback = function (err, data) {
        if (err) return callback(err, null);
        var travel = data.rows[0].elements[0];
        var km = travel.distance.value / 1000;
        var result =   parseFloat(""+km).toFixed(2) * 1;
        callback(null, result);
    };
    gm.distance(origins, destinations, internalCallback, sensor, mode, alternatives, avoid, units, language);
};
exports.getStaticMap = function(origin, destination) {
    var error = getErrorFromCoordinates(origin, destination);
    if (error != null) return callback(error, null);

    var center = [ (origin[1] + destination[1])/2, (origin[0] + destination[0])/2 ];

    var markers = [
        { 'location': origin[1] + ',' + origin[0], color:'red', label: 'O' },
        { 'location': destination[1] + ',' + destination[0], 'color': 'green', 'label': 'D' }
    ];

    return gm.staticMap(center, false, '200x200', false, false, 'roadmap', markers);
};
