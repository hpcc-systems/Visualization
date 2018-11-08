import { I2DChart } from "@hpcc-js/api";
import { CanvasWidget, Utility } from "@hpcc-js/common";
import "d3-transition";

export class SummaryC extends CanvasWidget {
    protected _playIntervalIdx = 0;

    constructor() {
        super();
        I2DChart.call(this);
        this.playInterval(this.playInterval());
    }

    currentRow() {
        return this.data()[this._playIntervalIdx];
    }

    enter(domNode, element) {
        super.enter.apply(this, arguments);
        const _size = this.size();
        domNode.height = _size.height;
        domNode.width = _size.width;
    }

    update(domNode, element) {
        super.update.apply(this, arguments);
        const context = this;
        if (this._playIntervalIdx >= this.data().length) {
            this._playIntervalIdx = 0;
        }
        const size = this.size();
        const mult = this.mult();
        const labelIdx = this.columns().indexOf(this.labelColumn());
        const valueIdx = this.columns().indexOf(this.valueColumn());
        const bgColorIdx = this.columns().indexOf(this.colorFillColumn());
        const fontColorIdx = this.columns().indexOf(this.colorStrokeColumn());
        const iconIdx = this.columns().indexOf(this.iconColumn());
        const icon = iconIdx !== -1 ? this.currentRow()[iconIdx] : this.icon();
        const label = labelIdx !== -1 ? this.currentRow()[labelIdx] : "";
        const value = valueIdx !== -1 ? this.currentRow()[valueIdx] : "";
        const bgColor = bgColorIdx !== -1 ? this.currentRow()[bgColorIdx] : "#0097e6";
        const fontColor = fontColorIdx !== -1 ? this.currentRow()[fontColorIdx] : "#2f3640";

        let mainFontSize = size.height * Math.pow(mult, this.mainSizeExp());
        const subFontSize = size.height * Math.pow(mult, this.subSizeExp());
        const iconSize = size.height - (size.height * Math.pow(mult, this.iconSizeMult()));
        const px = size.width * Math.pow(mult, this.paddingSizeExp());
        const py = size.height * Math.pow(mult, this.paddingSizeExp());
        const ctx = domNode.getContext("2d");

        ctx.textBaseline = "top";

        const fontFamily = context.fontFamily();

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, size.width, size.height);

        ctx.globalAlpha = this.iconOpacity();
        drawIcon(Utility.faCode(icon), py, iconSize, context.iconAnchor());

        ctx.globalAlpha = this.valueOpacity();
        mainFontSize = drawText(value, py, mainFontSize, context.valueAnchor());

        ctx.globalAlpha = this.labelOpacity();
        drawText(label, mainFontSize + py, subFontSize, context.labelAnchor());

        function drawText(text, y, fontSize, anchorMode) {
            ctx.font = `${fontSize}px ${fontFamily}`;
            ctx.fillStyle = fontColor;
            let measurement = ctx.measureText(text);
            if (measurement.width > size.width) {
                const fontSizeMult = (size.width - (px * 2)) / measurement.width;
                fontSize = fontSize * fontSizeMult;
                ctx.font = `${fontSize}px ${fontFamily}`;
                measurement = ctx.measureText(text);
            }
            ctx.fillText(text, getTextOffsetX(measurement.width, anchorMode), y);
            return fontSize;
        }

        function drawIcon(text, y, fontSize, anchorMode) {
            ctx.font = `${fontSize}px FontAwesome`;
            ctx.fillStyle = fontColor;
            let measurement = ctx.measureText(text);
            if (measurement.width > size.width) {
                const fontSizeMult = (size.width - (px * 2)) / measurement.width;
                ctx.font = `${fontSize * fontSizeMult}px FontAwesome`;
                measurement = ctx.measureText(text);
            }
            ctx.fillText(text, getTextOffsetX(measurement.width, anchorMode), y);
        }

