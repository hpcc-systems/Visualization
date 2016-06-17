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
    Class.prototype._class = "common_Class";

    Class.prototype.class = function (_) {
        if (!arguments.length) return this._class;
        this._class = _;
        return this;
    };

    Class.prototype.classID = function () {
        return this._class.split(" ").pop();
    };

    Class.prototype.implements = function (source) {
        for (var prop in source) {
            if (this[prop] === undefined && source.hasOwnProperty(prop)) {
                this[prop] = source[prop];
            }
        }
    };

    Class.prototype.mixin = function (mixinClass) {
        this.implements(mixinClass.prototype);
        for (var prop in mixinClass.prototype) {
            if (prop === "_class" && mixinClass.prototype.hasOwnProperty(prop)) {
                this[prop] += " " + mixinClass.prototype[prop].split(" ").pop();
            }
        }
    };

    Class.prototype.overrideMethod = function (methodID, newMethod) {
        if (this[methodID] === undefined) {
            throw "Method:  " + methodID + " does not exist.";
        }
        var origMethod = this[methodID];
        this[methodID] = function () {
            return newMethod(origMethod, arguments);
        };
        return this;
    };

    return Class;
}));
