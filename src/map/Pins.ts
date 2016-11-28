import * as d3 from "d3";
import { Layer } from './Layer';
import * as MapUtility from './Utility';
import * as Utility from '../common/Utility';
import { ITooltip } from '../api/ITooltip';

import "css!./Pins";

export function Pins() {
    Layer.call(this);
    Utility.SimpleSelectionMixin.call(this);
    this._geohash = new MapUtility.Geohash();
}
Pins.prototype = Object.create(Layer.prototype);
Pins.prototype.constructor = Pins;
Pins.prototype._class += " map_Pins";
Pins.prototype.mixin(Utility.SimpleSelectionMixin);
    Pins.prototype.implements(ITooltip.prototype);

Pins.prototype.publish("geohashColumn", null, "set", "Geohash column", function () { return this.columns(); }, { optional: true });
Pins.prototype.publish("tooltipColumn", null, "set", "Tooltip column", function () { return this.columns(); }, { optional: true });
Pins.prototype.publish("opacity", 1.0, "number", "Opacity", null, { tags: ["Advanced"] });
Pins.prototype.publish("fillColor", "#00FFDD", "html-color", "Pin Color", null, { optional: true });
    Pins.prototype.publish("omitNullLatLong", false, "boolean", "Remove lat=0,lng=0 from pinsData", null, { tags: ["Basic"] });

Pins.prototype.publish("strokeWidth", 0.5, "number", "Pin Border Thickness (pixels)", null, { tags: ["Basic"] });
Pins.prototype.publish("strokeColor", null, "html-color", "Pin Border Color", null, { optional: true });

Pins.prototype.publish("fontSize", 18, "number", "Font Size", null, { tags: ["Basic", "Shared"] });
Pins.prototype.publish("fontFamily", "Verdana", "string", "Font Name", null, { tags: ["Basic", "Shared", "Shared"] });
Pins.prototype.publish("fontColor", "#000000", "html-color", "Font Color", null, { tags: ["Basic", "Shared"] });

Pins.prototype.publish("pinType", "pin", "set", "Pin Type", ["pin", "circle", "rectangle", "rectangle-pin"], { tags: ["Basic"] });
Pins.prototype.publish("arrowWidth", 8, "number", "Pin arrow width (pixels)", null, { tags: ["Basic"], disable: function (w) { return ["pin", "rectangle-pin"].indexOf(w.pinType()) === -1; } });
Pins.prototype.publish("arrowHeight", 12, "number", "Pin arrow height (pixels)", null, { tags: ["Basic"], disable: function (w) { return ["pin", "rectangle-pin"].indexOf(w.pinType()) === -1; } });

Pins.prototype.publish("pinWidth", 20, "number", "Width of pin (pixels)", null, { tags: ["Basic"], disable: function (w) { return ["rectangle", "rectangle-pin"].indexOf(w.pinType()) === -1; } });
Pins.prototype.publish("pinHeight", 20, "number", "Height of pin (pixels) (not including arrow)", null, { tags: ["Basic"], disable: function (w) { return ["rectangle", "rectangle-pin"].indexOf(w.pinType()) === -1; } });
Pins.prototype.publish("cornerRadius", 10, "number", "Radius of rectangular pin corners (pixels)", null, { tags: ["Basic"], disable: function (w) { return ["rectangle", "rectangle-pin"].indexOf(w.pinType()) === -1; } });

Pins.prototype.publish("pinRadius", 12, "number", "Radius of circle (pixels)", null, { tags: ["Basic"], disable: function (w) { return w.pinType() !== "circle"; } });

Pins.prototype.publish("textBaseline", "central", "set", "Pin text vertical alignment", ["auto", "use-script", "no-change", "reset-size", "ideographic", "alphabetic", "hanging", "mathematical", "central", "middle", "text-after-edge", "text-before-edge", "inherit"], { tags: ["Basic"] });

