import { INDChart, ITooltip } from "@hpcc-js/api";
import { SVGWidget, Utility } from "@hpcc-js/common";
import { hsl as d3Hsl } from "d3-color";
import { select as d3Select } from "d3-selection";

import "../src/Radar.css";
export class Radar extends SVGWidget {

    constructor() {
        super();
        INDChart.call(this);
        ITooltip.call(this);
        Utility.SimpleSelectionMixin.call(this);
    }

    mapShape(shape) {
        switch (shape) {
            case "rectangle":
                return "rect";
            case "circle":
                return "circle";
            case "cross":
                return "path";
            default:
        }
    }
    setPointAttributes(element, x, y) {
        const shape = this.mapShape(this.pointShape());
        const context = this;
        switch (shape) {
            case "rect":
                element
                    .attr("width", context.pointSize())
                    .attr("height", context.pointSize())
                    .style("fill", function (d: any, _idx) { return context._palette(d.column); })
                    ;
                break;
            case "circle":
                element
                    .attr("r", context.pointSize() / 2)
                    .attr("cx", x)
                    .attr("cy", y)
                    .style("fill", function (d: any, _idx) { return context._palette(d.column); })
                    ;
                break;
            case "path":
                const half_size = context.pointSize() / 2;
                element
                    .attr("d", function (d: any) {
                        return "M" + (x - half_size) + " " + (y - half_size) + " " +
                            "L" + (x + half_size) + " " + (y + half_size) + " " +
                            "M" + (x - half_size) + " " + (y + half_size) + " " +
                            "L" + (x + half_size) + " " + (y - half_size);
                    })
                    .style("stroke", function (d: any) { return context._palette(d.column); })
                    ;
                break;
            default:
        }
    }
    enter(domNode, element) {
        super.enter(domNode, element);
        this._selection.widgetElement(element);

        this
            .tooltipHTML(d => {
                return this.tooltipFormat({ label: d.label, series: d.column, value: d.value });
            })
            ;
    }
    update(domNode, element) {
        super.update(domNode, element);
        this._palette = this._palette.switch(this.paletteID());
        const context = this;
        const h = this.height();
        const w = this.width();
        const half_h = (h / 2);
        const half_w = (w / 2);

        const data = this.flattenData(this.columns(), this.data()).map((d: any) => {
            d.shape = this.mapShape(this.pointShape());
            d.column = this.columns()[d.colIdx];
            return d;
        });
        const domain_points = [];
        const arc = this.degrees2radians(360 / this.data().length);
        const max_label_h = this.fontSize();
        let max_label_w = 0;
        data.filter(n => n.colIdx === 1).forEach(n => {
            const isize = super.textSize(n.label, `${this.fontFamily()}`, this.fontSize());
            if (max_label_w < isize.width) max_label_w = isize.width;
        });
        const radius = Math.min(half_h - max_label_h, half_w - max_label_w);
        const labels = element
            .selectAll(".label")
            .data(data.filter(n => n.colIdx === 1))
            ;
        const max_val = Math.max.apply(context, data.map(n => n.value));
        labels.enter()
            .append("text")
            .attr("class", "label")
            .attr("text-anchor", "middle")
            .merge(labels)
            .each(function (this: SVGElement, n, i) {
                const xy = context.polar2cartesian(radius, (i * arc) - (Math.PI / 2));
                domain_points.push(xy.map(n => n * context.labelPaddingRatio()));
                let text_anchor = "middle";
                const _x = Math.round(xy[0]);
                text_anchor = _x > 0 ? "start" : text_anchor;
                text_anchor = _x < 0 ? "end" : text_anchor;
                d3Select(this)
                    .attr("text-anchor", text_anchor)
                    .attr("x", xy[0])
                    .attr("y", xy[1])
                    ;
            })
            .text(n => n.label)
            ;
        labels.exit().remove();
        const domains = element
            .selectAll(".domain")
            .data(data.filter(n => n.colIdx === 1));
        domains.enter()
            .append("line")
            .classed("domain", true)
            .style("stroke", "#000")
            .style("stroke-opacity", "0.75")
            .style("stroke-width", "1px")
            .merge(domains)
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", (n, i) => domain_points[i][0])
            .attr("y2", (n, i) => domain_points[i][1]);
        domains.exit().remove();
        const value_guides = element
            .selectAll(".value_guide")
            .data(this.valueGuideRatios())
            ;
        value_guides.enter()
            .append("polygon")
            .classed("value_guide", true)
            .style("stroke", "grey")
            .style("stroke-opacity", "0.75")
            .style("stroke-width", "0.3px")
            .merge(value_guides)
            .each(function (mult, i) {
                const poly_points = [];
                domain_points.forEach((domain_point, row_idx) => {
                    poly_points.push([
                        domain_point[0] * mult,
                        domain_point[1] * mult
                    ]);
                });
                d3Select(this)
                    .attr("points", poly_points.join(" "))
                    .attr("stroke", "rgb(0, 0, 0)")
                    .attr("stroke-opacity", 0.75)
                    .attr("stroke-width", 0.3)
                    .attr("fill-opacity", 0)
                    ;
            })
            ;
        value_guides.exit().remove();

        const value_guide_text = element
            .selectAll(".value_guide_text")
            .data(this.valueGuideRatios())
            ;
        value_guide_text.enter()
            .append("text")
            .attr("class", "value_guide_text")
            .attr("text-anchor", "start")
            .merge(value_guide_text)
            .attr("x", 2)
            .attr("y", mult => domain_points[0][1] * mult)
            .text((mult, i) => Math.round(mult * max_val))
            ;
        value_guides.exit().remove();

        //  Polygon shapes  ---
        const columns = this.columns();
        const data2 = this.data();

        const series_polygons = element
            .selectAll(".area")
            .data(columns.filter((n, i) => i > 0));
        series_polygons.enter()
            .append("polygon")
            .attr("class", "area")
            .style("stroke-opacity", "0.75")
            .style("stroke-width", "0.3px")
            .merge(series_polygons)
            .style("stroke", d => this._palette(d))
            .style("fill", d => d3Hsl(this._palette(d)).brighter().toString())
            .style("fill-opacity", this.fillOpacity())
            .attr("points", (d, col_idx) => {
                return domain_points.map((domain_point, row_idx) => {
                    const val = data2[row_idx][col_idx + 1];
                    const val_mult = val === 0 ? 0 : val / max_val;
                    return domain_point[0] * val_mult + "," + domain_point[1] * val_mult;
                }).join(" ");
            });
        series_polygons.exit().remove();

        //  Points  ---
        const point_elm = element
            .selectAll(".point")
            .data(data);
        point_elm.enter()
            .append("g")
            .attr("class", "point")
            .on("mouseout.tooltip", d => {
                return context.tooltip.hide(d);
            })
            .on("mousemove.tooltip", d => {
                return context.tooltip.show(d);
            })
            .on("click", function (d: any, _idx) {
                const data_row = context.data()[d.rowIdx];
                const row_obj = context.rowToObj(data_row);
                const selected = context._selection.selected(this);
                context.click(row_obj, context.columns()[d.colIdx], selected);
            })
            .on("dblclick", function (d: any, _idx) {
                context.dblclick(context.rowToObj(context.data()[d.rowIdx]), d.column, context._selection.selected(this));
            })
            .each(function (d) {
                const element = d3Select(this);
                element.append("circle")
                    .attr("class", "pointSelection")
                    .attr("r", context.pointSize())
                    .call(context._selection.enter.bind(context._selection))
                    ;
                element.append(context.mapShape(context.pointShape()))
                    .attr("class", "pointShape")
                    ;
            })
            .merge(point_elm)
            .each(function (d) {
                const element = d3Select(this);
                const val_mult = d.value === 0 ? 0 : d.value / max_val;
                const x = domain_points[d.rowIdx][0] * val_mult;
                const y = domain_points[d.rowIdx][1] * val_mult;
                element.select(".pointSelection")
                    .attr("cx", x)
                    .attr("cy", y)
                    ;

                const pointElement = element.select(".pointShape")
                    .style("stroke", context._palette(columns[d.colIdx]))
                    .style("fill", d3Hsl(context._palette(columns[d.colIdx])).darker().toString())
                    ;
                context.setPointAttributes(pointElement, x, y);
            })
            ;
        point_elm.exit().remove();
    }

