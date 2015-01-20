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
    };
    Shape.prototype = Object.create(SVGWidget.prototype);

    Shape.prototype.publish("shape", "circle", "set", "Shape Type", ["circle", "square", "rect", "ellipse"]);
    Shape.prototype.publish("width", 24, "number", "Width");
    Shape.prototype.publish("height", 24, "number", "Height");

    Shape.prototype.radius = function (_) {
        if (!arguments.length) return Math.sqrt(Math.pow(this._width / 2, 2) + Math.pow(this._height / 2, 2));
        this._width = _ * Math.sqrt(2);
        this._height = this._width;
        return this;
    };

    Shape.prototype.testData = function () {
        return this;
    }

    Shape.prototype.intersection = function (pointA, pointB) {
        switch (this._shape) {
            case "circle":
                return this.intersectCircle(pointA, pointB);
        }
        return SVGWidget.prototype.intersection.apply(this, arguments);
    };

    Shape.prototype.update = function (domNode, element) {
        var shape = element.selectAll(".shape").data([this._shape], function (d) { return d; });
        
        shape.enter().append(this._shape === "square" ? "rect" : this._shape)
            .attr("class", "shape")
        ;
        var context = this;
        shape.each(function (d) {
            var elemeent = d3.select(this);
            switch (context._shape) {
                case "circle":
                    var radius = context.radius();
                    elemeent
                        .attr("r", radius)
                    ;
                    break;
                case "square":
                    var width = Math.max(context._width, context._height);
                    elemeent
                        .attr("x", -width / 2)
                        .attr("y", -width / 2)
                        .attr("width", width)
                        .attr("height", width)
                    ;
                    break;
                case "rect":
                    elemeent
                        .attr("x", -context._width / 2)
                        .attr("y", -context._height / 2)
                        .attr("width", context._width)
                        .attr("height", context._height)
                    ;
                    break;
                case "ellipse":
                    elemeent
                        .attr("rx", context._width / 2)
                        .attr("ry", context._height / 2)
                    ;
                    break;
            }
        });
        shape.exit().remove();
    };

    return Shape;
}));
