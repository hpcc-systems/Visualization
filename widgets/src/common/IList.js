"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.common_IList = factory();
    }
}(this, function () {
    function IList() {
    };

    //  Data ---
    IList.prototype.testData = function () {
        var data = ["This", "is a", "list", "of some text."];
        this.data(data);
        return this;
    };

    //  Properties  ---

    //  Events  ---
    IList.prototype.click = function (d) {
        console.log("Click:  " + d);
    };

    return IList;
}));
