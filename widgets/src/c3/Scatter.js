(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Common2D"], factory);
    } else {
        root.Scatter = factory(root.Common2D);
    }
}(this, function (Common2D) {
    function Scatter(target) {
        Common2D.call(this);
        this._class = "c3_Scatter";

        this._type = "scatter";
    };
    Scatter.prototype = Object.create(Common2D.prototype);

    Scatter.prototype.update = function (domNode, element) {
        Common2D.prototype.update.apply(this, arguments);
        
        this.c3Chart.load({
            categories: this.getC3Categories(),
            rows: this.getC3Rows()
        });
    };

    return Scatter;
}));
