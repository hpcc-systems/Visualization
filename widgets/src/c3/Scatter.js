(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./CommonND"], factory);
    } else {
        root.Scatter = factory(root.CommonND);
    }
}(this, function (CommonND) {
    function Scatter(target) {
        CommonND.call(this);
        this._class = "c3_Scatter";

        this._type = "scatter";
    };
    Scatter.prototype = Object.create(CommonND.prototype);

    Scatter.prototype.update = function (domNode, element) {
        CommonND.prototype.update.apply(this, arguments);
        
        this.c3Chart.load({
            categories: this.getC3Categories(),
            rows: this.getC3Rows()
        });
    };

    return Scatter;
}));
