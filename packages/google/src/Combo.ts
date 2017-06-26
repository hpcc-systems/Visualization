import { CommonND } from "./CommonND";

export class Combo extends CommonND {
    constructor() {
        super();

        this._chartType = "ComboChart";
    }

    getChartOptions() {
        const retVal = CommonND.prototype.getChartOptions.apply(this, arguments);

        const googleFormattedSeries = {};
        this.types().forEach(function (type, idx) {
            googleFormattedSeries[idx] = { type };
        });

        retVal.seriesType = this.defaultseriesType();
        retVal.series = googleFormattedSeries;
        retVal.dataOpacity = this.dataOpacity();
        retVal.isStacked = this.stacked();
        retVal.lineWidth = this.lineWidth();
        retVal.lineDashStyle = this.lineDashStyle();
        retVal.curveType = this.curveType();
        retVal.pointSize = this.pointSize();
        retVal.pointShape = this.pointShape();

        retVal.bar = {
            groupWidth: this.groupWidth()
        };

        retVal.hAxis = {};
        retVal.vAxis = {};

        // hAxis
        retVal.hAxis.baseline = this.xAxisBaseline();
        retVal.hAxis.baselineColor = this.xAxisBaselineColor();
        retVal.hAxis.direction = this.xAxisInversed() ? -1 : 1;
        retVal.hAxis.gridlines = {
            count: this.xAxisGridlinesCount(),
            color: this.xAxisGridlinesColor()
        };
        retVal.hAxis.minorGridlines = {
            count: this.xAxisMinorGridlinesCount(),
            color: this.xAxisMinorGridlinesColor()
        };
        retVal.hAxis.logScale = this.xAxisLogScale();
        retVal.hAxis.textPosition = this.xAxisTextPosition();
        retVal.hAxis.title = this.xAxisTitle();
        retVal.hAxis.minValue = this.xAxisMinValue();
        retVal.hAxis.maxValue = this.xAxisMaxValue();
        retVal.hAxis.slantedText = this.xAxisLabelRotation() !== 0;
        retVal.hAxis.slantedTextAngle = this.xAxisLabelRotation();

        retVal.hAxis.format = this.xAxisFormatType();
        retVal.hAxis.textStyle = {
            color: this.xAxisFontColor(),
            fontName: this.axisFontFamily() ? this.axisFontFamily() : this.fontFamily(),
            fontSize: this.axisFontSize() ? this.axisFontSize() : this.fontSize()

        };
        if (this.xAxisTicks().length > 0) {
            retVal.hAxis.ticks = this.xAxisTicks();
        }
        retVal.hAxis.titleTextStyle = {
            color: this.xAxisTitleFontColor(),
            fontName: this.xAxisTitleFontFamily(),
            fontSize: this.xAxisTitleFontSize()
        };
        retVal.hAxis.viewWindowMode = this.xAxisViewWindowMode();
        retVal.hAxis.viewWindow = {
            min: this.xAxisViewWindowMin(),
            max: this.xAxisViewWindowMax()
        };

        // vAxis
        retVal.vAxis.baseline = this.yAxisBaseline();
        retVal.vAxis.baselineColor = this.yAxisBaselineColor();
        retVal.vAxis.direction = this.yAxisInversed() ? -1 : 1;
        retVal.vAxis.gridlines = {
            count: this.yAxisGridlinesCount(),
            color: this.yAxisGridlinesColor()
        };
        retVal.vAxis.minorGridlines = {
            count: this.yAxisMinorGridlinesCount(),
            color: this.yAxisMinorGridlinesColor()
        };
        retVal.vAxis.logScale = this.yAxisLogScale();
        retVal.vAxis.textPosition = this.yAxisTextPosition();
        retVal.vAxis.title = this.yAxisTitle();
        retVal.vAxis.minValue = this.yAxisMinValue();
        retVal.vAxis.maxValue = this.yAxisMaxValue();

        retVal.vAxis.format = this.yAxisFormatType();
        retVal.vAxis.textStyle = {
            color: this.yAxisFontColor(),
            fontName: this.axisFontFamily() ? this.axisFontFamily() : this.fontFamily(),
            fontSize: this.axisFontSize() ? this.axisFontSize() : this.fontSize()
        };
        if (this.yAxisTicks().length > 0) {
            retVal.vAxis.ticks = this.yAxisTicks();
        }
        retVal.vAxis.titleTextStyle = {
            color: this.yAxisTitleFontColor(),
            fontName: this.yAxisTitleFontFamily(),
            fontSize: this.yAxisTitleFontSize()
        };
        retVal.vAxis.viewWindowMode = this.yAxisViewWindowMode();
        retVal.vAxis.viewWindow = {
            min: this.yAxisViewWindowMin(),
            max: this.yAxisViewWindowMax()
        };

        return retVal;
    }

