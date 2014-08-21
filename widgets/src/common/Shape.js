(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./SVGWidget", "css!./Shape"], factory);
    } else {
        root.Entity = factory(root.SVGWidget);
    }
}(this, function (SVGWidget) {
    function Shape() {
        SVGWidget.call(this);
        this._class = "shape";
        this._shape = "circle";
    };
    Shape.prototype = Object.create(SVGWidget.prototype);

    Shape.prototype.shape = function (_) {
        if (!arguments.length) return this._shape;
        this._shape = _;
        return this;
    };

    Shape.prototype.radius = function (_) {
        if (!arguments.length) return Math.min(this._size.width, this._size.height) / 2;
        this.size({ width: _ * 2, height: _ * 2 });
        return this;
    };

    Shape.prototype.intersection = function (pointA, pointB) {
        switch (this._shape) {
            case "circle":
                return this.intersectCircle(pointA, pointB);
        }
        return SVGWidget.prototype.intersection.apply(this, arguments);
    };

    Shape.prototype.enter = function (domNode, element) {
        var context = this;
        this._shapeElement = element.append(this._shape)
        ;
    };

    Shape.prototype.update = function (domNode, element) {
        switch (this._shape) {
        case "circle":
            var radius = this.radius();
            this._shapeElement
                .attr("r", radius)
            ;
            break;
        case "rect":
            this._shapeElement
                .attr("x", -this._size.width / 2)
                .attr("y", -this._size.height / 2)
                .attr("width", this._size.width)
                .attr("height", this._size.height)
            ;
            break;
        }
    };

    return Shape;
}));
