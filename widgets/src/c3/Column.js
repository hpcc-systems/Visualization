(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Common"], factory);
    } else {
        root.Column = factory(root.Common);
    }
}(this, function (Common) {
    function Column(target) {
        Common.call(this);
        this._class = "c3_Column";

        this._type = "bar";
    };
    Column.prototype = Object.create(Common.prototype);

    Column.prototype.update = function (domNode, element) {
        Common.prototype.update.apply(this, arguments);
        
        this.c3Chart.load({
            categories: this.getC3Categories(),
            rows: this.getC3Rows()
        });
    };

    return Column;
}));
