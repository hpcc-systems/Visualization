(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./CommonND"], factory);
    } else {
        root.Area = factory(root.CommonND);
    }
}(this, function (CommonND) {
    function Area(target) {
        CommonND.call(this);
        this._class = "c3_Area";

        this._type = "area";
    };
    Area.prototype = Object.create(CommonND.prototype);

    Area.prototype.update = function (domNode, element) {
        CommonND.prototype.update.apply(this, arguments);
        
        this.c3Chart.load({
            categories: this.getC3Categories(),
            rows: this.getC3Rows()
        });
    };

    return Area;
}));
