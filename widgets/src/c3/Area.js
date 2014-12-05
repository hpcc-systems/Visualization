(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Common"], factory);
    } else {
        root.Area = factory(root.Common);
    }
}(this, function (Common) {
    function Area(target) {
        Common.call(this);

        this._class = "c3_Area";
        this._type = "area";
    };
    Area.prototype = Object.create(Common.prototype);

    Area.prototype.update = function (domNode, element) {
        Common.prototype.update.apply(this, arguments);
        
        this.c3Chart.load({
            categories: this.getC3Categories(),
            rows: this.getC3Rows()
        });
    };

    return Area;
}));