Pins.prototype.pinsData = function () {
    var geohashField = this._db.fieldByLabel(this.geohashColumn());
    var tooltipField = this._db.fieldByLabel(this.tooltipColumn());
        var context = this;
        return this.data().filter(function(row){
            if(context.omitNullLatLong() && row[0] === 0 && row[1] === 0){
                return false;
            }
            return true;
        }).map(function (row) {
        var retVal = {
            lat: row[0],
            long: row[1],
            ext: row[2] instanceof Object ? row[2] : {},
            origRow: row
        };
        if (geohashField) {
            try {
                var pos = this._geohash.bounds(row[geohashField.idx]);
                retVal.lat = (pos.ne.lat + pos.sw.lat) / 2;
                retVal.long = (pos.ne.lon + pos.sw.lon) / 2;
            } catch (e) {
            }
        }
        if (tooltipField) {
            retVal.ext.tooltip = row[tooltipField.idx];
        }
        return retVal;
    }, this);
};

Pins.prototype.layerEnter = function (base, svgElement, domElement) {
    Layer.prototype.layerEnter.apply(this, arguments);

    this._pinsTransform = svgElement;
    this._selection.widgetElement(this._pinsTransform);
    this.pinsPaths = d3.select(null);
    this.tooltipHTML(function (d) {
        return d.ext.tooltip === undefined ? "" : d.ext.tooltip;
    });
};

Pins.prototype.layerUpdate = function (base) {
    Layer.prototype.layerUpdate.apply(this, arguments);

    this._pinsTransform
        .style("opacity", this.opacity())
        ;

    this.pinsPaths = this._pinsTransform.selectAll(".pin").data(this.visible() ? this.pinsData() : []);
    var context = this;
    var gPinEnter = this.pinsPaths.enter().append("g")
        .attr("class", "pin")
        .call(this._selection.enter.bind(this._selection))
        .on("click", function (d) {
            context.click(context.rowToObj(d.origRow), "geohash", context._selection.selected(this));
        })
        .on("dblclick", function (d) {
            context.dblclick(context.rowToObj(d[2].origRow), "geohash", context._selection.selected(this));
        })
        .on('mouseover', function (d) {
            if (!context.isIE) {
                this.parentNode.appendChild(this);
            }
        })
            .on("mouseout.tooltip", function(d){
                if(d.ext && d.ext.tooltip){
                    context.tooltip.hide.apply(this,arguments);
                }
            })
            .on("mousemove.tooltip", function(d){
                if(d.ext && d.ext.tooltip){
                    context.tooltip.show.apply(this,arguments);
                }
            })
        ;
    gPinEnter
        .append("path")
        .attr("class", "data")
        .append("title")
        ;
    gPinEnter
        .append("text")
        .attr("text-anchor", "middle")
        ;
    this.pinsPaths.selectAll("text")
        .style("stroke", this.fontColor())
        .style("fill", this.fontColor())
        .style("font-size", this.fontSize())
        .style("font-family", this.fontFamily())
        .style("dominant-baseline", this.textBaseline())
        .attr("dx", 0)
        .attr("dy", this.pinTextDY())
        .text(function (d) {
            return d.ext && d.ext.text ? d.ext.text : "";
        });
    var svgPath = this.svgPinPath();
    this.pinsPaths.selectAll("path.data")
        .attr("d", svgPath)
        .attr("stroke-width", this.strokeWidth() + "px")
        .style("display", function (d) {
            var pos = base.project(d.lat, d.long);
            if (!pos) {
                return "none";
            }
            return null;
        })
        .style("stroke", function (d) {
            return d.ext && d.ext.strokeColor ? d.ext.strokeColor : context.strokeColor();
        })
        .style("fill", function (d) {
            return d.ext && d.ext.fillColor ? d.ext.fillColor : context.fillColor();
        })
        ;
    this.pinsPaths.exit().remove();
};

