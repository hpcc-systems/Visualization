(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/D3Widget", "../common/TextBox"], factory);
    } else {
        root.Entity = factory(root.d3, root.D3Widget, root.TextBox);
    }
}(this, function (d3, D3Widget, TextBox) {
    function Edge() {
        D3Widget.call(this);

        this._class = "edge";
        this._points = [];
        this._hidden = false;

        this._textBox = new TextBox()
            .padding({left: 0,top: 0,right: 0,bottom: 0})
        ;
    };
    Edge.prototype = Object.create(D3Widget.prototype);

    Edge.prototype.sourceVertex = function (_) {
        if (!arguments.length) return this._sourceVertex;
        this._sourceVertex = _;
        return this;
    };

    Edge.prototype.targetVertex = function (_) {
        if (!arguments.length) return this._targetVertex;
        this._targetVertex = _;
        return this;
    };

    Edge.prototype.sourceMarker = function (_) {
        if (!arguments.length) return this._sourceMarker;
        this._sourceMarker = _;
        return this;
    };

    Edge.prototype.targetMarker = function (_) {
        if (!arguments.length) return this._targetMarker;
        this._targetMarker = _;
        return this;
    };

    Edge.prototype.points = function (_, animate) {
        if (!arguments.length) return this._points;
        this._points = _;
        this.update(null, this._element, animate);
        return this;
    };

    Edge.prototype.hidden = function (_) {
        if (!arguments.length) return this._hidden;
        this._hidden = _;
        return this;
    };

    Edge.prototype.text = function (_) {
        if (!arguments.length) return this._textBox.text();
        this._textBox.text(_);
        return this;
    };

    Edge.prototype.enter = function (domNode, element) {
        this._elementPath = element.append("path");

        if (this._sourceMarker) {
            this._elementPath.attr("marker-start", "url(#" + this._sourceMarker + ")");
        }
        if (this._targetMarker) {
            this._elementPath.attr("marker-end", "url(#" + this._targetMarker + ")");
        }
        if (this._textBox.text()) {
            this._textBox
                .target(domNode)
                .render();
            ;
        }
    };

    Edge.prototype.update = function (domNode, element, transition) {
        var context = this;
        var pathElements = this._elementPath;

        element.transition()
            .each("start", function (d) {
                context._pushMarkers(element, d);
            })
            .each("end", function (d) {
                context._popMarkers(element, d);
            })
        ;
        var points = context._calculateEdgePoints(this._sourceVertex, this._targetVertex, this._points);
        var line = "";
        if (this._points.length || transition || true) {
            line = d3.svg.line()
                .x(function (d) { return d.x; })
                .y(function (d) { return d.y; })
                .interpolate("bundle")
                .tension(0.75)
                (points)
            ;
        } else {
            //  Faster but does not transition as well  ---
            var dx = points[2].x - points[0].x,
                        dy = points[2].y - points[0].y,
                        dr = Math.sqrt(dx * dx + dy * dy) * 2;
            line = "M" +
                        points[0].x + "," +
                        points[0].y + "A" +
                        dr + "," + dr + " 0 0,1 " +
                        points[2].x + "," +
                        points[2].y;
        }
        if (transition) {
            pathElements = pathElements.transition();
        }
        pathElements
            .attr("opacity", this._hidden ? 0 : 1)
            .attr("d", line)
        ;

        if (this._textBox.text()) {
            this._textBox
                .pos(this._findMidPoint(points), transition)
            ;
        }
    };

    Edge.prototype._findMidPoint = function (points) {
        var midIdx = points.length / 2;
        if (points.length % 2) {
            return points[Math.floor(midIdx)];
        } else if (points.length){
            var p0 = points[midIdx - 1];
            var p1 = points[midIdx];
            return { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };
        }
        return { x: 0, y: 0 };
    };

    Edge.prototype._calculateEdgePoints = function (source, target, _points) {
        var points = _points ? _points.slice() : [];
        var p0 = points.length === 0 ? target.pos() : points[0];
        var p1 = points.length === 0 ? source.pos() : points[points.length - 1];

        points.unshift(source.intersection(source._pos, p0));
        points.push(target.intersection(target._pos, p1));
        if (!points[0]) {
            points[0] = source._pos;
        }
        if (!points[points.length - 1]) {
            points[points.length - 1] = target._pos;
        }

        if (points.length === 2 && points[0] && points[1]) {
            var dx = points[0].x - points[1].x;
            var dy = points[0].y - points[1].y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist) {
                dx /= dist;
                dy /= dist;
                var midX = (points[0].x + points[1].x) / 2 - dist * dy / 8;
                var midY = (points[0].y + points[1].y) / 2 + dist * dx / 8;
                points = [{ x: points[0].x, y: points[0].y }, { x: midX, y: midY }, { x: points[1].x, y: points[1].y }];
            }
        }

        return points;
    };

    return Edge;
}));
