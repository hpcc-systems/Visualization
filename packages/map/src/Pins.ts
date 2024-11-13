import { Platform, Utility } from "@hpcc-js/common";
import { select as d3Select } from "d3-selection";
import { Layer } from "./Layer.ts";
import * as MapUtility from "./Utility.ts";

import "../src/Pins.css";

export class Pins extends Layer {
    _geohash;
    _pinsTransform;
    pinsPaths;

    constructor() {
        super();
        Utility.SimpleSelectionMixin.call(this);
        this._geohash = new MapUtility.Geohash();
    }

    pinsData() {
        const geohashField = this._db.fieldByLabel(this.geohashColumn());
        const tooltipField = this._db.fieldByLabel(this.tooltipColumn());
        const latField = this._db.fieldByLabel(this.latColumn());
        const longField = this._db.fieldByLabel(this.longColumn());
        const context = this;
        return this.data().filter(function (row) {
            const lat = latField ? row[latField.idx] : row[0];
            const long = longField ? row[longField.idx] : row[1];
            if (context.omitNullLatLong() && lat === 0 && long === 0) {
                return false;
            }
            return true;
        }).map(function (row, idx) {
            const lat = latField ? row[latField.idx] : row[0];
            const long = longField ? row[longField.idx] : row[1];
            const retVal = {
                idx,
                lat,
                long,
                ext: row[2] instanceof Object ? row[2] : {},
                origRow: row
            };
            if (geohashField) {
                try {
                    const pos = this._geohash.bounds(row[geohashField.idx]);
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
    }

    layerEnter(base, svgElement, domElement) {
        Layer.prototype.layerEnter.apply(this, arguments);

        this._pinsTransform = svgElement;
        this._selection.widgetElement(this._pinsTransform);
        this.pinsPaths = d3Select(null);
        this.tooltipHTML(function (d) {
            return d.ext.tooltip === undefined ? "" : d.ext.tooltip;
        });
    }

    layerUpdate(base) {
        Layer.prototype.layerUpdate.apply(this, arguments);

        this._pinsTransform
            .style("opacity", this.opacity())
            ;

        this.pinsPaths = this._pinsTransform.selectAll(".pin").data(this.visible() ? this.pinsData() : [], d => d.idx);
        const context = this;
        const updatesPaths = this.pinsPaths.enter().append("g")
            .attr("class", "pin")
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                context.click(context.rowToObj(d.origRow), "geohash", context._selection.selected(this));
            })
            .on("dblclick", function (d) {
                context.dblclick(context.rowToObj(d.origRow), "geohash", context._selection.selected(this));
            })
            .on("mouseover", function (d) {
                if (!Platform.isIE) {
                    this.parentNode.appendChild(this);
                }
            })
            .on("mouseout.tooltip", function (d) {
                if (d.ext && d.ext.tooltip) {
                    context.tooltip.hide.apply(this, arguments);
                }
            })
            .on("mousemove.tooltip", function (d) {
                if (d.ext && d.ext.tooltip) {
                    context.tooltip.show.apply(this, arguments);
                }
            })
            .each(function (d) {
                const element = d3Select(this);
                element.append("path")
                    .attr("class", "data")
                    ;
                element.append("text")
                    .attr("text-anchor", "middle")
                    ;
            }).merge(this.pinsPaths);
        updatesPaths.selectAll("text")
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
        const svgPath = this.svgPinPath();
        updatesPaths.selectAll("path.data")
            .attr("d", svgPath)
            .attr("stroke-width", this.strokeWidth() + "px")
            .style("display", function (d) {
                const pos = base.project(d.lat, d.long);
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
    }

    layerZoomed(base) {
        Layer.prototype.layerZoomed.apply(this, arguments);
        this.pinsPaths
            .attr("transform", function (d) {
                let pos = base.project(d.lat, d.long);
                if (!pos) {
                    pos = [0, 0];
                }
                return "translate(" + pos[0] + ", " + pos[1] + ")scale(" + (1 / base.zoomScale()) + ")";
            })
            ;
    }

    pinTextDY() {
        switch (this.pinType()) {
            case "pin":
            case "rectangle-pin":
                return -this.arrowHeight();
            case "circle":
            case "rectangle":
                return 0;
        }
    }
    svgPinPath() {
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
    }

    rectanglePinPath() {
        const width = this.pinWidth();
        const height = this.pinHeight();
        const radius = this.cornerRadius();
        const arrow_h = this.arrowHeight();
        const arrow_w = this.arrowWidth();
        const x = 0 - width / 2;
        const y = 0 - height + radius;
        const arrow_b = (width - radius * 2 - arrow_w) / 2;
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
    }
    rectanglePath() {
        const width = this.pinWidth();
        const height = this.pinHeight();
        const radius = this.cornerRadius();
        const x = -width / 2;
        let y = -height / 2;
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
    }
    circlePinPath() {
        const arrow_h = this.arrowHeight();
        const arrow_w = this.arrowWidth();
        const x = 0 - arrow_w / 2;
        const y = 0 - arrow_h;
        const bezier_x = arrow_w / 2;
        const bezier_y = arrow_h;
        const c_dx1 = -bezier_x;
        const c_dy1 = -bezier_y;
        const c_dx2 = arrow_w + bezier_x;
        const c_dy2 = c_dy1;
        const c_dx = arrow_w;
        const c_dy = 0;
        return "M" + x + "," + y +
            "c" + c_dx1 + " " + c_dy1 + ", " + c_dx2 + " " + c_dy2 + ", " + c_dx + " " + c_dy +
            "l" + -arrow_w / 2 + "," + arrow_h +
            "l" + -arrow_w / 2 + "," + -arrow_h +
            "z";
    }

    circlePath() {
        const radius = +this.pinRadius();
        return `M 0, 0 m ${-radius}, 0 a ${radius},${radius} 0 1,0 ${radius * 2},0 a ${radius},${radius} 0 1,0 ${-radius * 2},0`;
    }

    //  Events  ---
    click(row, column, selected) {
    }

    dblclick(row, column, selected) {
    }
}
Pins.prototype._class += " map_Pins";
Pins.prototype.mixin(Utility.SimpleSelectionMixin);

export interface Pins {
    // Simple Selection  ---
    _selection;

    //  Properties  ---
    latColumn(): string;
    latColumn(_: string): this;
    latColumn_exists(): boolean;
    longColumn(): string;
    longColumn(_: string): this;
    longColumn_exists(): boolean;
    geohashColumn(): string;
    geohashColumn(_: string): this;
    geohashColumn_exists(): boolean;
    tooltipColumn(): string;
    tooltipColumn(_: string): this;
    tooltipColumn_exists(): boolean;
    opacity(): number;
    opacity(_: number): this;
    opacity_exists(): boolean;
    fillColor(): string;
    fillColor(_: string): this;
    fillColor_exists(): boolean;
    omitNullLatLong(): boolean;
    omitNullLatLong(_: boolean): this;
    omitNullLatLong_exists(): boolean;

    strokeWidth(): number;
    strokeWidth(_: number): this;
    strokeWidth_exists(): boolean;
    strokeColor(): string;
    strokeColor(_: string): this;
    strokeColor_exists(): boolean;

    fontSize(): number;
    fontSize(_: number): this;
    fontSize_exists(): boolean;
    fontFamily(): string;
    fontFamily(_: string): this;
    fontFamily_exists(): boolean;
    fontColor(): string;
    fontColor(_: string): this;
    fontColor_exists(): boolean;

    pinType(): string;
    pinType(_: string): this;
    pinType_exists(): boolean;
    arrowWidth(): number;
    arrowWidth(_: number): this;
    arrowWidth_exists(): boolean;
    arrowHeight(): number;
    arrowHeight(_: number): this;
    arrowHeight_exists(): boolean;

    pinWidth(): number;
    pinWidth(_: number): this;
    pinWidth_exists(): boolean;
    pinHeight(): number;
    pinHeight(_: number): this;
    pinHeight_exists(): boolean;
    cornerRadius(): number;
    cornerRadius(_: number): this;
    cornerRadius_exists(): boolean;

    pinRadius(): number;
    pinRadius(_: number): this;
    pinRadius_exists(): boolean;

    textBaseline(): string;
    textBaseline(_: string): this;
    textBaseline_exists(): boolean;
}

Pins.prototype.publish("geohashColumn", null, "set", "Geohash column", function () { return this.columns(); }, { optional: true });
Pins.prototype.publish("tooltipColumn", null, "set", "Tooltip column", function () { return this.columns(); }, { optional: true });
Pins.prototype.publish("latColumn", null, "set", "Latitude column", function () { return this.columns(); }, { optional: true });
Pins.prototype.publish("longColumn", null, "set", "Longitude column", function () { return this.columns(); }, { optional: true });
Pins.prototype.publish("opacity", 1.0, "number", "Opacity", null, { tags: ["Advanced"] });
Pins.prototype.publish("fillColor", "#00FFDD", "html-color", "Pin Color", null, { optional: true });
Pins.prototype.publish("omitNullLatLong", false, "boolean", "Remove lat=0,lng=0 from pinsData", null, { tags: ["Basic"] });

Pins.prototype.publish("strokeWidth", 0.5, "number", "Pin Border Thickness (pixels)", null, { tags: ["Basic"] });
Pins.prototype.publish("strokeColor", "", "html-color", "Pin Border Color", null, { optional: true });

Pins.prototype.publish("fontSize", 18, "number", "Font Size", null, { tags: ["Basic", "Shared"] });
Pins.prototype.publish("fontFamily", "Verdana", "string", "Font Name", null, { tags: ["Basic", "Shared", "Shared"] });
Pins.prototype.publish("fontColor", "#000000", "html-color", "Font Color", null, { tags: ["Basic", "Shared"] });

Pins.prototype.publish("pinType", "pin", "set", "Pin Type", ["pin", "circle", "rectangle", "rectangle-pin"], { tags: ["Basic"] });
Pins.prototype.publish("arrowWidth", 8, "number", "Pin arrow width (pixels)", null, { tags: ["Basic"], disable: w => ["pin", "rectangle-pin"].indexOf(w.pinType()) === -1 });
Pins.prototype.publish("arrowHeight", 12, "number", "Pin arrow height (pixels)", null, { tags: ["Basic"], disable: w => ["pin", "rectangle-pin"].indexOf(w.pinType()) === -1 });

Pins.prototype.publish("pinWidth", 20, "number", "Width of pin (pixels)", null, { tags: ["Basic"], disable: w => ["rectangle", "rectangle-pin"].indexOf(w.pinType()) === -1 });
Pins.prototype.publish("pinHeight", 20, "number", "Height of pin (pixels) (not including arrow)", null, { tags: ["Basic"], disable: w => ["rectangle", "rectangle-pin"].indexOf(w.pinType()) === -1 });
Pins.prototype.publish("cornerRadius", 10, "number", "Radius of rectangular pin corners (pixels)", null, { tags: ["Basic"], disable: w => ["rectangle", "rectangle-pin"].indexOf(w.pinType()) === -1 });

Pins.prototype.publish("pinRadius", 12, "number", "Radius of circle (pixels)", null, { tags: ["Basic"], disable: w => w.pinType() !== "circle" });

Pins.prototype.publish("textBaseline", "central", "set", "Pin text vertical alignment", ["auto", "use-script", "no-change", "reset-size", "ideographic", "alphabetic", "hanging", "mathematical", "central", "middle", "text-after-edge", "text-before-edge", "inherit"], { tags: ["Basic"] });
