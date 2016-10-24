"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.common_IList = factory();
    }
}(this, function () {
    function IList() {
    }
    
    //  Properties  ---

    //  Events  ---
    IList.prototype.click = function (d) {
        console.log("Click:  " + d);
    };

    IList.prototype.dblclick = function (d) {
        console.log("Double click:  " + d);
    };

    return IList;
}));
