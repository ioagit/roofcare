/*! jQuery Migrate v1.2.1 | (c) 2005, 2013 jQuery Foundation, Inc. and other contributors | jquery.org/license */
jQuery.migrateMute===void 0&&(jQuery.migrateMute=!0),function(e,t,n){function r(n){var r=t.console;i[n]||(i[n]=!0,e.migrateWarnings.push(n),r&&r.warn&&!e.migrateMute&&(r.warn("JQMIGRATE: "+n),e.migrateTrace&&r.trace&&r.trace()))}function a(t,a,i,o){if(Object.defineProperty)try{return Object.defineProperty(t,a,{configurable:!0,enumerable:!0,get:function(){return r(o),i},set:function(e){r(o),i=e}}),n}catch(s){}e._definePropertyBroken=!0,t[a]=i}var i={};e.migrateWarnings=[],!e.migrateMute&&t.console&&t.console.log&&t.console.log("JQMIGRATE: Logging is active"),e.migrateTrace===n&&(e.migrateTrace=!0),e.migrateReset=function(){i={},e.migrateWarnings.length=0},"BackCompat"===document.compatMode&&r("jQuery is not compatible with Quirks Mode");var o=e("<input/>",{size:1}).attr("size")&&e.attrFn,s=e.attr,u=e.attrHooks.value&&e.attrHooks.value.get||function(){return null},c=e.attrHooks.value&&e.attrHooks.value.set||function(){return n},l=/^(?:input|button)$/i,d=/^[238]$/,p=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,f=/^(?:checked|selected)$/i;a(e,"attrFn",o||{},"jQuery.attrFn is deprecated"),e.attr=function(t,a,i,u){var c=a.toLowerCase(),g=t&&t.nodeType;return u&&(4>s.length&&r("jQuery.fn.attr( props, pass ) is deprecated"),t&&!d.test(g)&&(o?a in o:e.isFunction(e.fn[a])))?e(t)[a](i):("type"===a&&i!==n&&l.test(t.nodeName)&&t.parentNode&&r("Can't change the 'type' of an input or button in IE 6/7/8"),!e.attrHooks[c]&&p.test(c)&&(e.attrHooks[c]={get:function(t,r){var a,i=e.prop(t,r);return i===!0||"boolean"!=typeof i&&(a=t.getAttributeNode(r))&&a.nodeValue!==!1?r.toLowerCase():n},set:function(t,n,r){var a;return n===!1?e.removeAttr(t,r):(a=e.propFix[r]||r,a in t&&(t[a]=!0),t.setAttribute(r,r.toLowerCase())),r}},f.test(c)&&r("jQuery.fn.attr('"+c+"') may use property instead of attribute")),s.call(e,t,a,i))},e.attrHooks.value={get:function(e,t){var n=(e.nodeName||"").toLowerCase();return"button"===n?u.apply(this,arguments):("input"!==n&&"option"!==n&&r("jQuery.fn.attr('value') no longer gets properties"),t in e?e.value:null)},set:function(e,t){var a=(e.nodeName||"").toLowerCase();return"button"===a?c.apply(this,arguments):("input"!==a&&"option"!==a&&r("jQuery.fn.attr('value', val) no longer sets properties"),e.value=t,n)}};var g,h,v=e.fn.init,m=e.parseJSON,y=/^([^<]*)(<[\w\W]+>)([^>]*)$/;e.fn.init=function(t,n,a){var i;return t&&"string"==typeof t&&!e.isPlainObject(n)&&(i=y.exec(e.trim(t)))&&i[0]&&("<"!==t.charAt(0)&&r("$(html) HTML strings must start with '<' character"),i[3]&&r("$(html) HTML text after last tag is ignored"),"#"===i[0].charAt(0)&&(r("HTML string cannot start with a '#' character"),e.error("JQMIGRATE: Invalid selector string (XSS)")),n&&n.context&&(n=n.context),e.parseHTML)?v.call(this,e.parseHTML(i[2],n,!0),n,a):v.apply(this,arguments)},e.fn.init.prototype=e.fn,e.parseJSON=function(e){return e||null===e?m.apply(this,arguments):(r("jQuery.parseJSON requires a valid JSON string"),null)},e.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||0>e.indexOf("compatible")&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e.browser||(g=e.uaMatch(navigator.userAgent),h={},g.browser&&(h[g.browser]=!0,h.version=g.version),h.chrome?h.webkit=!0:h.webkit&&(h.safari=!0),e.browser=h),a(e,"browser",e.browser,"jQuery.browser is deprecated"),e.sub=function(){function t(e,n){return new t.fn.init(e,n)}e.extend(!0,t,this),t.superclass=this,t.fn=t.prototype=this(),t.fn.constructor=t,t.sub=this.sub,t.fn.init=function(r,a){return a&&a instanceof e&&!(a instanceof t)&&(a=t(a)),e.fn.init.call(this,r,a,n)},t.fn.init.prototype=t.fn;var n=t(document);return r("jQuery.sub() is deprecated"),t},e.ajaxSetup({converters:{"text json":e.parseJSON}});var b=e.fn.data;e.fn.data=function(t){var a,i,o=this[0];return!o||"events"!==t||1!==arguments.length||(a=e.data(o,t),i=e._data(o,t),a!==n&&a!==i||i===n)?b.apply(this,arguments):(r("Use of jQuery.fn.data('events') is deprecated"),i)};var j=/\/(java|ecma)script/i,w=e.fn.andSelf||e.fn.addBack;e.fn.andSelf=function(){return r("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"),w.apply(this,arguments)},e.clean||(e.clean=function(t,a,i,o){a=a||document,a=!a.nodeType&&a[0]||a,a=a.ownerDocument||a,r("jQuery.clean() is deprecated");var s,u,c,l,d=[];if(e.merge(d,e.buildFragment(t,a).childNodes),i)for(c=function(e){return!e.type||j.test(e.type)?o?o.push(e.parentNode?e.parentNode.removeChild(e):e):i.appendChild(e):n},s=0;null!=(u=d[s]);s++)e.nodeName(u,"script")&&c(u)||(i.appendChild(u),u.getElementsByTagName!==n&&(l=e.grep(e.merge([],u.getElementsByTagName("script")),c),d.splice.apply(d,[s+1,0].concat(l)),s+=l.length));return d});var Q=e.event.add,x=e.event.remove,k=e.event.trigger,N=e.fn.toggle,T=e.fn.live,M=e.fn.die,S="ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",C=RegExp("\\b(?:"+S+")\\b"),H=/(?:^|\s)hover(\.\S+|)\b/,A=function(t){return"string"!=typeof t||e.event.special.hover?t:(H.test(t)&&r("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"),t&&t.replace(H,"mouseenter$1 mouseleave$1"))};e.event.props&&"attrChange"!==e.event.props[0]&&e.event.props.unshift("attrChange","attrName","relatedNode","srcElement"),e.event.dispatch&&a(e.event,"handle",e.event.dispatch,"jQuery.event.handle is undocumented and deprecated"),e.event.add=function(e,t,n,a,i){e!==document&&C.test(t)&&r("AJAX events should be attached to document: "+t),Q.call(this,e,A(t||""),n,a,i)},e.event.remove=function(e,t,n,r,a){x.call(this,e,A(t)||"",n,r,a)},e.fn.error=function(){var e=Array.prototype.slice.call(arguments,0);return r("jQuery.fn.error() is deprecated"),e.splice(0,0,"error"),arguments.length?this.bind.apply(this,e):(this.triggerHandler.apply(this,e),this)},e.fn.toggle=function(t,n){if(!e.isFunction(t)||!e.isFunction(n))return N.apply(this,arguments);r("jQuery.fn.toggle(handler, handler...) is deprecated");var a=arguments,i=t.guid||e.guid++,o=0,s=function(n){var r=(e._data(this,"lastToggle"+t.guid)||0)%o;return e._data(this,"lastToggle"+t.guid,r+1),n.preventDefault(),a[r].apply(this,arguments)||!1};for(s.guid=i;a.length>o;)a[o++].guid=i;return this.click(s)},e.fn.live=function(t,n,a){return r("jQuery.fn.live() is deprecated"),T?T.apply(this,arguments):(e(this.context).on(t,this.selector,n,a),this)},e.fn.die=function(t,n){return r("jQuery.fn.die() is deprecated"),M?M.apply(this,arguments):(e(this.context).off(t,this.selector||"**",n),this)},e.event.trigger=function(e,t,n,a){return n||C.test(e)||r("Global events are undocumented and deprecated"),k.call(this,e,t,n||document,a)},e.each(S.split("|"),function(t,n){e.event.special[n]={setup:function(){var t=this;return t!==document&&(e.event.add(document,n+"."+e.guid,function(){e.event.trigger(n,null,t,!0)}),e._data(this,n,e.guid++)),!1},teardown:function(){return this!==document&&e.event.remove(document,n+"."+e._data(this,n)),!1}}})}(jQuery,window);;/*!
 * Modernizr v2.7.2
 * www.modernizr.com
 *
 * Copyright (c) Faruk Ates, Paul Irish, Alex Sexton
 * Available under the BSD and MIT licenses: www.modernizr.com/license/
 */

/*
 * Modernizr tests which native CSS3 and HTML5 features are available in
 * the current UA and makes the results available to you in two ways:
 * as properties on a global Modernizr object, and as classes on the
 * <html> element. This information allows you to progressively enhance
 * your pages with a granular level of control over the experience.
 *
 * Modernizr has an optional (not included) conditional resource loader
 * called Modernizr.load(), based on Yepnope.js (yepnopejs.com).
 * To get a build that includes Modernizr.load(), as well as choosing
 * which tests to include, go to www.modernizr.com/download/
 *
 * Authors        Faruk Ates, Paul Irish, Alex Sexton
 * Contributors   Ryan Seddon, Ben Alman
 */

