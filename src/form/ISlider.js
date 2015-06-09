"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.other_ISlider = factory();
    }
}(this, function () {
    function ISlider() {
    }

    //  Properties  ---
    ISlider.prototype._range = { low: 0, high: 100 };
    ISlider.prototype._step = 1;
    ISlider.prototype._allowRange = false;   //  TODO:  range selections is not supported yet  ---

    //  Events  ---
    ISlider.prototype.click = function (value) {
        console.log("click:  " + value);
    };
    ISlider.prototype.newSelection = function (value, value2) {
        console.log("newSelection:  " + value + ", " + value2);
    };
    return ISlider;
}));
