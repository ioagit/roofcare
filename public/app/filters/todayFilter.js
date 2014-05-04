/**
 * Created by isuarez on 5/3/14.
 */

/**
 * Created by isuarez on 4/29/14.
 */

module.exports = function todayFilter() {

    return function (list, today) {

        var todayDay = Date.getDate();
        var jobDate;

        console.log(list);

        if (angular.isUndefined(list) || list.lenght === 0)
           return list;


            var tempList = [];
            angular.forEach(list, function (item) {
                jobDate = new Date(item.StartDate).getDate();
                if (jobDate === todayDay)
                    tempList.push(item);
            });

        return tempList;

    };

}