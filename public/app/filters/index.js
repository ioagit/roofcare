/**
 * Created by isuarez on 4/29/14.
 */

'use strict';



module.exports = angular.module('App.Filters', [])

    .filter('byDateFilter',  require('./byDateFilter'));

