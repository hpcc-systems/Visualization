(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Common"], factory);
    } else {
        root.Line = factory(root.Common);
    }
}(this, function (Common) {
    function Line(target) {
        Common.call(this);

        this._class = "c3_line";
        this._type = "line";
    };
    Line.prototype = Object.create(Common.prototype);

    Line.prototype.update = function (domNode, element) {
        Common.prototype.update.apply(this, arguments);
        
        this.c3Chart.load({
            categories: this.getC3Categories(),
            rows: this.getC3Rows()
        });
    };

    return Line;
}));
