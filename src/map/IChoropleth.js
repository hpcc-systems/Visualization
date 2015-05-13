"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/Palette"], factory);
    } else {
        root.map_IChoropleth = factory(root.common_Palette, root.usStates, root.usCounties);
    }
}(this, function (Palette, usStates, usCounties) {
    function IChoropleth() {
    }
    IChoropleth.prototype._palette = Palette.rainbow("default");
    
    //  Events  ---
    IChoropleth.prototype.click = function (row, column) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column);
    };


    return IChoropleth;
}));
