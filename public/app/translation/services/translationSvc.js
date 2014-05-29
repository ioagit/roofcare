/**
 * Created by isuarez on 5/18/14.
 */

(function() {

    var translationModule = angular.module('app.translation', []);

    translationModule.factory('translationSvc', ['$q', '$resource', 'config', translationSvc]);

    function translationSvc($q, $resource, config) {


            return {

                getTranslation: function () {

                    var defer = $q.defer();

                    var path = config.path.translationPath;

                    var dataService = $resource(path,
                        {'get': {
                            method: 'GET',
                            isArray: false,
                            cache: true}
                        });

                    dataService.get().$promise.then(function (data) {
                        defer.resolve(data);
                    }, function(reason){
                        defer.reject(reason);
                    });


                    return defer.promise;
                } // factory object return
                }; // Get translation

        } //TrasnlationSvc declararion




} )();