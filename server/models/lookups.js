/**
 * Created by isuarez on 4/17/2014.
 */

module.exports = {

    roles: {

        admin: 'admin',
        contractor: 'Kontraktor',
        customer: 'Kunde'

    },

    salutation: {

        Mr: 'Herr',
        Mrs: 'Frau',
        Miss: ''

    },

    //Should be translated
    orderType: {
        repair: {
            name: 'Dachreparatur',
            fee: 150
        },
        check: {
            name:'Dachcheck',
            fee: 99
        }
    },

    roofType: {

        steep: 'Steildach',
        flat: 'Flachdach',
        other: 'Nicht angegeben'
    },

    propertyType: {
        singleFamily: 'Ein bis Zweifamilien Wohnhaus',
        multiFamily: 'Grosses Mehrfamilienwohnhaus',
        other: 'Anderes Haus'
    },

    contactType: {
        owner: 'Besitzer/in',
        renter: 'Mieter/in',
        concierge: 'Hausmeiser/in',
        roommate: 'MItberwohner/in',
        neighbour: 'Nachbar/in'
    },

    distanceType: {

        klm: 'KM',
        miles: 'miles'
    },

    jobStatus: {
        unknown : 'Nicht angegeben',
        created: 'Erstellt',
        requestAccepted: 'Angenommen',
        requestRejected: 'Anfrage Abgelehnt' ,
        workStarted: 'Gestartet',
        workCompleted: 'Fertig',
        workRejected: 'Vor Ort Abgelehnt'
    },

    paymentType: {

        cash:'Bar',
        bankTransfer: 'Bank Transfer',
        amex: 'Amex',
        visa: 'Visa',
        masterCard: 'Mastercard',
        discoverCard: 'Discover'

    },

    UnitOfMeasure: {

        Piece: 'Stueck',
        Meter: 'Meter',
        CubicMeter: 'Kubik Meter'
    }


};