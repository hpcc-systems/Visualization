export function Class() {
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
        if (source.hasOwnProperty(prop)) {
            if (this[prop] === undefined) {
                this[prop] = source[prop];
            } else if (window.__hpcc_debug) {
                console.log("Duplicate member:  " + prop);
            }
        }
    }
};

Class.prototype.mixin = function (mixinClass) {
    this.implements(mixinClass.prototype);
    //  Special case mixins  ---
    if (mixinClass.prototype.hasOwnProperty("_class")) {
        this._class += " " + mixinClass.prototype._class.split(" ").pop();
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
