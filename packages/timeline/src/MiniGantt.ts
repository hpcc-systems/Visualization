import { Axis } from "@hpcc-js/chart";
import { publish, SVGWidget, TextBox } from "@hpcc-js/common";
import { extent as d3Extent } from "d3-array";
import { scaleBand as d3ScaleBand } from "d3-scale";
import { local as d3Local } from "d3-selection";

import "../src/MiniGantt.css";

export class MiniGantt extends SVGWidget {
    protected topAxis: Axis;
    protected bottomAxis: Axis;
    protected verticalBands;
    protected svgEvents;
    protected svg;
    protected svgGuide;
    private localText = d3Local<TextBox>();

    protected rootExtent;

    @publish("%Y-%m-%d", "string", "Time Series Pattern")
    timePattern: publish<this, string>;
    @publish("%Y-%m-%d", "string", "Tick Format", null, { optional: true })
    tickFormat: publish<this, string>;
    @publish(2, "number", "Force new lane if start/end is within X pixels")
    overlapTolerence: publish<this, number>;
    @publish("horizontal", "set", "Orientation", ["horizontal", "vertical"])
    orientation: publish<this, string>;

    constructor() {
        super();
        this.topAxis = new Axis()
            .type("time")
            ;
        this.bottomAxis = new Axis()
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
        return this.bottomAxis.scalePos(d[1]);
    }

    dataEndPos(d) {
        return this.bottomAxis.scalePos(d[2]);
    }

    dataWidth(d) {
        return this.dataEndPos(d) - this.dataStartPos(d);
    }

    private background;
    enter(domNode, element) {
        super.enter(domNode, element);
        this.background = element.append("rect")
            .attr("fill", "white")
            .attr("opacity", 0)
            .on("dblclick", () => {
                delete this.rootExtent;
                this.lazyRender();
            })
            ;
        this.svg = element.append("g")
            ;
        this.svgGuide = this.svg.append("g");
        this.svgEvents = this.svg.append("g");
        this.topAxis
            .target(this.svg.node())
            .guideTarget(this.svgGuide.node())
            .shrinkToFit("none")
            .overlapMode("stagger")
            ;
        this.bottomAxis
            .target(this.svg.node())
            .guideTarget(this.svgGuide.node())
            .shrinkToFit("none")
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);
        this.background
            .attr("x", this.x() + this._drawStartPos === "origin" ? 0 : -this.width() / 2)
            .attr("y", this.y() + this._drawStartPos === "origin" ? 0 : -this.height() / 2)
            .attr("width", this.width())
            .attr("height", this.height())
            ;

        const width = this.width();
        const height = this.height();
        const extent = this.extent();

        this.topAxis
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

        this.bottomAxis
            .orientation(this.isHorizontal() ? "bottom" : "right")
            .reverse(!this.isHorizontal())
            .timePattern(this.timePattern())    //  "%Y-%m-%dT%H:%M:%S.%LZ"
            .tickFormat(this.tickFormat())      //  "%H:%M:%S"
            .width(width - 1)
            .height(height)
            .low(extent[0])
            .high(extent[1])
            .updateScale()
            ;

        const data = this.data().sort(this.isHorizontal() ? (l, r) => {
            return this.bottomAxis.scalePos(l[1]) - this.bottomAxis.scalePos(r[1]);
        } : (l, r) => {
            return this.bottomAxis.scalePos(r[1]) - this.bottomAxis.scalePos(l[1]);
        });
        const events = data.filter(d => !d[2]);
        const ranges = data.filter(d => !!d[2]);
        const eventTicks = events.map((d) => {
            return {
                label: d[0],
                value: d[1]
            };
        });

        this.topAxis
            .ticks(eventTicks)
            .render()
            ;
        const topAxisBBox = this.topAxis.getBBox();

        this.bottomAxis
            .render()
            ;
        const bottomAxisBBox = this.bottomAxis.getBBox();

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

        const vbLower = this.isHorizontal() ? -height / 2 + topAxisBBox.height : -width / 2 + topAxisBBox.width;
        const vbHigher = this.isHorizontal() ? height / 2 - bottomAxisBBox.height : width / 2 - bottomAxisBBox.width;

        this.verticalBands
            .range([vbLower, vbHigher])
            .domain(bucketData.map((_d, i) => i))
            ;

        const context = this;
        const buckets = this.svgEvents.selectAll(".buckets").data(ranges, d => d[0]);
        buckets.enter().append("g")
            .attr("class", "buckets")
            .each(function (d) {
                const text = new TextBox()
                    .target(this)
                    .anchor("center")
                    .on("dblclick", () => {
                        context.rootExtent = d;
                        context.lazyRender();
                    }, true)
                    ;
                context.localText.set(this, text);
            })
            .merge(buckets)
            .attr("transform", d => context.isHorizontal() ?
                `translate(${this.dataStartPos(d) - width / 2}, ${this.verticalBands(bucketIndex[d])})` :
                `translate(${this.verticalBands(bucketIndex[d])}, ${this.dataStartPos(d) - height / 2})`)
            .each(function (d) {
                const textBox = context.localText.get(this);
                const x = context.dataWidth(d) / 2;
                const y = context.verticalBands.bandwidth() / 2;
                const textBoxWidth = context.dataWidth(d);
                const textBoxHeight = context.verticalBands.bandwidth();
                textBox
                    .pos(context.isHorizontal() ? { x, y } : { x: y, y: x })
                    .fixedSize(context.isHorizontal() ? { width: textBoxWidth, height: textBoxHeight } : { width: textBoxHeight, height: textBoxWidth })
                    .text(d[0])
                    .tooltip(`${d[0]} [${context.bottomAxis.parseFormat(d[1])}->${context.bottomAxis.parseFormat(d[2])}]`)
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
            .attr("x1", d => this.dataStartPos(d) - width / 2)
            .attr("x2", d => this.dataStartPos(d) - width / 2)
            .attr("y1", -height / 2 + topAxisBBox.height)
            .attr("y2", height / 2 - bottomAxisBBox.height)
            ;
        lines.exit().remove();
    }
}
MiniGantt.prototype._class += " timeline_MiniGantt";
