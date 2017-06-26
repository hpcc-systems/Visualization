import { CommonND } from "./CommonND";

export class Line extends CommonND {
    constructor() {
        super();

        this._chartType = "LineChart";
    }

    getChartOptions() {
        const retVal = CommonND.prototype.getChartOptions.apply(this, arguments);

        retVal.lineWidth = this.lineWidth();
        retVal.lineDashStyle = this.lineDashStyle();
        retVal.orientation = this.orientation();
        retVal.pointShape = this.pointShape();
        retVal.pointSize = this.pointSize();

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

        // retVal.hAxis.allowContainerBoundaryTextCutoff = this.xAxisAllowContainerBoundaryTextCutoff();
        retVal.hAxis.slantedText = this.xAxisLabelRotation() !== 0;
        retVal.hAxis.slantedTextAngle = this.xAxisLabelRotation();
        retVal.hAxis.maxAlternation = this.xAxisMaxAlternation();
        retVal.hAxis.maxTextLines = this.xAxisMaxTextLines();
        retVal.hAxis.minTextSpacing = this.xAxisMinTextSpacing();

        if (this.xAxisFormatType()) {
            retVal.hAxis.format = this.xAxisFormatType();
        }
        retVal.hAxis.textStyle = {
            color: this.xAxisFontColor() ? this.xAxisFontColor() : this.fontColor(),
            fontName: this.axisFontFamily() ? this.axisFontFamily() : this.fontFamily(),
            fontSize: this.axisFontSize() ? this.axisFontSize() : this.fontSize()
        };
        if (this.xAxisTicks().length > 0) {
            retVal.hAxis.ticks = this.xAxisTicks();
        }
        retVal.hAxis.titleTextStyle = {
            color: this.xAxisTitleFontColor() ? this.xAxisTitleFontColor() : this.fontColor(),
            fontName: this.xAxisTitleFontFamily() ? this.xAxisTitleFontFamily() : this.fontFamily(),
            fontSize: this.xAxisTitleFontSize() ? this.xAxisTitleFontSize() : this.fontSize()
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

        if (this.yAxisFormatType()) {
            retVal.vAxis.format = this.yAxisFormatType();
        }
        retVal.vAxis.textStyle = {
            color: this.yAxisFontColor(),
            fontName: this.axisFontFamily() ? this.axisFontFamily() : this.fontFamily(),
            fontSize: this.axisFontSize() ? this.axisFontSize() : this.fontSize()
        };
        if (this.yAxisTicks().length > 0) {
            retVal.vAxis.ticks = this.yAxisTicks();
        }
        retVal.vAxis.titleTextStyle = {
            color: this.yAxisTitleFontColor() ? this.yAxisTitleFontColor() : this.fontColor(),
            fontName: this.yAxisTitleFontFamily() ? this.yAxisTitleFontFamily() : this.fontFamily(),
            fontSize: this.yAxisTitleFontSize() ? this.yAxisTitleFontSize() : this.fontSize()
        };
        retVal.vAxis.viewWindowMode = this.yAxisViewWindowMode();
        retVal.vAxis.viewWindow = {
            min: this.yAxisViewWindowMin(),
            max: this.yAxisViewWindowMax()
        };

        this.lineDashStyle().forEach(function (d, i) {
            if (typeof (retVal.series[i]) === "undefined") {
                retVal.series[i] = {};
            }
            retVal.series[i].lineDashStyle = d;
        });

        this.pointShape().forEach(function (d, i) {
            if (typeof (retVal.series[i]) === "undefined") {
                retVal.series[i] = {};
            }
            retVal.series[i].pointShape = d;
        });

        this.pointSize().forEach(function (d, i) {
            if (typeof (retVal.series[i]) === "undefined") {
                retVal.series[i] = {};
            }
            retVal.series[i].pointSize = d;
        });

        if (this.smoothLines()) {
            retVal.curveType = "function";
        }

        return retVal;
    }

    enter(domNode, element) {
        CommonND.prototype.enter.apply(this, arguments);
    }

    update(domNode, element) {
        CommonND.prototype.update.apply(this, arguments);
    }

    lineWidth: { (): number; (_: number): Line };
    lineWidth_exists: () => boolean;
    lineDashStyle: { (): any[]; (_: any[]): Line };
    lineDashStyle_exists: () => boolean;
    axisFontSize: { (): number; (_: number): Line };
    axisFontSize_exists: () => boolean;
    axisFontFamily: { (): string; (_: string): Line };
    axisFontFamily_exists: () => boolean;
    xAxisFontColor: { (): string; (_: string): Line };
    xAxisFontColor_exists: () => boolean;
    yAxisFontColor: { (): string; (_: string): Line };
    yAxisFontColor_exists: () => boolean;
    xAxisBaselineColor: { (): string; (_: string): Line };
    xAxisBaselineColor_exists: () => boolean;
    yAxisBaselineColor: { (): string; (_: string): Line };
    yAxisBaselineColor_exists: () => boolean;
    xAxisTitle: { (): string; (_: string): Line };
    xAxisTitle_exists: () => boolean;
    yAxisTitle: { (): string; (_: string): Line };
    yAxisTitle_exists: () => boolean;
    xAxisTitleFontColor: { (): string; (_: string): Line };
    xAxisTitleFontColor_exists: () => boolean;
    yAxisTitleFontColor: { (): string; (_: string): Line };
    yAxisTitleFontColor_exists: () => boolean;
    xAxisTitleFontSize: { (): number; (_: number): Line };
    xAxisTitleFontSize_exists: () => boolean;
    yAxisTitleFontSize: { (): number; (_: number): Line };
    yAxisTitleFontSize_exists: () => boolean;
    xAxisTitleFontFamily: { (): string; (_: string): Line };
    xAxisTitleFontFamily_exists: () => boolean;
    yAxisTitleFontFamily: { (): string; (_: string): Line };
    yAxisTitleFontFamily_exists: () => boolean;
    xAxisLabelRotation: { (): number; (_: number): Line };
    xAxisLabelRotation_exists: () => boolean;
    smoothLines: { (): boolean; (_: boolean): Line };
    smoothLines_exists: () => boolean;
    orientation: { (): string; (_: string): Line };
    orientation_exists: () => boolean;
    pointSize: { (): any[]; (_: any[]): Line };
    pointSize_exists: () => boolean;
    pointShape: { (): any[]; (_: any[]): Line };
    pointShape_exists: () => boolean;
    xAxisBaseline: { (): number; (_: number): Line };
    xAxisBaseline_exists: () => boolean;
    yAxisBaseline: { (): number; (_: number): Line };
    yAxisBaseline_exists: () => boolean;
    xAxisInversed: { (): boolean; (_: boolean): Line };
    xAxisInversed_exists: () => boolean;
    yAxisInversed: { (): boolean; (_: boolean): Line };
    yAxisInversed_exists: () => boolean;
    xAxisFormatType: { (): string; (_: string): Line };
    xAxisFormatType_exists: () => boolean;
    yAxisFormatType: { (): string; (_: string): Line };
    yAxisFormatType_exists: () => boolean;
    xAxisGridlinesCount: { (): number; (_: number): Line };
    xAxisGridlinesCount_exists: () => boolean;
    yAxisGridlinesCount: { (): number; (_: number): Line };
    yAxisGridlinesCount_exists: () => boolean;
    xAxisGridlinesColor: { (): string; (_: string): Line };
    xAxisGridlinesColor_exists: () => boolean;
    yAxisGridlinesColor: { (): string; (_: string): Line };
    yAxisGridlinesColor_exists: () => boolean;
    xAxisMinorGridlinesCount: { (): number; (_: number): Line };
    xAxisMinorGridlinesCount_exists: () => boolean;
    yAxisMinorGridlinesCount: { (): number; (_: number): Line };
    yAxisMinorGridlinesCount_exists: () => boolean;
    xAxisMinorGridlinesColor: { (): string; (_: string): Line };
    xAxisMinorGridlinesColor_exists: () => boolean;
    yAxisMinorGridlinesColor: { (): string; (_: string): Line };
    yAxisMinorGridlinesColor_exists: () => boolean;
    xAxisLogScale: { (): boolean; (_: boolean): Line };
    xAxisLogScale_exists: () => boolean;
    yAxisLogScale: { (): boolean; (_: boolean): Line };
    yAxisLogScale_exists: () => boolean;
    xAxisTextPosition: { (): string; (_: string): Line };
    xAxisTextPosition_exists: () => boolean;
    yAxisTextPosition: { (): string; (_: string): Line };
    yAxisTextPosition_exists: () => boolean;
    xAxisTicks: { (): any[]; (_: any[]): Line };
    xAxisTicks_exists: () => boolean;
    yAxisTicks: { (): any[]; (_: any[]): Line };
    yAxisTicks_exists: () => boolean;
    xAxisMaxValue: { (): number; (_: number): Line };
    xAxisMaxValue_exists: () => boolean;
    yAxisMaxValue: { (): number; (_: number): Line };
    yAxisMaxValue_exists: () => boolean;
    xAxisMinValue: { (): number; (_: number): Line };
    xAxisMinValue_exists: () => boolean;
    yAxisMinValue: { (): number; (_: number): Line };
    yAxisMinValue_exists: () => boolean;
    xAxisViewWindowMode: { (): string; (_: string): Line };
    xAxisViewWindowMode_exists: () => boolean;
    yAxisViewWindowMode: { (): string; (_: string): Line };
    yAxisViewWindowMode_exists: () => boolean;
    xAxisViewWindowMax: { (): number; (_: number): Line };
    xAxisViewWindowMax_exists: () => boolean;
    yAxisViewWindowMax: { (): number; (_: number): Line };
    yAxisViewWindowMax_exists: () => boolean;
    xAxisViewWindowMin: { (): number; (_: number): Line };
    xAxisViewWindowMin_exists: () => boolean;
    yAxisViewWindowMin: { (): number; (_: number): Line };
    yAxisViewWindowMin_exists: () => boolean;
    xAxisMaxTextLines: { (): number; (_: number): Line };
    xAxisMaxTextLines_exists: () => boolean;
    xAxisMaxAlternation: { (): number; (_: number): Line };
    xAxisMaxAlternation_exists: () => boolean;
    xAxisMinTextSpacing: { (): number; (_: number): Line };
    xAxisMinTextSpacing_exists: () => boolean;
}
Line.prototype._class += " google_Line";

Line.prototype.publish("lineWidth", 2, "number", "Line Width", null, { tags: ["Basic", "Shared"] });
Line.prototype.publish("lineDashStyle", [], "array", "Line Dash Style", null, { tags: ["Advanced", "Shared"] });

Line.prototype.publish("axisFontSize", null, "number", "X/Y Axis Label Font Size", null, { tags: ["Basic", "Shared"] });
Line.prototype.publish("axisFontFamily", null, "string", "X/Y Axis Label Font Name", null, { tags: ["Basic", "Shared"] });

Line.prototype.publish("xAxisFontColor", null, "html-color", "X Axis Text Font Color", null, { tags: ["Basic", "Shared"] });
Line.prototype.publish("yAxisFontColor", null, "html-color", "X Axis Text Font Color", null, { tags: ["Basic", "Shared"] });

Line.prototype.publish("xAxisBaselineColor", null, "html-color", "Specifies The Color of The Baseline For The Horizontal Axis", null, { tags: ["Intermediate", "Shared"] });
Line.prototype.publish("yAxisBaselineColor", null, "html-color", "Specifies The Color of The Baseline For The Vertical Axis", null, { tags: ["Intermediate", "Shared"] });

Line.prototype.publish("xAxisTitle", "", "string", "X Axis Title", null, { tags: ["Basic", "Shared"] });
Line.prototype.publish("yAxisTitle", "", "string", "Y Axis Title", null, { tags: ["Basic", "Shared"] });

Line.prototype.publish("xAxisTitleFontColor", null, "html-color", "Horizontal Axis Title Text Style (Color)", null, { tags: ["Intermediate", "Shared"] });
Line.prototype.publish("yAxisTitleFontColor", null, "html-color", "Vertical Axis Title Text Style (Color)", null, { tags: ["Intermediate", "Shared"] });

Line.prototype.publish("xAxisTitleFontSize", null, "number", "Horizontal Axis Titletext Style (Font Size)", null, { tags: ["Intermediate", "Shared"] });
Line.prototype.publish("yAxisTitleFontSize", null, "number", "Vertical Axis Titletext Style (Font Size)", null, { tags: ["Intermediate", "Shared"] });

Line.prototype.publish("xAxisTitleFontFamily", null, "string", "Horizontal Axis Title Text Style (Font Name)", null, { tags: ["Intermediate", "Shared"] });
Line.prototype.publish("yAxisTitleFontFamily", null, "string", "Vertical Axis Title Text Style (Font Name)", null, { tags: ["Intermediate", "Shared"] });

Line.prototype.publish("xAxisLabelRotation", 0, "number", "X Axis Label Angle", null, { tags: ["Intermediate", "Shared"] });

Line.prototype.publish("smoothLines", false, "boolean", "Causes chart data lines to draw smoothly", null, { tags: ["Basic", "Shared"] });

Line.prototype.publish("orientation", "horizontal", "set", "Line Dash Style", ["horizontal", "vertical"], { tags: ["Advanced"] });

Line.prototype.publish("pointSize", [], "array", "Diameter of displayed points in pixels", null, { tags: ["Private"] });
Line.prototype.publish("pointShape", [], "array", "The shape of individual data elements", null, { tags: ["Advanced"] }); // TODO: Needs example in description

Line.prototype.publish("xAxisBaseline", null, "number", "Specifies the color of the baseline for the horizontal axis", null, { tags: ["Intermediate"] });
Line.prototype.publish("yAxisBaseline", null, "number", "Specifies the color of the baseline for the vertical axis", null, { tags: ["Intermediate"] });

Line.prototype.publish("xAxisInversed", false, "boolean", "The Direction In Which The Values Along The Horizontal Axis Grow.", null, { tags: ["Advanced"] });
Line.prototype.publish("yAxisInversed", false, "boolean", "The Direction In Which The Values Along The Vertical Axis Grow.", null, { tags: ["Advanced"] });

Line.prototype.publish("xAxisFormatType", "", "set", "Format String For Numeric Axis Labels", ["", "decimal", "scientific", "currency", "percent", "short", "long"], { tags: ["Intermediate"] });
Line.prototype.publish("yAxisFormatType", "", "set", "Format String For Numeric Axis Labels", ["", "decimal", "scientific", "currency", "percent", "short", "long"], { tags: ["Intermediate"] });

Line.prototype.publish("xAxisGridlinesCount", 5, "number", "The Number of Horizontal Gridlines Between Two Regular Gridlines", null, { tags: ["Intermediate"] });
Line.prototype.publish("yAxisGridlinesCount", 5, "number", "The Number of Vertical Gridlines Between Two Regular Gridline", null, { tags: ["Intermediate"] });

Line.prototype.publish("xAxisGridlinesColor", null, "html-color", "The Color of The Horizontal Gridlines Inside The Chart Area", null, { tags: ["Basic"] });
Line.prototype.publish("yAxisGridlinesColor", null, "html-color", "The Color of The Vertical Gridlines Inside The Chart Area", null, { tags: ["Basic"] });

Line.prototype.publish("xAxisMinorGridlinesCount", 0, "number", "The Number of Horizontal Minor Gridlines Between Two Regular Gridlines", null, { tags: ["Intermediate"] });
Line.prototype.publish("yAxisMinorGridlinesCount", 0, "number", "The Number of Vertical Minor Gridlines Between Two Regular Gridlines", null, { tags: ["Intermediate"] });

Line.prototype.publish("xAxisMinorGridlinesColor", null, "html-color", "The Color of The Horizontal Minor Gridlines Inside The Chart Area", null, { tags: ["Intermediate"] });
Line.prototype.publish("yAxisMinorGridlinesColor", null, "html-color", "The Color of The Vertical Minor Gridlines Inside The Chart Area", null, { tags: ["Intermediate"] });

Line.prototype.publish("xAxisLogScale", false, "boolean", "Makes Horizontal Axis A log Scale", null, { tags: ["Advanced"] });
Line.prototype.publish("yAxisLogScale", false, "boolean", "Makes Vertical Axis A Log Scale", null, { tags: ["Advanced"] });

Line.prototype.publish("xAxisTextPosition", "out", "set", "Position of The Horizontal Axis Text, Relative To The Chart Area", ["out", "in", "none"], { tags: ["Advanced"] });
Line.prototype.publish("yAxisTextPosition", "out", "set", "Position of The Vertical Axis Text, Relative To The Chart Area", ["out", "in", "none"], { tags: ["Advanced"] });

Line.prototype.publish("xAxisTicks", [], "array", "Replaces The Automatically Generated X-Axis Ticks With The Specified Array", null, { tags: ["Private"] });
Line.prototype.publish("yAxisTicks", [], "array", "Replaces The Automatically Generated Y-Axis Ticks With The Specified Array", null, { tags: ["Private"] });

Line.prototype.publish("xAxisMaxValue", null, "number", "Moves The Max Value of The Horizontal Axis To The Specified Value", null, { tags: ["Advanced"] });
Line.prototype.publish("yAxisMaxValue", null, "number", "Moves The Max Value of The Vertical Axis To The Specified Value", null, { tags: ["Advanced"] });

Line.prototype.publish("xAxisMinValue", null, "number", "Moves The Min Value of The Horizontal Axis To The Specified Value", null, { tags: ["Advanced"] });
Line.prototype.publish("yAxisMinValue", null, "number", "Moves The Min Value of The Vertical Axis To The Specified Value", null, { tags: ["Advanced"] });

Line.prototype.publish("xAxisViewWindowMode", "pretty", "set", "Specifies How To Scale The Horizontal Axis To Render The values Within The Chart Area", ["pretty", "maximized", "explicit"], { tags: ["Advanced"] });
Line.prototype.publish("yAxisViewWindowMode", "pretty", "set", "Specifies How To Scale The Vertical Axis To Render The Values Within The Chart Area", ["pretty", "maximized", "explicit"], { tags: ["Advanced"] });

Line.prototype.publish("xAxisViewWindowMax", null, "number", "The Maximum Horizontal Data Value To Render", null, { tags: ["Advanced"] });
Line.prototype.publish("yAxisViewWindowMax", null, "number", "The Maximum Vertical Data Value To Render", null, { tags: ["Advanced"] });

Line.prototype.publish("xAxisViewWindowMin", null, "number", "The Minimum Horizontal Data Value To Render", null, { tags: ["Advanced"] });
Line.prototype.publish("yAxisViewWindowMin", null, "number", "The Minimum Vertical Data Value To Render", null, { tags: ["Advanced"] });

Line.prototype.publish("xAxisMaxTextLines", null, "number", "Maximum number of lines allowed for the text labels", null, { tags: ["Advanced"] });
Line.prototype.publish("xAxisMaxAlternation", 2, "number", "Maximum number of levels of horizontal axis text", null, { tags: ["Advanced"] });
Line.prototype.publish("xAxisMinTextSpacing", null, "number", "Minimum horizontal spacing, in pixels, allowed between two adjacent text labels", null, { tags: ["Advanced"] });
