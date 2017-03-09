import { extent as d3Extent } from "d3-array";
import { scaleBand as d3ScaleBand } from "d3-scale";
import { local as d3Local } from "d3-selection";
import { Axis } from "../chart/Axis";
import { publish } from "../common/PropertyExt";
import { SVGWidget } from "../common/SVGWidget";
import { TextBox } from "../common/TextBox";

import "./MiniGantt.css";

export class MiniGantt extends SVGWidget {
    protected topAxis: Axis;
    protected bottomAxis: Axis;
    protected verticalBands;
    protected svgEvents;
    protected svg;
    protected svgGuide;
    private localText = d3Local<TextBox>();

    protected rootExtent;

    @publish(2, "Force new lane if start/end is within X pixels")
    overlapTolerence: { (): number; (_: number): MiniGantt; };

    constructor() {
        super();
        this.topAxis = new Axis()
            .orientation("top")
            .type("time")
            .timePattern("%Y-%m-%dT%H:%M:%S.%LZ")
            .tickFormat("%H:%M:%S")
            ;
        this.bottomAxis = new Axis()
            .orientation("bottom")
            .type("time")
            .timePattern("%Y-%m-%dT%H:%M:%S.%LZ")
            .tickFormat("%H:%M:%S")
            ;
        this.verticalBands = d3ScaleBand()
            .paddingOuter(0.2)
            .paddingInner(0.2)
            ;
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
        const data = this.data();
        const events = data.filter(d => !d[2]);
        const ranges = data.filter(d => !!d[2]);
        const eventTicks = events.map((d) => {
            return {
                label: d[0],
                value: d[1]
            };
        });

        this.topAxis
            .width(width - 1)
            .height(height)
            .low(extent[0])
            .high(extent[1])
            .ticks(eventTicks)
            .render()
            ;
        const topAxisBBox = this.topAxis.getBBox();

        this.bottomAxis
            .width(width - 1)
            .height(height)
            .low(extent[0])
            .high(extent[1])
            .render()
            ;
        const bottomAxisBBox = this.bottomAxis.getBBox();

        interface BucketInfo {
            endPos: number;
        }
        const bucketData: BucketInfo[] = [];
        const bucketIndex = {};
        ranges.forEach(d => {
            for (let i = 0; i < bucketData.length; ++i) {
                const bucket = bucketData[i];
                if (bucket.endPos + this.overlapTolerence() <= this.dataStartPos(d)) {
                    bucketIndex[d] = i;
                    bucket.endPos = this.dataEndPos(d);
                    break;
                }
            }

            if (bucketIndex[d] === undefined) {
                bucketIndex[d] = bucketData.length;
                bucketData.push({
                    endPos: this.dataEndPos(d)
                });
            }
        });

        this.verticalBands
            .range([-height / 2 + topAxisBBox.height, height / 2 - bottomAxisBBox.height])
            .domain(bucketData.map((_d, i) => i))
            ;

        const context = this;
        const buckets = this.svgEvents.selectAll(".buckets").data(ranges, d => d[0]);
        const enterBuckets = buckets.enter().append("g")
            .attr("class", "buckets")
            .each(function (d) {
                const text = new TextBox()
                    .target(this)
                    .anchor("start")
                    .on("dblclick", () => {
                        context.rootExtent = d;
                        context.lazyRender();
                    }, true)
                    ;
                context.localText.set(this, text);
            });
        enterBuckets
            .merge(buckets)
            .attr("transform", d => `translate(${this.dataStartPos(d) - width / 2}, ${this.verticalBands(bucketIndex[d])})`)
            .each(function (d) {
                const text = context.localText.get(this);
                text
                    .pos({ x: context.dataWidth(d) / 2, y: context.verticalBands.bandwidth() / 2 })
                    .fixedSize({ width: context.dataWidth(d), height: context.verticalBands.bandwidth() })
                    .text(d[0])
                    .tooltip(d[0])
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