window.Modernizr = (function( window, document, undefined ) {

    var version = '2.7.2',

    Modernizr = {},

    /*>>cssclasses*/
    // option for enabling the HTML classes to be added
    enableClasses = true,
    /*>>cssclasses*/

    docElement = document.documentElement,

    /**
     * Create our "modernizr" element that we do most feature tests on.
     */
    mod = 'modernizr',
    modElem = document.createElement(mod),
    mStyle = modElem.style,

    /**
     * Create the input element for various Web Forms feature tests.
     */
    inputElem /*>>inputelem*/ = document.createElement('input') /*>>inputelem*/ ,

    /*>>smile*/
    smile = ':)',
    /*>>smile*/

    toString = {}.toString,

    // TODO :: make the prefixes more granular
    /*>>prefixes*/
    // List of property values to set for css tests. See ticket #21
    prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),
    /*>>prefixes*/

    /*>>domprefixes*/
    // Following spec is to expose vendor-specific style properties as:
    //   elem.style.WebkitBorderRadius
    // and the following would be incorrect:
    //   elem.style.webkitBorderRadius

    // Webkit ghosts their properties in lowercase but Opera & Moz do not.
    // Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
    //   erik.eae.net/archives/2008/03/10/21.48.10/

    // More here: github.com/Modernizr/Modernizr/issues/issue/21
    omPrefixes = 'Webkit Moz O ms',

    cssomPrefixes = omPrefixes.split(' '),

    domPrefixes = omPrefixes.toLowerCase().split(' '),
    /*>>domprefixes*/

    /*>>ns*/
    ns = {'svg': 'http://www.w3.org/2000/svg'},
    /*>>ns*/

    tests = {},
    inputs = {},
    attrs = {},

    classes = [],

    slice = classes.slice,

    featureName, // used in testing loop


    /*>>teststyles*/
    // Inject element with style element and some CSS rules
    injectElementWithStyles = function( rule, callback, nodes, testnames ) {

      var style, ret, node, docOverflow,
          div = document.createElement('div'),
          // After page load injecting a fake body doesn't work so check if body exists
          body = document.body,
          // IE6 and 7 won't return offsetWidth or offsetHeight unless it's in the body element, so we fake it.
          fakeBody = body || document.createElement('body');

      if ( parseInt(nodes, 10) ) {
          // In order not to give false positives we create a node for each test
          // This also allows the method to scale for unspecified uses
          while ( nodes-- ) {
              node = document.createElement('div');
              node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
              div.appendChild(node);
          }
      }

      // <style> elements in IE6-9 are considered 'NoScope' elements and therefore will be removed
      // when injected with innerHTML. To get around this you need to prepend the 'NoScope' element
      // with a 'scoped' element, in our case the soft-hyphen entity as it won't mess with our measurements.
      // msdn.microsoft.com/en-us/library/ms533897%28VS.85%29.aspx
      // Documents served as xml will throw if using &shy; so use xml friendly encoded version. See issue #277
      style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
      div.id = mod;
      // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
      // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
      (body ? div : fakeBody).innerHTML += style;
      fakeBody.appendChild(div);
      if ( !body ) {
          //avoid crashing IE8, if background image is used
          fakeBody.style.background = '';
          //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
          fakeBody.style.overflow = 'hidden';
          docOverflow = docElement.style.overflow;
          docElement.style.overflow = 'hidden';
          docElement.appendChild(fakeBody);
      }

      ret = callback(div, rule);
      // If this is done after page load we don't want to remove the body so check if body exists
      if ( !body ) {
          fakeBody.parentNode.removeChild(fakeBody);
          docElement.style.overflow = docOverflow;
      } else {
          div.parentNode.removeChild(div);
      }

      return !!ret;

    },
    /*>>teststyles*/

    /*>>mq*/
    // adapted from matchMedia polyfill
    // by Scott Jehl and Paul Irish
    // gist.github.com/786768
    testMediaQuery = function( mq ) {

      var matchMedia = window.matchMedia || window.msMatchMedia;
      if ( matchMedia ) {
        return matchMedia(mq).matches;
      }

      var bool;

      injectElementWithStyles('@media ' + mq + ' { #' + mod + ' { position: absolute; } }', function( node ) {
        bool = (window.getComputedStyle ?
                  getComputedStyle(node, null) :
                  node.currentStyle)['position'] == 'absolute';
      });

      return bool;

     },
     /*>>mq*/


    /*>>hasevent*/
    //
    // isEventSupported determines if a given element supports the given event
    // kangax.github.com/iseventsupported/
    //
    // The following results are known incorrects:
    //   Modernizr.hasEvent("webkitTransitionEnd", elem) // false negative
    //   Modernizr.hasEvent("textInput") // in Webkit. github.com/Modernizr/Modernizr/issues/333
    //   ...
    isEventSupported = (function() {

      var TAGNAMES = {
        'select': 'input', 'change': 'input',
        'submit': 'form', 'reset': 'form',
        'error': 'img', 'load': 'img', 'abort': 'img'
      };

      function isEventSupported( eventName, element ) {

        element = element || document.createElement(TAGNAMES[eventName] || 'div');
        eventName = 'on' + eventName;

        // When using `setAttribute`, IE skips "unload", WebKit skips "unload" and "resize", whereas `in` "catches" those
        var isSupported = eventName in element;

        if ( !isSupported ) {
          // If it has no `setAttribute` (i.e. doesn't implement Node interface), try generic element
          if ( !element.setAttribute ) {
            element = document.createElement('div');
          }
          if ( element.setAttribute && element.removeAttribute ) {
            element.setAttribute(eventName, '');
            isSupported = is(element[eventName], 'function');

            // If property was created, "remove it" (by setting value to `undefined`)
            if ( !is(element[eventName], 'undefined') ) {
              element[eventName] = undefined;
            }
            element.removeAttribute(eventName);
          }
        }

        element = null;
        return isSupported;
      }
      return isEventSupported;
    })(),
    /*>>hasevent*/

    // TODO :: Add flag for hasownprop ? didn't last time

    // hasOwnProperty shim by kangax needed for Safari 2.0 support
    _hasOwnProperty = ({}).hasOwnProperty, hasOwnProp;

    if ( !is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined') ) {
      hasOwnProp = function (object, property) {
        return _hasOwnProperty.call(object, property);
      };
    }
    else {
      hasOwnProp = function (object, property) { /* yes, this can give false positives/negatives, but most of the time we don't care about those */
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
      };
    }

    // Adapted from ES5-shim https://github.com/kriskowal/es5-shim/blob/master/es5-shim.js
    // es5.github.com/#x15.3.4.5

    if (!Function.prototype.bind) {
      Function.prototype.bind = function bind(that) {

        var target = this;

        if (typeof target != "function") {
            throw new TypeError();
        }

        var args = slice.call(arguments, 1),
            bound = function () {

            if (this instanceof bound) {

              var F = function(){};
              F.prototype = target.prototype;
              var self = new F();

              var result = target.apply(
                  self,
                  args.concat(slice.call(arguments))
              );
              if (Object(result) === result) {
                  return result;
              }
              return self;

            } else {

              return target.apply(
                  that,
                  args.concat(slice.call(arguments))
              );

            }

        };

        return bound;
      };
    }

    /**
     * setCss applies given styles to the Modernizr DOM node.
     */
    function setCss( str ) {
        mStyle.cssText = str;
    }

    /**
     * setCssAll extrapolates all vendor-specific css strings.
     */
    function setCssAll( str1, str2 ) {
        return setCss(prefixes.join(str1 + ';') + ( str2 || '' ));
    }

    /**
     * is returns a boolean for if typeof obj is exactly type.
     */
    function is( obj, type ) {
        return typeof obj === type;
    }

    /**
     * contains returns a boolean for if substr is found within str.
     */
    function contains( str, substr ) {
        return !!~('' + str).indexOf(substr);
    }

    /*>>testprop*/

    // testProps is a generic CSS / DOM property test.

    // In testing support for a given CSS property, it's legit to test:
    //    `elem.style[styleName] !== undefined`
    // If the property is supported it will return an empty string,
    // if unsupported it will return undefined.

    // We'll take advantage of this quick test and skip setting a style
    // on our modernizr element, but instead just testing undefined vs
    // empty string.

    // Because the testing of the CSS property names (with "-", as
    // opposed to the camelCase DOM properties) is non-portable and
    // non-standard but works in WebKit and IE (but not Gecko or Opera),
    // we explicitly reject properties with dashes so that authors
    // developing in WebKit or IE first don't end up with
    // browser-specific content by accident.

    function testProps( props, prefixed ) {
        for ( var i in props ) {
            var prop = props[i];
            if ( !contains(prop, "-") && mStyle[prop] !== undefined ) {
                return prefixed == 'pfx' ? prop : true;
            }
        }
        return false;
    }
    /*>>testprop*/

    // TODO :: add testDOMProps
    /**
     * testDOMProps is a generic DOM property test; if a browser supports
     *   a certain property, it won't return undefined for it.
     */
    function testDOMProps( props, obj, elem ) {
        for ( var i in props ) {
            var item = obj[props[i]];
            if ( item !== undefined) {

                // return the property name as a string
                if (elem === false) return props[i];

                // let's bind a function
                if (is(item, 'function')){
                  // default to autobind unless override
                  return item.bind(elem || obj);
                }

                // return the unbound function or obj or value
                return item;
            }
        }
        return false;
    }

    /*>>testallprops*/
    /**
     * testPropsAll tests a list of DOM properties we want to check against.
     *   We specify literally ALL possible (known and/or likely) properties on
     *   the element including the non-vendor prefixed one, for forward-
     *   compatibility.
     */
    function testPropsAll( prop, prefixed, elem ) {

        var ucProp  = prop.charAt(0).toUpperCase() + prop.slice(1),
            props   = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

        // did they call .prefixed('boxSizing') or are we just testing a prop?
        if(is(prefixed, "string") || is(prefixed, "undefined")) {
          return testProps(props, prefixed);

        // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
        } else {
          props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
          return testDOMProps(props, prefixed, elem);
        }
    }
    /*>>testallprops*/


    /**
     * Tests
     * -----
     */

    // The *new* flexbox
    // dev.w3.org/csswg/css3-flexbox

    tests['flexbox'] = function() {
      return testPropsAll('flexWrap');
    };

    // The *old* flexbox
    // www.w3.org/TR/2009/WD-css3-flexbox-20090723/

    tests['flexboxlegacy'] = function() {
        return testPropsAll('boxDirection');
    };

    // On the S60 and BB Storm, getContext exists, but always returns undefined
    // so we actually have to call getContext() to verify
    // github.com/Modernizr/Modernizr/issues/issue/97/

    tests['canvas'] = function() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    };

    tests['canvastext'] = function() {
        return !!(Modernizr['canvas'] && is(document.createElement('canvas').getContext('2d').fillText, 'function'));
    };

    // webk.it/70117 is tracking a legit WebGL feature detect proposal

    // We do a soft detect which may false positive in order to avoid
    // an expensive context creation: bugzil.la/732441

    tests['webgl'] = function() {
        return !!window.WebGLRenderingContext;
    };

    /*
     * The Modernizr.touch test only indicates if the browser supports
     *    touch events, which does not necessarily reflect a touchscreen
     *    device, as evidenced by tablets running Windows 7 or, alas,
     *    the Palm Pre / WebOS (touch) phones.
     *
     * Additionally, Chrome (desktop) used to lie about its support on this,
     *    but that has since been rectified: crbug.com/36415
     *
     * We also test for Firefox 4 Multitouch Support.
     *
     * For more info, see: modernizr.github.com/Modernizr/touch.html
     */

    tests['touch'] = function() {
        var bool;

        if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
          bool = true;
        } else {
          injectElementWithStyles(['@media (',prefixes.join('touch-enabled),('),mod,')','{#modernizr{top:9px;position:absolute}}'].join(''), function( node ) {
            bool = node.offsetTop === 9;
          });
        }

        return bool;
    };


    // geolocation is often considered a trivial feature detect...
    // Turns out, it's quite tricky to get right:
    //
    // Using !!navigator.geolocation does two things we don't want. It:
    //   1. Leaks memory in IE9: github.com/Modernizr/Modernizr/issues/513
    //   2. Disables page caching in WebKit: webk.it/43956
    //
    // Meanwhile, in Firefox < 8, an about:config setting could expose
    // a false positive that would throw an exception: bugzil.la/688158

    tests['geolocation'] = function() {
        return 'geolocation' in navigator;
    };


    tests['postmessage'] = function() {
      return !!window.postMessage;
    };


    // Chrome incognito mode used to throw an exception when using openDatabase
    // It doesn't anymore.
    tests['websqldatabase'] = function() {
      return !!window.openDatabase;
    };

    // Vendors had inconsistent prefixing with the experimental Indexed DB:
    // - Webkit's implementation is accessible through webkitIndexedDB
    // - Firefox shipped moz_indexedDB before FF4b9, but since then has been mozIndexedDB
    // For speed, we don't test the legacy (and beta-only) indexedDB
    tests['indexedDB'] = function() {
      return !!testPropsAll("indexedDB", window);
    };

    // documentMode logic from YUI to filter out IE8 Compat Mode
    //   which false positives.
    tests['hashchange'] = function() {
      return isEventSupported('hashchange', window) && (document.documentMode === undefined || document.documentMode > 7);
    };

    // Per 1.6:
    // This used to be Modernizr.historymanagement but the longer
    // name has been deprecated in favor of a shorter and property-matching one.
    // The old API is still available in 1.6, but as of 2.0 will throw a warning,
    // and in the first release thereafter disappear entirely.
    tests['history'] = function() {
      return !!(window.history && history.pushState);
    };

    tests['draganddrop'] = function() {
        var div = document.createElement('div');
        return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
    };

    // FF3.6 was EOL'ed on 4/24/12, but the ESR version of FF10
    // will be supported until FF19 (2/12/13), at which time, ESR becomes FF17.
    // FF10 still uses prefixes, so check for it until then.
    // for more ESR info, see: mozilla.org/en-US/firefox/organizations/faq/
    tests['websockets'] = function() {
        return 'WebSocket' in window || 'MozWebSocket' in window;
    };


    // css-tricks.com/rgba-browser-support/
    tests['rgba'] = function() {
        // Set an rgba() color and check the returned value

        setCss('background-color:rgba(150,255,150,.5)');

        return contains(mStyle.backgroundColor, 'rgba');
    };

    tests['hsla'] = function() {
        // Same as rgba(), in fact, browsers re-map hsla() to rgba() internally,
        //   except IE9 who retains it as hsla

        setCss('background-color:hsla(120,40%,100%,.5)');

        return contains(mStyle.backgroundColor, 'rgba') || contains(mStyle.backgroundColor, 'hsla');
    };

    tests['multiplebgs'] = function() {
        // Setting multiple images AND a color on the background shorthand property
        //  and then querying the style.background property value for the number of
        //  occurrences of "url(" is a reliable method for detecting ACTUAL support for this!

        setCss('background:url(https://),url(https://),red url(https://)');

        // If the UA supports multiple backgrounds, there should be three occurrences
        //   of the string "url(" in the return value for elemStyle.background

        return (/(url\s*\(.*?){3}/).test(mStyle.background);
    };



    // this will false positive in Opera Mini
    //   github.com/Modernizr/Modernizr/issues/396

    tests['backgroundsize'] = function() {
        return testPropsAll('backgroundSize');
    };

    tests['borderimage'] = function() {
        return testPropsAll('borderImage');
    };


    // Super comprehensive table about all the unique implementations of
    // border-radius: muddledramblings.com/table-of-css3-border-radius-compliance

    tests['borderradius'] = function() {
        return testPropsAll('borderRadius');
    };

    // WebOS unfortunately false positives on this test.
    tests['boxshadow'] = function() {
        return testPropsAll('boxShadow');
    };

    // FF3.0 will false positive on this test
    tests['textshadow'] = function() {
        return document.createElement('div').style.textShadow === '';
    };


    tests['opacity'] = function() {
        // Browsers that actually have CSS Opacity implemented have done so
        //  according to spec, which means their return values are within the
        //  range of [0.0,1.0] - including the leading zero.

        setCssAll('opacity:.55');

        // The non-literal . in this regex is intentional:
        //   German Chrome returns this value as 0,55
        // github.com/Modernizr/Modernizr/issues/#issue/59/comment/516632
        return (/^0.55$/).test(mStyle.opacity);
    };


    // Note, Android < 4 will pass this test, but can only animate
    //   a single property at a time
    //   goo.gl/v3V4Gp
    tests['cssanimations'] = function() {
        return testPropsAll('animationName');
    };


    tests['csscolumns'] = function() {
        return testPropsAll('columnCount');
    };


    tests['cssgradients'] = function() {
        /**
         * For CSS Gradients syntax, please see:
         * webkit.org/blog/175/introducing-css-gradients/
         * developer.mozilla.org/en/CSS/-moz-linear-gradient
         * developer.mozilla.org/en/CSS/-moz-radial-gradient
         * dev.w3.org/csswg/css3-images/#gradients-
         */

        var str1 = 'background-image:',
            str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));',
            str3 = 'linear-gradient(left top,#9f9, white);';

        setCss(
             // legacy webkit syntax (FIXME: remove when syntax not in use anymore)
              (str1 + '-webkit- '.split(' ').join(str2 + str1) +
             // standard syntax             // trailing 'background-image:'
              prefixes.join(str3 + str1)).slice(0, -str1.length)
        );

        return contains(mStyle.backgroundImage, 'gradient');
    };


    tests['cssreflections'] = function() {
        return testPropsAll('boxReflect');
    };


    tests['csstransforms'] = function() {
        return !!testPropsAll('transform');
    };


    tests['csstransforms3d'] = function() {

        var ret = !!testPropsAll('perspective');

        // Webkit's 3D transforms are passed off to the browser's own graphics renderer.
        //   It works fine in Safari on Leopard and Snow Leopard, but not in Chrome in
        //   some conditions. As a result, Webkit typically recognizes the syntax but
        //   will sometimes throw a false positive, thus we must do a more thorough check:
        if ( ret && 'webkitPerspective' in docElement.style ) {

          // Webkit allows this media query to succeed only if the feature is enabled.
          // `@media (transform-3d),(-webkit-transform-3d){ ... }`
          injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function( node, rule ) {
            ret = node.offsetLeft === 9 && node.offsetHeight === 3;
          });
        }
        return ret;
    };


    tests['csstransitions'] = function() {
        return testPropsAll('transition');
    };


    /*>>fontface*/
    // @font-face detection routine by Diego Perini
    // javascript.nwbox.com/CSSSupport/

    // false positives:
    //   WebOS github.com/Modernizr/Modernizr/issues/342
    //   WP7   github.com/Modernizr/Modernizr/issues/538
    tests['fontface'] = function() {
        var bool;

        injectElementWithStyles('@font-face {font-family:"font";src:url("https://")}', function( node, rule ) {
          var style = document.getElementById('smodernizr'),
              sheet = style.sheet || style.styleSheet,
              cssText = sheet ? (sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || '') : '';

          bool = /src/i.test(cssText) && cssText.indexOf(rule.split(' ')[0]) === 0;
        });

        return bool;
    };
    /*>>fontface*/

    // CSS generated content detection
    tests['generatedcontent'] = function() {
        var bool;

        injectElementWithStyles(['#',mod,'{font:0/0 a}#',mod,':after{content:"',smile,'";visibility:hidden;font:3px/1 a}'].join(''), function( node ) {
          bool = node.offsetHeight >= 3;
        });

        return bool;
    };



    // These tests evaluate support of the video/audio elements, as well as
    // testing what types of content they support.
    //
    // We're using the Boolean constructor here, so that we can extend the value
    // e.g.  Modernizr.video     // true
    //       Modernizr.video.ogg // 'probably'
    //
    // Codec values from : github.com/NielsLeenheer/html5test/blob/9106a8/index.html#L845
    //                     thx to NielsLeenheer and zcorpan

    // Note: in some older browsers, "no" was a return value instead of empty string.
    //   It was live in FF3.5.0 and 3.5.1, but fixed in 3.5.2
    //   It was also live in Safari 4.0.0 - 4.0.4, but fixed in 4.0.5

    tests['video'] = function() {
        var elem = document.createElement('video'),
            bool = false;

        // IE9 Running on Windows Server SKU can cause an exception to be thrown, bug #224
        try {
            if ( bool = !!elem.canPlayType ) {
                bool      = new Boolean(bool);
                bool.ogg  = elem.canPlayType('video/ogg; codecs="theora"')      .replace(/^no$/,'');

                // Without QuickTime, this value will be `undefined`. github.com/Modernizr/Modernizr/issues/546
                bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"') .replace(/^no$/,'');

                bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,'');
            }

        } catch(e) { }

        return bool;
    };

    tests['audio'] = function() {
        var elem = document.createElement('audio'),
            bool = false;

        try {
            if ( bool = !!elem.canPlayType ) {
                bool      = new Boolean(bool);
                bool.ogg  = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,'');
                bool.mp3  = elem.canPlayType('audio/mpeg;')               .replace(/^no$/,'');

                // Mimetypes accepted:
                //   developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
                //   bit.ly/iphoneoscodecs
                bool.wav  = elem.canPlayType('audio/wav; codecs="1"')     .replace(/^no$/,'');
                bool.m4a  = ( elem.canPlayType('audio/x-m4a;')            ||
                              elem.canPlayType('audio/aac;'))             .replace(/^no$/,'');
            }
        } catch(e) { }

        return bool;
    };


    // In FF4, if disabled, window.localStorage should === null.

    // Normally, we could not test that directly and need to do a
    //   `('localStorage' in window) && ` test first because otherwise Firefox will
    //   throw bugzil.la/365772 if cookies are disabled

    // Also in iOS5 Private Browsing mode, attempting to use localStorage.setItem
    // will throw the exception:
    //   QUOTA_EXCEEDED_ERRROR DOM Exception 22.
    // Peculiarly, getItem and removeItem calls do not throw.

    // Because we are forced to try/catch this, we'll go aggressive.

    // Just FWIW: IE8 Compat mode supports these features completely:
    //   www.quirksmode.org/dom/html5.html
    // But IE8 doesn't support either with local files

    tests['localstorage'] = function() {
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    };

    tests['sessionstorage'] = function() {
        try {
            sessionStorage.setItem(mod, mod);
            sessionStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    };


    tests['webworkers'] = function() {
        return !!window.Worker;
    };


    tests['applicationcache'] = function() {
        return !!window.applicationCache;
    };


    // Thanks to Erik Dahlstrom
    tests['svg'] = function() {
        return !!document.createElementNS && !!document.createElementNS(ns.svg, 'svg').createSVGRect;
    };

    // specifically for SVG inline in HTML, not within XHTML
    // test page: paulirish.com/demo/inline-svg
    tests['inlinesvg'] = function() {
      var div = document.createElement('div');
      div.innerHTML = '<svg/>';
      return (div.firstChild && div.firstChild.namespaceURI) == ns.svg;
    };

    // SVG SMIL animation
    tests['smil'] = function() {
        return !!document.createElementNS && /SVGAnimate/.test(toString.call(document.createElementNS(ns.svg, 'animate')));
    };

    // This test is only for clip paths in SVG proper, not clip paths on HTML content
    // demo: srufaculty.sru.edu/david.dailey/svg/newstuff/clipPath4.svg

    // However read the comments to dig into applying SVG clippaths to HTML content here:
    //   github.com/Modernizr/Modernizr/issues/213#issuecomment-1149491
    tests['svgclippaths'] = function() {
        return !!document.createElementNS && /SVGClipPath/.test(toString.call(document.createElementNS(ns.svg, 'clipPath')));
    };

    /*>>webforms*/
    // input features and input types go directly onto the ret object, bypassing the tests loop.
    // Hold this guy to execute in a moment.
    function webforms() {
        /*>>input*/
        // Run through HTML5's new input attributes to see if the UA understands any.
        // We're using f which is the <input> element created early on
        // Mike Taylr has created a comprehensive resource for testing these attributes
        //   when applied to all input types:
        //   miketaylr.com/code/input-type-attr.html
        // spec: www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary

        // Only input placeholder is tested while textarea's placeholder is not.
        // Currently Safari 4 and Opera 11 have support only for the input placeholder
        // Both tests are available in feature-detects/forms-placeholder.js
        Modernizr['input'] = (function( props ) {
            for ( var i = 0, len = props.length; i < len; i++ ) {
                attrs[ props[i] ] = !!(props[i] in inputElem);
            }
            if (attrs.list){
              // safari false positive's on datalist: webk.it/74252
              // see also github.com/Modernizr/Modernizr/issues/146
              attrs.list = !!(document.createElement('datalist') && window.HTMLDataListElement);
            }
            return attrs;
        })('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' '));
        /*>>input*/

        /*>>inputtypes*/
        // Run through HTML5's new input types to see if the UA understands any.
        //   This is put behind the tests runloop because it doesn't return a
        //   true/false like all the other tests; instead, it returns an object
        //   containing each input type with its corresponding true/false value

        // Big thanks to @miketaylr for the html5 forms expertise. miketaylr.com/
        Modernizr['inputtypes'] = (function(props) {

            for ( var i = 0, bool, inputElemType, defaultView, len = props.length; i < len; i++ ) {

                inputElem.setAttribute('type', inputElemType = props[i]);
                bool = inputElem.type !== 'text';

                // We first check to see if the type we give it sticks..
                // If the type does, we feed it a textual value, which shouldn't be valid.
                // If the value doesn't stick, we know there's input sanitization which infers a custom UI
                if ( bool ) {

                    inputElem.value         = smile;
                    inputElem.style.cssText = 'position:absolute;visibility:hidden;';

                    if ( /^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined ) {

                      docElement.appendChild(inputElem);
                      defaultView = document.defaultView;

                      // Safari 2-4 allows the smiley as a value, despite making a slider
                      bool =  defaultView.getComputedStyle &&
                              defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' &&
                              // Mobile android web browser has false positive, so must
                              // check the height to see if the widget is actually there.
                              (inputElem.offsetHeight !== 0);

                      docElement.removeChild(inputElem);

                    } else if ( /^(search|tel)$/.test(inputElemType) ){
                      // Spec doesn't define any special parsing or detectable UI
                      //   behaviors so we pass these through as true

                      // Interestingly, opera fails the earlier test, so it doesn't
                      //  even make it here.

                    } else if ( /^(url|email)$/.test(inputElemType) ) {
                      // Real url and email support comes with prebaked validation.
                      bool = inputElem.checkValidity && inputElem.checkValidity() === false;

                    } else {
                      // If the upgraded input compontent rejects the :) text, we got a winner
                      bool = inputElem.value != smile;
                    }
                }

                inputs[ props[i] ] = !!bool;
            }
            return inputs;
        })('search tel url email datetime date month week time datetime-local number range color'.split(' '));
        /*>>inputtypes*/
    }
    /*>>webforms*/


    // End of test definitions
    // -----------------------



    // Run through all tests and detect their support in the current UA.
    // todo: hypothetically we could be doing an array of tests and use a basic loop here.
    for ( var feature in tests ) {
        if ( hasOwnProp(tests, feature) ) {
            // run the test, throw the return value into the Modernizr,
            //   then based on that boolean, define an appropriate className
            //   and push it into an array of classes we'll join later.
            featureName  = feature.toLowerCase();
            Modernizr[featureName] = tests[feature]();

            classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
        }
    }

    /*>>webforms*/
    // input tests need to run.
    Modernizr.input || webforms();
    /*>>webforms*/


    /**
     * addTest allows the user to define their own feature tests
     * the result will be added onto the Modernizr object,
     * as well as an appropriate className set on the html element
     *
     * @param feature - String naming the feature
     * @param test - Function returning true if feature is supported, false if not
     */
     Modernizr.addTest = function ( feature, test ) {
       if ( typeof feature == 'object' ) {
         for ( var key in feature ) {
           if ( hasOwnProp( feature, key ) ) {
             Modernizr.addTest( key, feature[ key ] );
           }
         }
       } else {

         feature = feature.toLowerCase();

         if ( Modernizr[feature] !== undefined ) {
           // we're going to quit if you're trying to overwrite an existing test
           // if we were to allow it, we'd do this:
           //   var re = new RegExp("\\b(no-)?" + feature + "\\b");
           //   docElement.className = docElement.className.replace( re, '' );
           // but, no rly, stuff 'em.
           return Modernizr;
         }

         test = typeof test == 'function' ? test() : test;

         if (typeof enableClasses !== "undefined" && enableClasses) {
           docElement.className += ' ' + (test ? '' : 'no-') + feature;
         }
         Modernizr[feature] = test;

       }

       return Modernizr; // allow chaining.
     };


    // Reset modElem.cssText to nothing to reduce memory footprint.
    setCss('');
    modElem = inputElem = null;

    /*>>shiv*/
    /**
     * @preserve HTML5 Shiv prev3.7.1 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
     */
    ;(function(window, document) {
        /*jshint evil:true */
        /** version */
        var version = '3.7.0';

        /** Preset options */
        var options = window.html5 || {};

        /** Used to skip problem elements */
        var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

        /** Not all elements can be cloned in IE **/
        var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

        /** Detect whether the browser supports default html5 styles */
        var supportsHtml5Styles;

        /** Name of the expando, to work with multiple documents or to re-shiv one document */
        var expando = '_html5shiv';

        /** The id for the the documents expando */
        var expanID = 0;

        /** Cached data for each document */
        var expandoData = {};

        /** Detect whether the browser supports unknown elements */
        var supportsUnknownElements;

        (function() {
          try {
            var a = document.createElement('a');
            a.innerHTML = '<xyz></xyz>';
            //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
            supportsHtml5Styles = ('hidden' in a);

            supportsUnknownElements = a.childNodes.length == 1 || (function() {
              // assign a false positive if unable to shiv
              (document.createElement)('a');
              var frag = document.createDocumentFragment();
              return (
                typeof frag.cloneNode == 'undefined' ||
                typeof frag.createDocumentFragment == 'undefined' ||
                typeof frag.createElement == 'undefined'
              );
            }());
          } catch(e) {
            // assign a false positive if detection fails => unable to shiv
            supportsHtml5Styles = true;
            supportsUnknownElements = true;
          }

        }());

        /*--------------------------------------------------------------------------*/

        /**
         * Creates a style sheet with the given CSS text and adds it to the document.
         * @private
         * @param {Document} ownerDocument The document.
         * @param {String} cssText The CSS text.
         * @returns {StyleSheet} The style element.
         */
        function addStyleSheet(ownerDocument, cssText) {
          var p = ownerDocument.createElement('p'),
          parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

          p.innerHTML = 'x<style>' + cssText + '</style>';
          return parent.insertBefore(p.lastChild, parent.firstChild);
        }

        /**
         * Returns the value of `html5.elements` as an array.
         * @private
         * @returns {Array} An array of shived element node names.
         */
        function getElements() {
          var elements = html5.elements;
          return typeof elements == 'string' ? elements.split(' ') : elements;
        }

        /**
         * Returns the data associated to the given document
         * @private
         * @param {Document} ownerDocument The document.
         * @returns {Object} An object of data.
         */
        function getExpandoData(ownerDocument) {
          var data = expandoData[ownerDocument[expando]];
          if (!data) {
            data = {};
            expanID++;
            ownerDocument[expando] = expanID;
            expandoData[expanID] = data;
          }
          return data;
        }

        /**
         * returns a shived element for the given nodeName and document
         * @memberOf html5
         * @param {String} nodeName name of the element
         * @param {Document} ownerDocument The context document.
         * @returns {Object} The shived element.
         */
        function createElement(nodeName, ownerDocument, data){
          if (!ownerDocument) {
            ownerDocument = document;
          }
          if(supportsUnknownElements){
            return ownerDocument.createElement(nodeName);
          }
          if (!data) {
            data = getExpandoData(ownerDocument);
          }
          var node;

          if (data.cache[nodeName]) {
            node = data.cache[nodeName].cloneNode();
          } else if (saveClones.test(nodeName)) {
            node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
          } else {
            node = data.createElem(nodeName);
          }

          // Avoid adding some elements to fragments in IE < 9 because
          // * Attributes like `name` or `type` cannot be set/changed once an element
          //   is inserted into a document/fragment
          // * Link elements with `src` attributes that are inaccessible, as with
          //   a 403 response, will cause the tab/window to crash
          // * Script elements appended to fragments will execute when their `src`
          //   or `text` property is set
          return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
        }

        /**
         * returns a shived DocumentFragment for the given document
         * @memberOf html5
         * @param {Document} ownerDocument The context document.
         * @returns {Object} The shived DocumentFragment.
         */
        function createDocumentFragment(ownerDocument, data){
          if (!ownerDocument) {
            ownerDocument = document;
          }
          if(supportsUnknownElements){
            return ownerDocument.createDocumentFragment();
          }
          data = data || getExpandoData(ownerDocument);
          var clone = data.frag.cloneNode(),
          i = 0,
          elems = getElements(),
          l = elems.length;
          for(;i<l;i++){
            clone.createElement(elems[i]);
          }
          return clone;
        }

        /**
         * Shivs the `createElement` and `createDocumentFragment` methods of the document.
         * @private
         * @param {Document|DocumentFragment} ownerDocument The document.
         * @param {Object} data of the document.
         */
        function shivMethods(ownerDocument, data) {
          if (!data.cache) {
            data.cache = {};
            data.createElem = ownerDocument.createElement;
            data.createFrag = ownerDocument.createDocumentFragment;
            data.frag = data.createFrag();
          }


          ownerDocument.createElement = function(nodeName) {
            //abort shiv
            if (!html5.shivMethods) {
              return data.createElem(nodeName);
            }
            return createElement(nodeName, ownerDocument, data);
          };

          ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
                                                          'var n=f.cloneNode(),c=n.createElement;' +
                                                          'h.shivMethods&&(' +
                                                          // unroll the `createElement` calls
                                                          getElements().join().replace(/[\w\-]+/g, function(nodeName) {
            data.createElem(nodeName);
            data.frag.createElement(nodeName);
            return 'c("' + nodeName + '")';
          }) +
            ');return n}'
                                                         )(html5, data.frag);
        }

        /*--------------------------------------------------------------------------*/

        /**
         * Shivs the given document.
         * @memberOf html5
         * @param {Document} ownerDocument The document to shiv.
         * @returns {Document} The shived document.
         */
        function shivDocument(ownerDocument) {
          if (!ownerDocument) {
            ownerDocument = document;
          }
          var data = getExpandoData(ownerDocument);

          if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
            data.hasCSS = !!addStyleSheet(ownerDocument,
                                          // corrects block display not defined in IE6/7/8/9
                                          'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
                                            // adds styling not present in IE6/7/8/9
                                            'mark{background:#FF0;color:#000}' +
                                            // hides non-rendered elements
                                            'template{display:none}'
                                         );
          }
          if (!supportsUnknownElements) {
            shivMethods(ownerDocument, data);
          }
          return ownerDocument;
        }

        /*--------------------------------------------------------------------------*/

        /**
         * The `html5` object is exposed so that more elements can be shived and
         * existing shiving can be detected on iframes.
         * @type Object
         * @example
         *
         * // options can be changed before the script is included
         * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
         */
        var html5 = {

          /**
           * An array or space separated string of node names of the elements to shiv.
           * @memberOf html5
           * @type Array|String
           */
          'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video',

          /**
           * current version of html5shiv
           */
          'version': version,

          /**
           * A flag to indicate that the HTML5 style sheet should be inserted.
           * @memberOf html5
           * @type Boolean
           */
          'shivCSS': (options.shivCSS !== false),

          /**
           * Is equal to true if a browser supports creating unknown/HTML5 elements
           * @memberOf html5
           * @type boolean
           */
          'supportsUnknownElements': supportsUnknownElements,

          /**
           * A flag to indicate that the document's `createElement` and `createDocumentFragment`
           * methods should be overwritten.
           * @memberOf html5
           * @type Boolean
           */
          'shivMethods': (options.shivMethods !== false),

          /**
           * A string to describe the type of `html5` object ("default" or "default print").
           * @memberOf html5
           * @type String
           */
          'type': 'default',

          // shivs the document according to the specified `html5` object options
          'shivDocument': shivDocument,

          //creates a shived element
          createElement: createElement,

          //creates a shived documentFragment
          createDocumentFragment: createDocumentFragment
        };

        /*--------------------------------------------------------------------------*/

        // expose html5
        window.html5 = html5;

        // shiv the document
        shivDocument(document);

    }(this, document));
    /*>>shiv*/

    // Assign private properties to the return object with prefix
    Modernizr._version      = version;

    // expose these for the plugin API. Look in the source for how to join() them against your input
    /*>>prefixes*/
    Modernizr._prefixes     = prefixes;
    /*>>prefixes*/
    /*>>domprefixes*/
    Modernizr._domPrefixes  = domPrefixes;
    Modernizr._cssomPrefixes  = cssomPrefixes;
    /*>>domprefixes*/

    /*>>mq*/
    // Modernizr.mq tests a given media query, live against the current state of the window
    // A few important notes:
    //   * If a browser does not support media queries at all (eg. oldIE) the mq() will always return false
    //   * A max-width or orientation query will be evaluated against the current state, which may change later.
    //   * You must specify values. Eg. If you are testing support for the min-width media query use:
    //       Modernizr.mq('(min-width:0)')
    // usage:
    // Modernizr.mq('only screen and (max-width:768)')
    Modernizr.mq            = testMediaQuery;
    /*>>mq*/

    /*>>hasevent*/
    // Modernizr.hasEvent() detects support for a given event, with an optional element to test on
    // Modernizr.hasEvent('gesturestart', elem)
    Modernizr.hasEvent      = isEventSupported;
    /*>>hasevent*/

    /*>>testprop*/
    // Modernizr.testProp() investigates whether a given style property is recognized
    // Note that the property names must be provided in the camelCase variant.
    // Modernizr.testProp('pointerEvents')
    Modernizr.testProp      = function(prop){
        return testProps([prop]);
    };
    /*>>testprop*/

    /*>>testallprops*/
    // Modernizr.testAllProps() investigates whether a given style property,
    //   or any of its vendor-prefixed variants, is recognized
    // Note that the property names must be provided in the camelCase variant.
    // Modernizr.testAllProps('boxSizing')
    Modernizr.testAllProps  = testPropsAll;
    /*>>testallprops*/


    /*>>teststyles*/
    // Modernizr.testStyles() allows you to add custom styles to the document and test an element afterwards
    // Modernizr.testStyles('#modernizr { position:absolute }', function(elem, rule){ ... })
    Modernizr.testStyles    = injectElementWithStyles;
    /*>>teststyles*/


    /*>>prefixed*/
    // Modernizr.prefixed() returns the prefixed or nonprefixed property name variant of your input
    // Modernizr.prefixed('boxSizing') // 'MozBoxSizing'

    // Properties must be passed as dom-style camelcase, rather than `box-sizing` hypentated style.
    // Return values will also be the camelCase variant, if you need to translate that to hypenated style use:
    //
    //     str.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');

    // If you're trying to ascertain which transition end event to bind to, you might do something like...
    //
    //     var transEndEventNames = {
    //       'WebkitTransition' : 'webkitTransitionEnd',
    //       'MozTransition'    : 'transitionend',
    //       'OTransition'      : 'oTransitionEnd',
    //       'msTransition'     : 'MSTransitionEnd',
    //       'transition'       : 'transitionend'
    //     },
    //     transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];

    Modernizr.prefixed      = function(prop, obj, elem){
      if(!obj) {
        return testPropsAll(prop, 'pfx');
      } else {
        // Testing DOM property e.g. Modernizr.prefixed('requestAnimationFrame', window) // 'mozRequestAnimationFrame'
        return testPropsAll(prop, obj, elem);
      }
    };
    /*>>prefixed*/


    /*>>cssclasses*/
    // Remove "no-js" class from <html> element, if it exists:
    docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') +

                            // Add the new classes to the <html> element.
                            (enableClasses ? ' js ' + classes.join(' ') : '');
    /*>>cssclasses*/

    return Modernizr;

})(this, this.document);
;(function() {
  var root = (typeof exports == 'undefined' ? window : exports);

  var config = {
    // Ensure Content-Type is an image before trying to load @2x image
    // https://github.com/imulus/retinajs/pull/45)
    check_mime_type: true,

    // Resize high-resolution images to original image's pixel dimensions
    // https://github.com/imulus/retinajs/issues/8
    force_original_dimensions: true
 };

  root.Retina = Retina;

  function Retina() {}

  Retina.configure = function(options) {
    if (options == null) options = {};
    for (var prop in options) config[prop] = options[prop];
  };

  Retina.init = function(context) {
    if (context == null) context = root;

    var existing_onload = context.onload || new Function;

    context.onload = function() {
      var images = document.getElementsByTagName("img"), retinaImages = [], i, image;
      for (i = 0; i < images.length; i++) {
        image = images[i];
        retinaImages.push(new RetinaImage(image));
      }
      existing_onload();
    }
  };

  Retina.isRetina = function(){
    var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
                      (min--moz-device-pixel-ratio: 1.5),\
                      (-o-min-device-pixel-ratio: 3/2),\
                      (min-resolution: 1.5dppx)";

    if (root.devicePixelRatio > 1)
      return true;

    if (root.matchMedia && root.matchMedia(mediaQuery).matches)
      return true;

    return false;
  };


  root.RetinaImagePath = RetinaImagePath;

  function RetinaImagePath(path, at_2x_path) {
    this.path = path;
    if (typeof at_2x_path !== "undefined" && at_2x_path !== null) {
      this.at_2x_path = at_2x_path;
      this.perform_check = false;
    } else {
      this.at_2x_path = path.replace(/\.\w+$/, function(match) { return "@2x" + match; });
      this.perform_check = true;
    }
  }

  RetinaImagePath.confirmed_paths = [];

  RetinaImagePath.prototype.is_external = function() {
    return !!(this.path.match(/^https?\:/i) && !this.path.match('//' + document.domain) )
  }

  RetinaImagePath.prototype.check_2x_variant = function(callback) {
    var http, that = this;
    if (this.is_external()) {
      return callback(false);
    } else if (!this.perform_check && typeof this.at_2x_path !== "undefined" && this.at_2x_path !== null) {
      return callback(true);
    } else if (this.at_2x_path in RetinaImagePath.confirmed_paths) {
      return callback(true);
    } else {
      http = new XMLHttpRequest;
      http.open('HEAD', this.at_2x_path);
      http.onreadystatechange = function() {
        if (http.readyState != 4) {
          return callback(false);
        }

        if (http.status >= 200 && http.status <= 399) {
          if (config.check_mime_type) {
            var type = http.getResponseHeader('Content-Type');
            if (type == null || !type.match(/^image/i)) {
              return callback(false);
            }
          }

          RetinaImagePath.confirmed_paths.push(that.at_2x_path);
          return callback(true);
        } else {
          return callback(false);
        }
      }
      http.send();
    }
  }



  function RetinaImage(el) {
    this.el = el;
    this.path = new RetinaImagePath(this.el.getAttribute('src'), this.el.getAttribute('data-at2x'));
    var that = this;
    this.path.check_2x_variant(function(hasVariant) {
      if (hasVariant) that.swap();
    });
  }

  root.RetinaImage = RetinaImage;

  RetinaImage.prototype.swap = function(path) {
    if (typeof path == 'undefined') path = this.path.at_2x_path;

    var that = this;
    function load() {
      if (! that.el.complete) {
        setTimeout(load, 5);
      } else {
        if (config.force_original_dimensions) {
          that.el.setAttribute('width', that.el.offsetWidth);
          that.el.setAttribute('height', that.el.offsetHeight);
        }

        that.el.setAttribute('src', path);
      }
    }
    load();
  }




  if (Retina.isRetina()) {
    Retina.init(root);
  }

})();

