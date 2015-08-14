/**
 * @file c3 Chart Common2D
 * @author HPCC Systems
 */

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Common", "../api/I2DChart"], factory);
    } else {
        root.c3chart_Common2D = factory(root.c3chart_Common, root.api_I2DChart);
    }
}(this, function (Common, I2DChart) {
    /**
     * @class c3chart_Common2D
     * @abstract
     * @extends c3chart_Common
     * @implements api_I2DChart
     * @noinit
     */
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
    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof c3chart_Common2D
     * @private
     */
    Common2D.prototype._class += " c3chart_Common2D";
    Common2D.prototype.implements(I2DChart.prototype);

    Common2D.prototype.publish("paletteID", "default", "set", "Palette ID", Common2D.prototype._palette.switch(), {tags:["Basic","Shared"]});
    Common2D.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});
    /**
     * The function that is called when this widget "enters" the web page. after enter() and everytime the widget is updated with subsequent render calls.
     * @method update
     * @memberof c3chart_Common2D
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Common2D.prototype.update = function (domNode, element) {
        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        Common.prototype.update.apply(this, arguments);
    };

    return Common2D;
}));
