(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Widget", "./Transition", "d3/d3"], factory);
    } else {
        root.SVGWidget = factory(root.Widget, root.Transition, root.d3);
    }
}(this, function (Widget, Transition, d3) {
    function SVGWidget() {
        Widget.call(this);

        this._tag = "g";

        this._boundingBox = null;

        this.transition = new Transition(this);

        this._renderCount = 0;
    };
    SVGWidget.prototype = Object.create(Widget.prototype);

    //  Properties  ---
    SVGWidget.prototype.move = function (_, transitionDuration) {
        var retVal = this.pos.apply(this, arguments);
        if (arguments.length) {
            (transitionDuration ? this._element.transition().duration(transitionDuration) : this._element)
                .attr("transform", "translate(" + _.x + " " + _.y + ")")
            ;
        }
        return retVal;
    };

    SVGWidget.prototype.size = function (_) {
        var retVal = Widget.prototype.size.apply(this, arguments);
        if (arguments.length) {
            this._boundingBox = null;
        }
        return retVal;
    };

    SVGWidget.prototype._resize = function (size) {
        var width, height;
        if (size && size.width && size.height) {
            width = size.width;
            height = size.height;
        } else {
            var style = window.getComputedStyle(this._target, null);
            width = parseInt(style.getPropertyValue("width"));
            height = parseInt(style.getPropertyValue("height"));
        }
        this.size({
            width: width,
            height: height
        });
        this._parentRelativeDiv
            .style({
                width: this._size.width + "px",
                height: this._size.height + "px"
            })
        ;
        this._parentElement
            .attr("width", this._size.width)
            .attr("height", this._size.height)
        ;
    };

    SVGWidget.prototype.target = function (_) {
        if (!arguments.length) return this._target;
        if (this._target && _ && (this._target.__data__.id !== _.__data__.id)) {
            throw "Target can only be assigned once."
        }
        this._target = _;

        //  Target is a DOM Node ID ---
        if (typeof (this._target) === 'string' || this._target instanceof String) {
            this._target = document.getElementById(this._target);
        }

        if (this._target instanceof SVGElement) {
            this._parentElement = d3.select(this._target);
            this._parentWidget = this._parentElement.datum();
            if (!this._parentWidget || this._parentWidget._id === this._id) {
                this._parentWidget = this.locateParentWidget(this._target.parentNode);
            }
        } else if (this._target) {
            //  Target is a DOM Node, so create a SVG Element  ---
            this._parentRelativeDiv = d3.select(this._target).append("div")
                .style({
                    position: "relative",
                })
            ;
            this._parentElement = this._parentRelativeDiv.append("svg")
                .style({
                    position: "absolute",
                    top: 0,
                    left: 0
                })
            ;
            this._parentOverlay = this._parentRelativeDiv.append("div")
                .style({
                    position: "absolute",
                    top: 0,
                    left: 0
                })
            ;
            this._resize(this._size);
            this.pos({
                x: this._size.width / 2,
                y: this._size.height / 2
            });
        } else {
            if (this._parentRelativeDiv) {
                this._parentOverlay.remove();
                this._parentElement.remove();
                this._parentRelativeDiv.remove();
            }
        }
        return this;
    };

    SVGWidget.prototype.enter = function (domeNode, element, d) {
        Widget.prototype.enter.apply(this, arguments);
    };

    SVGWidget.prototype.update = function (domeNode, element, d) {
        Widget.prototype.update.apply(this, arguments);
        element.attr("transform", "translate(" + this._pos.x + " " + this._pos.y + ")");
    };

    SVGWidget.prototype.exit = function (domeNode, element, d) {
        if (this._parentRelativeDiv) {
            this._parentOverlay.remove();
            this._parentElement.remove();
            this._parentRelativeDiv.remove();
        }
        Widget.prototype.exit.apply(this, arguments);
    };

    SVGWidget.prototype.getOffsetPos = function () {
        var retVal = { x: 0, y: 0 };
        if (this._parentWidget) {
            retVal = this._parentWidget.getOffsetPos();
            retVal.x += this._pos.x;
            retVal.y += this._pos.y;
            return retVal;
        }
        return retVal;
    },

    SVGWidget.prototype.getBBox = function (refresh, round) {
        if (refresh || this._boundingBox === null) {
            var svgNode = this._element.node();
            if (svgNode instanceof SVGElement) {
                this._boundingBox = svgNode.getBBox();
            }
        }
        if (this._boundingBox === null) {
            return {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            }
        }
        return {
            x: round ? Math.round(this._boundingBox.x) : this._boundingBox.x,
            y: round ? Math.round(this._boundingBox.y) : this._boundingBox.y,
            width: round ? Math.round(this._boundingBox.width) : this._boundingBox.width,
            height: round ? Math.round(this._boundingBox.height) : this._boundingBox.height
        }
    };

    //  Intersections  ---
    SVGWidget.prototype.intersection = function (pointA, pointB) {
        return this.intersectRect(pointA, pointB);
    };

    lerp = function (point, that, t) {
        //  From https://github.com/thelonious/js-intersections
        return {
            x: point.x + (that.x - point.x) * t,
            y: point.y + (that.y - point.y) * t
        };
    };

    intersectLineLine = function (a1, a2, b1, b2) {
        //  From https://github.com/thelonious/js-intersections
        var result = { type: "", points: [] };
        var ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
        var ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
        var u_b = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);

        if (u_b != 0) {
            var ua = ua_t / u_b;
            var ub = ub_t / u_b;

            if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
                result.type = "Intersection";
                result.points.push({
                    x: a1.x + ua * (a2.x - a1.x),
                    y: a1.y + ua * (a2.y - a1.y)
                });
            } else {
                result.type = "No Intersection";
            }
        } else {
            if (ua_t == 0 || ub_t == 0) {
                result.type = "Coincident";
            } else {
                result.type = "Parallel";
            }
        }

        return result;
    };

    SVGWidget.prototype.intersectRect = function (pointA, pointB) {
        var center = this.getOffsetPos();
        var size = this.getBBox();
        if (pointA.x === pointB.x && pointA.y === pointB.y) {
            return pointA;
        }
        var TL = { x: center.x - size.width / 2, y: center.y - size.height / 2 };
        var TR = { x: center.x + size.width / 2, y: center.y - size.height / 2 };
        var BR = { x: center.x + size.width / 2, y: center.y + size.height / 2 };
        var BL = { x: center.x - size.width / 2, y: center.y + size.height / 2 };
        var intersection = intersectLineLine(TL, TR, pointA, pointB);
        if (intersection.points.length) {
            return { x: intersection.points[0].x, y: intersection.points[0].y };
        }
        intersection = intersectLineLine(TR, BR, pointA, pointB);
        if (intersection.points.length) {
            return { x: intersection.points[0].x, y: intersection.points[0].y };
        }
        intersection = intersectLineLine(BR, BL, pointA, pointB);
        if (intersection.points.length) {
            return { x: intersection.points[0].x, y: intersection.points[0].y };
        }
        intersection = intersectLineLine(BL, TL, pointA, pointB);
        if (intersection.points.length) {
            return { x: intersection.points[0].x, y: intersection.points[0].y };
        }
        return null;
    };

    var intersectCircleLine = function (c, r, a1, a2) {
        //  From https://github.com/thelonious/js-intersections
        var result = { type: "", points: [] };
        var a = (a2.x - a1.x) * (a2.x - a1.x) +
                 (a2.y - a1.y) * (a2.y - a1.y);
        var b = 2 * ((a2.x - a1.x) * (a1.x - c.x) +
                       (a2.y - a1.y) * (a1.y - c.y));
        var cc = c.x * c.x + c.y * c.y + a1.x * a1.x + a1.y * a1.y -
                 2 * (c.x * a1.x + c.y * a1.y) - r * r;
        var deter = b * b - 4 * a * cc;

        if (deter < 0) {
            result.type = "Outside";
        } else if (deter == 0) {
            result.type = "Tangent";
            // NOTE: should calculate this point
        } else {
            var e = Math.sqrt(deter);
            var u1 = (-b + e) / (2 * a);
            var u2 = (-b - e) / (2 * a);

            if ((u1 < 0 || u1 > 1) && (u2 < 0 || u2 > 1)) {
                if ((u1 < 0 && u2 < 0) || (u1 > 1 && u2 > 1)) {
                    result.type = "Outside";
                } else {
                    result.type = "Inside";
                }
            } else {
                result.type = "Intersection";

                if (0 <= u1 && u1 <= 1)
                    result.points.push(this.lerp(a1, a2, u1));

                if (0 <= u2 && u2 <= 1)
                    result.points.push(this.lerp(a1, a2, u2));
            }
        }

        return result;
    };

    SVGWidget.prototype.intersectCircle = function (pointA, pointB) {
        var center = this.getOffsetPos();
        var radius = this.radius();
        var intersection = intersectCircleLine(center, radius, pointA, pointB);
        if (intersection.points.length) {
            return { x: intersection.points[0].x, y: intersection.points[0].y };
        }
        return null;
    };

    SVGWidget.prototype.distance = function (pointA, pointB) {
        return Math.sqrt((pointA.x - pointB.x) * (pointA.x - pointB.x) + (pointA.y - pointB.y) * (pointA.y - pointB.y));
    };

    //  IE Fixers  ---    
    SVGWidget.prototype._pushMarkers = function (element, d) {
        if (this.isIE) {
            element = element || this._element;
            element.selectAll("path[marker-start],path[marker-end]")
                .attr("fixme-start", function (d) { return this.getAttribute("marker-start"); })
                .attr("fixme-end", function (d) { return this.getAttribute("marker-end"); })
                .attr("marker-start", null)
                .attr("marker-end", null)
            ;
        }
    };

    SVGWidget.prototype._popMarkers = function (element, d) {
        if (this.isIE) {
            element = element || this._element;
            element.selectAll("path[fixme-start],path[fixme-end]")
                .attr("marker-start", function (d) {
                    var x = this.getAttribute("fixme-start");
                    return this.getAttribute("fixme-start");
                })
                .attr("marker-end", function (d) { return this.getAttribute("fixme-end"); })
                .attr("fixme-start", null)
                .attr("fixme-end", null)
            ;
        }
    }

    SVGWidget.prototype._popMarkersDebounced = Widget.prototype.debounce(function (element, d) {
        if (this.isIE) {
            this._popMarkers(element, d);
        }
    }, 250);

    SVGWidget.prototype._fixIEMarkers = function (element, d) {
        if (this.isIE) {
            this._pushMarkers(element, d);
            this._popMarkersDebounced(element, d);
        }
    };

    return SVGWidget;
}));
