import { I1DChart } from "@hpcc-js/api";
import { HTMLWidget } from "@hpcc-js/common";
import "amcharts3/amcharts/gauge";
import { scaleLinear as d3ScaleLinear } from "d3-scale";

declare const require: any;

const AmCharts = (window as any).AmCharts;

export class Gauge extends HTMLWidget {
    _chart: any = {};

    constructor() {
        super();
        this._tag = "div";
    }

    updateChartOptions() {
        this._chart.type = "gauge";
        this._chart.theme = "none";

        this._chart.startDuration = this.animatationDuration();

        this._chart.color = this.fontColor();
        this._chart.fontSize = this.fontSize();
        this._chart.fontFamily = this.fontFamily();

        this._chart.titles = [];
        this._chart.allLabels = [];

        if (this.marginLeft()) { this._chart.marginLeft = this.marginLeft(); }
        if (this.marginRight()) { this._chart.marginRight = this.marginRight(); }
        if (this.marginTop()) { this._chart.marginTop = this.marginTop(); }
        if (this.marginBottom()) { this._chart.marginBottom = this.marginBottom(); }

        this._chart.axes[0].axisThickness = this.axisLineWidth();
        this._chart.axes[0].axisAlpha = this.axisAlpha();
        this._chart.axes[0].tickAlpha = this.tickAlpha();
        this._chart.axes[0].valueInterval = this.valueInterval();
        this._chart.axes[0].bands = [];
        this._chart.axes[0].bottomText = this.bottomText();
        this._chart.axes[0].bottomTextYOffset = this.bottomTextYOffset();
        this._chart.axes[0].endValue = this.high();
        this._chart.axes[0].startValue = this.low();

        // 3 Color Methods
        let i;
        let l;
        if (this.colorType() === "a") {
            const scale = d3ScaleLinear()
                .domain([0, 100])
                .range([this.low(), this.high()])
                ;
            for (i = 0, l = this.numBands(); i < l; i++) {
                const a_band = {
                    color: this.bandsColor()[i],
                    startValue: scale(this.bandsStartValue()[i]),
                    endValue: scale(this.bandsEndValue()[i]),
                    innerRadius: this.bandsInnerRadius()[i],
                };
                this._chart.axes[0].bands.push(a_band);
            }
        }
        if (this.colorType() === "b") {
            for (i = 0, l = this.high(); i < l; i++) {
                const b_band = {
                    color: this._palette(i, this.low(), this.high()),
                    startValue: i,
                    endValue: i + 1,
                    // innerRadius: this._bandsInnerRadius[i] || "", // this has a cool effect might be useful?
                    innerRadius: this.bandsInnerRadius()[0]
                };
                this._chart.axes[0].bands.push(b_band);
            }
        }
        if (this.colorType() === "c") {
            const c_band = {
                color: this._palette(this.data(), this.low(), this.high()),
                startValue: this.low(),
                endValue: this.high(),
                innerRadius: this.bandsInnerRadius()[0]
            };
            this._chart.axes[0].bands.push(c_band);
        }

        this._chart.axes[0].bottomText = this.bottomText().replace("[[data]]", this.data());

        return this._chart;
    }

    update(domNode, element) {
        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        domNode.style.width = this.size().width + "px";
        domNode.style.height = this.size().height + "px";

        this.updateChartOptions();
        this._chart.arrows[0].setValue(this.data());

        this._chart.validateNow();
        this._chart.validateData();
    }

    enter(domNode, element) {
        domNode.style.width = this.size().width + "px";
        domNode.style.height = this.size().height + "px";

        const initObj: any = {
            type: "gauge",
            addClassNames: true,
            axes: [{}],
            arrows: [{}],
        };
        if (typeof (window as any).define === "function" && (window as any).define.amd) {
            initObj.pathToImages = require && require.toUrl ? require.toUrl("amchartsImg") : ".";
        }
        this._chart = AmCharts.makeChart(domNode, initObj);
    }

