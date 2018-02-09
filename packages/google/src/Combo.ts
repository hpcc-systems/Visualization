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

    defaultseriesType_exists: () => boolean;
    types_exists: () => boolean;
    stacked_exists: () => boolean;
    lineWidth_exists: () => boolean;
    lineDashStyle_exists: () => boolean;
    curveType_exists: () => boolean;
    pointSize_exists: () => boolean;
    pointShape_exists: () => boolean;
    axisFontSize_exists: () => boolean;
    axisFontFamily_exists: () => boolean;
    xAxisFontColor_exists: () => boolean;
    yAxisFontColor_exists: () => boolean;
    xAxisBaselineColor_exists: () => boolean;
    yAxisBaselineColor_exists: () => boolean;
    xAxisTitle_exists: () => boolean;
    yAxisTitle_exists: () => boolean;
    xAxisTitleFontColor_exists: () => boolean;
    yAxisTitleFontColor_exists: () => boolean;
    xAxisTitleFontSize_exists: () => boolean;
    yAxisTitleFontSize_exists: () => boolean;
    xAxisTitleFontFamily_exists: () => boolean;
    yAxisTitleFontFamily_exists: () => boolean;
    xAxisLabelRotation_exists: () => boolean;
    groupWidth_exists: () => boolean;
    dataOpacity_exists: () => boolean;
    xAxisBaseline_exists: () => boolean;
    yAxisBaseline_exists: () => boolean;
    xAxisInversed_exists: () => boolean;
    yAxisInversed_exists: () => boolean;
    xAxisFormatType_exists: () => boolean;
    yAxisFormatType_exists: () => boolean;
    xAxisGridlinesCount_exists: () => boolean;
    yAxisGridlinesCount_exists: () => boolean;
    xAxisGridlinesColor_exists: () => boolean;
    yAxisGridlinesColor_exists: () => boolean;
    xAxisMinorGridlinesCount_exists: () => boolean;
    yAxisMinorGridlinesCount_exists: () => boolean;
    xAxisMinorGridlinesColor_exists: () => boolean;
    yAxisMinorGridlinesColor_exists: () => boolean;
    xAxisLogScale_exists: () => boolean;
    yAxisLogScale_exists: () => boolean;
    xAxisTextPosition_exists: () => boolean;
    yAxisTextPosition_exists: () => boolean;
    xAxisTicks_exists: () => boolean;
    yAxisTicks_exists: () => boolean;
    xAxisMaxValue_exists: () => boolean;
    yAxisMaxValue_exists: () => boolean;
    xAxisMinValue_exists: () => boolean;
    yAxisMinValue_exists: () => boolean;
    xAxisViewWindowMode_exists: () => boolean;
    yAxisViewWindowMode_exists: () => boolean;
    xAxisViewWindowMax_exists: () => boolean;
    yAxisViewWindowMax_exists: () => boolean;
    xAxisViewWindowMin_exists: () => boolean;
    yAxisViewWindowMin_exists: () => boolean;
}
Combo.prototype._class += " google_Combo";

