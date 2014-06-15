/**
 * Created by isuarez on 6/1/14.
 */


(function() {
    'use strict';

    var controllerId = 'OrderCheckCtrl';

    function OrderCheckCtrl(commonSvc, lookups, orderSvc, orderWorkFlowSvc, translation) {

        OrderBaseCtrl.call(this, commonSvc, lookups, orderSvc, orderWorkFlowSvc, translation);

        //ControllerID
        this.controllerId = controllerId;

        this.job = orderWorkFlowSvc.job() || {
            propertyType: lookups.propertyType.singleFamily,
            roofType: lookups.roofType.flat,
            orderType: orderWorkFlowSvc.orderType(),
            starDate: new Date(),
            duration: lookups.orderType.check.hours

       };

        //validation
        this.isAddressInvalid = function() {
            return vm.userForm.address.$invalid && !vm.userForm.address.$pristine && vm.formSubmitted;
        };

        this.isZipCodeInvalid  = function() {
            return vm.userForm.zip.$invalid && !vm.userForm.zip.$pristine && vm.formSubmitted;
        };

        this.isCityInvalid  = function() {
            return vm.userForm.city.$invalid && !vm.userForm.city.$pristine && vm.formSubmitted;
        };


    }

    OrderCheckCtrl.prototype = Object.create(OrderBaseCtrl.prototype);

    //Registeing the Controller
    angular.module('rc.order').controller(controllerId,
        ['commonSvc','lookups',  'orderSvc', 'orderWorkFlowSvc','translation', OrderCheckCtrl]);

})();
