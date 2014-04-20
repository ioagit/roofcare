/**
 * Created by isuarez on 4/17/2014.
 */

module.exports = {

    roles: {

        admin: 'admin',
        contractor: 'contractor',
        customer: 'customer'

    },

    salutation: {

        Mr: 'Mr',
        Mrs: 'Ms',
        Miss: ''

    },

    orderType: {
        repair: 'roof repair',
        check: 'roof check'
    },

    roofType: {

        steep: 'Steep',
        flat: 'Flat',
        other: 'Other'
    },

    propertyType: {
        singleFamily: 'Single Family',
        multiFamily: 'Multi Family'
    },



    contactType: {
        owner: 'owner',
        renter: 'renter',
        concierge: 'concierge',
        roommate: 'roommate',
        neighbour: 'neighbour'
    },

    distanceType: {

        klm: 'kilometers',
        miles: 'miles'


    },

    jobStatus: {
        unknown : 'unknown',
        created: 'created',
        requestAccepted: 'request accepted',
        requestRejected: 'request rejected' ,
        workStarted: 'work started',
        workCompleted: 'work completed',
        workRejected: 'work rejected'
    },

    paymentType: {

        cash:'cash',
        bankTransfer: 'bank transfer',
        amex: 'amex',
        visa: 'visa',
        masterCard: 'master card',
        discoverCard: 'discover card'

    },

    UnitOfMeasure: {

        Piece: 'Piece',
        Meter: 'Meter',
        CubicMeter: 'CubicMeter'

    }






};
