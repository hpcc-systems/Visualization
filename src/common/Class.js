"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.common_Class = factory();
    }
}(this, function () {
    function Class() {
    }
    Class.prototype.constructor = Class;

    Class.prototype.implements = function (source) {
        for (var prop in source) {
            if (this[prop] === undefined && source.hasOwnProperty(prop)) {
                this[prop] = source[prop];
            }
        }
    };
    Class.prototype.mixin = function (mixinClass) {
        Class.prototype.implements(mixinClass.prototype);
    };

    return Class;
}));
