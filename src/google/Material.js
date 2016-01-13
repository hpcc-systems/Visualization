"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "require", "./CommonND"], factory);
    } else {
        root.google_Material = factory(root.d3, root.require, root.google_CommonND);
    }
}(this, function (d3, require, CommonND) {

    function Material() {
        CommonND.call(this);
    }
    Material.prototype = Object.create(CommonND.prototype);
    Material.prototype.constructor = Material;
    Material.prototype._class += " google_Material";

    function materialHack(type, callback, depth) {
        depth = depth || 0;
        try {
            require([(document.location.protocol === "https:" ? "https" : "http") + "://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js", "goog!visualization,1.1,packages:["+type+"]"], function () {
                try {
                    require(["./CommonND"], function () {
                        callback();
                    });
                } catch (e) {
                    materialHack(type, callback, depth + 1);
                }
            });
        } catch (e) {
            materialHack(type, callback, depth + 1);
        }
    }

    Material.prototype.render = function (callback) {
        var context = this;
        var args = arguments;
        materialHack(this._gType, function() {
            CommonND.prototype.render.apply(context, args);
        });
    };

    return Material;
}));