    enter(domNode, element) {
        CommonND.prototype.enter.apply(this, arguments);
    }

    update(domNode, element) {
        CommonND.prototype.update.apply(this, arguments);
    }

    defaultseriesType: { (): string; (_: string): Combo };
    defaultseriesType_exists: () => boolean;
    types: { (): any[]; (_: any[]): Combo };
    types_exists: () => boolean;
    stacked: { (): boolean; (_: boolean): Combo };
    stacked_exists: () => boolean;
    lineWidth: { (): number; (_: number): Combo };
    lineWidth_exists: () => boolean;
    lineDashStyle: { (): any[]; (_: any[]): Combo };
    lineDashStyle_exists: () => boolean;
    curveType: { (): string; (_: string): Combo };
    curveType_exists: () => boolean;
    pointSize: { (): number; (_: number): Combo };
    pointSize_exists: () => boolean;
    pointShape: { (): string; (_: string): Combo };
    pointShape_exists: () => boolean;
    axisFontSize: { (): number; (_: number): Combo };
    axisFontSize_exists: () => boolean;
    axisFontFamily: { (): string; (_: string): Combo };
    axisFontFamily_exists: () => boolean;
    xAxisFontColor: { (): string; (_: string): Combo };
    xAxisFontColor_exists: () => boolean;
    yAxisFontColor: { (): string; (_: string): Combo };
    yAxisFontColor_exists: () => boolean;
    xAxisBaselineColor: { (): string; (_: string): Combo };
    xAxisBaselineColor_exists: () => boolean;
    yAxisBaselineColor: { (): string; (_: string): Combo };
    yAxisBaselineColor_exists: () => boolean;
    xAxisTitle: { (): string; (_: string): Combo };
    xAxisTitle_exists: () => boolean;
    yAxisTitle: { (): string; (_: string): Combo };
    yAxisTitle_exists: () => boolean;
    xAxisTitleFontColor: { (): string; (_: string): Combo };
    xAxisTitleFontColor_exists: () => boolean;
    yAxisTitleFontColor: { (): string; (_: string): Combo };
    yAxisTitleFontColor_exists: () => boolean;
    xAxisTitleFontSize: { (): number; (_: number): Combo };
    xAxisTitleFontSize_exists: () => boolean;
    yAxisTitleFontSize: { (): number; (_: number): Combo };
    yAxisTitleFontSize_exists: () => boolean;
    xAxisTitleFontFamily: { (): string; (_: string): Combo };
    xAxisTitleFontFamily_exists: () => boolean;
    yAxisTitleFontFamily: { (): string; (_: string): Combo };
    yAxisTitleFontFamily_exists: () => boolean;
    xAxisLabelRotation: { (): number; (_: number): Combo };
    xAxisLabelRotation_exists: () => boolean;
    groupWidth: { (): string; (_: string): Combo };
    groupWidth_exists: () => boolean;
    dataOpacity: { (): number; (_: number): Combo };
    dataOpacity_exists: () => boolean;
    xAxisBaseline: { (): number; (_: number): Combo };
    xAxisBaseline_exists: () => boolean;
    yAxisBaseline: { (): number; (_: number): Combo };
    yAxisBaseline_exists: () => boolean;
    xAxisInversed: { (): boolean; (_: boolean): Combo };
    xAxisInversed_exists: () => boolean;
    yAxisInversed: { (): boolean; (_: boolean): Combo };
    yAxisInversed_exists: () => boolean;
    xAxisFormatType: { (): string; (_: string): Combo };
    xAxisFormatType_exists: () => boolean;
    yAxisFormatType: { (): string; (_: string): Combo };
    yAxisFormatType_exists: () => boolean;
    xAxisGridlinesCount: { (): number; (_: number): Combo };
    xAxisGridlinesCount_exists: () => boolean;
    yAxisGridlinesCount: { (): number; (_: number): Combo };
    yAxisGridlinesCount_exists: () => boolean;
    xAxisGridlinesColor: { (): string; (_: string): Combo };
    xAxisGridlinesColor_exists: () => boolean;
    yAxisGridlinesColor: { (): string; (_: string): Combo };
    yAxisGridlinesColor_exists: () => boolean;
    xAxisMinorGridlinesCount: { (): number; (_: number): Combo };
    xAxisMinorGridlinesCount_exists: () => boolean;
    yAxisMinorGridlinesCount: { (): number; (_: number): Combo };
    yAxisMinorGridlinesCount_exists: () => boolean;
    xAxisMinorGridlinesColor: { (): string; (_: string): Combo };
    xAxisMinorGridlinesColor_exists: () => boolean;
    yAxisMinorGridlinesColor: { (): string; (_: string): Combo };
    yAxisMinorGridlinesColor_exists: () => boolean;
    xAxisLogScale: { (): boolean; (_: boolean): Combo };
    xAxisLogScale_exists: () => boolean;
    yAxisLogScale: { (): boolean; (_: boolean): Combo };
    yAxisLogScale_exists: () => boolean;
    xAxisTextPosition: { (): string; (_: string): Combo };
    xAxisTextPosition_exists: () => boolean;
    yAxisTextPosition: { (): string; (_: string): Combo };
    yAxisTextPosition_exists: () => boolean;
    xAxisTicks: { (): any[]; (_: any[]): Combo };
    xAxisTicks_exists: () => boolean;
    yAxisTicks: { (): any[]; (_: any[]): Combo };
    yAxisTicks_exists: () => boolean;
    xAxisMaxValue: { (): number; (_: number): Combo };
    xAxisMaxValue_exists: () => boolean;
    yAxisMaxValue: { (): number; (_: number): Combo };
    yAxisMaxValue_exists: () => boolean;
    xAxisMinValue: { (): number; (_: number): Combo };
    xAxisMinValue_exists: () => boolean;
    yAxisMinValue: { (): number; (_: number): Combo };
    yAxisMinValue_exists: () => boolean;
    xAxisViewWindowMode: { (): string; (_: string): Combo };
    xAxisViewWindowMode_exists: () => boolean;
    yAxisViewWindowMode: { (): string; (_: string): Combo };
    yAxisViewWindowMode_exists: () => boolean;
    xAxisViewWindowMax: { (): number; (_: number): Combo };
    xAxisViewWindowMax_exists: () => boolean;
    yAxisViewWindowMax: { (): number; (_: number): Combo };
    yAxisViewWindowMax_exists: () => boolean;
    xAxisViewWindowMin: { (): number; (_: number): Combo };
    xAxisViewWindowMin_exists: () => boolean;
    yAxisViewWindowMin: { (): number; (_: number): Combo };
    yAxisViewWindowMin_exists: () => boolean;
}
Combo.prototype._class += " google_Combo";

