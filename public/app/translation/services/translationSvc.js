/**
 * Created by isuarez on 5/18/14.
 */

(function() {

    var translationModule = angular.module('app.translation', []);

    translationModule.service('translationSvc', ['$resource', 'config', translationSvc]);

    function translationSvc($resource, config) {


            this.getTranslation = function (translation, language) {

                if (!language) {
                    language = 'de-de';
                }

                var path = config.path.translationPath;
                var ssid = 'rc_' + language;

                if (sessionStorage && sessionStorage.getItem(ssid)) {
                    translation = JSON.parse(sessionStorage.getItem(ssid));
                    return;
                }

                var dataService = $resource(path,
                    {'query': {
                        method: 'GET',
                        isArray: false}
                    });


                dataService.get().$promise.then(function (data) {
                    translation = data;
                    if (sessionStorage)
                        sessionStorage.setItem(ssid, JSON.stringify(data));
                }, function(error){
                    console.log(error);
                });


            }

        }




} )();