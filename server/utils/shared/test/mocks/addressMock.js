/**
 * Created by isuarez on 4/27/14.
 */
/**
 * Created by isuarez on 4/18/2014.
 */

var mongoose  = require('mongoose')
    , Monky     = require('monky')
    , monky     = new Monky(mongoose)
    , path = require('path')
    ,faker = require('Faker')
    , Address = require(path.join(process.cwd(), 'server', 'models', 'Address')).Model;


function build() {

    return  new Address(
        {
            Coordinates: new Array([faker.Address.latitude(), faker.Address.longitude()]),
            Street: faker.Address.streetAddress(),
            City: faker.Address.city(),
            State: faker.Address.usState(),
            Country: 'USA',
            ZipCode: faker.Address.zipCode()
        });

}

function create(callback) {

    var address = build();
    address.save(function (err, obj) {
        callback(err, obj)
    });
}

function buildList(n) {

    var list = new Array();

    for (var i = 0; i < n; i+= 1)
        list.push(build());

    return list;

}

function createList(n, callback) {
    return Address.create(buildList(n), function(err, list) {
        callback(err, list);
    })
}



module.exports = {

    build: build,
    create: create,
    buildList: buildList,
    createList: createList

}
