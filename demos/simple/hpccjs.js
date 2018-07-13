window.hpccjs = {};

Object.keys(window)
    .filter(n => n.indexOf("@hpcc-js/") === 0)
    .forEach(function (package_name) {
        hpccjs[package_name.split('/')[1]] = window[package_name];
        Object.keys(window[package_name]).forEach(function (widget_name) {
            if (typeof hpccjs[widget_name] === "undefined") {
                hpccjs[widget_name] = window[package_name][widget_name];
            }
        })
    });

if (typeof location.href === "string") {
    hpccjs.__raw_params = location.href.split("?")[1];
    hpccjs.url_params = {};
    if (hpccjs.__raw_params) {
        hpccjs.__raw_params.split('&').forEach(str => {
            const _sp = str.split('=');
            hpccjs.url_params[_sp[0]] = _sp[1];
        });
    }
}