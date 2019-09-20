import { publish, SVGWidget } from "@hpcc-js/common";
import { format as d3Format } from "d3-format";
import { interpolate as d3Interpolate, interpolateHcl as d3InterpolateHcl } from "d3-interpolate";
import { scaleLinear } from "d3-scale";
import { Arc, arc as d3Arc, DefaultArcObject } from "d3-shape";
import { annotation as d3Annotation, annotationCalloutElbow } from "d3-svg-annotation";

function value2Angle(value: number): number {
    return (value - 0.5) * .65 * 2 * Math.PI;
}

function pointOnArc(angle: number, radius: number): { x: number, y: number } {
    return {
        x: Math.cos(angle - Math.PI / 2) * radius,
        y: Math.sin(angle - Math.PI / 2) * radius
    };
}

function indicatorTranslate(angle: number, radius: number, inner: boolean = false) {
    const point = pointOnArc(angle, radius);
    const rotation = angle * 180 / Math.PI + (inner === true ? 180 : 0);
    return `translate(${point.x}, ${point.y}) rotate(${rotation})`;
}

type IndicatorDatum = { angle: number };
function indicatorTween(newAngle: number, radius: number, inner: boolean = false) {
    return function (d: IndicatorDatum) {
        const interpolate = d3Interpolate(d.angle, newAngle);
        d.angle = newAngle;
        return function (t: number) {
            return indicatorTranslate(interpolate(t), radius, inner);
        };
    };
}

function arcTween(startAngle: number, endAngle: number, arc: Arc<any, DefaultArcObject>) {
    return function (d: DefaultArcObject) {
        const startInterpolate = d3Interpolate(d.startAngle, startAngle);
        const endInterpolate = d3Interpolate(d.endAngle, endAngle);
        return function (t: number): string {
            d.startAngle = startInterpolate(t);
            d.endAngle = endInterpolate(t);
            return arc(d)!;
        };
    };
}

export class Gauge extends SVGWidget {

    private _d3Arc: Arc<any, DefaultArcObject> = d3Arc()
        .innerRadius(85)
        .outerRadius(100)
        ;
    private _colorScale = scaleLinear<string, string>()
        .interpolate(d3InterpolateHcl)
        ;

    protected _usageArc: any;
    protected _meanArc: any;
    protected _freeArc: any;
    protected _indInner: any;
    protected _indOuter: any;
    protected _centerTextG: any;
    protected _centerText: any;
    protected _bottomTextG: any;
    protected _bottomText: any;
    protected _tooltipG: any;
    protected _mainTooltip: any;

    @publish("", "string")
    title: publish<this, string>;

    @publish("", "string")
    titleDescription: publish<this, string>;

    @publish(128, "number")
    maxDiameter: publish<this, number>;

    @publish(0, "number")
    value: publish<this, number>;

    @publish("", "string")
    valueDescription: publish<this, string>;

    @publish(false, "boolean")
    showTick: publish<this, boolean>;

    @publish(0, "number")
    tickValue: publish<this, number>;

    @publish("", "string")
    tickValueDescription: publish<this, string>;

    @publish("", "string")
    tooltip: publish<this, string>;

    constructor() {
        super();
    }

    protected tip(d: any) {
        if (d === null || d.label === "") {
            this._tooltipG
                .transition()
                .style("opacity", 0)
                .on("interrupt end", () => {
                    this._tooltipG
                        .selectAll("g")
                        .remove()
                        ;
                })
                ;
        } else {
            this._tooltipG
                .interrupt()
                .style("opacity", 1)
                ;
            d.w = (this._centerText.datum() as any).w + 10;
            let lineType = "horizontal";
            let xOffset = 0;
            let yOffset = 5;
            let padding: number | undefined = 5;
            if (d.y >= 5 && d.y <= 25) {
                xOffset = d.x < 0 ? -d.w / 2 : d.w / 2;
                yOffset = 12.5;
                padding = undefined;
                lineType = "vertical";
            } else if (d.y > 25) {
                yOffset = 25;
                padding = 0;
            }
            const annotationtip = d3Annotation()
                .type(annotationCalloutElbow)
                .annotations([{
                    data: d,
                    dx: -d.x + xOffset,
                    dy: -d.y + yOffset,
                    color: "black",
                    note: {
                        label: d.label,
                        lineType,
                        padding,
                        align: "middle"
                    }
                }])
                .accessors({ x: (d2: any) => d2.x, y: (d2: any) => d2.y });
            this._tooltipG.call(annotationtip as any);
        }
    }

    protected calcSize(textElement, width: number, height: number): { width: number, height: number, scale: number } {
        const bb = (textElement.node() as any).getBBox();
        const widthTransform = width / bb.width;
        const heightTransform = height / bb.height;
        const scale = widthTransform < heightTransform ? widthTransform : heightTransform;
        return {
            width: bb.width,
            height: bb.height,
            scale
        };
    }

    protected updateText(textElement, x: number, y: number, w: number, h: number) {
        textElement
            .datum({ x, y, w, h })
            .attr("transform", null)
            ;
        const size = this.calcSize(textElement, w, h);
        const x2 = x + w / 2 - size.width / 2 * size.scale;
        const y2 = y + h / 2 - size.height / 2 * size.scale;
        textElement.attr("transform", `translate(${x2}, ${y2}) scale(${size.scale})`);
    }

    calcWidth(): number {
        return Math.min(this.width(), this.height(), this.maxDiameter());
    }

