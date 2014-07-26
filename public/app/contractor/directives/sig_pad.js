/**
 * Created by ioannissuarez on 7/26/14.
 */
(function () {


  'use strict';
  var directiveId = 'sigpad';
  angular.module('rc.contractor').directive('sigpad', function ($timeout) {

    return {
      templateUrl: '/app/contractor/directives/sig_pad.html',   // Use a template in an external file
      restrict: 'E',                      // Must use <sigpad> element to invoke directive
      scope: true,                       // Create a new scope for the directive
      require: 'ngModel',                 // Require the ngModel controller for the linking function
      link: function (scope, element, attr, ctrl) {

        // Attach the Signature Pad plugin to the template and keep a reference to the signature pad as 'sigPadAPI'
        var sigPadAPI = $(element).signaturePad({
          drawOnly: true,
          lineColour: '#FFF'
        });

        // Clear the canvas when the 'clear' button is clicked
        $(attr.clearbtn).on('click', function (e) {
          sigPadAPI.clearCanvas();
        });

        $(element).find('.pad').on('touchend', function (obj) {
          scope.updateModel();
        });

        // when the mouse is lifted from the canvas, set the signature pad data as the model value
        scope.updateModel = function () {
          $timeout(function () {
            ctrl.$setViewValue(sigPadAPI.getSignature());
          });
        };

        // Render the signature data when the model has data. Otherwise clear the canvas.
        ctrl.$render = function () {
          if (ctrl.$viewValue) {
            sigPadAPI.regenerate(ctrl.$viewValue);
          } else {
            // This occurs when signatureData is set to null in the main controller
            sigPadAPI.clearCanvas();
          }
        };

        // Validate signature pad.
        // See http://docs.angularjs.org/guide/forms for more detail on how this works.
        ctrl.$parsers.unshift(function (viewValue) {
          if (sigPadAPI.validateForm()) {
            ctrl.$setValidity('sigpad', true);
            return viewValue;
          } else {
            ctrl.$setValidity('sigpad', false);
            return undefined;
          }
        });
      }
    };
  });
})();