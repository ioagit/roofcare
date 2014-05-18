/**
 * Created by isuarez on 5/18/14.
 */

(function() {

    var translationModule = angular.module('tranlation', []);

    translationModule.service('translationSvc', ['$resource', translationSvc]);

    function translationSvc($resource, config) {


            this.getTranslation = function ($scope, language) {

                if (!language) {
                    language = 'de-de';
                }

                var path = config.translationPath + language + '.json';
                var ssid = 'rc_' + language;

                if (sessionStorage && sessionStorage.getItem(ssid)) {
                    $scope.translation = JSON.parse(sessionStorage.getItem(ssid));
                    return;
                }

                $resource(path).get(function (data) {
                    $scope.translation = data;
                    if (sessionStorage)
                        sessionStorage.setItem(ssid, JSON.stringify(data));
                });


            }

        }




} )();