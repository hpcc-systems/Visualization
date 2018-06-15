import { ITooltip } from "@hpcc-js/api";
import { Axis } from "@hpcc-js/chart";
import { EntityPin, publish, SVGWidget, TextBox, Utility } from "@hpcc-js/common";
import { extent as d3Extent } from "d3-array";
import { scaleBand as d3ScaleBand } from "d3-scale";
import { event as d3Event, local as d3Local, select as d3Select } from "d3-selection";
import { timeFormat as d3TimeFormat } from "d3-time-format";
import { zoom as d3Zoom, zoomIdentity as d3ZoomIdentity } from "d3-zoom";

import "../src/MiniGantt.css";

export class MiniGantt extends SVGWidget {
    protected tlAxis: Axis;
    protected brAxis: Axis;
    protected verticalBands;
    protected gLowerContent;
    protected _zoom;
    protected gUpper;
    protected gLower;
    protected gLowerGuide;
    private localText = d3Local<TextBox>();
    private localEntityPin = d3Local<EntityPin>();
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
    @publish(16, "number", "maxZoom")
    maxZoom: publish<this, number>;
    @publish(false, "boolean", "hideIconWhenCollapsed")
    hideIconWhenCollapsed: publish<this, boolean>;
    @publish(false, "boolean", "hideTitleWhenCollapsed")
    hideTitleWhenCollapsed: publish<this, boolean>;
    @publish(true, "boolean", "hideDescriptionWhenCollapsed")
    hideDescriptionWhenCollapsed: publish<this, boolean>;
    @publish(true, "boolean", "hideAnnotationsWhenCollapsed")
    hideAnnotationsWhenCollapsed: publish<this, boolean>;

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
            .scaleExtent([0, this.maxZoom()])
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
        this.gUpper = element.append("g");
        this.gLower = element.append("g");
        this.gLowerGuide = this.gLower.append("g");
        this.gLowerContent = this.gLower.append("g");
        this.tlAxis
            .target(this.gLower.node())
            .guideTarget(this.gLowerGuide.node())
            .shrinkToFit("none")
            .overlapMode("stagger")
            .extend(0.1)
            ;
        this.brAxis
            .target(element.node())
            .guideTarget(this.gLowerGuide.node())
            .shrinkToFit("none")
            .extend(0.1)
            ;