Combo.prototype.publish("defaultseriesType", "bars", "set", "The default type for the series (columns) in the chart (line, area or bars)", ["line", "area", "bars"], { tags: ["Basic", "Shared"] });
Combo.prototype.publish("types", [], "array", "Array of chart types (ex:bar|line|spline|area|area-spline|step|area-step|scatter)", null, { tags: ["Basic"] });
Combo.prototype.publish("stacked", false, "boolean", "Stacks the elements in a series", null, { tags: ["Basic", "Shared"] });
Combo.prototype.publish("lineWidth", null, "number", "The width of the lines in the chart.  Set to '0' to show only the points", null, { tags: ["Basic", "Shared"] });
Combo.prototype.publish("lineDashStyle", [], "array", "Line Dash Style", null, { tags: ["Advanced", "Shared"] });
Combo.prototype.publish("curveType", "none", "set", "Causes chart data lines to draw smoothly", ["none", "function"], { tags: ["Basic", "Shared"] });
Combo.prototype.publish("pointSize", null, "number", "Diameter of displayed points in pixels", null, { tags: ["Private"] });
Combo.prototype.publish("pointShape", "circle", "set", "The shape of individual data elements", ["circle", "triangle", "square", "diamond", "star", "polygon"], { tags: ["Advanced"] });

