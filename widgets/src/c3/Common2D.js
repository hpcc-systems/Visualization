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
        this._config.data.onclick = function (d, element) {
            context.click(context.rowToObj(context._data[d.index]), d.x ? d.id : context._columns[1]);
        };
    };
    Common2D.prototype = Object.create(Common.prototype);
    Common2D.prototype.implements(I2DChart.prototype);

    return Common2D;
}));
