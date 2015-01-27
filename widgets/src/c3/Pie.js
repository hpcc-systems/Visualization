(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Common"], factory);
    } else {
        root.Pie = factory(root.Common);
    }
}(this, function (Common) {
    function Pie(target) {
        Common.call(this);
        this._class = "c3_Pie";

        this._type = "pie";
    };
    Pie.prototype = Object.create(Common.prototype);

    Pie.prototype.update = function (domNode, element) {
        Common.prototype.update.apply(this, arguments);
        
        var data = this._data.map(function (row, idx) {
            return [row[0], row[1]];
        }, this);
        this.c3Chart.load({
            columns: data
        });
    };

    return Pie;
}));
