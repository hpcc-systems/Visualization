import { ITooltip } from "@hpcc-js/api";
import { Axis } from "@hpcc-js/chart";
import { publish, SVGWidget, TextBox, Utility } from "@hpcc-js/common";
import { extent as d3Extent } from "d3-array";
import { scaleBand as d3ScaleBand } from "d3-scale";
import { event as d3Event, local as d3Local } from "d3-selection";
import { timeFormat as d3TimeFormat } from "d3-time-format";
import { zoom as d3Zoom, zoomIdentity as d3ZoomIdentity } from "d3-zoom";

import "../src/MiniGantt.css";

export class MiniGantt extends SVGWidget {
    protected tlAxis: Axis;
    protected brAxis: Axis;
    protected verticalBands;
    protected svgEvents;
    protected _zoom;
    protected svg;
    protected svgGuide;
    private localText = d3Local<TextBox>();
    private tooltipFormatter: (date: Date) => string;

    protected rootExtent;

    @publish("%Y-%m-%d", "string", "Time Series Pattern")
    timePattern: publish<this, string>;
    @publish("%Y-%m-%d", "string", "Tick Format", null, { optional: true })
    tickFormat: publish<this, string>;
    @publish("%Y-%m-%d", "string", "Tooltip Format", null, { optional: true })
    tooltipTimeFormat: publish<this, string>;
    @publish(2, "number", "Force new lane if start/end is within X pixels")
    overlapTolerence: publish<this, number>;
    @publish("horizontal", "set", "Orientation", ["horizontal", "vertical"])
    orientation: publish<this, "horizontal" | "vertical">;

    constructor() {
        super();
        ITooltip.call(this);
        Utility.SimpleSelectionMixin.call(this);

        this._drawStartPos = "origin";
        this.tooltipHTML((d: any) => `<center>${d[0]}</center><br>${this.tooltipFormatter(this.brAxis.parse(d[1]))} -> ${this.tooltipFormatter(this.brAxis.parse(d[2]))}`);

        this.tlAxis = new Axis()
            .type("time")
            ;
        this.brAxis = new Axis()
            .type("time")
            ;
        this.verticalBands = d3ScaleBand()
            .paddingOuter(0.2)
            .paddingInner(0.2)
            ;
    }

    isHorizontal(): boolean {
        return this.orientation() === "horizontal";
    }

    fullExtent() {
        const data = [...this.data().map(d => d[1]), ...this.data().filter(d => !!d[2]).map(d => d[2])];
        return d3Extent(data);
    }

    extent() {
        if (this.rootExtent) {
            return [this.rootExtent[1], this.rootExtent[2]];
        }
        return this.fullExtent();
    }

    dataStartPos(d) {
        return this.brAxis.scalePos(d[1]);
    }

    dataEndPos(d) {
        return this.brAxis.scalePos(d[2]);
    }

    dataWidth(d) {
        return this.dataEndPos(d) - this.dataStartPos(d);
    }

    private transform;
    resetZoom() {
        //  Triggers a "zoomed" event ---
        this._zoom.transform(this.element(), d3ZoomIdentity.translate(0, this.isHorizontal() ? 0 : this.height()));
    }

    zoomed() {
        this.transform = d3Event.transform;
        this.render();
    }

    private background;
    enter(domNode, element) {
        super.enter(domNode, element);
        this._zoom = d3Zoom()
            .on("zoom", () => {
                this.zoomed();
            })
            ;

        this.background = element.append("rect")
            .attr("fill", "white")
            .attr("opacity", 0)
            .on("dblclick", () => {
                d3Event.stopPropagation();
                delete this.rootExtent;
                this.resetZoom();
            })
            ;
        this.svg = element.append("g");
        this.svgGuide = this.svg.append("g");
        this.svgEvents = this.svg.append("g");
        this.tlAxis
            .target(this.svg.node())
            .guideTarget(this.svgGuide.node())
            .shrinkToFit("none")
            .overlapMode("stagger")
            .extend(0.1)
            ;
        this.brAxis
            .target(this.svg.node())
            .guideTarget(this.svgGuide.node())
            .shrinkToFit("none")
            .extend(0.1)
            ;

        element.call(this._zoom);
        this._selection.widgetElement(this.svg);
    }

