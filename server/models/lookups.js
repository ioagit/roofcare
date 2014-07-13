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
            id: 'repair',
            name: 'Dachreparatur',
            fee: 150,
            hours: '4 hours'
        },
        check: {
            id: 'check',
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

    roofAccess: {

      window: 'Zugang zum Dach über Ausstige / Fenster oder Leiter vor Ort möglich',
      ladder: 'Leiter muss mitgebracht werden (max.7,00m)',
      none: 'Kein Zugang über Dach möglich und höher als 7,00m (in diesem Fall klärt unser Servicetechniker mit Ihnen die Möglichkeiten)'

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
        responsePending: 'Roofcare Auftrag erteilt',
        requestAccepted: 'Roofcare Auftrag bestaetigt',
        requestRejected: 'Roofcare Auftrag gekuendigt' ,
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
    },

    propertyFromValue: function ( source, value ){

        for( var key in source ) {

            if(source[key] === value ) return key;

            if( typeof source[key] === 'object' )
            {
                var result = this.propertyFromValue( source[key], value );
                if (result !== null) return result;
            }
        }
        return null;
    }

};