/*   
 * Template Name: Unify - Responsive Bootstrap Template
 * Description: Business, Corporate, Portfolio and Blog Theme.
 * Version: 1.3
 * Author: Html Stream
 * Website: http://htmlstream.com/preview/unify
*/

var App = function () {

    function handleIEFixes() {
        //fix html5 placeholder attribute for ie7 & ie8
        if (jQuery.browser.msie && jQuery.browser.version.substr(0, 1) < 9) { // ie7&ie8
            jQuery('input[placeholder], textarea[placeholder]').each(function () {
                var input = jQuery(this);

                jQuery(input).val(input.attr('placeholder'));

                jQuery(input).focus(function () {
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                });

                jQuery(input).blur(function () {
                    if (input.val() == '' || input.val() == input.attr('placeholder')) {
                        input.val(input.attr('placeholder'));
                    }
                });
            });
        }
    }

    function handleBootstrap() {
        jQuery('.carousel').carousel({
            interval: 15000,
            pause: 'hover'
        });
        jQuery('.tooltips').tooltip();
        jQuery('.popovers').popover();
    }


    return {
        init: function () {
            handleBootstrap();
            handleIEFixes();
        },

        initSliders: function () {},

        initFancybox: function () {},

        initBxSlider: function () {},

    };

}();