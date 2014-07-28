(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./D3Widget", "d3/d3"], factory);
    } else {
        root.Entity = factory(root.D3Widget, root.d3);
    }
}(this, function (D3Widget, d3) {
    function Shape(target) {
        D3Widget.call(this, target);
        this._class = "shape";
        this._shape = "circle";
    };
    Shape.prototype = Object.create(D3Widget.prototype);

    Shape.prototype.shape = function (_) {
        if (!arguments.length) return this._shape;
        this._shape = _;
        return this;
    };

    Shape.prototype.radius = function () {
        return Math.min(this._size.width, this._size.height) / 2;
    };

    Shape.prototype.intersection = function (pointA, pointB) {
        switch (this._shape) {
            case "circle":
                return this.intersectCircle(pointA, pointB);
        }
        return D3Widget.prototype.intersection.call(this, pointA, pointB);
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