// opacity?
Combo.prototype.publish("axisFontSize", null, "number", "X/Y Axis Label Font Size", null, { tags: ["Basic", "Shared"] });
Combo.prototype.publish("axisFontFamily", null, "string", "X/Y Axis Label Font Name", null, { tags: ["Basic", "Shared"] });

Combo.prototype.publish("xAxisFontColor", null, "html-color", "X Axis Text Font Color", null, { tags: ["Basic", "Shared"] });
Combo.prototype.publish("yAxisFontColor", null, "html-color", "X Axis Text Font Color", null, { tags: ["Basic", "Shared"] });

Combo.prototype.publish("xAxisBaselineColor", null, "html-color", "Specifies The Color of The Baseline For The Horizontal Axis", null, { tags: ["Intermediate", "Shared"] });
Combo.prototype.publish("yAxisBaselineColor", null, "html-color", "Specifies The Color of The Baseline For The Vertical Axis", null, { tags: ["Intermediate", "Shared"] });

Combo.prototype.publish("xAxisTitle", "", "string", "X Axis Title", null, { tags: ["Basic", "Shared"] });
Combo.prototype.publish("yAxisTitle", "", "string", "Y Axis Title", null, { tags: ["Basic", "Shared"] });

Combo.prototype.publish("xAxisTitleFontColor", null, "html-color", "Horizontal Axis Title Text Style (Color)", null, { tags: ["Intermediate", "Shared"] });
Combo.prototype.publish("yAxisTitleFontColor", null, "html-color", "Vertical Axis Title Text Style (Color)", null, { tags: ["Intermediate", "Shared"] });

Combo.prototype.publish("xAxisTitleFontSize", null, "number", "Horizontal Axis Titletext Style (Font Size)", null, { tags: ["Intermediate", "Shared"] });
Combo.prototype.publish("yAxisTitleFontSize", null, "number", "Vertical Axis Titletext Style (Font Size)", null, { tags: ["Intermediate", "Shared"] });

Combo.prototype.publish("xAxisTitleFontFamily", null, "string", "Horizontal Axis Title Text Style (Font Name)", null, { tags: ["Intermediate", "Shared"] });
Combo.prototype.publish("yAxisTitleFontFamily", null, "string", "Vertical Axis Title Text Style (Font Name)", null, { tags: ["Intermediate", "Shared"] });

Combo.prototype.publish("xAxisLabelRotation", 0, "number", "X Axis Label Angle", null, { tags: ["Intermediate", "Shared"] });

Combo.prototype.publish("groupWidth", "", "string", "The width of a group of Combos, Percent or Pixels", null, { tags: ["Advanced"] });
Combo.prototype.publish("dataOpacity", 1.0, "number", "Transparency of Data Points", null, { tags: ["Intermediate"] });

Combo.prototype.publish("xAxisBaseline", null, "number", "Specifies the color of the baseline for the horizontal axis", null, { tags: ["Intermediate"] });
Combo.prototype.publish("yAxisBaseline", null, "number", "Specifies the color of the baseline for the vertical axis", null, { tags: ["Intermediate"] });

Combo.prototype.publish("xAxisInversed", false, "boolean", "The Direction In Which The Values Along The Horizontal Axis Grow.", null, { tags: ["Advanced"] });
Combo.prototype.publish("yAxisInversed", false, "boolean", "The Direction In Which The Values Along The Vertical Axis Grow.", null, { tags: ["Advanced"] });

Combo.prototype.publish("xAxisFormatType", "", "set", "Format String For Numeric Axis Labels", ["", "decimal", "scientific", "currency", "percent", "short", "long"], { tags: ["Intermediate"] });
Combo.prototype.publish("yAxisFormatType", "", "set", "Format String For Numeric Axis Labels", ["", "decimal", "scientific", "currency", "percent", "short", "long"], { tags: ["Intermediate"] });

