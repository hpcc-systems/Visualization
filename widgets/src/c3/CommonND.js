(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Common", "../chart/INDChart"], factory);
    } else {
        root.CommonND = factory(root.Common, root.INDChart);
    }
}(this, function (Common, INDChart) {
    function CommonND(target) {
        Common.call(this);
        INDChart.call(this);
        this._class = "c3_CommonND";

        var context = this;
        this._config.color = {
            pattern: this._palette.colors()
        };

        this._config.data.onclick = function (d, element) {
            context.click(context.rowToObj(context._data[d.index]), d.id);
        };
        this._config.data.color = function (color, d) {
            return context._palette(d.id ? d.id : d);
        };
    };
    CommonND.prototype = Object.create(Common.prototype);
    CommonND.prototype.implements(INDChart.prototype);

    CommonND.prototype.publish("paletteID", "default", "set", "Palette ID", CommonND.prototype._palette.switch());

    CommonND.prototype.update = function (domNode, element) {
        Common.prototype.update.apply(this, arguments);
        this._palette = this._palette.switch(this._paletteID);
    };


    return CommonND;
}));
