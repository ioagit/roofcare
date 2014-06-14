/**
 * Created by christophererker on 6/14/14.
 */

var path = require('path'),
    gm = require('googlemaps');

function getErrorFromCoordinates(originCoordinates, destinationCoordinates)
{
    if (originCoordinates === null || originCoordinates.length != 2)
        return new Error('originCoordinates are not valid');

    if (destinationCoordinates === null || destinationCoordinates.length != 2)
        return new Error('destinationCoordinates are not valid');

    return null;
}

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
}