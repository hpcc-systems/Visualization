(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Common2D"], factory);
    } else {
        root.Column = factory(root.Common2D);
    }
}(this, function (Common2D) {
    function Column(target) {
        Common2D.call(this);
        this._class = "c3_Column";

        this._type = "bar";
        this._prevRows = [];
    };
    Column.prototype = Object.create(Common2D.prototype);

    Column.prototype.update = function (domNode, element) {
        Common2D.prototype.update.apply(this, arguments);
        
        this.c3Chart.load({
            categories: this.getC3Categories(),
            rows: this.getC3Rows(),
            unload: this._prevRows.map(function (row) {
                return row[0];  //TODO Check if it is in new data
            })
        });
        this._prevRows = this._data;
    };

    return Column;
}));
