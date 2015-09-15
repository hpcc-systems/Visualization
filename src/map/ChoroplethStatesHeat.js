"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../layout/Layered"], factory);
    } else {
        root.map_ChoroplethStatesHeat = factory(root.layout_Layered);
    }
}(this, function (Layered) {
    function ChoroplethStatesHeat(target) {
        Layered.call(this);
    }
    ChoroplethStatesHeat.prototype = Object.create(Layered.prototype);
    ChoroplethStatesHeat.prototype.constructor = ChoroplethStatesHeat;
    ChoroplethStatesHeat.prototype._class += " map_ChoroplethStatesHeat";

    return ChoroplethStatesHeat;
}));
