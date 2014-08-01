(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Widget", "d3/d3"], factory);
    } else {
        root.D3Widget = factory(root.Widget, root.d3);
    }
}(this, function (Widget, d3) {
    function D3Widget() {
        Widget.call(this);

        this._target = null;
        this._parentElement = null;
        this._parentWidget = null;

        this._class = "";
        this._pos = { x: 0, y: 0 };
        this._size = { width: 0, height: 0 };
        this._boundingBox = null;
        this._data = [];
        this._element = d3.select();

        this._renderCount = 0;
    };
    D3Widget.prototype = Object.create(Widget.prototype);

    //  Properties  ---
    D3Widget.prototype.class = function (_) {
        if (!arguments.length) return this._class;
        this._class = _;
        return this;
    };

    D3Widget.prototype.target = function (_) {
        if (!arguments.length) return this._target;
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
        } else {
            //  Target is a DOM Node, so create a SVG Element  ---
            var style = window.getComputedStyle(this._target, null);
            if (!this._size.width && !this._size.height) {
                this.size({
                    //  TODO - What happens if size is "AUTO"?
                    width: parseInt(style.getPropertyValue("width")),
                    height: parseInt(style.getPropertyValue("height"))
                });
            }
            this._parentElement = d3.select(this._target).append("svg")
                .attr("width", this._size.width)
                .attr("height", this._size.height)
            ;
        }
        return this;
    };

    D3Widget.prototype.pos = function (_, transition) {
        if (!arguments.length) return this._pos;
        this._pos = _;
        (transition ? this._element.transition() : this._element)
            .attr("transform", "translate(" + _.x + " " + _.y + ")")
        ;
        return this;
    };

    D3Widget.prototype.size = function (_) {
        if (!arguments.length) return this._size;
        this._size = _;
        return this;
    };

    D3Widget.prototype.width = function (_) {
        if (!arguments.length) return this._size.width;
        this.size({ width: _, height: this._size.height })
        return this;
    };

    D3Widget.prototype.height = function (_) {
        if (!arguments.length) return this._size.height;
        this.size({ width: this._size.width, height: _ })
        return this;
    };

    D3Widget.prototype.data = function (_) {
        if (!arguments.length) return this._data;
        this._data = _;
        return this;
    };

    //  Render  ---
    D3Widget.prototype.render = function () {
        if (!this._parentElement)
            return this;

        var elements = this._parentElement.selectAll("#" + this._id).data([this], function (d) { return d._id; });
        elements.enter().append("g")
            .classed(this._class, true)
            .attr("id", this._id)
            .each(function (context) {
                context._element = d3.select(this);
                if (context._pos.x || context._pos.y) {
                    context._element.attr("transform", function (d) { return "translate(" + context._pos.x + " " + context._pos.y + ")"; });
                }
                context.enter(this, context._element, context);
            })
        ;
        elements
            .each(function (context) {
                context.update(this, context._element, context);
            })
        ;
        elements.exit()
            .each(function exit(context) {
                context.exit(this, context._element, context);
            })
            .remove()
        ;
        this._renderCount++;

        return this;
    };

    D3Widget.prototype.refresh = function () {
        this._element
            .each(function (context) {
                context.update(this, context._element, context);
            })
        ;
        //  Refresh BBox Size ---
        this.getBBox(true);
        return this;
    };

    D3Widget.prototype.enter = function (domeNode, element, d) { };
    D3Widget.prototype.update = function (domeNode, element, d) { };
    D3Widget.prototype.exit = function (domeNode, element, d) { };

    //  Methods  --- 
    D3Widget.prototype.locateParentWidget = function (domNode) {
        if (!domNode || !(domNode instanceof SVGElement)) {
            return null;
        }
        var element = d3.select(domNode);
        if (element) {
            var widget = element.datum();
            if (widget) {
                return widget;
            }
        }
        return this.locateParentWidget(domNode.parentNode);
    }

    D3Widget.prototype.getAbsolutePos = function () {
        var retVal = { x: 0, y: 0 }
        if (this._parentWidget) {
            retVal = this._parentWidget.getAbsolutePos();
            retVal.x += this._pos.x;
            retVal.y += this._pos.y;
            return retVal;
        }
        return retVal;
    },

    D3Widget.prototype.getBBox = function (refresh) {
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
        return this._boundingBox;
    };

    D3Widget.prototype.element = function () {
        return this._element;
    };

    //  Intersections  ---
    D3Widget.prototype.intersection = function (pointA, pointB) {
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

    D3Widget.prototype.intersectRect = function (pointA, pointB) {
        var center = this.getAbsolutePos();
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

    D3Widget.prototype.intersectCircle = function (pointA, pointB) {
        var center = this.getAbsolutePos();
        var radius = this.radius();
        var intersection = intersectCircleLine(center, radius, pointA, pointB);
        if (intersection.points.length) {
            return { x: intersection.points[0].x, y: intersection.points[0].y };
        }
        return null;
    };

    D3Widget.prototype.distance = function (pointA, pointB) {
        return Math.sqrt((pointA.x - pointB.x) * (pointA.x - pointB.x) + (pointA.y - pointB.y) * (pointA.y - pointB.y));
    };

    //  IE Fixers  ---    
    D3Widget.prototype._pushMarkers = function (element, d) {
        if (this.isIE) {
            element = element || this._parentElement;
            element.selectAll("path[marker-start],path[marker-end]")
                .attr("fixme-start", function (d) { return this.getAttribute("marker-start"); })
                .attr("fixme-end", function (d) { return this.getAttribute("marker-end"); })
                .attr("marker-start", null)
                .attr("marker-end", null)
            ;
        }
    };

    D3Widget.prototype._popMarkers = function (element, d) {
        if (this.isIE) {
            element = element || this._parentElement;
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

    D3Widget.prototype._popMarkersDebounced = Widget.prototype.debounce(function (element, d) {
        if (this.isIE) {
            this._popMarkers(element, d);
        }
    }, 250);

    D3Widget.prototype._fixIEMarkers = function (element, d) {
        if (this.isIE) {
            this._pushMarkers(element, d);
            this._popMarkersDebounced(element, d);
        }
    };

    return D3Widget;
}));
