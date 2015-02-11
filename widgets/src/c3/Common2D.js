(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Common", "../chart/I2DChart"], factory);
    } else {
        root.Common2D = factory(root.Common, root.I2DChart);
    }
}(this, function (Common, I2DChart) {
    function Common2D(target) {
        Common.call(this);
        I2DChart.call(this);
        this._class = "c3_Common2D";

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
    };
    Common2D.prototype = Object.create(Common.prototype);
    Common2D.prototype.implements(I2DChart.prototype);

    Common2D.prototype.publish("paletteID", "default", "set", "Palette ID", Common2D.prototype._palette.switch());

    Common2D.prototype.update = function (domNode, element) {
        Common.prototype.update.apply(this, arguments);
        this._palette = this._palette.switch(this._paletteID);
    };

    return Common2D;
}));
