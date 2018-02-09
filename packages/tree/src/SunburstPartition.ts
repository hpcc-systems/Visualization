import { ITree } from "@hpcc-js/api";
import { SVGWidget } from "@hpcc-js/common";
import { hierarchy as d3Hierarchy, partition as d3Parition } from "d3-hierarchy";
import { interpolate as d3Interpolate } from "d3-interpolate";
import { scaleLinear as d3ScaleLinear, scaleSqrt as d3ScaleSqrt } from "d3-scale";
import { event as d3Event, select as d3Select } from "d3-selection";
import { arc as d3Arc } from "d3-shape";

import "../src/SunburstPartition.css";

export class SunburstPartition extends SVGWidget {
    svg;
    radius;
    _xScale;
    _yScale;
    partition;
    arc;
    _resetRoot;

    constructor() {
        super();
        ITree.call(this);
    }

    data(): any;
    data(_: any): this;
    data(_?: any): any | this {
        const retVal = SVGWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            this._resetRoot = true;
        }
        return retVal;
    }

    enter(_domNode, element) {
        const context = this;

        this.radius = Math.min(this.width(), this.height()) / 2;

        this._xScale = d3ScaleLinear()
            .range([0, 2 * Math.PI])
            ;

        this._yScale = d3ScaleSqrt()
            .range([0, this.radius])
            ;

        this.partition = d3Parition();

        this.arc = d3Arc()
            .startAngle(function (d: any) {
                return Math.max(0, Math.min(2 * Math.PI, context._xScale(d.x0)));
            })
            .endAngle(function (d: any) {
                return Math.max(0, Math.min(2 * Math.PI, context._xScale(d.x1)));
            })
            .innerRadius(function (d: any) {
                return Math.max(0, context._yScale(d.y0));
            })
            .outerRadius(function (d: any) {
                return Math.max(0, context._yScale(d.y1));
            })
            ;

        this.svg = element.append("g");
    }

    update(_domNode, _element) {
        const context = this;

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        this.radius = Math.min(this.width(), this.height()) / 2;
        this._yScale.range([0, this.radius]);

        const root = d3Hierarchy(this.data())
            .sum(function (d) {
                return d.size !== undefined ? d.size : 1;
            })
            ;

        const paths = this.svg.selectAll("path").data(this.partition(root).descendants(), function (d, i) {
            return d.data.label !== undefined ? d.data.label : i;
        });

        paths.enter().append("path")
            .on("click", function (d) { context.click(d.data, null, null); })
            .on("dblclick", function (d) {
                if (d3Event) {
                    d3Event.stopPropagation();
                }
                context.zoomTo(d);
            })
            .each(function () {
                const element = d3Select(this);
                element
                    .append("title")
                    ;
            })
            .merge(paths)
            .attr("d", this.arc)
            .style("fill", function (d) {
                return d.data.__viz_fill ? d.data.__viz_fill : context._palette(d.data.label);
            })
            .style("stroke", function (d) {
                return d.value > 16 ? "white" : "none";
            })
            .select("title")
            .text(function (d) {
                return d.data.label;
            })
            ;

        paths.exit().remove();

        if (this._resetRoot) {
            this._resetRoot = false;
            this.zoomTo(root);
        }
    }

    zoomTo(d) {
        const context = this;
        this.svg.transition()
            .duration(750)
            .tween("scale", function () {
                const xd = d3Interpolate(context._xScale.domain(), [d.x0, d.x1]);
                const yd = d3Interpolate(context._yScale.domain(), [d.y0, 1]);
                const yr = d3Interpolate(context._yScale.range(), [d.y0 ? 20 : 0, context.radius]);
                return function (t) { context._xScale.domain(xd(t)); context._yScale.domain(yd(t)).range(yr(t)); };
            })
            .selectAll("path")
            .attrTween("d", function (d2) { return function () { return context.arc(d2); }; });
    }

    //  ITree
    _palette;
    click: (row, column, selected) => void;
    dblclick: (row, column, selected) => void;
}
SunburstPartition.prototype._class += " tree_SunburstPartition";
SunburstPartition.prototype.implements(ITree.prototype);

export interface SunburstPartition {
    paletteID(): string;
    paletteID(_: string): this;
    useClonedPalette(): boolean;
    useClonedPalette(_: boolean): this;
}
SunburstPartition.prototype.publish("paletteID", "default", "set", "Palette ID", SunburstPartition.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
SunburstPartition.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
