(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Common2D"], factory);
    } else {
        root.Step = factory(root.Common2D);
    }
}(this, function (Common2D) {
    function Step(target) {
        Common2D.call(this);
        this._class = "c3_Step";

        this._type = "step";
    };
    Step.prototype = Object.create(Common2D.prototype);

    Step.prototype.update = function (domNode, element) {
        Common2D.prototype.update.apply(this, arguments);
        
        this.c3Chart.load({
            categories: this.getC3Categories(),
            rows: this.getC3Rows()
        });
    };

    return Step;
}));
