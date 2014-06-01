/**
 * Created by isuarez on 5/29/2014.
 */

window.deferredBootstrapper.bootstrap(
    {element: window.document.body,
        module: 'app',
        resolve: {
            translation: function ($http) {
                return $http.get('/api/translation');
            },
            lookups:  function ($http) {
                return $http.get('/api/lookups');
            }
        }
    }
);
