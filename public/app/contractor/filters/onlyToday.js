/**
 * Created by isuarez on 5/3/14.
 */


(function() {

    'use strict';
    var objectId = 'onlyToday';
    angular.module('rc.contractor').filter(objectId, onlyToday);

    function onlyToday() {

        return function (list) {

            var todayDay = (new Date()).getDate();
            var jobDate;
            var tempList = [];


            if ((typeof list === 'undefined')  || list.lenght === 0)
                return list;

            list.forEach(function (item) {
                jobDate = new Date(item.startDate).getDate();
                if (jobDate === todayDay)
                    tempList.push(item);
            });

            return tempList;

        };

    }

})();