    paletteID: { (): string; (_: string): Gauge };
    paletteID_exists: () => boolean;
    low: { (): number; (_: number): Gauge };
    low_exists: () => boolean;
    high: { (): number; (_: number): Gauge };
    high_exists: () => boolean;
    fontSize: { (): number; (_: number): Gauge };
    fontSize_exists: () => boolean;
    fontFamily: { (): string; (_: string): Gauge };
    fontFamily_exists: () => boolean;
    fontColor: { (): string; (_: string): Gauge };
    fontColor_exists: () => boolean;
    axisLineWidth: { (): number; (_: number): Gauge };
    axisLineWidth_exists: () => boolean;
    colorType: { (): string; (_: string): Gauge };
    colorType_exists: () => boolean;
    marginLeft: { (): number; (_: number): Gauge };
    marginLeft_exists: () => boolean;
    marginRight: { (): number; (_: number): Gauge };
    marginRight_exists: () => boolean;
    marginTop: { (): number; (_: number): Gauge };
    marginTop_exists: () => boolean;
    marginBottom: { (): number; (_: number): Gauge };
    marginBottom_exists: () => boolean;
    numBands: { (): number; (_: number): Gauge };
    numBands_exists: () => boolean;
    bandsColor: { (): any[]; (_: any[]): Gauge };
    bandsColor_exists: () => boolean;
    bandsStartValue: { (): any[]; (_: any[]): Gauge };
    bandsStartValue_exists: () => boolean;
    bandsEndValue: { (): any[]; (_: any[]): Gauge };
    bandsEndValue_exists: () => boolean;
    bandsInnerRadius: { (): any[]; (_: any[]): Gauge };
    bandsInnerRadius_exists: () => boolean;
    axisAlpha: { (): number; (_: number): Gauge };
    axisAlpha_exists: () => boolean;
    tickAlpha: { (): number; (_: number): Gauge };
    tickAlpha_exists: () => boolean;
    valueInterval: { (): number; (_: number): Gauge };
    valueInterval_exists: () => boolean;
    bottomText: { (): string; (_: string): Gauge };
    bottomText_exists: () => boolean;
    bottomTextYOffset: { (): number; (_: number): Gauge };
    bottomTextYOffset_exists: () => boolean;
    animatationDuration: { (): number; (_: number): Gauge };
    animatationDuration_exists: () => boolean;
    useClonedPalette: { (): boolean; (_: boolean): Gauge };
    useClonedPalette_exists: () => boolean;

    //  I1DChart
    _palette;
    click: (row, column, selected) => void;
    dblclick: (row, column, selected) => void;
}
Gauge.prototype._class += " amchart_Gauge";
Gauge.prototype.implements(I1DChart.prototype);

Gauge.prototype.publish("paletteID", "default", "set", "Palette ID", Gauge.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
Gauge.prototype.publish("low", 0, "number", "Gauge lower bound", null, { tags: ["Intermediate", "Shared"] });
Gauge.prototype.publish("high", 100, "number", "Gauge higher bound", null, { tags: ["Intermediate", "Shared"] });

Gauge.prototype.publish("fontSize", 11, "number", "Font Size", null, { tags: ["Basic", "Shared"] });
Gauge.prototype.publish("fontFamily", "Verdana", "string", "Font Name", null, { tags: ["Basic", "Shared", "Shared"] });
Gauge.prototype.publish("fontColor", "#000000", "html-color", "Font Color", null, { tags: ["Basic", "Shared"] });

Gauge.prototype.publish("axisLineWidth", 1, "number", "Thickness of axis", null, { tags: ["Intermediate"] });

Gauge.prototype.publish("colorType", "a", "set", "", ["a", "b", "c"], { tags: ["Basic"] });

Gauge.prototype.publish("marginLeft", null, "number", "Margin (Left)", null, { tags: ["Intermediate"] });
Gauge.prototype.publish("marginRight", null, "number", "Margin (Right)", null, { tags: ["Intermediate"] });
Gauge.prototype.publish("marginTop", null, "number", "Margin (Top)", null, { tags: ["Intermediate"] });
Gauge.prototype.publish("marginBottom", null, "number", "Margin (Bottom)", null, { tags: ["Intermediate"] });

Gauge.prototype.publish("numBands", null, "number", "", null, { tags: ["Intermediate"] });
Gauge.prototype.publish("bandsColor", [], "array", "Bands Color", null, { tags: ["Basic"] });
Gauge.prototype.publish("bandsStartValue", [], "array", "Bands Start Value %", null, { tags: ["Advanced"] });
Gauge.prototype.publish("bandsEndValue", [], "array", "Bands End Value %", null, { tags: ["Advanced"] });
Gauge.prototype.publish("bandsInnerRadius", [], "array", "Bands Inner Radius", null, { tags: ["Advanced"] });

Gauge.prototype.publish("axisAlpha", 0.2, "number", "Axis Alpha", null, { tags: ["Intermediate"] });
Gauge.prototype.publish("tickAlpha", 0.2, "number", "Tick Alpha", null, { tags: ["Intermediate"] });
Gauge.prototype.publish("valueInterval", null, "number", "Value Interval", null, { tags: ["Advanced"], optional: true });
Gauge.prototype.publish("bottomText", "", "string", "Text Along Bottom", null, { tags: ["Intermediate"] });
Gauge.prototype.publish("bottomTextYOffset", -20, "number", "Bottom Text Vertical Offset", null, { tags: ["Intermediate"] });

Gauge.prototype.publish("animatationDuration", 2, "number", "Animation Duration (sec)", null, { tags: ["Intermediate"] });

Gauge.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
