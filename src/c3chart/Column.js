"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./CommonND"], factory);
    } else {
        root.c3chart_Column = factory(root.c3chart_CommonND);
    }
}(this, function (CommonND) {
    function Column(target) {
        CommonND.call(this);
        this._class = "c3chart_Column";

        this._type = "bar";
    };
    Column.prototype = Object.create(CommonND.prototype);
    
    Column.prototype.publish("isStacked", false, "boolean", "Stack BarChart");

    Column.prototype.enter = function (domNode, element) {
        CommonND.prototype.enter.apply(this,arguments);
    }

    Column.prototype.update = function (domNode, element) {
        CommonND.prototype.update.apply(this, arguments);

        if (this.isStacked()) {
            this.c3Chart.groups([this._columns.slice(1,this._columns.length)]);
        } else {
            this.c3Chart.groups([]);
        }
    }

    return Column;
}));
