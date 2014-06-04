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

    findOrderTypeByName: function(name){
        if (this.orderType.repair.name == name) return this.orderType.repair;
        if (this.orderType.check.name == name) return this.orderType.check;
        return null;
    },

    //Should be translated
    orderType: {
        repair: {
            name: 'Dachreparatur',
            fee: 150,
            hours: '4 hours'
        },
        check: {
            name:'Dachcheck',
            fee: 99,
            hours: 'ca 90 - 120 Min.'
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
        responsePending: 'Contractor Response Pending',
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