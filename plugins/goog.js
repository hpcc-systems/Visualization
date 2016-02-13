/** 
 * SystemJS plugin for loading Google Ajax API modules thru `google.load`
 * Author: Miller Medeiros (Adapted for SystemJS by Gordon Smith)
 * OrigSource: https://github.com/millermedeiros/requirejs-plugins
 */

var rProps = /([\w-]+)\s*:\s*(?:(\[[^\]]+\])|([^,]+)),?/g, //match "foo:bar" and "lorem:[ipsum,dolor]" capturing name as $1 and val as $2 or $3
    rArr = /^\[([^\]]+)\]$/; //match "[foo,bar]" capturing "foo,bar"

function parseProperties(str){
    var match, obj = {};
    while (match = rProps.exec(str)) {
        obj[ match[1] ] = typecastVal(match[2] || match[3]);
    }
    return obj;
}

function typecastVal(val){
    if (rArr.test(val)){
        val = val.replace(rArr, '$1').split(',');
    } else if (val === 'null'){
        val = null;
    } else if (val === 'false'){
        val = false;
    } else if (val === 'true'){
        val = true;
    } else if (val === '' || val === "''" || val === '""'){
        val = '';
    } else if (! isNaN(val)) {
        //isNaN('') == false
        val = +val;
    }
    return val;
}

var rParts = /^([^,]+)(?:,([^,]+))?(?:,(.+))?/;

function parseName(name){
    var match = rParts.exec(name),
        data = {
            moduleName : match[1],
            version : match[2] || '1'
        };
    data.settings = parseProperties(match[3]);
    return data;
}

function fetch(load) {
    if (typeof window !== 'undefined') {
        return new Promise(function (resolve, reject) {
            var addressParts = load.address.split("visualization");
            var data = parseName("visualization" + addressParts[1]),
                settings = data.settings;

            settings.callback = function () {
                resolve('');
            };

            System.amdRequire(['async!' + (document.location.protocol === 'https:' ? 'https' : 'http') + '://www.google.com/jsapi'], function () {
                google.load(data.moduleName, data.version, settings);
            });
        });
    }
    return Promise.resolve('');
}
