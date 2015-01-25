(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Common"], factory);
    } else {
        root.Scatter = factory(root.Common);
    }
}(this, function (Common) {
    function Scatter(target) {
        Common.call(this);
        this._class = "c3_Scatter";

        this._type = "scatter";
    };
    Scatter.prototype = Object.create(Common.prototype);

    Scatter.prototype.update = function (domNode, element) {
        Common.prototype.update.apply(this, arguments);
        
        this.c3Chart.load({
            categories: this.getC3Categories(),
            rows: this.getC3Rows()
        });
    };

    return Scatter;
}));
