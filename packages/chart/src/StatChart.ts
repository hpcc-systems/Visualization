import { format as d3Format, HTMLWidget, Palette } from "@hpcc-js/common";
import { QuartileCandlestick } from "./QuartileCandlestick";
import { Scatter } from "./Scatter";

const rainbow = Palette.rainbow("Blues");
const palette = Palette.ordinal("Quartile", [rainbow(100, 0, 100), rainbow(50, 0, 100), rainbow(50, 0, 100), rainbow(75, 0, 100)]);
palette("Std. Dev.");
palette("MinMax");
palette("25%");
palette("50%");

type View = "min_max" | "25_75" | "normal";
type Tick = { label: string, value: number };
type Ticks = Tick[];
type AxisTick = { label: string, value: string };
type AxisTicks = AxisTick[];

function myFormatter(format: string): (num: number) => string {
    const formatter = d3Format(format);
    return function (num: number) {
        const strVal = (Math.round(num * 100) / 100).toString();
        if (strVal.length <= 4) return strVal;
        return formatter(num);
    };
}

export type StatChartView = "min_max" | "25_75" | "normal";
export type Quartiles = [number, number, number, number, number];
export type Data = [[number, number, number, number, number, number, number]];

export class StatChart extends HTMLWidget {

    protected _selectElement: any;
    protected _tickFormatter: (_: number) => string;

    protected _bellCurve: Scatter = new Scatter()
        .columns(["", "Std. Dev."])
        .paletteID("Quartile")
        .interpolate_default("basis")
        .pointSize(0)
        .xAxisType("linear")
        .xAxisOverlapMode("none")
        .xAxisTickFormat(",")
        .yAxisHidden(true)
        .yAxisDomainLow(0)
        .yAxisDomainHigh(110)
        .yAxisGuideLines(false) as Scatter
        ;

    protected _candle = new QuartileCandlestick()
        .columns(["Min", "25%", "50%", "75%", "Max"])
        .edgePadding(0)
        .roundedCorners(1)
        .lineWidth(1)
        .upperTextRotation(-90)
        .lowerTextRotation(-90)
        .labelFontSize(0)
        .valueFontSize(0)
        .lineColor(rainbow(90, 0, 100))
        .innerRectColor(rainbow(10, 0, 100))
        ;

    constructor() {
        super();
        this
            .columns(["Min", "25%", "50%", "75%", "Max", "Mean", "Std. Dev."])
            ;
    }

    protected stdDev(degrees: number): number {
        return this.mean() + degrees * this.standardDeviation();
    }

    protected formatStdDev(degrees: number): string {
        return this._tickFormatter(this.stdDev(degrees));
    }

    protected quartile(q: 0 | 1 | 2 | 3 | 4): number {
        return this.quartiles()[q];
    }

    protected formatQ(q: 0 | 1 | 2 | 3 | 4): string {
        return this._tickFormatter(this.quartile(q));
    }

    protected domain(mode: View): [number, number] {
        switch (mode) {
            case "25_75":
                return [this.quartile(1), this.quartile(3)];
            case "normal":
                return [this.stdDev(-4), this.stdDev(4)];
            case "min_max":
            default:
                return [this.quartile(0), this.quartile(4)];
        }
    }

    protected min(): number {
        return this.quartile(0);
    }

    protected max(): number {
        return this.quartile(4);
    }

    data(): Data;
    data(_: Data): this;
    data(_?: Data): Data | this {
        if (!arguments.length) return [[...this.quartiles(), this.mean(), this.standardDeviation()]];
        const row = _[0];
        this.quartiles([row[0], row[1], row[2], row[3], row[4]]);
        this.mean(row[5]);
        this.standardDeviation(row[6]);
        return this;
    }

    enter(domNode, element) {
        super.enter(domNode, element);

        this._bellCurve.target(element.append("div").node());

        this._candle.target(element.append("div").node());

        this._selectElement = element.append("div")
            .style("position", "absolute")
            .style("top", "0px")
            .style("right", "0px").append("select")
            .on("change", () => {
                this.view(this._selectElement.node().value);
                this.lazyRender();
            })
            ;
        this._selectElement.append("option").attr("value", "min_max").text("Min / Max");
        this._selectElement.append("option").attr("value", "25_75").text("25% / 75%");
        this._selectElement.append("option").attr("value", "normal").text("Normal");
    }