Pins.prototype.layerZoomed = function (base) {
    Layer.prototype.layerZoomed.apply(this, arguments);
    this.pinsPaths
        .attr("transform", function (d) {
            var pos = base.project(d.lat, d.long);
            if (!pos) {
                pos = [0, 0];
            }
            return "translate(" + pos[0] + ", " + pos[1] + ")scale(" + 1 + ")";
        })
        ;
};

Pins.prototype.pinTextDY = function () {
    switch (this.pinType()) {
        case "pin":
        case "rectangle-pin":
            return -this.arrowHeight();
        case "circle":
        case "rectangle":
            return 0;
    }
};
Pins.prototype.svgPinPath = function () {
    switch (this.pinType()) {
        case "pin":
            return this.circlePinPath();
        case "circle":
            return this.circlePath();
        case "rectangle":
            return this.rectanglePath();
        case "rectangle-pin":
            return this.rectanglePinPath();
    }
};

Pins.prototype.rectanglePinPath = function () {
    var width = this.pinWidth();
    var height = this.pinHeight();
    var radius = this.cornerRadius();
    var arrow_h = this.arrowHeight();
    var arrow_w = this.arrowWidth();
    var x = 0 - width / 2;
    var y = 0 - height + radius;
    var arrow_b = (width - radius * 2 - arrow_w) / 2;
    return "M" + x + "," + y +
        "a" + -radius + "," + -radius + " 0 0 1 " + radius + "," + -radius +
        "h" + (width + -radius * 2) +
        "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius +
        "v" + (height + -radius * 2) +
        "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius +
        "h" + -arrow_b +
        "l" + -arrow_w / 2 + "," + arrow_h +
        "l" + -arrow_w / 2 + "," + -arrow_h +
        "h" + -arrow_b +
        "a" + -radius + "," + -radius + " 0 0 1 " + -radius + "," + -radius +
        "z";
};
Pins.prototype.rectanglePath = function () {
    var width = this.pinWidth();
    var height = this.pinHeight();
    var radius = this.cornerRadius();
    var x = -width / 2;
    var y = -height / 2;
    y += radius;
    return "M" + x + "," + y +
        "a" + -radius + "," + -radius + " 0 0 1 " + radius + "," + -radius +
        "h" + (width + -radius * 2) +
        "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius +
        "v" + (height + -radius * 2) +
        "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius +
        "h" + (-width + radius * 2) +
        "a" + -radius + "," + -radius + " 0 0 1 " + -radius + "," + -radius +
        "z";
};
Pins.prototype.circlePinPath = function () {
    var arrow_h = this.arrowHeight();
    var arrow_w = this.arrowWidth();
    var x = 0 - arrow_w / 2;
    var y = 0 - arrow_h;
    var bezier_x = arrow_w / 2;
    var bezier_y = arrow_h;
    var c_dx1 = -bezier_x;
    var c_dy1 = -bezier_y;
    var c_dx2 = arrow_w + bezier_x;
    var c_dy2 = c_dy1;
    var c_dx = arrow_w;
    var c_dy = 0;
    return "M" + x + "," + y +
        "c" + c_dx1 + " " + c_dy1 + ", " + c_dx2 + " " + c_dy2 + ", " + c_dx + " " + c_dy +
        "l" + -arrow_w / 2 + "," + arrow_h +
        "l" + -arrow_w / 2 + "," + -arrow_h +
        "z";
};
Pins.prototype.circlePath = function () {
    var radius = this.pinRadius();
    var x = radius / 2;
    var y = 0;
    var a_dx = radius / 2;
    var a_dy = radius / 2;
    return "M" + x + "," + y +
        "a " + a_dx + " " + a_dy + " 0 1 0 0 0.01 0" +
        "z";
};

//  Events  ---
Pins.prototype.click = function (row, column, selected) {
    console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
};

Pins.prototype.dblclick = function (row, column, selected) {
    console.log("Double click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
};