        function getTextOffsetX(width, anchorMode) {
            switch (anchorMode) {
                case "start":
                    return px;
                case "middle":
                    return (size.width / 2) - (width / 2);
                case "end":
                    return size.width - width - px;
            }
        }
    }
}
SummaryC.prototype._class += " chart_SummaryC";
SummaryC.prototype.implements(I2DChart.prototype);

export interface SummaryC {
    iconColumn(): string;
    iconColumn(_: string): this;
    iconColumn_exists(): boolean;
    icon(): string;
    icon(_: string): this;
    icon_exists(): boolean;
    iconOpacity(): number;
    iconOpacity(_: number): this;

    fontFamily(): string;
    fontFamily(_: string): this;

    hideLabel(): boolean;
    hideLabel(_: boolean): this;
    hideLabel_exists(): boolean;
    labelColumn(): string;
    labelColumn(_: string): this;
    labelColumn_exists(): boolean;
    labelHTML(): boolean;
    labelHTML(_: boolean): this;
    labelHTML_exists(): boolean;
    labelOpacity(): number;
    labelOpacity(_: number): this;

    valueColumn(): string;
    valueColumn(_: string): this;
    valueColumn_exists(): boolean;
    valueHTML(): boolean;
    valueHTML(_: boolean): this;
    valueHTML_exists(): boolean;
    valueOpacity(): number;
    valueOpacity(_: number): this;

    hideMore(): boolean;
    hideMore(_: boolean): this;
    hideMore_exists(): boolean;
    moreIconColumn(): string;
    moreIconColumn(_: string): this;
    moreIconColumn_exists(): boolean;
    moreIcon(): string;
    moreIcon(_: string): this;
    moreIcon_exists(): boolean;
    moreTextColumn(): string;
    moreTextColumn(_: string): this;
    moreTextColumn_exists(): boolean;
    moreText(): string;
    moreText(_: string): this;
    moreText_exists(): boolean;
    moreTextHTML(): boolean;
    moreTextHTML(_: boolean): this;
    moreTextHTML_exists(): boolean;

    mult(): number;
    mult(_: number): this;

    colorFillColumn(): string;
    colorFillColumn(_: string): this;
    colorFillColumn_exists(): boolean;
    colorFill(): string;
    colorFill(_: string): this;
    colorFill_exists(): boolean;
    colorStrokeColumn(): string;
    colorStrokeColumn(_: string): this;
    colorStrokeColumn_exists(): boolean;
    colorStroke(): string;
    colorStroke(_: string): this;
    colorStroke_exists(): boolean;

    fixedSize(): boolean;
    fixedSize(_: boolean): this;
    fixedSize_exists(): boolean;
    minWidth(): number;
    minWidth(_: number): this;
    minWidth_exists(): boolean;
    minHeight(): number;
    minHeight(_: number): this;
    minHeight_exists(): boolean;
    playInterval(): number;
    playInterval(_: number): this;
    playInterval_exists(): boolean;
    mainSizeExp(): number;
    mainSizeExp(_: number): this;
    subSizeExp(): number;
    subSizeExp(_: number): this;
    paddingSizeExp(): number;
    paddingSizeExp(_: number): this;
    iconSizeMult(): number;
    iconSizeMult(_: number): this;

    iconAnchor(): "start" | "middle" | "end";
    iconAnchor(_: "start" | "middle" | "end"): this;
    labelAnchor(): "start" | "middle" | "end";
    labelAnchor(_: "start" | "middle" | "end"): this;
    valueAnchor(): "start" | "middle" | "end";
    valueAnchor(_: "start" | "middle" | "end"): this;

}

SummaryC.prototype.publish("iconAnchor", "start", "set", "Anchors the icon either at the start, middle, or end of the summary", ["start", "middle", "end"]);
SummaryC.prototype.publish("valueAnchor", "start", "set", "Anchors the value either at the start, middle, or end of the summary", ["start", "middle", "end"]);
SummaryC.prototype.publish("labelAnchor", "start", "set", "Anchors the label either at the start, middle, or end of the summary", ["start", "middle", "end"]);
SummaryC.prototype.publish("iconColumn", null, "set", "Select Icon Column", function () { return this.columns(); }, { optional: true });
SummaryC.prototype.publish("icon", "fa-briefcase", "string", "FA Char icon class", null, { disable: (w) => w.iconColumn() });

