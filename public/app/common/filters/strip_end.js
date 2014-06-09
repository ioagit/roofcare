/**
 * Created by Rima on 6/8/2014.
 */

(function() {


    'use strict';

// add the filter to your application module
var app = angular.module('app.common');

/**
 * Truncate Filter
 * @Param text
 * @Param length, default is 10
 * @Param end, default is "..."
 * @return string
 */
app.
    filter('stripEnd', stripEnd);

    function stripEnd() {

        return function (text, end) {


            if (end === undefined)
                return text;

            var pos = text.indexOf(end);
            if (!pos)
               return text;

            return text.substring(0, pos).trim();


        };
    }

} )();

/**
 * Usage
 *
 * var myText = "This is an example.";
 *
 * {{myText|stripEnd: example.}}

 * Output
 * "This is an"
 *
 */