export interface Combo {
    defaultseriesType(): string;
    defaultseriesType(_: string): this;
    types(): any[];
    types(_: any[]): this;
    stacked(): boolean;
    stacked(_: boolean): this;
    lineWidth(): number;
    lineWidth(_: number): this;
    lineDashStyle(): any[];
    lineDashStyle(_: any[]): this;
    curveType(): string;
    curveType(_: string): this;
    pointSize(): number;
    pointSize(_: number): this;
    pointShape(): string;
    pointShape(_: string): this;
    axisFontSize(): number;
    axisFontSize(_: number): this;
    axisFontFamily(): string;
    axisFontFamily(_: string): this;
    xAxisFontColor(): string;
    xAxisFontColor(_: string): this;
    yAxisFontColor(): string;
    yAxisFontColor(_: string): this;
    xAxisBaselineColor(): string;
    xAxisBaselineColor(_: string): this;
    yAxisBaselineColor(): string;
    yAxisBaselineColor(_: string): this;
    xAxisTitle(): string;
    xAxisTitle(_: string): this;
    yAxisTitle(): string;
    yAxisTitle(_: string): this;
    xAxisTitleFontColor(): string;
    xAxisTitleFontColor(_: string): this;
    yAxisTitleFontColor(): string;
    yAxisTitleFontColor(_: string): this;
    xAxisTitleFontSize(): number;
    xAxisTitleFontSize(_: number): this;
    yAxisTitleFontSize(): number;
    yAxisTitleFontSize(_: number): this;
    xAxisTitleFontFamily(): string;
    xAxisTitleFontFamily(_: string): this;
    yAxisTitleFontFamily(): string;
    yAxisTitleFontFamily(_: string): this;
    xAxisLabelRotation(): number;
    xAxisLabelRotation(_: number): this;
    groupWidth(): string;
    groupWidth(_: string): this;
    dataOpacity(): number;
    dataOpacity(_: number): this;
    xAxisBaseline(): number;
    xAxisBaseline(_: number): this;
    yAxisBaseline(): number;
    yAxisBaseline(_: number): this;
    xAxisInversed(): boolean;
    xAxisInversed(_: boolean): this;
    yAxisInversed(): boolean;
    yAxisInversed(_: boolean): this;
    xAxisFormatType(): string;
    xAxisFormatType(_: string): this;
    yAxisFormatType(): string;
    yAxisFormatType(_: string): this;
    xAxisGridlinesCount(): number;
    xAxisGridlinesCount(_: number): this;
    yAxisGridlinesCount(): number;
    yAxisGridlinesCount(_: number): this;
    xAxisGridlinesColor(): string;
    xAxisGridlinesColor(_: string): this;
    yAxisGridlinesColor(): string;
    yAxisGridlinesColor(_: string): this;
    xAxisMinorGridlinesCount(): number;
    xAxisMinorGridlinesCount(_: number): this;
    yAxisMinorGridlinesCount(): number;
    yAxisMinorGridlinesCount(_: number): this;
    xAxisMinorGridlinesColor(): string;
    xAxisMinorGridlinesColor(_: string): this;
    yAxisMinorGridlinesColor(): string;
    yAxisMinorGridlinesColor(_: string): this;
    xAxisLogScale(): boolean;
    xAxisLogScale(_: boolean): this;
    yAxisLogScale(): boolean;
    yAxisLogScale(_: boolean): this;
    xAxisTextPosition(): string;
    xAxisTextPosition(_: string): this;
    yAxisTextPosition(): string;
    yAxisTextPosition(_: string): this;
    xAxisTicks(): any[];
    xAxisTicks(_: any[]): this;
    yAxisTicks(): any[];
    yAxisTicks(_: any[]): this;
    xAxisMaxValue(): number;
    xAxisMaxValue(_: number): this;
    yAxisMaxValue(): number;
    yAxisMaxValue(_: number): this;
    xAxisMinValue(): number;
    xAxisMinValue(_: number): this;
    yAxisMinValue(): number;
    yAxisMinValue(_: number): this;
    xAxisViewWindowMode(): string;
    xAxisViewWindowMode(_: string): this;
    yAxisViewWindowMode(): string;
    yAxisViewWindowMode(_: string): this;
    xAxisViewWindowMax(): number;
    xAxisViewWindowMax(_: number): this;
    yAxisViewWindowMax(): number;
    yAxisViewWindowMax(_: number): this;
    xAxisViewWindowMin(): number;
    xAxisViewWindowMin(_: number): this;
    yAxisViewWindowMin(): number;
    yAxisViewWindowMin(_: number): this;
}
Combo.prototype.publish("defaultseriesType", "bars", "set", "The default type for the series (columns) in the chart (line, area or bars)", ["line", "area", "bars"], { tags: ["Basic", "Shared"] });
Combo.prototype.publish("types", [], "array", "Array of chart types (ex:bar|line|spline|area|area-spline|step|area-step|scatter)", null, { tags: ["Basic"] });
Combo.prototype.publish("stacked", false, "boolean", "Stacks the elements in a series", null, { tags: ["Basic", "Shared"] });
Combo.prototype.publish("lineWidth", null, "number", "The width of the lines in the chart.  Set to '0' to show only the points", null, { tags: ["Basic", "Shared"] });
Combo.prototype.publish("lineDashStyle", [], "array", "Line Dash Style", null, { tags: ["Advanced", "Shared"] });
Combo.prototype.publish("curveType", "none", "set", "Causes chart data lines to draw smoothly", ["none", "function"], { tags: ["Basic", "Shared"] });
Combo.prototype.publish("pointSize", null, "number", "Diameter of displayed points in pixels", null, { tags: ["Private"] });
Combo.prototype.publish("pointShape", "circle", "set", "The shape of individual data elements", ["circle", "triangle", "square", "diamond", "star", "polygon"], { tags: ["Advanced"] });
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