        element.call(this._zoom);
        this._selection.widgetElement(this.gLower);
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
            .orientation(this.isHorizontal() ? "top" : "left")
            .reverse(!this.isHorizontal())
            .timePattern(this.timePattern())    //  "%Y-%m-%dT%H:%M:%S.%LZ"
            .tickFormat(this.tickFormat())      //  "%H:%M:%S"
            .width(width - 1)
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
            const retVal = this.brAxis.scalePos(l[1]) - this.brAxis.scalePos(r[1]);
            if (retVal === 0) {
                return ("" + l[0]).localeCompare("" + r[0]);
            }
            return retVal;
        } : (l, r) => {
            return this.brAxis.scalePos(r[1]) - this.brAxis.scalePos(l[1]);
        });
        const events = data.filter(d => !d[2]);
        const ranges = data.filter(d => !!d[2]);

        this.brAxis
            .render()
            ;
        const brAxisBBox = this.brAxis.getBBox();

        this.updateEntityPins(events);
        const upperBBox = this.gUpper.node().getBBox();
        const upperHeight = Math.max(upperBBox.height, 100);
        const lowerHeight = height - upperHeight;
        const gUpperTransY = upperHeight - 5;
        this.gUpper
            .attr("class", "gUpper")
            .attr("transform", `translate(0,${gUpperTransY})`)
            ;
        this.gLower
            .attr("class", "gLower")
            .attr("transform", `translate(0,${upperHeight})`)
            ;

        this.tlAxis
            .y(lowerHeight / 2)
            .height(lowerHeight)
            .ticks([])
            .tickCount(0)
            .hidden(true)
            .render()
            ;
        const tlAxisBBox = this.tlAxis.getBBox();
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
        const vbHigher = this.isHorizontal() ? lowerHeight - brAxisBBox.height : width - brAxisBBox.width;

        this.verticalBands
            .range([vbLower, vbHigher])
            .domain(bucketData.map((_d, i) => i))
            ;

        this.updateEventRanges(events, ranges, bucketIndex, lowerHeight, tlAxisBBox, brAxisBBox, width);
    }

    updateEntityPins(events) {
        const context = this;
        const entityPins = this.gUpper.selectAll(".entity_pin").data(events, d => d[0] + ":" + d[1]);
        entityPins.enter().append("g")
            .attr("class", "entity_pin")
            .on("mouseover", function (d) {
                d3Select(this).raise();
            })
            .each(function (d, i) {
                const entityPin = new EntityPin()
                    .target(this)
                    .icon("")
                    .iconOnlyShowOnHover(context.hideIconWhenCollapsed())
                    .titleOnlyShowOnHover(context.hideTitleWhenCollapsed())
                    .descriptionOnlyShowOnHover(context.hideDescriptionWhenCollapsed())
                    .annotationOnlyShowOnHover(context.hideAnnotationsWhenCollapsed())
                    .iconDiameter(18)
                    .iconPaddingPercent(1)
                    .titleColor("#E3151A")
                    .titleFontSize(14)
                    .descriptionColor("#000000")
                    .descriptionFontSize(15)
                    .iconColor("#E3151A")
                    .titleColor("#E3151A")
                    .descriptionColor("#E3151A")
                    .backgroundShape("pin")
                    .backgroundColorFill("#F8F8F8")
                    .backgroundColorStroke("#CCCCCC")
                    .cornerRadius(5)
                    .arrowHeight(10)
                    .arrowWidth(16)
                    ;
                context.localEntityPin.set(this, entityPin);
            })
            .merge(entityPins)
            .each(function (d, i) {
                const entityPin = context.localEntityPin.get(this);
                if (d[0] !== entityPin.title() && d[1] !== entityPin.description()) {
                    const parsed_start_time = context.brAxis.parse(d[1]);
                    const formatted_start_time = context.tooltipFormatter(parsed_start_time);
                    entityPin
                        .x(context.dataStartPos(d) - 0)
                        .y(0)
                        .iconOnlyShowOnHover(context.hideIconWhenCollapsed())
                        .titleOnlyShowOnHover(context.hideTitleWhenCollapsed())
                        .descriptionOnlyShowOnHover(context.hideDescriptionWhenCollapsed())
                        .annotationOnlyShowOnHover(context.hideAnnotationsWhenCollapsed())
                        .title(d[0])
                        .description(formatted_start_time)
                        .animationFrameRender()
                        ;
                } else {
                    entityPin.move({ x: context.dataStartPos(d) - 0, y: 0 });
                }
            })
            ;
        entityPins.exit()
            .each(function (d, i) {
                const entityPin = context.localEntityPin.get(this);
                entityPin.target(null);

            })
            .remove();
    }

    updateEventRanges(events, ranges, bucketIndex, eventRangeHeight, tlAxisBBox, brAxisBBox, width) {
        const context = this;

        const buckets = this.gLowerContent.selectAll(".buckets").data(ranges, d => d[0]);
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

        const lines = this.gLowerContent.selectAll(".line").data(events, d => {
            return d[0];
        });
        lines.enter().append("line")
            .attr("class", "line")
            .merge(lines)
            .attr(this.isHorizontal() ? "x1" : "y1", d => this.dataStartPos(d) - 0)
            .attr(this.isHorizontal() ? "x2" : "y2", d => this.dataStartPos(d) - 0)
            .attr(this.isHorizontal() ? "y1" : "x1", this.isHorizontal() ? tlAxisBBox.height : tlAxisBBox.width)
            .attr(this.isHorizontal() ? "y2" : "x2", this.isHorizontal() ? eventRangeHeight - brAxisBBox.height : width - brAxisBBox.width)
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
