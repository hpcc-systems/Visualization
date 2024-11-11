import { I2DChart } from "@hpcc-js/api";
import { CanvasWidget, Utility } from "@hpcc-js/common";

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
        const { width, height } = this.size();
        domNode.height = height;
        domNode.width = width;
    }

    update(domNode, element) {
        super.update.apply(this, arguments);
        const context = this;
        if (this._playIntervalIdx >= this.data().length) {
            this._playIntervalIdx = 0;
        }
        const size = this.size();
        const minDimension = Math.min(size.width, size.height);
        const sizeRatio = this.fontSizeRatio();
        const labelIdx = this.columns().indexOf(this.labelColumn());
        const valueIdx = this.columns().indexOf(this.valueColumn());
        const bgColorIdx = this.columns().indexOf(this.colorFillColumn());
        const fontColorIdx = this.columns().indexOf(this.colorStrokeColumn());
        const iconIdx = this.columns().indexOf(this.iconColumn());
        const icon = iconIdx !== -1 ? this.currentRow()[iconIdx] : this.icon();
        const label = labelIdx !== -1 ? this.currentRow()[labelIdx] : "";
        const value = valueIdx !== -1 ? this.currentRow()[valueIdx] : "";
        const bgColor = bgColorIdx !== -1 ? this.currentRow()[bgColorIdx] : this.colorFill();
        const fontColor = fontColorIdx !== -1 ? this.currentRow()[fontColorIdx] : this.colorStroke();

        let mainFontSize = size.height * (sizeRatio - this.paddingSizeRatio());
        const subFontSize = size.height * (1 - sizeRatio - this.paddingSizeRatio());
        const iconSize = size.height * (this.iconSizeRatio() - this.paddingSizeRatio());
        const p = minDimension * this.paddingSizeRatio();
        const ctx = domNode.getContext("2d");

        ctx.clearRect(0, 0, size.width, size.height);

        const fontFamily = context.fontFamily();

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, size.width, size.height);

        ctx.globalAlpha = this.iconOpacity();
        drawIcon(Utility.faChar(icon), iconSize, context.iconAnchor());

        ctx.globalAlpha = this.valueOpacity();
        mainFontSize = drawText(value, p, mainFontSize, context.valueAnchor());

        ctx.globalAlpha = this.labelOpacity();
        drawText(label, mainFontSize + p, subFontSize, context.labelAnchor());

        function drawText(text, y, fontSize, anchorMode) {
            ctx.textBaseline = "top";
            ctx.font = `${fontSize}px ${fontFamily}`;
            ctx.fillStyle = fontColor;
            let measurement = ctx.measureText(text);
            if (measurement.width > (size.width - (p * 2))) {
                const fontSizeMult = (size.width - (p * 2)) / measurement.width;
                fontSize = fontSize * fontSizeMult;
                ctx.font = `${fontSize}px ${fontFamily}`;
                measurement = ctx.measureText(text);
            }
            const x = getTextOffsetX(measurement.width, anchorMode);
            ctx.fillText(text, x, y);
            return fontSize;
        }

        function drawIcon(text, fontSize, anchorMode) {
            if (typeof text === "undefined") return;
            ctx.textBaseline = context.iconBaseline();
            ctx.font = `${fontSize}px FontAwesome`;
            ctx.fillStyle = fontColor;
            let measurement = ctx.measureText(text);
            if (measurement.width > (size.width - (p * 2))) {
                const fontSizeMult = (size.width - (p * 2)) / measurement.width;
                ctx.font = `${fontSize * fontSizeMult}px FontAwesome`;
                measurement = ctx.measureText(text);
            }
            const x = getTextOffsetX(measurement.width, anchorMode);
            const y = getTextOffsetY(context.iconBaseline());
            ctx.fillText(text, x, y);
        }

        function getTextOffsetX(width, anchorMode) {
            switch (anchorMode) {
                case "start":
                    return p;
                case "middle":
                    return (size.width / 2) - (width / 2);
                case "end":
                    return size.width - width - p;
            }
        }
        function getTextOffsetY(anchorMode) {
            switch (anchorMode) {
                case "top":
                    return p;
                case "middle":
                    return size.height / 2;
                case "bottom":
                    return size.height - p;
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

    labelColumn(): string;
    labelColumn(_: string): this;
    labelColumn_exists(): boolean;
    labelOpacity(): number;
    labelOpacity(_: number): this;

    valueColumn(): string;
    valueColumn(_: string): this;
    valueColumn_exists(): boolean;
    valueOpacity(): number;
    valueOpacity(_: number): this;

    fontSizeRatio(): number;
    fontSizeRatio(_: number): this;

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
    paddingSizeRatio(): number;
    paddingSizeRatio(_: number): this;
    iconSizeRatio(): number;
    iconSizeRatio(_: number): this;

    iconAnchor(): "start" | "middle" | "end";
    iconAnchor(_: "start" | "middle" | "end"): this;
    labelAnchor(): "start" | "middle" | "end";
    labelAnchor(_: "start" | "middle" | "end"): this;
    valueAnchor(): "start" | "middle" | "end";
    valueAnchor(_: "start" | "middle" | "end"): this;

    iconBaseline(): "top" | "middle" | "bottom";
    iconBaseline(_: "top" | "middle" | "bottom"): this;
}

SummaryC.prototype.publish("iconBaseline", "bottom", "string", "Text baseline for the icon", ["top", "middle", "bottom"]);
SummaryC.prototype.publish("iconAnchor", "end", "set", "Anchors the icon either at the start, middle, or end of the summary", ["start", "middle", "end"]);
SummaryC.prototype.publish("valueAnchor", "start", "set", "Anchors the value either at the start, middle, or end of the summary", ["start", "middle", "end"]);
SummaryC.prototype.publish("labelAnchor", "start", "set", "Anchors the label either at the start, middle, or end of the summary", ["start", "middle", "end"]);
SummaryC.prototype.publish("iconColumn", null, "set", "Select Icon Column", function () { return this.columns(); }, { optional: true });
SummaryC.prototype.publish("icon", "fa-briefcase", "string", "FA Char icon class", null, { disable: (w) => w.iconColumn() });

SummaryC.prototype.publish("fontFamily", "Arial", "string", "Font Family");

SummaryC.prototype.publish("labelColumn", null, "set", "Select display value", function () { return this.columns(); }, { optional: true });
SummaryC.prototype.publish("valueColumn", null, "set", "Select display value", function () { return this.columns(); }, { optional: true });

SummaryC.prototype.publish("colorFillColumn", null, "set", "Column for background color", function () { return this.columns(); }, { optional: true });
SummaryC.prototype.publish("colorFill", "#0097e6", "html-color", "Background Color", null, { disable: (w) => w.colorFillColumn() });
SummaryC.prototype.publish("colorStrokeColumn", null, "set", "Column for font color", function () { return this.columns(); }, { optional: true });
SummaryC.prototype.publish("colorStroke", "#2f3640", "html-color", "Font Color", null, { disable: (w) => w.colorStrokeColumn() });

SummaryC.prototype.publish("fixedSize", true, "boolean", "Fix Size to Min Width/Height");
SummaryC.prototype.publish("minWidth", 225, "number", "Minimum Width");
SummaryC.prototype.publish("minHeight", 150, "number", "Minimum Height");
SummaryC.prototype.publish("playInterval", null, "number", "Play Interval", null, { optional: true });

SummaryC.prototype.publish("fontSizeRatio", 0.618, "number", "Ratio between widget height and value font size");
SummaryC.prototype.publish("valueOpacity", 1, "number", "Opacity of value text (0..1)");
SummaryC.prototype.publish("labelOpacity", 0.9, "number", "Opacity of label text (0..1)");
SummaryC.prototype.publish("iconOpacity", 0.3, "number", "Opacity of icon text (0..1)");

SummaryC.prototype.publish("paddingSizeRatio", 0.1, "number", "Ratio of the smallest dimension for edge padding (0..1)");
SummaryC.prototype.publish("iconSizeRatio", 0.9, "number", "Ratio of the height for icon size (0..1)");

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