SummaryC.prototype.publish("fontFamily", "Arial", "string", "Font Family");

SummaryC.prototype.publish("hideLabel", false, "boolean", "Hide label column");
SummaryC.prototype.publish("labelColumn", null, "set", "Select display value", function () { return this.columns(); }, { optional: true, disable: (w) => w.hideLabel() });
SummaryC.prototype.publish("labelHTML", false, "boolean", "Allow HTML", null, { disable: (w) => w.hideLabel() });

SummaryC.prototype.publish("valueColumn", null, "set", "Select display value", function () { return this.columns(); }, { optional: true });
SummaryC.prototype.publish("valueHTML", false, "boolean", "Allow HTML");

SummaryC.prototype.publish("hideMore", false, "boolean", "Hide More Information");
SummaryC.prototype.publish("moreIconColumn", null, "set", "Select More Icon Column", function () { return this.columns(); }, { optional: true, disable: (w) => w.hideMore() });
SummaryC.prototype.publish("moreIcon", "fa-info-circle", "string", "FA Char icon class", null, { disable: (w) => w.hideMore() || w.moreIconColumn() });
SummaryC.prototype.publish("moreTextColumn", null, "set", "Select display value", function () { return this.columns(); }, { optional: true, disable: (w) => w.hideMore() });
SummaryC.prototype.publish("moreText", "More Info", "string", "More text", null, { disable: (w) => w.hideMore() || w.moreTextColumn() });
SummaryC.prototype.publish("moreTextHTML", false, "boolean", "Allow HTML", null, { disable: (w) => w.hideMore() });

SummaryC.prototype.publish("colorFillColumn", null, "set", "Column for color", function () { return this.columns(); }, { optional: true });
SummaryC.prototype.publish("colorFill", "#3498db", "html-color", "Fill Color", null, { disable: (w) => w.colorFillColumn() });
SummaryC.prototype.publish("colorStrokeColumn", null, "set", "Column for color", function () { return this.columns(); }, { optional: true });
SummaryC.prototype.publish("colorStroke", "#ffffff", "html-color", "Fill Color", null, { disable: (w) => w.colorStrokeColumn() });

SummaryC.prototype.publish("fixedSize", true, "boolean", "Fix Size to Min Width/Height");
SummaryC.prototype.publish("minWidth", 225, "number", "Minimum Width");
SummaryC.prototype.publish("minHeight", 150, "number", "Minimum Height");
SummaryC.prototype.publish("playInterval", null, "number", "Play Interval", null, { optional: true });

SummaryC.prototype.publish("mult", 0.618, "number", "mult");
SummaryC.prototype.publish("valueOpacity", 1, "number", "valueOpacity");
SummaryC.prototype.publish("labelOpacity", 0.9, "number", "labelOpacity");
SummaryC.prototype.publish("iconOpacity", 0.3, "number", "iconOpacity");

SummaryC.prototype.publish("mainSizeExp", 1, "number", "mainSizeExp");
SummaryC.prototype.publish("subSizeExp", 3, "number", "subSizeExp");
SummaryC.prototype.publish("paddingSizeExp", 6, "number", "paddingSizeExp");
SummaryC.prototype.publish("iconSizeMult", 4, "number", "iconSizeMult");

const playInterval = SummaryC.prototype.playInterval;
SummaryC.prototype.playInterval = function (_?: number): number | any {
    const retVal = playInterval.apply(this, arguments);
    if (arguments.length) {
        if (this._playIntervalHandle) {
            clearInterval(this._playIntervalHandle);
        }
        const context = this;
        if (_) {
            this._playIntervalHandle = setInterval(function () {
                context._playIntervalIdx++;
                if (context._renderCount && context.data().length) {
                    context.render();
                }
            }, _);
        }
    }
    return retVal;
};
