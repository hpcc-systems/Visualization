/** 
 * SystemJS plugin for async dependency load like JSONP and Google Maps
 * Author: Miller Medeiros (Adapted for SystemJS by Gordon Smith)
 * OrigSource: https://github.com/millermedeiros/requirejs-plugins
 */

var DEFAULT_PARAM_NAME = 'callback';
var _uid = 0;

function injectScript(src) {
    var s, t;
    s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = src;
    t = document.getElementsByTagName('script')[0]; t.parentNode.insertBefore(s, t);
}

function formatUrl(name, id) {
    var paramRegex = /!(.+)/,
        url = name.replace(paramRegex, ''),
        param = (paramRegex.test(name)) ? name.replace(/.+!/, '') : DEFAULT_PARAM_NAME;
    url += (url.indexOf('?') < 0) ? '?' : '&';
    return url + param + '=' + id;
}

function uid() {
    _uid += 1;
    return '__async_req_' + _uid + '__';
}

exports.fetch = function (load) {
    if (typeof window !== 'undefined') {
        return new Promise(function (resolve, reject) {
            var id = uid();
            injectScript(formatUrl(load.address, id));
            window[id] = function () {
                resolve('');
            }
        });
    }
    return Promise.resolve('');
};
