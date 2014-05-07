/**
 * Created by isuarez on 5/3/14.
 */

/**
 * Created by isuarez on 4/29/14.
 */

module.exports = function byDateFilter() {

    return function (list, theDate) {

        var todayDay;

        if (typeof theDate === 'undefined')
            todayDay = (new Date()).getDate();
        else
            todayDay = (new Date(theDate)).getDate();

        var jobDate;

        if ((typeof list === 'undefined')  || list.lenght === 0)
           return list;


            var tempList = [];
            list.forEach(function (item) {
                jobDate = new Date(item.StartDate).getDate();
                if (jobDate === todayDay)
                    tempList.push(item);
            });

        return tempList;

    };

}