    protected bellTicks(mode: View): AxisTicks {
        let ticks: Ticks;
        switch (mode) {
            case "25_75":
                ticks = [
                    { label: this.formatQ(1), value: this.quartile(1) },
                    { label: this.formatQ(2), value: this.quartile(2) },
                    { label: this.formatQ(3), value: this.quartile(3) }
                ];
                break;
            case "normal":
                ticks = [
                    { label: this.formatStdDev(-4), value: this.stdDev(-4) },
                    { label: "-3σ", value: this.stdDev(-3) },
                    { label: "-2σ", value: this.stdDev(-2) },
                    { label: "-1σ", value: this.stdDev(-1) },
                    { label: this.formatStdDev(0), value: this.stdDev(0) },
                    { label: "+1σ", value: this.stdDev(1) },
                    { label: "+2σ", value: this.stdDev(2) },
                    { label: "+3σ", value: this.stdDev(3) },
                    { label: this.formatStdDev(4), value: this.stdDev(4) }
                ];
                break;
            case "min_max":
            default:
                ticks = [
                    { label: this.formatQ(0), value: this.quartile(0) },
                    { label: this.formatQ(1), value: this.quartile(1) },
                    { label: this.formatQ(2), value: this.quartile(2) },
                    { label: this.formatQ(3), value: this.quartile(3) },
                    { label: this.formatQ(4), value: this.quartile(4) }
                ];
        }

        const [domainLow, domainHigh] = this.domain(this._selectElement.node().value);
        return ticks
            .filter(sd => sd.value >= domainLow && sd.value <= domainHigh)
            .map(sd => ({ label: sd.label, value: sd.value.toString() }))
            ;
    }

    updateScatter() {
        const mode = this._selectElement.node().value;
        const [domainLow, domainHigh] = this.domain(mode);
        const padding = (domainHigh - domainLow) * (this.domainPadding() / 100);

        this._bellCurve
            .xAxisDomainLow(domainLow - padding)
            .xAxisDomainHigh(domainHigh + padding)
            .xAxisTicks(this.bellTicks(mode))
            .data([
                [this.stdDev(-4), 0],
                [this.stdDev(-3), 0.3],
                [this.stdDev(-2), 5],
                [this.stdDev(-1), 68],
                [this.stdDev(0), 100],
                [this.stdDev(1), 68],
                [this.stdDev(2), 5],
                [this.stdDev(3), 0.3],
                [this.stdDev(4), 0]
            ])
            .resize({ width: this.width(), height: this.height() - this.candleHeight() })
            .render()
            ;
    }

    updateCandle() {
        const candleX = this._bellCurve.dataPos(this.quartile(0));
        const candleW = this._bellCurve.dataPos(this.quartile(4)) - candleX;
        this._candle
            .resize({ width: this.width(), height: this.candleHeight() })
            .pos({ x: (candleX + candleW / 2) + 2, y: this.candleHeight() / 2 })
            .width(candleW)
            .candleWidth(this.candleHeight())
            .data(this.quartiles())
            .render()
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);
        this._tickFormatter = myFormatter(this.tickFormat());
        this._selectElement.node().value = this.view();
        this.updateScatter();
        this.updateCandle();
    }
}
StatChart.prototype._class += " chart_Stat";

export interface StatChart {
    view(): StatChartView;
    view(_: StatChartView): this;

    tickFormat(): string;
    tickFormat(_: string): this;
    candleHeight(): number;
    candleHeight(_: number): this;
    domainPadding(): number;
    domainPadding(_: number): this;

    mean(): number;
    mean(_: number): this;
    standardDeviation(): number;
    standardDeviation(_: number): this;
    quartiles(): Quartiles;
    quartiles(_: Quartiles): this;
}
StatChart.prototype.publish("view", "min_max", "set", "View", ["min_max", "25_75", "normal"]);

StatChart.prototype.publish("tickFormat", ".2e", "string", "X-Axis Tick Format");
StatChart.prototype.publish("candleHeight", 20, "number", "Height of candle widget (pixels)");
StatChart.prototype.publish("domainPadding", 10, "number", "Domain value padding");

StatChart.prototype.publish("mean", .5, "number", "Mean");
StatChart.prototype.publish("standardDeviation", .125, "number", "Standard Deviation (σ)");
StatChart.prototype.publish("quartiles", [0, .25, .5, .75, 1], "object", "Quartiles (Min, 25%, 50%, 75%, Max)");
