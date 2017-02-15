require(["test/Factory"], function (testFactory) {
    var vizPaths = Object.keys(testFactory.widgets);
    vizPaths.forEach(function (widgetPath) {
        var _obj = {};
        var _sp = widgetPath.split('/');
        _obj[_sp[1] + "_" + _sp[2]] = function (options) {
            var that = this;
            require([widgetPath], function (w) {
                that.each(function () {
                    var _w = new w().target(this);
                    for (var i in options) {
                        if (typeof (_w[i]) === "function") {
                            _w[i](options[i]);
                        }
                    }
                    if (typeof (options['render']) === "undefined")_w.render();
                });
            });
        };
        $.fn.extend(_obj);
    });
    $('.javascript').first().click();
});