Combo.prototype.publish("xAxisGridlinesCount", 5, "number", "The Number of Horizontal Gridlines Between Two Regular Gridlines", null, { tags: ["Intermediate"] });
Combo.prototype.publish("yAxisGridlinesCount", 5, "number", "The Number of Vertical Gridlines Between Two Regular Gridline", null, { tags: ["Intermediate"] });

Combo.prototype.publish("xAxisGridlinesColor", null, "html-color", "The Color of The Horizontal Gridlines Inside The Chart Area", null, { tags: ["Basic"] });
Combo.prototype.publish("yAxisGridlinesColor", null, "html-color", "The Color of The Vertical Gridlines Inside The Chart Area", null, { tags: ["Basic"] });

Combo.prototype.publish("xAxisMinorGridlinesCount", 0, "number", "The Number of Horizontal Minor Gridlines Between Two Regular Gridlines", null, { tags: ["Intermediate"] });
Combo.prototype.publish("yAxisMinorGridlinesCount", 0, "number", "The Number of Vertical Minor Gridlines Between Two Regular Gridlines", null, { tags: ["Intermediate"] });

Combo.prototype.publish("xAxisMinorGridlinesColor", null, "html-color", "The Color of The Horizontal Minor Gridlines Inside The Chart Area", null, { tags: ["Intermediate"] });
Combo.prototype.publish("yAxisMinorGridlinesColor", null, "html-color", "The Color of The Vertical Minor Gridlines Inside The Chart Area", null, { tags: ["Intermediate"] });

Combo.prototype.publish("xAxisLogScale", false, "boolean", "Makes Horizontal Axis A log Scale", null, { tags: ["Advanced"] });
Combo.prototype.publish("yAxisLogScale", false, "boolean", "Makes Vertical Axis A Log Scale", null, { tags: ["Advanced"] });

Combo.prototype.publish("xAxisTextPosition", "out", "set", "Position of The Horizontal Axis Text, Relative To The Chart Area", ["out", "in", "none"], { tags: ["Advanced"] });
Combo.prototype.publish("yAxisTextPosition", "out", "set", "Position of The Vertical Axis Text, Relative To The Chart Area", ["out", "in", "none"], { tags: ["Advanced"] });

Combo.prototype.publish("xAxisTicks", [], "array", "Replaces The Automatically Generated X-Axis Ticks With The Specified Array", null, { tags: ["Private"] });
Combo.prototype.publish("yAxisTicks", [], "array", "Replaces The Automatically Generated Y-Axis Ticks With The Specified Array", null, { tags: ["Private"] });

Combo.prototype.publish("xAxisMaxValue", null, "number", "Moves The Max Value of The Horizontal Axis To The Specified Value", null, { tags: ["Advanced"] });
Combo.prototype.publish("yAxisMaxValue", null, "number", "Moves The Max Value of The Vertical Axis To The Specified Value", null, { tags: ["Advanced"] });

Combo.prototype.publish("xAxisMinValue", null, "number", "Moves The Min Value of The Horizontal Axis To The Specified Value", null, { tags: ["Advanced"] });
Combo.prototype.publish("yAxisMinValue", null, "number", "Moves The Min Value of The Vertical Axis To The Specified Value", null, { tags: ["Advanced"] });

Combo.prototype.publish("xAxisViewWindowMode", "pretty", "set", "Specifies How To Scale The Horizontal Axis To Render The values Within The Chart Area", ["pretty", "maximized", "explicit"], { tags: ["Advanced"] });
Combo.prototype.publish("yAxisViewWindowMode", "pretty", "set", "Specifies How To Scale The Vertical Axis To Render The Values Within The Chart Area", ["pretty", "maximized", "explicit"], { tags: ["Advanced"] });

Combo.prototype.publish("xAxisViewWindowMax", null, "number", "The Maximum Horizontal Data Value To Render", null, { tags: ["Advanced"] });
Combo.prototype.publish("yAxisViewWindowMax", null, "number", "The Maximum Vertical Data Value To Render", null, { tags: ["Advanced"] });

Combo.prototype.publish("xAxisViewWindowMin", null, "number", "The Minimum Horizontal Data Value To Render", null, { tags: ["Advanced"] });
Combo.prototype.publish("yAxisViewWindowMin", null, "number", "The Minimum Vertical Data Value To Render", null, { tags: ["Advanced"] });
