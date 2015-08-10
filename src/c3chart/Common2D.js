"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Common", "../api/I2DChart"], factory);
    } else {
        root.c3chart_Common2D = factory(root.c3chart_Common, root.api_I2DChart);
    }
}(this, function (Common, I2DChart) {
    function Common2D(target) {
        Common.call(this);
        I2DChart.call(this);

        var context = this;
        this._config.color = {
            pattern: this._palette.colors()
        };

        this._config.data.onclick = function (d, element) {
            context.click(context.rowToObj(context._data[d.index]), context._columns[1]);
        };
        this._config.data.color = function (color, d) {
            return context._palette(d.id ? d.id : d);
        };
    }
    Common2D.prototype = Object.create(Common.prototype);
    Common2D.prototype.constructor = Common2D;
    Common2D.prototype._class += " c3chart_Common2D";
    Common2D.prototype.implements(I2DChart.prototype);

    /**
     * Publish Params Common To Other Libraries
     */
    Common2D.prototype.publish("paletteID", "default", "set", "Palette ID", Common2D.prototype._palette.switch(), {tags:['Basic','Shared']});

    /**
     * Publish Params Unique To This Widget
     */

    Common2D.prototype.update = function (domNode, element) {
        this._palette = this._palette.switch(this.paletteID());
        Common.prototype.update.apply(this, arguments);
    };

    return Common2D;
}));
