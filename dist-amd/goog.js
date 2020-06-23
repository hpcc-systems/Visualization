/** @license
 * RequireJS plugin for loading Google Ajax API modules thru `google.load`
 * Author: Miller Medeiros
 * Version: 0.2.0 (2011/12/06)
 * Released under the MIT license
 * Modified to support www.gstatic.com/charts/loader.js (2020/06/22)
 */

define(["propertyParser"],function(e){function t(t){var r=o.exec(t),n={moduleName:r[1],version:r[2]||"1"};return n.settings=e.parseProperties(r[3]),n}var o=/^([^,]+)(?:,([^,]+))?(?:,(.+))?/;return{load:function(e,o,r,n){if(n&&n.isBuild)r(null);else{var s=t(e),a=s.settings;a.callback=r,o([("https:"===document.location.protocol?"https":"http")+"://www.gstatic.com/charts/loader.js"],function(){google.load(s.moduleName,s.version,a)})}}}});