    enter(domNode: HTMLElement, element) {
        super.enter(domNode, element);

        element.on("click", (d: Gauge) => {
            this.click(d);
        });

        this._usageArc = element.append("path").datum({ startAngle: value2Angle(0), endAngle: value2Angle(0) })
            .style("fill", "green")
            .on("mousemove", (d: any) => {
                const [x, y] = this._d3Arc.centroid(d);
                this.tip({ x, y, label: this.valueDescription() });
            })
            .on("mouseout", (d: any) => {
                this.tip(null);
            })
            ;
        this._freeArc = element.append("path").datum({ startAngle: value2Angle(0), endAngle: value2Angle(1) })
            .style("fill", "lightGrey")
            ;
        this._meanArc = element.append("path").datum({ startAngle: value2Angle(0), endAngle: value2Angle(0) })
            .style("fill", "black")
            .on("mousemove", (d: any) => {
                const [x, y] = this._d3Arc.centroid(d);
                this.tip({ x, y, label: this.tickValueDescription() });
            })
            .on("mouseout", (d: any) => {
                this.tip(null);
            })
            ;

        this._mainTooltip = element.append("title");

        const context = this;
        function appendIndicator() {
            return element.append("path").datum({ angle: value2Angle(0) })
                .style("fill", "black")
                .style("stroke", "black")
                .attr("d", "M  0 0 l -3 -3 l 6 0 z")
                .on("mousemove", (d: any) => {
                    const [x, y] = context._d3Arc.centroid(context._meanArc.datum() as any);
                    context.tip({ x, y, label: context.tickValueDescription() });
                })
                .on("mouseout", (d: any) => {
                    context.tip(null);
                })
                ;
        }
        this._indInner = appendIndicator();
        this._indOuter = appendIndicator();
        this._centerText = element.append("text")
            .attr("dy", ".66em")
            .style("fill", "green")
            .on("mousemove", (d: any) => {
                this.tip({ x: 0, y: 0, label: this.valueDescription() });
            })
            .on("mouseout", (d: any) => {
                this.tip(null);
            })
            ;
        this._bottomText = element.append("text")
            .attr("dy", ".66em")
            .style("fill", "black")
            .on("mousemove", (d: any) => {
                this.tip({ x: 0, y: d.y, label: this.titleDescription() });
            })
            .on("mouseout", (d: any) => {
                this.tip(null);
            })
            ;

        this._tooltipG = element.append("g")
            .attr("class", "annotation-tip")
            ;
    }

    update(domNode: HTMLElement, element) {
        super.update(domNode, element);

        this._colorScale
            .domain(this.colorDomain())
            .range(this.colorRange())
            ;
        element
            .attr("title", this.tooltip())
            .style("cursor", this.click !== Gauge.prototype.click ? "pointer" : null)
            ;

        const innerRadius = this.calcWidth() / 3;
        const outerRadius = this.calcWidth() / 2 - 5;
        this._d3Arc
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            ;

        const val = this.value();
        const tickVal = this.tickValue();

        this._usageArc
            .style("fill", this._colorScale(val))
            .transition()
            .duration(750)
            .attrTween("d", arcTween(value2Angle(0), value2Angle(val), this._d3Arc))
            ;

        this._freeArc
            .style("fill", this.emptyColor())
            .transition()
            .duration(750)
            .attrTween("d", arcTween(value2Angle(val), value2Angle(1), this._d3Arc))
            ;

        this._meanArc
            .style("fill", this.tickColor())
            .style("visibility", this.showTick() ? "visible" : "hidden")
            .transition()
            .duration(750)
            .attrTween("d", arcTween(value2Angle(tickVal - 0.001), value2Angle(tickVal + 0.001), this._d3Arc))
            ;

        this._indInner
            .style("fill", this.tickColor())
            .style("stroke", this.tickColor())
            .style("visibility", this.showTick() ? "visible" : "hidden")
            .transition()
            .duration(750)
            .attrTween("transform", indicatorTween(value2Angle(tickVal), innerRadius, true))
            ;

        this._indOuter
            .style("fill", this.tickColor())
            .style("stroke", this.tickColor())
            .style("visibility", this.showTick() ? "visible" : "hidden")
            .transition()
            .duration(750)
            .attrTween("transform", indicatorTween(value2Angle(tickVal), outerRadius))
            ;

        this._centerText
            .style("fill", this._colorScale(val))
            .text(d3Format(".0%")(val))
            ;

        this._bottomText
            .text(this.title())
            ;

        //  Update Text  ---
        const point = pointOnArc(value2Angle(1), innerRadius - 8);
        this.updateText(this._centerText, -point.x, -point.y, 2 * point.x, 2 * point.y);

        const point2 = pointOnArc(value2Angle(1), outerRadius);
        point2.y += 5;
        const width = this.calcWidth() - 20;
        const height = this.calcWidth() / 2 - point2.y - 5;
        this.updateText(this._bottomText, -width / 2, point2.y, width, height);

        this._mainTooltip.text(this.tooltip());
    }

    // Events  ---
    click(w: Gauge) {
    }
}
Gauge.prototype._class += " chart_Gauge";

export interface Gauge {
    tickColor(): string;
    tickColor(_: string): this;
    emptyColor(): string;
    emptyColor(_: string): this;
    colorDomain(): number[];
    colorDomain(_: number[]): this;
    colorRange(): string[];
    colorRange(_: string[]): this;
}

Gauge.prototype.publish("colorRange", ["green", "green", "green", "green", "green", "green", "green", "green", "orange", "red", "red"], "array", "Array of colors for the filled gauge portion. The fill color will be relative to the gauge value.");
Gauge.prototype.publish("colorDomain", [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], "array", "This array augments the mapping of the value to the fill colorRange.");
Gauge.prototype.publish("emptyColor", "lightgrey", "html-color", "Color of the empty portion of the gauge");
Gauge.prototype.publish("tickColor", "black", "html-color", "Color of the tick");
