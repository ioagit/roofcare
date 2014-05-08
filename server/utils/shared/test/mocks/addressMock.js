/**
 * Created by isuarez on 4/27/14.
 */
/**
 * Created by isuarez on 4/18/2014.
 */

var mongoose  = require('mongoose')
    , path = require('path')
    ,faker = require('Faker')
    , Address = require(path.join(process.cwd(), 'server', 'models', 'Address')).Model;


function build() {

    return  new Address(
        {
            Latitude: faker.Address.latitude(),
            Longitude: faker.Address.longitude(),
            Street: faker.Address.streetAddress(),
            City: faker.Address.city(),
            State: faker.Address.usState(),
            Country: 'USA',
            ZipCode: faker.Address.zipCode()
        });

}





module.exports = {

    build: build


}
