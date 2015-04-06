"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./CommonND"], factory);
    } else {
        root.Bar = factory(root.d3, root.CommonND);
    }
}(this, function (d3, CommonND) {

    function Bar() {
        CommonND.call(this);
        this._class = "google_Bar";

        this._chartType = "BarChart";
    };
    Bar.prototype = Object.create(CommonND.prototype);

    Bar.prototype.publish("isStacked", false, "boolean", "create stackable bar chart");
   
    Bar.prototype.getChartOptions = function () {
        var retVal = CommonND.prototype.getChartOptions.apply(this, arguments);
        
        // TODO: more options here
        retVal.isStacked = this._isStacked;
        
        return retVal;
    };

    Bar.prototype.enter = function (domNode, element) {
        CommonND.prototype.enter.apply(this, arguments);
    };

    Bar.prototype.update = function (domNode, element) {      
        CommonND.prototype.update.apply(this, arguments);
    };

    return Bar;
}));
