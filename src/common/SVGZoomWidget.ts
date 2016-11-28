import * as d3 from "d3";
import { SVGWidget } from "./SVGWidget";
import { Icon } from "./Icon";
import "css!./SVGZoomWidget";

export function SVGZoomWidget(target) {
    SVGWidget.call(this);
}
SVGZoomWidget.prototype = Object.create(SVGWidget.prototype);
SVGZoomWidget.prototype.constructor = SVGZoomWidget;
SVGZoomWidget.prototype._class += " common_SVGZoomWidget";

SVGZoomWidget.prototype.publish("zoomToolbar", true, "boolean", "Show Zoom Toolbar");
SVGZoomWidget.prototype.publish("zoomDuration", 250, "number", "Transition Duration");

SVGZoomWidget.prototype.zoomTo = function (translate, scale, transitionDuration) {
    translate = translate || this._zoom.translate();
    scale = scale || this._zoom.scale();
    transitionDuration = transitionDuration === undefined ? this.zoomDuration() : 0;

    this._zoomElement.transition().duration(transitionDuration)
        .call(this._zoom.translate(translate).scale(scale).event)
        ;
};

SVGZoomWidget.prototype.zoomToFit = function (transitionDuration) {
    var bbox = this._renderElement.node().getBBox();
    if (bbox.width && bbox.height) {
        var x = bbox.x + bbox.width / 2;
        var y = bbox.y + bbox.height / 2;
        var dx = bbox.width;
        var dy = bbox.height;
        var width = this.width();
        var height = this.height();

        var scale = 1 / Math.max(dx / width, dy / height);
        var translate = [width / 2 - scale * x, height / 2 - scale * y];
        this.zoomTo(translate, scale, transitionDuration);
    }
};

SVGZoomWidget.prototype.enter = function (domNode, element) {
    SVGWidget.prototype.enter.apply(this, arguments);

    this._zoomElement = element.append("g");
    this._zoomGrab = this._zoomElement.append("rect")
        .attr("class", "background")
        ;
    this._zoomG = this._zoomElement.append("g");
    this._renderElement = this._zoomG.append("g");

    var context = this;
    this._zoom = d3.behavior.zoom()
        .scaleExtent([0.05, 20])
        .on("zoom", function () {
            context._zoomG.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        })
        ;
    this._zoomElement.call(this._zoom);
};

SVGZoomWidget.prototype.update = function (domNode, element) {
    SVGWidget.prototype.update.apply(this, arguments);

    this._zoomGrab
        .attr("width", this.width())
        .attr("height", this.height())
        ;

    var context = this;
    var toolbar = element.selectAll(".toolbar").data(this.zoomToolbar() ? ["dummy"] : []);
    var iconDiameter = 24;
    var faCharHeight = 14;
    toolbar.enter().append("g")
        .attr("class", "toolbar")
        .each(function (d) {
            context._buttonToFit = new Icon()
                .target(this)
                .faChar("\uf0b2")
                .shape("square")
                .diameter(iconDiameter)
                .paddingPercent((1 - faCharHeight / iconDiameter) * 100)
                .on("click", function () {
                    context.zoomToFit();
                })
                ;
            context._buttonPlus = new Icon()
                .target(this)
                .faChar("\uf067")
                .shape("square")
                .diameter(iconDiameter)
                .paddingPercent((1 - faCharHeight / iconDiameter) * 100)
                .on("click", function () {
                    context.zoomTo(null, context._zoom.scale() * 1.20);
                })
                ;
            context._buttonMinus = new Icon()
                .target(this)
                .faChar("\uf068")
                .shape("square")
                .diameter(iconDiameter)
                .paddingPercent((1 - faCharHeight / iconDiameter) * 100)
                .on("click", function () {
                    context.zoomTo(null, context._zoom.scale() / 1.20);
                })
                ;
            context._buttonLast = context._buttonMinus;
        })
        ;
    if (this.zoomToolbar()) {
        this._buttonToFit
            .x(this.width() - iconDiameter / 2 - 4)
            .y(iconDiameter / 2 + 4)
            .render()
            ;
        this._buttonPlus
            .x(this.width() - iconDiameter / 2 - 4)
            .y(this._buttonToFit.y() + 4 + iconDiameter)
            .render()
            ;
        this._buttonMinus
            .x(this.width() - iconDiameter / 2 - 4)
            .y(this._buttonPlus.y() + iconDiameter)
            .render()
            ;
    }
    toolbar.exit()
        .each(function () {
            context._buttonToFit
                .target(null)
                .render()
                ;
            delete context._buttonToFit;
        })
        .remove()
        ;
};
SVGZoomWidget.prototype.exit = function (domNode, element) {
    SVGWidget.prototype.exit.apply(this, arguments);
};
