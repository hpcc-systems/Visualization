(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Common"], factory);
    } else {
        root.Donut = factory(root.Common);
    }
}(this, function (Common) {
    function Donut(target) {
        Common.call(this);

        this._class = "c3_donut";
        this._type = "donut";
        this._config.donut = {
            title: ""
        };
    };
    Donut.prototype = Object.create(Common.prototype);

    Donut.prototype.title = function (_) {
        if (!arguments.length) return this._config.donut.title;
        this._config.donut.title = _;
        return this;
    };

    Donut.prototype.update = function (domNode, element) {
        Common.prototype.update.apply(this, arguments);
        
        var data = this._data.map(function (row, idx) {
            return [row[0], row[1]];
        }, this);
        this.c3Chart.load({
            columns: data
        });
    };

    return Donut;
}));
