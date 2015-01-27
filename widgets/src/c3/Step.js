(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Common"], factory);
    } else {
        root.Step = factory(root.Common);
    }
}(this, function (Common) {
    function Step(target) {
        Common.call(this);
        this._class = "c3_Step";

        this._type = "step";
    };
    Step.prototype = Object.create(Common.prototype);

    Step.prototype.update = function (domNode, element) {
        Common.prototype.update.apply(this, arguments);
        
        this.c3Chart.load({
            categories: this.getC3Categories(),
            rows: this.getC3Rows()
        });
    };

    return Step;
}));
