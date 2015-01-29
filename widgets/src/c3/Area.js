(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Common2D"], factory);
    } else {
        root.Area = factory(root.Common2D);
    }
}(this, function (Common2D) {
    function Area(target) {
        Common2D.call(this);
        this._class = "c3_Area";

        this._type = "area";
    };
    Area.prototype = Object.create(Common2D.prototype);

    Area.prototype.update = function (domNode, element) {
        Common2D.prototype.update.apply(this, arguments);
        
        this.c3Chart.load({
            categories: this.getC3Categories(),
            rows: this.getC3Rows()
        });
    };

    return Area;
}));
