(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./CommonND"], factory);
    } else {
        root.Line = factory(root.CommonND);
    }
}(this, function (CommonND) {
    function Line(target) {
        CommonND.call(this);
        this._class = "c3_Line";

        this._type = "line";
        this._prevRows = [];
    };
    Line.prototype = Object.create(CommonND.prototype);

    Line.prototype.update = function (domNode, element) {
        CommonND.prototype.update.apply(this, arguments);

        this.c3Chart.load({
            categories: this.getC3Categories(),
            rows: this.getC3Rows(),
            unload: this._prevRows.map(function (row) {
                return row[0];  //TODO Check if it is in new data
            })
        });
        this._prevRows = this._data;
    };

    return Line;
}));