;(function(n){n(["jquery"],function(n){return function(){function l(n,t,f){return u({type:r.error,iconClass:i().iconClasses.error,message:n,optionsOverride:f,title:t})}function a(n,t,f){return u({type:r.info,iconClass:i().iconClasses.info,message:n,optionsOverride:f,title:t})}function v(n){e=n}function y(n,t,f){return u({type:r.success,iconClass:i().iconClasses.success,message:n,optionsOverride:f,title:t})}function p(n,t,f){return u({type:r.warning,iconClass:i().iconClasses.warning,message:n,optionsOverride:f,title:t})}function w(r){var u=i();if(t||f(u),r&&n(":focus",r).length===0){r[u.hideMethod]({duration:u.hideDuration,easing:u.hideEasing,complete:function(){c(r)}});return}t.children().length&&t[u.hideMethod]({duration:u.hideDuration,easing:u.hideEasing,complete:function(){t.remove()}})}function b(){return{tapToDismiss:!0,toastClass:"toast",containerId:"toast-container",debug:!1,showMethod:"fadeIn",showDuration:300,showEasing:"swing",onShown:undefined,hideMethod:"fadeOut",hideDuration:1e3,hideEasing:"swing",onHidden:undefined,extendedTimeOut:1e3,iconClasses:{error:"toast-error",info:"toast-info",success:"toast-success",warning:"toast-warning"},iconClass:"toast-info",positionClass:"toast-top-right",timeOut:5e3,titleClass:"toast-title",messageClass:"toast-message",target:"body",closeHtml:"<button>&times;<\/button>",newestOnTop:!0}}function h(n){e&&e(n)}function u(r){function l(t){if(!n(":focus",e).length||t)return e[u.hideMethod]({duration:u.hideDuration,easing:u.hideEasing,complete:function(){c(e),u.onHidden&&u.onHidden(),s.state="hidden",s.endTime=new Date,h(s)}})}function b(){(u.timeOut>0||u.extendedTimeOut>0)&&(y=setTimeout(l,u.extendedTimeOut))}function k(){clearTimeout(y),e.stop(!0,!0)[u.showMethod]({duration:u.showDuration,easing:u.showEasing})}var u=i(),v=r.iconClass||u.iconClass;typeof r.optionsOverride!="undefined"&&(u=n.extend(u,r.optionsOverride),v=r.optionsOverride.iconClass||v),o++,t=f(u);var y=null,e=n("<div/>"),p=n("<div/>"),w=n("<div/>"),a=n(u.closeHtml),s={toastId:o,state:"visible",startTime:new Date,options:u,map:r};return r.iconClass&&e.addClass(u.toastClass).addClass(v),r.title&&(p.append(r.title).addClass(u.titleClass),e.append(p)),r.message&&(w.append(r.message).addClass(u.messageClass),e.append(w)),u.closeButton&&(a.addClass("toast-close-button"),e.prepend(a)),e.hide(),u.newestOnTop?t.prepend(e):t.append(e),e[u.showMethod]({duration:u.showDuration,easing:u.showEasing,complete:u.onShown}),u.timeOut>0&&(y=setTimeout(l,u.timeOut)),e.hover(k,b),!u.onclick&&u.tapToDismiss&&e.click(l),u.closeButton&&a&&a.click(function(n){n.stopPropagation(),l(!0)}),u.onclick&&e.click(function(){u.onclick(),l()}),h(s),u.debug&&console&&console.log(s),e}function f(r){return(r||(r=i()),t=n("#"+r.containerId),t.length)?t:(t=n("<div/>").attr("id",r.containerId).addClass(r.positionClass),t.appendTo(n(r.target)),t)}function i(){return n.extend({},b(),s.options)}function c(n){(t||(t=f()),n.is(":visible"))||(n.remove(),n=null,t.children().length===0&&t.remove())}var t,e,o=0,r={error:"error",info:"info",success:"success",warning:"warning"},s={clear:w,error:l,getContainer:f,info:a,options:{},subscribe:v,success:y,version:"2.0.1",warning:p};return s}()})})(typeof define=="function"&&define.amd?define:function(n,t){typeof module!="undefined"&&module.exports?module.exports=t(require(n[0])):window.toastr=t(window.jQuery)});
//@ sourceMappingURL=toastr.min.js.map;
/**
 * @license
 * =========================================================
 * bootstrap-datetimepicker.js
 * http://www.eyecon.ro/bootstrap-datepicker
 * =========================================================
 * Copyright 2012 Stefan Petre
 *
 * Contributions:
 *  - Andrew Rowls
 *  - Thiago de Arruda
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================
 */
