"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./CommonND"], factory);
    } else {
        root.Area = factory(root.d3, root.CommonND);
    }
}(this, function (d3, CommonND) {

    function Area() {
        CommonND.call(this);
        this._class = "google_Area";

        this._chartType = "AreaChart";
    };
    Area.prototype = Object.create(CommonND.prototype);
    
    Area.prototype.publish("areaOpacity", null, "number", "Font Size");
    Area.prototype.publish("isStacked", false, "boolean", "Stacks the elements in a series");
    
    Area.prototype.getChartOptions = function () {
        var retVal = CommonND.prototype.getChartOptions.apply(this, arguments);
        //  TODO:  Add Area Properties Here
        return retVal;
    };

    Area.prototype.enter = function (domNode, element) {
        CommonND.prototype.enter.apply(this, arguments);
    };

    Area.prototype.update = function (domNode, element) {
        CommonND.prototype.update.apply(this, arguments);
    };
    
    return Area;
}));
