/**
 * Created by isuarez on 6/1/14.
 */

(function() {



    var serviceId = 'orderWorkFlowSvc';
    angular.module('rc.order').factory(serviceId, ['$location', 'routes', 'lookups', 'localStorageService', orderWorkFlowSvc]);

    function orderWorkFlowSvc($location, routes, lookups, localStorageService) {

        var newOrder = {
            job: null,
            workFlow: null,
            step: 1,
            completedStep: 0,
            orderType: null

        };


        var orderInMemory = getSetOrder() || newOrder ;

        var _orderCompleted = false;

        //init Data
        function init() {


            getSetOrder(orderInMemory);

        }

       function saveOrderInMemory() {
           orderInMemory =  getSetOrder();
       }


        function getSetOrder(value) {

            if (arguments.length && !_orderCompleted)
                localStorageService.set('order', value);

            var order = localStorageService.get('order') || orderInMemory ;
            return order;

        }

        init();



        return {



            order: getSetOrder,

            initOrder: function(orderType) {


                this.order(newOrder);
                this.orderType(orderType);
                this.nextStep();

            },

            orderCompleted: function(value) {

                if (arguments.length && value) {
                    _orderCompleted = value;
                    saveOrderInMemory();
                    localStorageService.remove('order');
                }

                return _orderCompleted
            },



            property: function property(name, value) {

                var order = this.order();

                if (!angular.isUndefined(value))  {
                    //value passed
                    order[name] = value;

                    //storing it in the localstore
                    this.order(order);
                }

                return order[name];

            },

            workFlow: function(value) {

               return this.property('workFlow', value);

            },



            job: function(value) {

                return this.property('job', value);
            },


            step: function(value) {

                return this.property('step', value);
            },

            completedStep: function(value) {

                return this.property('completedStep', value);
            },

            orderType: function(value) {

                return this.property('orderType', value);
            },



            //Navigation

            nextStep: function() {

                var step = this.step();

                this.completedStep(step);

                this.goToStep(step + 1);
            },

            goToStep: function(step) {

                this.step(step);
                $location.path(this.getStepUrl(step));


            },

            getStepUrl: function(step) {

                var orderRoutes = routes.filter(function(r) {
                    return r.config.settings && r.config.settings.type === 'order' &&
                        r.config.settings.step === step ;
                });

                var foundRoutes = orderRoutes.length;
                var url = "/order/start";

                var orderType = this.orderType();

                switch (foundRoutes) {
                    case 1:
                        url = orderRoutes[0].url;
                        break;
                    case 2: //for step 2 (check or repair)
                        if (orderType && orderType === lookups.orderType.repair.name)
                            url = orderRoutes[1].url;
                        else
                            url = orderRoutes[0].url;
                        break;
                }

                return url;



            }




        }
    }

}
    )();

