import { format as d3Format, HTMLWidget, Palette } from "@hpcc-js/common";
import { QuartileCandlestick } from "./QuartileCandlestick";
import { Scatter } from "./Scatter";

const rainbow = Palette.rainbow("Blues");
const palette = Palette.ordinal("Quartile", [rainbow(100, 0, 100), rainbow(50, 0, 100), rainbow(50, 0, 100), rainbow(75, 0, 100)]);
palette("Std. Dev.");
palette("MinMax");
palette("25%");
palette("50%");

type Mode = "min_max" | "25_75" | "normal";
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

export class StatChart extends HTMLWidget {

    private _mean: number;
    private _standardDeviation: number;
    private _quartiles: number[];
    private _selectMode: any;
    private _tickFormatter: (_: number) => string;

    private _bellCurve: Scatter = new Scatter()
        .columns(["", "Std. Dev."])
        .paletteID("Quartile")
        .interpolate_default("basis")
        .pointSize(0)
        .xAxisType("linear")
        .xAxisOverlapMode("none")
        .xAxisTickFormat(".2s")
        .yAxisHidden(true)
        .yAxisDomainLow(0)
        .yAxisDomainHigh(110)
        .yAxisGuideLines(false) as Scatter
        ;

    private _candle = new QuartileCandlestick()
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

    private stdDev(degrees: number): number {
        return this.mean() + degrees * this.standardDeviation();
    }

    private formatStdDev(degrees: number): string {
        return this._tickFormatter(this.stdDev(degrees));
    }

    private quartile(q: 0 | 1 | 2 | 3 | 4): number {
        return this.data()[0][q];
    }

    private formatQ(q: 0 | 1 | 2 | 3 | 4): string {
        return this._tickFormatter(this.quartile(q));
    }

    private domain(mode: Mode): [number, number] {
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

    mean(): number;
    mean(_: number): this;
    mean(_?: number): this | number {
        if (!arguments.length) return this._mean;
        this._mean = _;
        if (this.data()[0]) {
            this.data()[0][5] = _;
        }
        return this;
    }

    standardDeviation(): number;
    standardDeviation(_: number): this;
    standardDeviation(_?: number): this | number {
        if (!arguments.length) return this._standardDeviation;
        this._standardDeviation = _;
        if (this.data()[0]) {
            this.data()[0][6] = _;
        }
        return this;
    }

    quartiles(): number[];
    quartiles(_: number[]): this;
    quartiles(_?: number[]): this | number[] {
        if (!arguments.length) return this._quartiles;
        this._quartiles = _;
        if (this.data()[0]) {
            this.data()[0] = _.concat(this.data()[0].slice(-2));
        }
        return this;
    }

    enter(domNode, element) {
        super.enter(domNode, element);

        this._bellCurve.target(element.append("div").node());

        this._candle.target(element.append("div").node());

        this._selectMode = element.append("div")
            .style("position", "absolute")
            .style("top", "0px")
            .style("right", "0px").append("select")
            .on("change", () => {
                this.render();
            })
            ;
        this._selectMode.append("option").attr("value", "min_max").text("Min / Max");
        this._selectMode.append("option").attr("value", "25_75").text("25% / 75%");
        this._selectMode.append("option").attr("value", "normal").text("Normal");
    }

    private bellTicks(mode: Mode): AxisTicks {
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

        const [domainLow, domainHigh] = this.domain(this._selectMode.node().value);
        return ticks
            .filter(sd => sd.value >= domainLow && sd.value <= domainHigh)
            .map(sd => ({ label: sd.label, value: sd.value.toString() }))
            ;
    }

    updateScatter() {
        const mode = this._selectMode.node().value;
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
            .pos({ x: candleX + candleW / 2, y: this.candleHeight() / 2 })
            .width(candleW)
            .candleWidth(this.candleHeight())
            .data(this.quartiles())
            .render()
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);
        this._tickFormatter = myFormatter(this.tickFormat());
        if (this.data()[0] && this.data()[0].length === 7) {
            this.quartiles(this.data()[0].slice(0, 5));
            this.mean(this.data()[0][5]);
            this.standardDeviation(this.data()[0][6]);
        }
        this.updateScatter();
        this.updateCandle();
    }
}
export interface StatChart {
    tickFormat(): string;
    tickFormat(_: string): this;
    candleHeight(): number;
    candleHeight(_: number): this;
    domainPadding(): number;
    domainPadding(_: number): this;
}
StatChart.prototype.publish("tickFormat", ".2e", "string", "X-Axis Tick Format");
StatChart.prototype.publish("candleHeight", 20, "number", "Height of candle widget (pixels)");
StatChart.prototype.publish("domainPadding", 10, "number", "Domain value padding");
