angular.module('App.Services').factory('configSvc', function() {

    var appPrefix = '/';
    var templateUrlPrefix = '/templates/';
    var appVersion = 1;

    var config = {

        version : appVersion,

        baseDirectory : appPrefix,
        templateDirectory : templateUrlPrefix,
        templateFileQuerystring : '?v=' + appVersion,

        routing : {

            prefix : '',
            html5Mode : true

        },

        viewUrlPrefix : templateUrlPrefix + 'views/',
        partialUrlPrefix : templateUrlPrefix + 'partials/',

        templateFileSuffix : '_tpl.html',

        prepareViewTemplateUrl : function(url) {
            return this.viewUrlPrefix + url + this.templateFileSuffix +
                this.templateFileQuerystring;
        }

    };

    return config;


});
