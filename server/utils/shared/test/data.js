/**
 * Created by isuarez on 4/4/2014.
 */

var credentials = {
    admin: {
        username: 'verita',
        password: 'verita'
    },

    contractor: {
        username: 'rimita',
        password: 'rimita'
    },

    user: {
        username: 'ioaioa',
        password: 'ioaioa'
    },

    invalid: {
        username: 'invalid',
        password: 'invalid'
    }
}

var testUsers =  {

    admin: {

        username: 'testAdminName',
        password: 'testAdminPassword',
        firstName: 'testAdminFirstName',
        lastName: 'testAdminLastName',
        roles: ['admin']
    },

    contractor: {

        username: 'testContractorName',
        password: 'testContractorPassword',
        firstName: 'testContractorFirstName',
        lastName: 'testContractorLastName',
        roles: ['contractor']
    },

    user: {

        username: 'testUserName',
        password: 'testUserPassword',
        firstName: 'testUserFirstName',
        lastName: 'testUserLastName',
        roles: ['']
    }

}

var testData = {
    credentials: credentials,
    users : testUsers

}

module.exports = testData;