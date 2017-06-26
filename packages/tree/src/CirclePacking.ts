import { ITree } from "@hpcc-js/api";
import { SVGWidget } from "@hpcc-js/common";
import { hierarchy as d3Hierarchy, pack as d3Pack } from "d3-hierarchy";
import { interpolateZoom as d3InterpolateZoom } from "d3-interpolate";
import { event as d3Event } from "d3-selection";
import "d3-transition";

import "../src/CirclePacking.css";

export class CirclePacking extends SVGWidget {
    diameter;
    pack;
    svg;
    _focus;
    circle;
    view;
    protected _node;

    constructor() {
        super();
        ITree.call(this);
    }

    enter(_domNode, element) {
        this.diameter = Math.min(this.width(), this.height());

        this.pack = d3Pack()
            .size([this.diameter - 4, this.diameter - 4])
            .padding(1.5)
            ;

        this.svg = element
            .append("g")
            .attr("transform", "rotate(30)")
            ;
    }

    update(_domNode, _element) {
        const context = this;
        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        this.svg.selectAll("circle").remove();
        this.svg.selectAll("text").remove();

        const root: any = d3Hierarchy(this.data())
            .sum(function () {
                return 1;
            }).sort(function (a, b) {
                return a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0;
            })
            ;
        this._focus = root;
        this.pack(root);

        this.circle = this.svg.selectAll("circle").data(root.descendants())
            .enter().append("circle")
            .attr("class", function (d) { return d.parent ? d.children ? "node" : "node leaf" : "node root"; })
            .style("fill", function (d) { return context._palette(d.data.label); })
            .on("click", function (d) { context.click(d.data, null, null); })
            .on("dblclick", function (d) {
                if (this._focus !== d) {
                    context.zoom(d);
                }
                d3Event.stopPropagation();
            })
            ;
        this.circle.append("title").text(function (d) { return d.data.label; });

        this.svg.selectAll("text").data(root.descendants())
            .enter().append("text")
            .attr("class", "label")
            .style("fill-opacity", function (d) { return d.parent === root ? 1 : 0; })
            .style("display", function (d) { return d.parent === root ? null : "none"; })
            .text(function (d) { return d.data.label; })
            ;

        this._node = this.svg.selectAll("circle,text");

        this.zoomTo([root.x, root.y, root.r * 2]);
    }

    zoom(newFocus) {
        this._focus = newFocus;
        const context = this;
        const transition = this.svg.transition()
            .duration(d3Event.altKey ? 7500 : 750)
            .tween("zoom", function () {
                const i = d3InterpolateZoom(context.view, [context._focus.x, context._focus.y, context._focus.r * 2]);
                return function (t) { context.zoomTo(i(t)); };
            });

        function showText(d) {
            return (d === context._focus && !d.children) || d.parent === context._focus;
        }

        transition.selectAll("text")
            .filter(function (d) { return showText(d) || this.style.display === "inline"; })
            .style("fill-opacity", function (d) { return showText(d) ? 1 : 0; })
            .on("start", function (d) { if (showText(d)) this.style.display = "inline"; })
            .on("end", function (d) { if (!showText(d)) this.style.display = "none"; });
    }

    zoomTo(v) {
        const k = this.diameter / v[2];
        this.view = v;
        this._node.attr("transform", function (d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
        this.circle.attr("r", function (d) { return d.r * k; });
    }

    paletteID: (_?: string) => string | CirclePacking;
    useClonedPalette: (_?: boolean) => boolean | CirclePacking;

    //  I2DChart
    _palette;
    click: (row, column, selected) => void;
    dblclick: (row, column, selected) => void;
}
CirclePacking.prototype._class += " tree_CirclePacking";
CirclePacking.prototype.implements(ITree.prototype);

CirclePacking.prototype.publish("paletteID", "default", "set", "Palette ID", CirclePacking.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
CirclePacking.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
