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

                var path = config.path.translationPath + language + '.json';
                var ssid = 'rc_' + language;

                //if (sessionStorage && sessionStorage.getItem(ssid)) {
                //    $scope.translation = JSON.parse(sessionStorage.getItem(ssid));
                //    return;
                //}

                var dataService = $resource(path, {callback: 'JSON_CALLBACK'}, {get: {method: 'JSONP'}});


                dataService.get(function (data) {
                    translation = data;
                    if (sessionStorage)
                        sessionStorage.setItem(ssid, JSON.stringify(data));
                }, function(error){
                    console.log(error);
                });


            }

        }




} )();