(function($){var smartPhone=window.orientation!=undefined;var DateTimePicker=function(element,options){this.id=dpgId++;this.init(element,options)};var dateToDate=function(dt){if(typeof dt==="string"){return new Date(dt)}return dt};DateTimePicker.prototype={constructor:DateTimePicker,init:function(element,options){var icon;if(!(options.pickTime||options.pickDate))throw new Error("Must choose at least one picker");this.options=options;this.$element=$(element);this.language=options.language in dates?options.language:"en";this.pickDate=options.pickDate;this.pickTime=options.pickTime;this.isInput=this.$element.is("input");this.component=false;if(this.$element.find(".input-append")||this.$element.find(".input-prepend"))this.component=this.$element.find(".add-on");this.format=options.format;if(!this.format){if(this.isInput)this.format=this.$element.data("format");else this.format=this.$element.find("input").data("format");if(!this.format)this.format="MM/dd/yyyy"}this._compileFormat();if(this.component){icon=this.component.find("i")}if(this.pickTime){if(icon&&icon.length)this.timeIcon=icon.data("time-icon");if(!this.timeIcon)this.timeIcon="icon-time";icon.addClass(this.timeIcon)}if(this.pickDate){if(icon&&icon.length)this.dateIcon=icon.data("date-icon");if(!this.dateIcon)this.dateIcon="icon-calendar";icon.removeClass(this.timeIcon);icon.addClass(this.dateIcon)}this.widget=$(getTemplate(this.timeIcon,options.pickDate,options.pickTime,options.pick12HourFormat,options.pickSeconds,options.collapse)).appendTo("body");this.minViewMode=options.minViewMode||this.$element.data("date-minviewmode")||0;if(typeof this.minViewMode==="string"){switch(this.minViewMode){case"months":this.minViewMode=1;break;case"years":this.minViewMode=2;break;default:this.minViewMode=0;break}}this.viewMode=options.viewMode||this.$element.data("date-viewmode")||0;if(typeof this.viewMode==="string"){switch(this.viewMode){case"months":this.viewMode=1;break;case"years":this.viewMode=2;break;default:this.viewMode=0;break}}this.startViewMode=this.viewMode;this.weekStart=options.weekStart||this.$element.data("date-weekstart")||0;this.weekEnd=this.weekStart===0?6:this.weekStart-1;this.setStartDate(options.startDate||this.$element.data("date-startdate"));this.setEndDate(options.endDate||this.$element.data("date-enddate"));this.fillDow();this.fillMonths();this.fillHours();this.fillMinutes();this.fillSeconds();this.update();this.showMode();this._attachDatePickerEvents()},show:function(e){this.widget.show();this.height=this.component?this.component.outerHeight():this.$element.outerHeight();this.place();this.$element.trigger({type:"show",date:this._date});this._attachDatePickerGlobalEvents();if(e){e.stopPropagation();e.preventDefault()}},disable:function(){this.$element.find("input").prop("disabled",true);this._detachDatePickerEvents()},enable:function(){this.$element.find("input").prop("disabled",false);this._attachDatePickerEvents()},hide:function(){var collapse=this.widget.find(".collapse");for(var i=0;i<collapse.length;i++){var collapseData=collapse.eq(i).data("collapse");if(collapseData&&collapseData.transitioning)return}this.widget.hide();this.viewMode=this.startViewMode;this.showMode();this.set();this.$element.trigger({type:"hide",date:this._date});this._detachDatePickerGlobalEvents()},set:function(){var formatted="";if(!this._unset)formatted=this.formatDate(this._date);if(!this.isInput){if(this.component){var input=this.$element.find("input");input.val(formatted);this._resetMaskPos(input)}this.$element.data("date",formatted)}else{this.$element.val(formatted);this._resetMaskPos(this.$element)}},setValue:function(newDate){if(!newDate){this._unset=true}else{this._unset=false}if(typeof newDate==="string"){this._date=this.parseDate(newDate)}else if(newDate){this._date=new Date(newDate)}this.set();this.viewDate=UTCDate(this._date.getUTCFullYear(),this._date.getUTCMonth(),1,0,0,0,0);this.fillDate();this.fillTime()},getDate:function(){if(this._unset)return null;return new Date(this._date.valueOf())},setDate:function(date){if(!date)this.setValue(null);else this.setValue(date.valueOf())},setStartDate:function(date){if(date instanceof Date){this.startDate=date}else if(typeof date==="string"){this.startDate=new UTCDate(date);if(!this.startDate.getUTCFullYear()){this.startDate=-Infinity}}else{this.startDate=-Infinity}if(this.viewDate){this.update()}},setEndDate:function(date){if(date instanceof Date){this.endDate=date}else if(typeof date==="string"){this.endDate=new UTCDate(date);if(!this.endDate.getUTCFullYear()){this.endDate=Infinity}}else{this.endDate=Infinity}if(this.viewDate){this.update()}},getLocalDate:function(){if(this._unset)return null;var d=this._date;return new Date(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate(),d.getUTCHours(),d.getUTCMinutes(),d.getUTCSeconds(),d.getUTCMilliseconds())},setLocalDate:function(localDate){if(!localDate)this.setValue(null);else this.setValue(Date.UTC(localDate.getFullYear(),localDate.getMonth(),localDate.getDate(),localDate.getHours(),localDate.getMinutes(),localDate.getSeconds(),localDate.getMilliseconds()))},place:function(){var position="absolute";var offset=this.component?this.component.offset():this.$element.offset();this.width=this.component?this.component.outerWidth():this.$element.outerWidth();offset.top=offset.top+this.height;var $window=$(window);if(this.options.width!=undefined){this.widget.width(this.options.width)}if(this.options.orientation=="left"){this.widget.addClass("left-oriented");offset.left=offset.left-this.widget.width()+20}if(this._isInFixed()){position="fixed";offset.top-=$window.scrollTop();offset.left-=$window.scrollLeft()}if($window.width()<offset.left+this.widget.outerWidth()){offset.right=$window.width()-offset.left-this.width;offset.left="auto";this.widget.addClass("pull-right")}else{offset.right="auto";this.widget.removeClass("pull-right")}this.widget.css({position:position,top:offset.top,left:offset.left,right:offset.right})},notifyChange:function(){this.$element.trigger({type:"changeDate",date:this.getDate(),localDate:this.getLocalDate()})},update:function(newDate){var dateStr=newDate;if(!dateStr){if(this.isInput){dateStr=this.$element.val()}else{dateStr=this.$element.find("input").val()}if(dateStr){this._date=this.parseDate(dateStr)}if(!this._date){var tmp=new Date;this._date=UTCDate(tmp.getFullYear(),tmp.getMonth(),tmp.getDate(),tmp.getHours(),tmp.getMinutes(),tmp.getSeconds(),tmp.getMilliseconds())}}this.viewDate=UTCDate(this._date.getUTCFullYear(),this._date.getUTCMonth(),1,0,0,0,0);this.fillDate();this.fillTime()},fillDow:function(){var dowCnt=this.weekStart;var html=$("<tr>");while(dowCnt<this.weekStart+7){html.append('<th class="dow">'+dates[this.language].daysMin[dowCnt++%7]+"</th>")}this.widget.find(".datepicker-days thead").append(html)},fillMonths:function(){var html="";var i=0;while(i<12){html+='<span class="month">'+dates[this.language].monthsShort[i++]+"</span>"}this.widget.find(".datepicker-months td").append(html)},fillDate:function(){var year=this.viewDate.getUTCFullYear();var month=this.viewDate.getUTCMonth();var currentDate=UTCDate(this._date.getUTCFullYear(),this._date.getUTCMonth(),this._date.getUTCDate(),0,0,0,0);var startYear=typeof this.startDate==="object"?this.startDate.getUTCFullYear():-Infinity;var startMonth=typeof this.startDate==="object"?this.startDate.getUTCMonth():-1;var endYear=typeof this.endDate==="object"?this.endDate.getUTCFullYear():Infinity;var endMonth=typeof this.endDate==="object"?this.endDate.getUTCMonth():12;this.widget.find(".datepicker-days").find(".disabled").removeClass("disabled");this.widget.find(".datepicker-months").find(".disabled").removeClass("disabled");this.widget.find(".datepicker-years").find(".disabled").removeClass("disabled");this.widget.find(".datepicker-days th:eq(1)").text(dates[this.language].months[month]+" "+year);var prevMonth=UTCDate(year,month-1,28,0,0,0,0);var day=DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(),prevMonth.getUTCMonth());prevMonth.setUTCDate(day);prevMonth.setUTCDate(day-(prevMonth.getUTCDay()-this.weekStart+7)%7);if(year==startYear&&month<=startMonth||year<startYear){this.widget.find(".datepicker-days th:eq(0)").addClass("disabled")}if(year==endYear&&month>=endMonth||year>endYear){this.widget.find(".datepicker-days th:eq(2)").addClass("disabled")}var nextMonth=new Date(prevMonth.valueOf());nextMonth.setUTCDate(nextMonth.getUTCDate()+42);nextMonth=nextMonth.valueOf();var html=[];var row;var clsName;while(prevMonth.valueOf()<nextMonth){if(prevMonth.getUTCDay()===this.weekStart){row=$("<tr>");html.push(row)}clsName="";if(prevMonth.getUTCFullYear()<year||prevMonth.getUTCFullYear()==year&&prevMonth.getUTCMonth()<month){clsName+=" old"}else if(prevMonth.getUTCFullYear()>year||prevMonth.getUTCFullYear()==year&&prevMonth.getUTCMonth()>month){clsName+=" new"}if(prevMonth.valueOf()===currentDate.valueOf()){clsName+=" active"}if(prevMonth.valueOf()+864e5<=this.startDate){clsName+=" disabled"}if(prevMonth.valueOf()>this.endDate){clsName+=" disabled"}row.append('<td class="day'+clsName+'">'+prevMonth.getUTCDate()+"</td>");prevMonth.setUTCDate(prevMonth.getUTCDate()+1)}this.widget.find(".datepicker-days tbody").empty().append(html);var currentYear=this._date.getUTCFullYear();var months=this.widget.find(".datepicker-months").find("th:eq(1)").text(year).end().find("span").removeClass("active");if(currentYear===year){months.eq(this._date.getUTCMonth()).addClass("active")}if(currentYear-1<startYear){this.widget.find(".datepicker-months th:eq(0)").addClass("disabled")}if(currentYear+1>endYear){this.widget.find(".datepicker-months th:eq(2)").addClass("disabled")}for(var i=0;i<12;i++){if(year==startYear&&startMonth>i||year<startYear){$(months[i]).addClass("disabled")}else if(year==endYear&&endMonth<i||year>endYear){$(months[i]).addClass("disabled")}}html="";year=parseInt(year/10,10)*10;var yearCont=this.widget.find(".datepicker-years").find("th:eq(1)").text(year+"-"+(year+9)).end().find("td");this.widget.find(".datepicker-years").find("th").removeClass("disabled");if(startYear>year){this.widget.find(".datepicker-years").find("th:eq(0)").addClass("disabled")}if(endYear<year+9){this.widget.find(".datepicker-years").find("th:eq(2)").addClass("disabled")}year-=1;for(var i=-1;i<11;i++){html+='<span class="year'+(i===-1||i===10?" old":"")+(currentYear===year?" active":"")+(year<startYear||year>endYear?" disabled":"")+'">'+year+"</span>";year+=1}yearCont.html(html)},fillHours:function(){var table=this.widget.find(".timepicker .timepicker-hours table");table.parent().hide();var html="";if(this.options.pick12HourFormat){var current=1;for(var i=0;i<3;i+=1){html+="<tr>";for(var j=0;j<4;j+=1){var c=current.toString();html+='<td class="hour">'+padLeft(c,2,"0")+"</td>";current++}html+="</tr>"}}else{var current=0;for(var i=0;i<6;i+=1){html+="<tr>";for(var j=0;j<4;j+=1){var c=current.toString();html+='<td class="hour">'+padLeft(c,2,"0")+"</td>";current++}html+="</tr>"}}table.html(html)},fillMinutes:function(){var table=this.widget.find(".timepicker .timepicker-minutes table");table.parent().hide();var html="";var current=0;for(var i=0;i<5;i++){html+="<tr>";for(var j=0;j<4;j+=1){var c=current.toString();html+='<td class="minute">'+padLeft(c,2,"0")+"</td>";current+=3}html+="</tr>"}table.html(html)},fillSeconds:function(){var table=this.widget.find(".timepicker .timepicker-seconds table");table.parent().hide();var html="";var current=0;for(var i=0;i<5;i++){html+="<tr>";for(var j=0;j<4;j+=1){var c=current.toString();html+='<td class="second">'+padLeft(c,2,"0")+"</td>";current+=3}html+="</tr>"}table.html(html)},fillTime:function(){if(!this._date)return;var timeComponents=this.widget.find(".timepicker span[data-time-component]");var table=timeComponents.closest("table");var is12HourFormat=this.options.pick12HourFormat;var hour=this._date.getUTCHours();var period="AM";if(is12HourFormat){if(hour>=12)period="PM";if(hour===0)hour=12;else if(hour!=12)hour=hour%12;this.widget.find(".timepicker [data-action=togglePeriod]").text(period)}hour=padLeft(hour.toString(),2,"0");var minute=padLeft(this._date.getUTCMinutes().toString(),2,"0");var second=padLeft(this._date.getUTCSeconds().toString(),2,"0");timeComponents.filter("[data-time-component=hours]").text(hour);timeComponents.filter("[data-time-component=minutes]").text(minute);timeComponents.filter("[data-time-component=seconds]").text(second)},click:function(e){e.stopPropagation();e.preventDefault();this._unset=false;var target=$(e.target).closest("span, td, th");if(target.length===1){if(!target.is(".disabled")){switch(target[0].nodeName.toLowerCase()){case"th":switch(target[0].className){case"switch":this.showMode(1);break;case"prev":case"next":var vd=this.viewDate;var navFnc=DPGlobal.modes[this.viewMode].navFnc;var step=DPGlobal.modes[this.viewMode].navStep;if(target[0].className==="prev")step=step*-1;vd["set"+navFnc](vd["get"+navFnc]()+step);this.fillDate();this.set();break}break;case"span":if(target.is(".month")){var month=target.parent().find("span").index(target);this.viewDate.setUTCMonth(month)}else{var year=parseInt(target.text(),10)||0;this.viewDate.setUTCFullYear(year)}if(this.viewMode!==0){this._date=UTCDate(this.viewDate.getUTCFullYear(),this.viewDate.getUTCMonth(),this.viewDate.getUTCDate(),this._date.getUTCHours(),this._date.getUTCMinutes(),this._date.getUTCSeconds(),this._date.getUTCMilliseconds());this.notifyChange()}this.showMode(-1);this.fillDate();this.set();break;case"td":if(target.is(".day")){var day=parseInt(target.text(),10)||1;var month=this.viewDate.getUTCMonth();var year=this.viewDate.getUTCFullYear();if(target.is(".old")){if(month===0){month=11;year-=1}else{month-=1}}else if(target.is(".new")){if(month==11){month=0;year+=1}else{month+=1}}this._date=UTCDate(year,month,day,this._date.getUTCHours(),this._date.getUTCMinutes(),this._date.getUTCSeconds(),this._date.getUTCMilliseconds());this.viewDate=UTCDate(year,month,Math.min(28,day),0,0,0,0);this.fillDate();this.set();this.notifyChange()}break}}}},actions:{incrementHours:function(e){this._date.setUTCHours(this._date.getUTCHours()+1)},incrementMinutes:function(e){this._date.setUTCMinutes(this._date.getUTCMinutes()+1)},incrementSeconds:function(e){this._date.setUTCSeconds(this._date.getUTCSeconds()+1)},decrementHours:function(e){this._date.setUTCHours(this._date.getUTCHours()-1)},decrementMinutes:function(e){this._date.setUTCMinutes(this._date.getUTCMinutes()-1)},decrementSeconds:function(e){this._date.setUTCSeconds(this._date.getUTCSeconds()-1)},togglePeriod:function(e){var hour=this._date.getUTCHours();if(hour>=12)hour-=12;else hour+=12;this._date.setUTCHours(hour)},showPicker:function(){this.widget.find(".timepicker > div:not(.timepicker-picker)").hide();this.widget.find(".timepicker .timepicker-picker").show()},showHours:function(){this.widget.find(".timepicker .timepicker-picker").hide();this.widget.find(".timepicker .timepicker-hours").show()},showMinutes:function(){this.widget.find(".timepicker .timepicker-picker").hide();this.widget.find(".timepicker .timepicker-minutes").show()},showSeconds:function(){this.widget.find(".timepicker .timepicker-picker").hide();this.widget.find(".timepicker .timepicker-seconds").show()},selectHour:function(e){var tgt=$(e.target);var value=parseInt(tgt.text(),10);if(this.options.pick12HourFormat){var current=this._date.getUTCHours();if(current>=12){if(value!=12)value=(value+12)%24}else{if(value===12)value=0;else value=value%12}}this._date.setUTCHours(value);this.actions.showPicker.call(this)},selectMinute:function(e){var tgt=$(e.target);var value=parseInt(tgt.text(),10);this._date.setUTCMinutes(value);this.actions.showPicker.call(this)},selectSecond:function(e){var tgt=$(e.target);var value=parseInt(tgt.text(),10);this._date.setUTCSeconds(value);this.actions.showPicker.call(this)}},doAction:function(e){e.stopPropagation();e.preventDefault();if(!this._date)this._date=UTCDate(1970,0,0,0,0,0,0);var action=$(e.currentTarget).data("action");var rv=this.actions[action].apply(this,arguments);this.set();this.fillTime();this.notifyChange();return rv},stopEvent:function(e){e.stopPropagation();e.preventDefault()},keydown:function(e){var self=this,k=e.which,input=$(e.target);if(k==8||k==46){setTimeout(function(){self._resetMaskPos(input)})}},keypress:function(e){var k=e.which;if(k==8||k==46){return}var input=$(e.target);var c=String.fromCharCode(k);var val=input.val()||"";val+=c;var mask=this._mask[this._maskPos];if(!mask){return false}if(mask.end!=val.length){return}if(!mask.pattern.test(val.slice(mask.start))){val=val.slice(0,val.length-1);while((mask=this._mask[this._maskPos])&&mask.character){val+=mask.character;this._maskPos++}val+=c;if(mask.end!=val.length){input.val(val);return false}else{if(!mask.pattern.test(val.slice(mask.start))){input.val(val.slice(0,mask.start));return false}else{input.val(val);this._maskPos++;return false}}}else{this._maskPos++}},change:function(e){var input=$(e.target);var val=input.val();if(this._formatPattern.test(val)){this.update();this.setValue(this._date.getTime());this.notifyChange();this.set()}else if(val&&val.trim()){this.setValue(this._date.getTime());if(this._date)this.set();else input.val("")}else{if(this._date){this.setValue(null);this.notifyChange();this._unset=true}}this._resetMaskPos(input)},showMode:function(dir){if(dir){this.viewMode=Math.max(this.minViewMode,Math.min(2,this.viewMode+dir))}this.widget.find(".datepicker > div").hide().filter(".datepicker-"+DPGlobal.modes[this.viewMode].clsName).show()},destroy:function(){this._detachDatePickerEvents();this._detachDatePickerGlobalEvents();this.widget.remove();this.$element.removeData("datetimepicker");this.component.removeData("datetimepicker")},formatDate:function(d){return this.format.replace(formatReplacer,function(match){var methodName,property,rv,len=match.length;if(match==="ms")len=1;property=dateFormatComponents[match].property;if(property==="Hours12"){rv=d.getUTCHours();if(rv===0)rv=12;else if(rv!==12)rv=rv%12}else if(property==="Period12"){if(d.getUTCHours()>=12)return"PM";else return"AM"}else{methodName="get"+property;rv=d[methodName]()}if(methodName==="getUTCMonth")rv=rv+1;if(methodName==="getUTCYear")rv=rv+1900-2e3;return padLeft(rv.toString(),len,"0")})},parseDate:function(str){var match,i,property,methodName,value,parsed={};if(!(match=this._formatPattern.exec(str)))return null;for(i=1;i<match.length;i++){property=this._propertiesByIndex[i];if(!property)continue;value=match[i];if(/^\d+$/.test(value))value=parseInt(value,10);parsed[property]=value}return this._finishParsingDate(parsed)},_resetMaskPos:function(input){var val=input.val();for(var i=0;i<this._mask.length;i++){if(this._mask[i].end>val.length){this._maskPos=i;break}else if(this._mask[i].end===val.length){this._maskPos=i+1;break}}},_finishParsingDate:function(parsed){var year,month,date,hours,minutes,seconds,milliseconds;year=parsed.UTCFullYear;if(parsed.UTCYear)year=2e3+parsed.UTCYear;if(!year)year=1970;if(parsed.UTCMonth)month=parsed.UTCMonth-1;else month=0;date=parsed.UTCDate||1;hours=parsed.UTCHours||0;minutes=parsed.UTCMinutes||0;seconds=parsed.UTCSeconds||0;milliseconds=parsed.UTCMilliseconds||0;if(parsed.Hours12){hours=parsed.Hours12}if(parsed.Period12){if(/pm/i.test(parsed.Period12)){if(hours!=12)hours=(hours+12)%24}else{hours=hours%12}}return UTCDate(year,month,date,hours,minutes,seconds,milliseconds)},_compileFormat:function(){var match,component,components=[],mask=[],str=this.format,propertiesByIndex={},i=0,pos=0;while(match=formatComponent.exec(str)){component=match[0];if(component in dateFormatComponents){i++;propertiesByIndex[i]=dateFormatComponents[component].property;components.push("\\s*"+dateFormatComponents[component].getPattern(this)+"\\s*");mask.push({pattern:new RegExp(dateFormatComponents[component].getPattern(this)),property:dateFormatComponents[component].property,start:pos,end:pos+=component.length})}else{components.push(escapeRegExp(component));mask.push({pattern:new RegExp(escapeRegExp(component)),character:component,start:pos,end:++pos})}str=str.slice(component.length)}this._mask=mask;this._maskPos=0;this._formatPattern=new RegExp("^\\s*"+components.join("")+"\\s*$");this._propertiesByIndex=propertiesByIndex},_attachDatePickerEvents:function(){var self=this;this.widget.on("click",".datepicker *",$.proxy(this.click,this));this.widget.on("click","[data-action]",$.proxy(this.doAction,this));this.widget.on("mousedown",$.proxy(this.stopEvent,this));if(this.pickDate&&this.pickTime){this.widget.on("click.togglePicker",".accordion-toggle",function(e){e.stopPropagation();var $this=$(this);var $parent=$this.closest("ul");var expanded=$parent.find(".collapse.in");var closed=$parent.find(".collapse:not(.in)");if(expanded&&expanded.length){var collapseData=expanded.data("collapse");if(collapseData&&collapseData.transitioning)return;expanded.collapse("hide");closed.collapse("show");$this.find("i").toggleClass(self.timeIcon+" "+self.dateIcon);self.$element.find(".add-on i").toggleClass(self.timeIcon+" "+self.dateIcon)}})}if(this.isInput){this.$element.on({focus:$.proxy(this.show,this),change:$.proxy(this.change,this)});if(this.options.maskInput){this.$element.on({keydown:$.proxy(this.keydown,this),keypress:$.proxy(this.keypress,this)})}}else{this.$element.on({change:$.proxy(this.change,this)},"input");if(this.options.maskInput){this.$element.on({keydown:$.proxy(this.keydown,this),keypress:$.proxy(this.keypress,this)},"input")}if(this.component){this.component.on("click",$.proxy(this.show,this))}else{this.$element.on("click",$.proxy(this.show,this))}}},_attachDatePickerGlobalEvents:function(){$(window).on("resize.datetimepicker"+this.id,$.proxy(this.place,this));if(!this.isInput){$(document).on("mousedown.datetimepicker"+this.id,$.proxy(this.hide,this))}},_detachDatePickerEvents:function(){this.widget.off("click",".datepicker *",this.click);this.widget.off("click","[data-action]");this.widget.off("mousedown",this.stopEvent);if(this.pickDate&&this.pickTime){this.widget.off("click.togglePicker")}if(this.isInput){this.$element.off({focus:this.show,change:this.change});if(this.options.maskInput){this.$element.off({keydown:this.keydown,keypress:this.keypress})}}else{this.$element.off({change:this.change},"input");if(this.options.maskInput){this.$element.off({keydown:this.keydown,keypress:this.keypress},"input")}if(this.component){this.component.off("click",this.show)}else{this.$element.off("click",this.show)}}},_detachDatePickerGlobalEvents:function(){$(window).off("resize.datetimepicker"+this.id);if(!this.isInput){$(document).off("mousedown.datetimepicker"+this.id)}},_isInFixed:function(){if(this.$element){var parents=this.$element.parents();var inFixed=false;for(var i=0;i<parents.length;i++){if($(parents[i]).css("position")=="fixed"){inFixed=true;break}}return inFixed}else{return false}}};$.fn.datetimepicker=function(option,val){return this.each(function(){var $this=$(this),data=$this.data("datetimepicker"),options=typeof option==="object"&&option;if(!data){$this.data("datetimepicker",data=new DateTimePicker(this,$.extend({},$.fn.datetimepicker.defaults,options)))}if(typeof option==="string")data[option](val)})};$.fn.datetimepicker.defaults={maskInput:false,pickDate:true,pickTime:true,pick12HourFormat:false,pickSeconds:true,startDate:-Infinity,endDate:Infinity,collapse:true};$.fn.datetimepicker.Constructor=DateTimePicker;var dpgId=0;var dates=$.fn.datetimepicker.dates={en:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa","Su"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}};var dateFormatComponents={dd:{property:"UTCDate",getPattern:function(){return"(0?[1-9]|[1-2][0-9]|3[0-1])\\b"}},MM:{property:"UTCMonth",getPattern:function(){return"(0?[1-9]|1[0-2])\\b"}},yy:{property:"UTCYear",getPattern:function(){return"(\\d{2})\\b"}},yyyy:{property:"UTCFullYear",getPattern:function(){return"(\\d{4})\\b"}},hh:{property:"UTCHours",getPattern:function(){return"(0?[0-9]|1[0-9]|2[0-3])\\b"}},mm:{property:"UTCMinutes",getPattern:function(){return"(0?[0-9]|[1-5][0-9])\\b"}},ss:{property:"UTCSeconds",getPattern:function(){return"(0?[0-9]|[1-5][0-9])\\b"}},ms:{property:"UTCMilliseconds",getPattern:function(){return"([0-9]{1,3})\\b"}},HH:{property:"Hours12",getPattern:function(){return"(0?[1-9]|1[0-2])\\b"}},PP:{property:"Period12",getPattern:function(){return"(AM|PM|am|pm|Am|aM|Pm|pM)\\b"}}};var keys=[];for(var k in dateFormatComponents)keys.push(k);keys[keys.length-1]+="\\b";keys.push(".");var formatComponent=new RegExp(keys.join("\\b|"));keys.pop();var formatReplacer=new RegExp(keys.join("\\b|"),"g");function escapeRegExp(str){return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}function padLeft(s,l,c){if(l<s.length)return s;else return Array(l-s.length+1).join(c||" ")+s}function getTemplate(timeIcon,pickDate,pickTime,is12Hours,showSeconds,collapse){if(pickDate&&pickTime){return'<div class="bootstrap-datetimepicker-widget dropdown-menu">'+"<ul>"+"<li"+(collapse?' class="collapse in"':"")+">"+'<div class="datepicker">'+DPGlobal.template+"</div>"+"</li>"+'<li class="picker-switch accordion-toggle"><a><i class="'+timeIcon+'"></i></a></li>'+"<li"+(collapse?' class="collapse"':"")+">"+'<div class="timepicker">'+TPGlobal.getTemplate(is12Hours,showSeconds)+"</div>"+"</li>"+"</ul>"+"</div>"}else if(pickTime){return'<div class="bootstrap-datetimepicker-widget dropdown-menu">'+'<div class="timepicker">'+TPGlobal.getTemplate(is12Hours,showSeconds)+"</div>"+"</div>"}else{return'<div class="bootstrap-datetimepicker-widget dropdown-menu">'+'<div class="datepicker">'+DPGlobal.template+"</div>"+"</div>"}}function UTCDate(){return new Date(Date.UTC.apply(Date,arguments))}var DPGlobal={modes:[{clsName:"days",navFnc:"UTCMonth",navStep:1},{clsName:"months",navFnc:"UTCFullYear",navStep:1},{clsName:"years",navFnc:"UTCFullYear",navStep:10}],isLeapYear:function(year){return year%4===0&&year%100!==0||year%400===0},getDaysInMonth:function(year,month){return[31,DPGlobal.isLeapYear(year)?29:28,31,30,31,30,31,31,30,31,30,31][month]},headTemplate:"<thead>"+"<tr>"+'<th class="prev">&lsaquo;</th>'+'<th colspan="5" class="switch"></th>'+'<th class="next">&rsaquo;</th>'+"</tr>"+"</thead>",contTemplate:'<tbody><tr><td colspan="7"></td></tr></tbody>'};DPGlobal.template='<div class="datepicker-days">'+'<table class="table-condensed">'+DPGlobal.headTemplate+"<tbody></tbody>"+"</table>"+"</div>"+'<div class="datepicker-months">'+'<table class="table-condensed">'+DPGlobal.headTemplate+DPGlobal.contTemplate+"</table>"+"</div>"+'<div class="datepicker-years">'+'<table class="table-condensed">'+DPGlobal.headTemplate+DPGlobal.contTemplate+"</table>"+"</div>";var TPGlobal={hourTemplate:'<span data-action="showHours" data-time-component="hours" class="timepicker-hour"></span>',minuteTemplate:'<span data-action="showMinutes" data-time-component="minutes" class="timepicker-minute"></span>',secondTemplate:'<span data-action="showSeconds" data-time-component="seconds" class="timepicker-second"></span>'};TPGlobal.getTemplate=function(is12Hours,showSeconds){return'<div class="timepicker-picker">'+'<table class="table-condensed"'+(is12Hours?' data-hour-format="12"':"")+">"+"<tr>"+'<td><a href="#" class="btn" data-action="incrementHours"><i class="icon-chevron-up"></i></a></td>'+'<td class="separator"></td>'+'<td><a href="#" class="btn" data-action="incrementMinutes"><i class="icon-chevron-up"></i></a></td>'+(showSeconds?'<td class="separator"></td>'+'<td><a href="#" class="btn" data-action="incrementSeconds"><i class="icon-chevron-up"></i></a></td>':"")+(is12Hours?'<td class="separator"></td>':"")+"</tr>"+"<tr>"+"<td>"+TPGlobal.hourTemplate+"</td> "+'<td class="separator">:</td>'+"<td>"+TPGlobal.minuteTemplate+"</td> "+(showSeconds?'<td class="separator">:</td>'+"<td>"+TPGlobal.secondTemplate+"</td>":"")+(is12Hours?'<td class="separator"></td>'+"<td>"+'<button type="button" class="btn btn-primary" data-action="togglePeriod"></button>'+"</td>":"")+"</tr>"+"<tr>"+'<td><a href="#" class="btn" data-action="decrementHours"><i class="icon-chevron-down"></i></a></td>'+'<td class="separator"></td>'+'<td><a href="#" class="btn" data-action="decrementMinutes"><i class="icon-chevron-down"></i></a></td>'+(showSeconds?'<td class="separator"></td>'+'<td><a href="#" class="btn" data-action="decrementSeconds"><i class="icon-chevron-down"></i></a></td>':"")+(is12Hours?'<td class="separator"></td>':"")+"</tr>"+"</table>"+"</div>"+'<div class="timepicker-hours" data-action="selectHour">'+'<table class="table-condensed">'+"</table>"+"</div>"+'<div class="timepicker-minutes" data-action="selectMinute">'+'<table class="table-condensed">'+"</table>"+"</div>"+(showSeconds?'<div class="timepicker-seconds" data-action="selectSecond">'+'<table class="table-condensed">'+"</table>"+"</div>":"")}})(window.jQuery);;var ROUTER;

(function() {
    var lookup = {};
    var otherwiseLookup = null;

    ROUTER = {

        when : function(key, url, params) {
            lookup[key] = {
                url : url,
                params : params
            };
        },

        alias : function(key1, key2) {
            lookup[key1] = lookup[key2];
        },

        otherwise : function(params) {
            otherwiseLookup = params;
        },

        replaceUrlParams : function(url, params) {
            for(var k in params) {
                var v = params[k];
                url = url.replace(':'+k,v);
            }
            return url;
        },

        routeDefined : function(key) {
            return !! this.getRoute(key);
        },

        getRoute : function(key, args) {
            return lookup[key];
        },

        routePath : function(key, args) {
            var url = this.getRoute(key);
            url = url ? url.url : null;
            if(url && args) {
                url = this.replaceUrlParams(url, args);
            };
            return url;
        },

        install : function($routeProvider) {
            for(var key in lookup) {
                var route = lookup[key];
                var url = route['url'];
                var params = route['params'];
                $routeProvider.when(url, params);
            };
            if(otherwiseLookup) {
                $routeProvider.otherwise(otherwiseLookup);
            }
        }
    };

})();;/**
 * Created by isuarez on 4/20/14.
 */

var CONFIG;

(function() {


    var appPrefix = '/';
    var templateUrlPrefix = '/templates/';
    var appVersion = 1;

    CONFIG = {

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



})();
;/**
 * Created by isuarez on 3/20/14.
 */

angular.module('App.Services', []).factory('authSvc', function ($http, identitySvc, $q, userResource) {

    return {

        authenticateUser: function (username, password) {
            var deferred = $q.defer();
            $http.post('/login', {username: username, password: password})
                .then(function (response) {
                    if (response.data.success) {
                        var user = new userResource();
                        angular.extend(user, response.data.user);
                        identitySvc.currentUser = user;
                        deferred.resolve(true);
                    }
                    else
                        deferred.resolve(false);

                });
            return deferred.promise;
        },


        createUser: function(newUserData) {

            var user = new userResource(newUserData);
            var deferred = $q.defer();

            user.$save().then(function() {
                    identitySvc.currentUser = user;
                    deferred.resolve();

                },
                function(response) {
                    deferred.reject(response.data.reason);
                }
            );

            return deferred.promise;
        },


        updateCurrentUser: function(newUserData) {

            //cloning the current user in order to extend it with newUSerData.
            //Only is save is success identitySvc.currentUser will be updated.
            var clone = angular.copy(identitySvc.currentUser);
            angular.extend(clone, newUserData);

            var deferred = $q.defer();

            clone.$update().then(function() {
                    identitySvc.currentUser = clone;
                    deferred.resolve();

                },
                function(response) {
                    deferred.reject(response.data.reason);
                }
            );

            return deferred.promise;
        },

        authorizeCurrentUserForRoute:  function (role) {
            if (identitySvc.isAuthorized(role)) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        },

        authorizeAuthenticatedUserForRoute:  function () {
            if (identitySvc.isAuthenticated()) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        },

        logoutUser: function () {

            var deffered = $q.defer();

            $http.get('/logout', {logout: true}).then(function () {

                    identitySvc.currentUser = undefined;
                    deffered.resolve();

                }
            );

            return deffered.promise;

        }

    };
});;angular.module('App.Services').factory('configSvc', function() {

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
;/**
 * Created by isuarez on 4/10/2014.
 */

angular.module('App.Services').factory('identitySvc', function($window, userResource) {

    var currentUser;

    if (!!$window.currentUser ) {

        currentUser = new userResource();
        angular.extend(currentUser,$window.currentUser);
    }

    return {

        currentUser: currentUser,

        isAuthenticated: function() {
            return !!this.currentUser;
        },

        isAuthorized: function(role) {
            return this.isAuthenticated() && this.currentUser.hasRole(role);
        }


    }
});;/**
 * Created by isuarez on 3/20/14.
 */

angular.module('App.Services').value('rcToastr', toastr);

angular.module('App.Services').factory('notifierSvc', function(rcToastr) {
    return {
        notify: function(msg) {
            rcToastr.success(msg);
            console.log(msg);
        },

        error: function(msg) {
            rcToastr.error(msg);
            console.error(msg);
        }
    }
});
;angular.module('App.Services')

  .factory('$appTimer', function() {

    var _delay = 500;
    var _timer = -1;

    return function(fn) {
      clearTimeout(_timer);
      _timer = setTimeout(function() {
        fn(); 
      }, _delay);
    };
  })

  .factory('$appStorage',function() {
    var keyPrefix = 'yom-';
    return {

      disableCaching : function() {
        this.disabled = true;
      },

      enableCaching : function() {
        this.disabled = false;
      },

      version : function() {
        return '1';
      },

      prefixKey : function(key) {
        return keyPrefix + this.version() + '-' + key;
      },

      put : function(key, value) {
        key = this.prefixKey(key);
        value = JSON.stringify(value);
        localStorage.setItem(key, value);
      },

      get : function(key) {
        key = this.prefixKey(key);
        var value = localStorage.getItem(key);
        return JSON.parse(value);
      },

      erase : function(key) {
        key = this.prefixKey(key);
        localStorage.removeItem(key);
      },

      flush : function() {
        while (localStorage.length) localStorage.removeItem(localStorage.key(0));
      },

      isPresent : function(key) {
        if(!this.disabled) {
          return !! this.get(key);
        }
        return false;
      }

    };
  })

  .factory('$appScope', ['$rootScope', function($rootScope) {

    return {

      topScope : function() {
        return this.scope(document);
      },

      scope : function(element) {
        return angular.element(element).scope();
      },

      rootScope : function() {
        return $rootScope;
      },

      safeApply : function(fn, $scope) {
        $scope = $scope || this.topScope();
        fn = fn || function() {};
        if($scope.$$phase) {
          fn();
        }
        else {
          $scope.$apply(function() {
            fn();
          });
        }
      }

    };

  }])

  .factory('$appLocation', ['$location','$appScope', function($location, $scopeHelper) {

    return {

      gotoURL : function(url) {
        window.location = url;
      },

      change : function(url, $scope) {
        $scopeHelper.safeApply(function() {
          $location.search('');
          $location.path(url);
        }, $scope);
      },

      replace : function(url, $scope) {
        $scopeHelper.safeApply(function() {
          $location.path(url).replace();
        }, $scope);
      }

    };

  }])

  .factory('$appSanitize', function() {

    return {
      trim : function(str) {
        return str.replace(/^\s+|\s+$/g, '');
      },
      urlEncode : function(str) {
        return escape(str);
      },
      prepareForUrl : function(str) {
        str = this.trim(str);
        str = this.urlEncode(str);
        return str;
      }
    }

  });


;/**
 * Created by isuarez on 4/10/2014.
 */

'use strict';


angular.module('App.Controllers', []).controller('headerLoginCtrl', function($scope, $http, notifierSvc, identitySvc, authSvc, $location) {

    $scope.identity = identitySvc;
    $scope.signin = function (username, password) {

        authSvc.authenticateUser(username, password).then(function(success) {

                if (success) {
                    notifierSvc.notify('Success Login');
                }
                else
                    notifierSvc.notify('Error login in.');

            }
        );


        $scope.signout = function() {

            authSvc.logoutUser().then(function() {
                $scope.username = "";
                $scope.password = "";
                notifierSvc.notify('You have been successfylly signe out');
                $location.path("/");
            })
        }

    }

} );;/**
 * Created by isuarez on 4/10/2014.
 */
/**
 * Created by isuarez on 3/29/14.
 */

angular.module('App.Controllers').controller('profileCtrl', function($scope, authSvc, identitySvc, notifierSvc) {

    //Assing the data
    var user = identitySvc.currentUser;
    $scope.email = user.username;
    $scope.fname = user.firstName;
    $scope.lname = user.lastName;


    //Update
    $scope.update = function() {

        var newUserData  =  {
            username: $scope.email,
            firstName: $scope.fname,
            lastName: $scope.lname
        };

        if ($scope.password && $scope.password.length > 0) {
            password: $scope.password;

        }

        //Call the rcAuth Service
        authSvc.updateCurrentUser(newUserData).then(
            //Success
            function () {
                notifierSvc.notify('User Account has been updated!');
            },
            //Fail
            function(reason) {
                notifierSvc.error(reason);
            });


    }

});;/**
 * Created by isuarez on 3/27/14.
 */
angular.module('App.Controllers').controller('signupCtrl', function($scope, authSvc, notifierSvc, $location) {

    $scope.signup = function() {

        //Create the new UserData object
        var newUserData  =  {
            username: $scope.email,
            password: $scope.password,
            firstName: $scope.fname,
            lastName: $scope.lname
        };

        //Call the rcAuth Service
        authSvc.createUser(newUserData).then(
            //Success
            function () {
                notifierSvc.notify('User Account Created!');
                $location.path('/');
            },
            //Fail
            function(reason) {
                notifierSvc.error(reason);
            });
        //End Signup Function
    };




});;/**
 * Created by isuarez on 3/25/14.
 */

angular.module('App.Controllers').controller('userListCtrl', function ($scope, userResource) {

    $scope.users = userResource.query();

});

;'use strict';


angular.module('App.Controllers', []).controller('mainCtrl', function($scope) {

    $scope.courses = [

        {name: "Course 1 ", featured: true, published: new Date('2000/01/01')},
        {name: "Course 2 ", featured: false, published: new Date('2001/04/03')},
        {name: "Course 3 ", featured: true, published: new Date('2002/08/05')},
        {name: "Course 4 ", featured: true, published: new Date('2003/03/06')},
        {name: "Course 5 ", featured: true, published: new Date('2004/12/01')},
        {name: "Course 6 ", featured: true, published: new Date('2005/09/20')},
        {name: "Course 7 ", featured: true, published: new Date('2006/04/18')},
        {name: "Course 8 ", featured: true, published: new Date('2007/06/30')}

    ]

} );
;/**
 * Created by isuarez on 2/3/14.
 */

angular.module('App.Controllers').controller('rooferDashboardCtrl',  function($scope) {

    //TODO;

});

;/**
 * Created by isuarez on 2/3/14.
 */

angular.module('App.Controllers').controller('rooferInboxCtrl', function($scope) {

    //TODO;

});
;/**
 * Created by isuarez on 2/3/14.
 */

angular.module('App.Controllers').controller('rooferJobCtrl',  function($scope, jobResource) {


        $scope.jobs = jobResource.query();



});
;/**
 * Created by isuarez on 2/3/14.
 */

angular.module('App.Controllers').controller('rooferKundenCtrl', function($scope) {

    //TODO;

});
;/**
 * Created by isuarez on 2/3/14.
 */

angular.module('App.Controllers').controller('rooferRechnungCtrl', function($scope) {

  //TODO;

});
;/**
 * Created by isuarez on 4/9/14.
 */

angular.module('App.Routes',[])

    .config(['$routeProvider', '$locationProvider',

        function ( $routeProvider, $locationProvider) {

            if (CONFIG.routing.html5Mode) {
                $locationProvider.html5Mode(true);
            }
            else {
                var routingPrefix = CONFIG.routing.prefix;
                if (routingPrefix && routingPrefix.length > 0) {
                    $locationProvider.hashPrefix(routingPrefix);
                }
            }

            ROUTER.when('roofer_dashboard_path', '/roofer/dashboard', {
                controller: 'rooferDashboardCtrl',
                templateUrl: CONFIG.prepareViewTemplateUrl('roofer/dashboard')
            });

            ROUTER.when('roofer_inbox_path', '/roofer/inbox', {
                controller: 'rooferInboxCtrl',
                templateUrl: CONFIG.prepareViewTemplateUrl('roofer/inbox')
            });

            ROUTER.when('roofer_jobs_path', '/roofer/jobs', {
                controller: 'rooferJobCtrl',
                templateUrl: CONFIG.prepareViewTemplateUrl('roofer/jobs')
            });

            ROUTER.when('roofer_kunden_path', '/roofer/kunden', {
                controller: 'rooferKundenCtrl',
                templateUrl: CONFIG.prepareViewTemplateUrl('roofer/kunden')
            });

            ROUTER.when('roofer_rechnung_path', '/roofer/rechnung', {
                controller: 'rooferRechnungCtrl',
                templateUrl: CONFIG.prepareViewTemplateUrl('roofer/rechnung')
            });

            ROUTER.when('roofer_home_path', '/', {
                controller: 'rooferDashboardCtrl',
                templateUrl: CONFIG.prepareViewTemplateUrl('roofer/dashboard')
            });

            ROUTER.alias('home_path', 'roofer_dashboard_path');

            ROUTER.otherwise({
                redirectTo: '/roofer/dashboard'
            });

            ROUTER.install($routeProvider);
        }]).

    run([ '$rootScope', '$location', function ( $rootScope, $location) {
        var prefix = '';
        if (!CONFIG.routing.html5Mode) {
            prefix = '#' + CONFIG.routing.prefix;
        }
        $rootScope.route = function (url, args) {
            return prefix + ROUTER.routePath(url, args);
        };

        $rootScope.r = $rootScope.route;

        $rootScope.c = function (route, value) {
            var url = ROUTER.routePath(route);
            if (url === $location.path()) {
                return value;
            }
        };
    }]);
;'use strict';
/**
 * Created by isuarez on 2/27/14.
 */


//Main Angular module. Cool
var app = angular.module('app',
                  ['ngResource', 'ngRoute',
                   'App.Controllers', 'App.Services', 'App.Routes','App.Resources']);

//Defining Routes
/*
app.config(function ($routeProvider, $locationProvider) {


        var routeRoleChecks = {

            admin: {
                auth: function(rcAuthSvc) {
                    return rcAuthSvc.authorizeCurrentUserForRoute('admin');
                }
            },

            user: {
                auth: function(rcAuthSvc) {
                    return rcAuthSvc.authorizeAuthenticatedUserForRoute();
                }
            }



        };

        $locationProvider.html5Mode(true);

        $routeProvider

            .when('/', {templateUrl: '/partials/main/main',
                        controller: 'rcMainCtrl'})

            .when('/admin/users', {templateUrl: '/partials/admin/user-list',
                                   controller: 'rcUserListCtrl',
                                   resolve: routeRoleChecks.admin
            })

            .when('/signup', {templateUrl: '/partials/account/signup',
                              controller: 'rcSignUpCtrl'})

            .when('/profile',{templateUrl: '/partials/account/profile',
                              controller: 'rcProfileCtrl',
                              resolve: routeRoleChecks.user });
    }

);
*/
angular.module('app').run(function($rootScope, $location)
{

    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    });

});