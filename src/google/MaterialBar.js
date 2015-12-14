"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "require", "./CommonND"], factory);
    } else {
        root.google_MaterialBar = factory(root.d3, root.require, root.google_CommonND);
    }
}(this, function (d3, require, CommonND) {

    function MaterialBar() {
        CommonND.call(this);

        this._chartLibrary = "charts";
        this._chartType = "Bar";
    }
    MaterialBar.prototype = Object.create(CommonND.prototype);
    MaterialBar.prototype.constructor = MaterialBar;
    MaterialBar.prototype._class += " google_MaterialBar";

    MaterialBar.prototype.getChartOptions = function () {
        var retVal = CommonND.prototype.getChartOptions.apply(this, arguments);
        retVal.bars = "horizontal";
        return retVal;
    };

    function materialHack(callback, depth) {
        depth = depth || 0;
        try {
            require([(document.location.protocol === "https:" ? "https" : "http") + "://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js", "goog!visualization,1.1,packages:[bar]"], function () {
                try {
                    require(["./CommonND"], function () {
                        callback();
                    });
                } catch (e) {
                    materialHack(callback, depth + 1);
                }
            });
        } catch (e) {
            materialHack(callback, depth + 1);
        }
    }

    MaterialBar.prototype.render = function (callback) {
        var context = this;
        var args = arguments;
        materialHack(function() {
            CommonND.prototype.render.apply(context, args);
        });
    };

    return MaterialBar;
}));
