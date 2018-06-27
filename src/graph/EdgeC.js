"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/CanvasWidget"], factory);
    } else {
        root.graph_EdgeC = factory(root.d3, root.common_CanvasWidget);
    }
}(this, function (d3, CanvasWidget) {
    function EdgeC() {
        CanvasWidget.call(this);

        this._text = "";
        this._points = [];
        this._weight = 100;
        this._strokeDasharray = null;
        this._hidden = false;
    }
    EdgeC.prototype = Object.create(CanvasWidget.prototype);
    EdgeC.prototype.constructor = EdgeC;
    EdgeC.prototype._class += " graph_EdgeC";

    EdgeC.prototype.publish("arcDepth", 16, "number", "Arc Depth", null, { tags: ["Basic"] });
    EdgeC.prototype.publish("showArc", true, "boolean", "Show/Hide Arc", null, { tags: ["Basic"] });
    EdgeC.prototype.publish("tooltip", "", "string", "Tooltip", null, { tags: ["Private"] });

    EdgeC.prototype.publish("sourceMarker", "circle", "set", "Source Marker", ["circle"], { optional: true });
    EdgeC.prototype.publish("targetMarker", "arrow", "set", "Source Marker", ["arrow", "circle"], { optional: true });
    EdgeC.prototype.publish("strokeDasharray", null, "string", "Stroke Dash Array", null, { optional: true });
    EdgeC.prototype.publish("strokeColor", "#777", "html-color", "Stroke Color", null, { optional: true });

    EdgeC.prototype.sourceVertex = function (_) {
        if (!arguments.length) return this._sourceVertex;
        this._sourceVertex = _;
        return this;
    };

    EdgeC.prototype.targetVertex = function (_) {
        if (!arguments.length) return this._targetVertex;
        this._targetVertex = _;
        return this;
    };

    EdgeC.prototype.weight = function (_) {
        if (!arguments.length) return this._weight;
        this._weight = _;
        return this;
    };

    EdgeC.prototype.points = function (_, transitionDuration, skipPushMarkers) {
        if (!arguments.length) return this._points;
        this._points = _;
        return this;
    };

    EdgeC.prototype.hidden = function (_) {
        if (!arguments.length) return this._hidden;
        this._hidden = _;
        return this;
    };

    EdgeC.prototype.text = function (_) {
        if (!arguments.length) return this._text;
        this._text = _;
        return this;
    };

    EdgeC.prototype.drawSelf = function (ctx, canvas) {
        var n = this;
        ctx.beginPath();
        ctx.strokeStyle = this.strokeColor();
        ctx.moveTo(n._sourceVertex.x(), n._sourceVertex.y());
        ctx.lineTo(n._targetVertex.x(), n._targetVertex.y());
        // this.points().forEach(function (_point, _i) {
        //     ctx[_i === 0 ? "moveTo" : "lineTo"](_point.x, _point.y);
        // })
        ctx.stroke();
        ctx.closePath();
        if (this.text()) {
            var mid_x = (n._sourceVertex.x() + n._targetVertex.x()) / 2;
            var mid_y = (n._sourceVertex.y() + n._targetVertex.y()) / 2;
            ctx.fillStyle = '#ffffff';
            var text_h = 12;
            ctx.textBaseline = "top";
            ctx.font = text_h + "px Arial";
            var padding = text_h / 4;
            var text_w = ctx.measureText(this.text()).width;
            ctx.fillRect(mid_x - (text_w / 2), mid_y - (text_h / 2), text_w + (padding * 2), text_h + (padding * 2));
            ctx.fillStyle = '#000000';
            ctx.fillText(this.text(), mid_x - (text_w / 2) + padding, mid_y - (text_h / 2));
        }
    };

    return EdgeC;
}));
