(function() {

    angular.module('app.common').factory('routerSvc', routerSvc);

    function routerSvc() {

        var routes = {};
        var otherwiseRoute = null;

        return {

            routes: routes,

            when : function(key, url, params) {
                routes[key] = {
                    url : url,
                    params : params
                };
            },

            alias : function(key1, key2) {
                routes[key1] = routes[key2];
            },

            otherwise : function(params) {
                otherwiseRoute = params;
            },

            replaceUrlParams : function(url, params) {
                for(var k in params) {
                    var v = params[k];
                    url = url.replace(':'+k,v);
                }
                return url;
            },

            routeDefined : function(key) {
                return !! this.getRoute(key);
            },

            getRoute : function(key, args) {
                return routes[key];
            },

            routePath : function(key, args) {
                var url = this.getRoute(key);
                url = url ? url.url : null;
                if(url && args) {
                    url = this.replaceUrlParams(url, args);
                }
                return url;
            },

            install : function($routeProvider) {
                for(var key in routes) {
                    var route = routes[key];
                    var url = route['url'];
                    var params = route['params'];
                    $routeProvider.when(url, params);
                }
                if(otherwiseRoute) {
                    $routeProvider.otherwise(otherwiseRoute);
                }
            },

            prepareViewTemplateUrl : function(url, options) {

                if (!options)
                    return url;

                options.viewUrlPrefix = options.viewUrlPrefix || '';
                options.templateFileSuffix = options.templateFileSuffix || '';
                options.templateFileQuerystring = options.templateFileQuerystring || '';

                return options.viewUrlPrefix + url + options.templateFileSuffix +
                    options.templateFileQuerystring;
            }
        }
    }


})();