    polar2cartesian(r, theta) {
        return [r * Math.cos(theta), r * Math.sin(theta)];
    }
    cartesian2polar(x, y) {
        return [Math.atan2(y, x), Math.sqrt(x * x + y * y)];
    }
    degrees2radians(d) {
        return d / 57.295779513;
    }
    radians2degrees(r) {
        return r * 57.295779513;
    }
    point_in_polygon(point, vs) {
        const x = point[0];
        const y = point[1];
        let inside = false;
        for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            const xi = vs[i][0];
            const yi = vs[i][1];
            const xj = vs[j][0];
            const yj = vs[j][1];
            const intersect = ((yi > y) !== (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    }

    //  INDChart
    _palette;
    click: (row, column, selected) => void;
    dblclick: (row, column, selected) => void;

    //  ITooltip
    tooltip;
    tooltipHTML: (_) => string;
    tooltipFormat: (_) => string;

    _selection;
}
Radar.prototype._class += " chart_Radar";
Radar.prototype.implements(INDChart.prototype);
Radar.prototype.implements(ITooltip.prototype);
Radar.prototype.mixin(Utility.SimpleSelectionMixin);

export interface Radar {
    labelPaddingRatio(): number;
    labelPaddingRatio(_: number): this;
    fillOpacity(): number;
    fillOpacity(_: number): this;
    fontFamily(): string;
    fontFamily(_: string): this;
    fontSize(): number;
    fontSize(_: number): this;
    valueGuideRatios(): any;
    valueGuideRatios(_: any): this;
    valueGuideFontSize(): number;
    valueGuideFontSize(_: number): this;
    valueGuideFontFamily(): string;
    valueGuideFontFamily(_: string): this;
    paletteID(): string;
    paletteID(_: string): this;
    pointShape(): string;
    pointShape(_: string): this;
    pointSize(): number;
    pointSize(_: number): this;
}

Radar.prototype.publish("paletteID", "default", "set", "paletteID", Radar.prototype._palette.switch());
Radar.prototype.publish("pointShape", "cross", "set", "pointShape", ["circle", "rectangle", "cross"]);
Radar.prototype.publish("pointSize", 6, "number", "Point Size", null, { range: { min: 1, step: 1, max: 200 } });
Radar.prototype.publish("valueGuideRatios", [0.2, 0.4, 0.6, 0.8], "array", "valueGuideRatios");
Radar.prototype.publish("fillOpacity", 0.66, "number", "fillOpacity");
Radar.prototype.publish("fontFamily", "", "string", "fontFamily");
Radar.prototype.publish("fontSize", 16, "number", "fontSize");
Radar.prototype.publish("labelPaddingRatio", 0.9, "number", "labelPaddingRatio");
