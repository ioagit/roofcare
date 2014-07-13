var path = require('path'),
    moment = require('moment');

moment.lang('de');

var translation = {
    language: 'de-de',
    authentication: 'Authentifikation',
    loginError: 'Error beim Einloggen',
    loginSuccess: 'Erfolgreich eingeloggt',
    loginInvalid: 'Falscher Benutzername',


    logoutSuccess: 'Erfolgreich ausgeloggt',
    notAuthorized: 'Nicht erlaubt',


     //Session Loading
    roofCareLoaded: 'Roofcare geladen',
    contractorDashboardLoaded: 'Dashboard geladen',

    //Shell Messages
    busyMessage: 'Laden...bitte warten',

    //data Loading errors
    loadinError: 'Daten konnten nicht geladen werden',
    notFoundError: 'Daten nicht gefunden',
    notAuthorizedError: 'Diese Daten sind nicht vefuegbar. Bitte einloggen',
    serverError: 'Etwas ist falsch gelaufen. Bitte nochmal probieren',
    badRequestError: 'Falsche Anfrage',


    validation: {

        //contact Info
        invalidName: 'Falsche Eingabe',

        invalidUsername: 'User name must be at least 6 characters long',
        invalidPassword: 'Password must be at least 6 characters long',

        //address
        invalidAddress: 'Bitte Adresse angeben',
        invalidZipCode: 'Bitte PLZ angeben',
        invalidCity: 'Bitte Stadt angeben',

        invalidOrderAgreement: 'Bitte auf Einverstanden klicken'

    },

    //persinting messages
    orderSavedSuccess: 'Bestellung erfolgreich gepeichert.',
    orderSavedFail: 'Bestellung wurde nicht gespeichert.',

    email: {
      subject: {
        unknown : 'Nicht angegeben',
        created: 'Erstellt',
        responsePending: 'Roofcare Auftrag erteilt',
        requestAccepted: 'Roofcare Auftrag bestaetigt',
        requestRejected: 'Roofcare Auftrag gekuendigt' ,
        workStarted: 'Gestartet',
        workCompleted: 'Fertig',
        workRejected: 'Vor Ort Abgelehnt'
      }
    }

};

module.exports = translation;
module.exports.formatDate = function(date) {
    return moment(date).format('lll');
};