    private _prevIsHorizontal;
    update(domNode, element) {
        super.update(domNode, element);

        if (this._prevIsHorizontal !== this.isHorizontal()) {
            this._prevIsHorizontal = this.isHorizontal();
            this.resetZoom();
            return;
        }

        this.tooltipFormatter = d3TimeFormat(this.tooltipTimeFormat());

        const width = this.width();
        const height = this.height();

        this.background
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", width)
            .attr("height", height)
            ;

        const extent = this.extent();

        this.tlAxis
            .x(width / 2)
            .y(height / 2)
            .orientation(this.isHorizontal() ? "top" : "left")
            .reverse(!this.isHorizontal())
            .timePattern(this.timePattern())    //  "%Y-%m-%dT%H:%M:%S.%LZ"
            .tickFormat(this.tickFormat())      //  "%H:%M:%S"
            .width(width - 1)
            .height(height)
            .low(extent[0])
            .high(extent[1])
            .updateScale()
            ;

        this.brAxis
            .x(width / 2)
            .y(height / 2)
            .orientation(this.isHorizontal() ? "bottom" : "right")
            .reverse(!this.isHorizontal())
            .timePattern(this.timePattern())    //  "%Y-%m-%dT%H:%M:%S.%LZ"
            .width(width - 1)
            .height(height)
            .low(extent[0])
            .high(extent[1])
            .updateScale()
            ;

        if (this.transform) {
            let low;
            let hi;
            if (this.isHorizontal()) {
                low = this.tlAxis.parseInvert(this.tlAxis.invert(this.transform.invertX(0)));
                hi = this.tlAxis.parseInvert(this.tlAxis.invert(this.transform.invertX(width - 1)));
            } else {
                low = this.tlAxis.parseInvert(this.tlAxis.invert(- this.transform.invertY(0)));
                hi = this.tlAxis.parseInvert(this.tlAxis.invert(- this.transform.invertY(height - 1)));
            }
            this.tlAxis
                .low(low)
                .high(hi)
                .updateScale()
                ;
            this.brAxis
                .low(low)
                .high(hi)
                .updateScale()
                ;
        }
        const data = this.data().sort(this.isHorizontal() ? (l, r) => {
            return this.brAxis.scalePos(l[1]) - this.brAxis.scalePos(r[1]);
        } : (l, r) => {
            return this.brAxis.scalePos(r[1]) - this.brAxis.scalePos(l[1]);
        });
        const events = data.filter(d => !d[2]);
        const ranges = data.filter(d => !!d[2]);
        const eventTicks = events.map((d) => {
            return {
                label: d[0],
                value: d[1]
            };
        });

        this.tlAxis
            .ticks(eventTicks)
            .render()
            ;
        const tlAxisBBox = this.tlAxis.getBBox();

        this.brAxis
            .render()
            ;
        const brAxisBBox = this.brAxis.getBBox();

        interface BucketInfo {
            endPos: number;
        }
        const bucketData: BucketInfo[] = [];
        const bucketIndex = {};
        for (const range of ranges) {
            for (let i = 0; i < bucketData.length; ++i) {
                const bucket = bucketData[i];
                if (bucket.endPos + this.overlapTolerence() <= this.dataStartPos(range)) {
                    bucketIndex[range] = i;
                    bucket.endPos = this.dataEndPos(range);
                    break;
                }
            }

            if (bucketIndex[range] === undefined) {
                bucketIndex[range] = bucketData.length;
                bucketData.push({
                    endPos: this.dataEndPos(range)
                });
            }
        }

        const vbLower = this.isHorizontal() ? 0 + tlAxisBBox.height : 0 + tlAxisBBox.width;
        const vbHigher = this.isHorizontal() ? height - brAxisBBox.height : width - brAxisBBox.width;

        this.verticalBands
            .range([vbLower, vbHigher])
            .domain(bucketData.map((_d, i) => i))
            ;

        const context = this;

        const buckets = this.svgEvents.selectAll(".buckets").data(ranges, d => d[0]);
        buckets.enter().append("g")
            .attr("class", "buckets")
            .call(this._selection.enter.bind(this._selection))
            .each(function (d) {
                const text = new TextBox()
                    .target(this)
                    .anchor("middle")
                    ;
                context.localText.set(this, text);
                context.enterTextBox(text, d[3]);
            })
            .on("click", function (d) {
                context.click(context.rowToObj(d), "range", context._selection.selected(this));
            }, false)
            .on("dblclick", function (d) {
                context.rootExtent = d;
                context.resetZoom();
                context.dblclick(context.rowToObj(d), "range", context._selection.selected(this));
            }, true)
            .on("mouseout.tooltip", this.tooltip.hide)
            .on("mousemove.tooltip", this.tooltip.show)
            .merge(buckets)
            .attr("transform", d => context.isHorizontal() ?
                `translate(${this.dataStartPos(d)}, ${this.verticalBands(bucketIndex[d])}) ` :
                `translate(${this.verticalBands(bucketIndex[d])}, ${this.dataStartPos(d)}) `)
            .each(function (d) {
                const textBox = context.localText.get(this);
                const x = context.dataWidth(d) / 2;
                const y = context.verticalBands.bandwidth() / 2;
                const textBoxWidth = Math.max(context.dataWidth(d), 2);
                const textBoxHeight = Math.max(context.verticalBands.bandwidth(), 2);
                textBox
                    .pos(context.isHorizontal() ? { x, y } : { x: y, y: x })
                    .fixedSize(context.isHorizontal() ? { width: textBoxWidth, height: textBoxHeight } : { width: textBoxHeight, height: textBoxWidth })
                    .text(d[0])
                    ;
                context.updateTextBox(textBox, d[3]);
                textBox
                    .render()
                    ;
            });
        buckets.exit().remove();

        const lines = this.svgEvents.selectAll(".line").data(events, d => {
            return d[0];
        });
        lines.enter().append("line")
            .attr("class", "line")
            .merge(lines)
            .attr(this.isHorizontal() ? "x1" : "y1", d => this.dataStartPos(d) - 0)
            .attr(this.isHorizontal() ? "x2" : "y2", d => this.dataStartPos(d) - 0)
            .attr(this.isHorizontal() ? "y1" : "x1", this.isHorizontal() ? tlAxisBBox.height : tlAxisBBox.width)
            .attr(this.isHorizontal() ? "y2" : "x2", this.isHorizontal() ? height - brAxisBBox.height : width - brAxisBBox.width)
            ;
        lines.exit().remove();
    }

    //  Events  ---
    click(row, col, sel) {
    }

    dblclick(row, col, sel) {
    }

    enterTextBox(textbox: TextBox, d) {
    }

    updateTextBox(textbox: TextBox, d) {
    }

    //  ITooltip  ---
    tooltip;
    tooltipHTML: (_) => string;
    tooltipFormat: (_) => string;

    //  SimpleSelectionMixin
    _selection;
}
MiniGantt.prototype._class += " timeline_MiniGantt";
MiniGantt.prototype.implements(ITooltip.prototype);
MiniGantt.prototype.mixin(Utility.SimpleSelectionMixin);
