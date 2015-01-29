(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Common2D"], factory);
    } else {
        root.Line = factory(root.Common2D);
    }
}(this, function (Common2D) {
    function Line(target) {
        Common2D.call(this);
        this._class = "c3_Line";

        this._type = "line";
    };
    Line.prototype = Object.create(Common2D.prototype);

    Line.prototype.update = function (domNode, element) {
        Common2D.prototype.update.apply(this, arguments);
        
        this.c3Chart.load({
            categories: this.getC3Categories(),
            rows: this.getC3Rows()
        });
    };

    return Line;
}));
