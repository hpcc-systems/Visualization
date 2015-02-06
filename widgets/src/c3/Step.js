(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./CommonND"], factory);
    } else {
        root.Step = factory(root.CommonND);
    }
}(this, function (CommonND) {
    function Step(target) {
        CommonND.call(this);
        this._class = "c3_Step";

        this._type = "step";
    };
    Step.prototype = Object.create(CommonND.prototype);

    Step.prototype.update = function (domNode, element) {
        CommonND.prototype.update.apply(this, arguments);
        
        this.c3Chart.load({
            categories: this.getC3Categories(),
            rows: this.getC3Rows()
        });
    };

    return Step;
}));
