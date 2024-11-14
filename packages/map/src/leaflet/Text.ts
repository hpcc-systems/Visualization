import { BeautifyIcon, Map } from "@hpcc-js/leaflet-shim";
import { format as d3Format } from "d3-format";
import { Markers } from "./Markers.ts";

export class Text extends Markers {

    constructor(cluster = false) {
        super(cluster);
    }

    layerUpdate(map: Map) {
        const columns = this.columns();
        const textIdx = columns.indexOf(this.textColumn());
        const textColorIdx = columns.indexOf(this.textColorColumn());
        const strokeColorIdx = columns.indexOf(this.strokeColorColumn());
        const fillColorIdx = columns.indexOf(this.fillColorColumn());
        super.layerUpdate(map, (row) => {
            let text = this.propValue(textIdx, row, this.text());
            const textSize = this.textSize(text, this.fontFamily(), this.fontSize());
            if (this.textFormat_exists()) {
                text = d3Format(this.textFormat())(text);
            }
            return {
                icon: BeautifyIcon({
                    iconShape: "rectangle",
                    iconAnchor: [
                        (textSize.width / 2) + this.textOffsetX(),
                        (textSize.height / 2) + this.textOffsetY()
                    ],
                    html: `<span style="
                        ${this.fontFamily_exists() ? `font-family:${this.fontFamily()};` : ""}
                        font-size:${this.fontSize()}px;
                        pointer-events: none;
                        white-space:nowrap;
                        ">${text}</span>`,
                    textColor: this.propValue(textColorIdx, row, this.textColor()),
                    borderColor: this.propValue(strokeColorIdx, row, this.strokeColor()),
                    backgroundColor: this.propValue(fillColorIdx, row, this.fillColor()),
                    props: {
                        owner: this,
                        row
                    }
                }),
                draggable: false
            };
        });
    }
}
Text.prototype._class += " map_Text";

export interface Text {
    text(): string;
    text(_: string);
    textColumn(): string;
    textColumn(_: string);
    textColumn_exists(): boolean;
    textColor(): string;
    textColor(_: string);
    textColorColumn(): string;
    textColorColumn(_: string);
    textColorColumn_exists(): boolean;
    strokeColor(): string;
    strokeColor(_: string);
    strokeColorColumn(): string;
    strokeColorColumn(_: string);
    strokColorColumn_exists(): boolean;
    fillColor(): string;
    fillColor(_: string);
    fillColorColumn(): string;
    fillColorColumn(_: string);
    fillColorColumn_exists(): boolean;
    fontFamily(): string;
    fontFamily(_: string);
    fontFamily_exists(): boolean;
    fontSize(): number;
    fontSize(_: number);
    textOffsetX(): number;
    textOffsetX(_: number): this;
    textOffsetY(): number;
    textOffsetY(_: number): this;
    textFormat(): string;
    textFormat(_: string): this;
    textFormat_exists(): boolean;
}

Text.prototype.publish("textOffsetX", 0, "number", "Horizontal offset of text");
Text.prototype.publish("textOffsetY", 0, "number", "Vertical offset of text");
Text.prototype.publish("text", "", "string", "Default text");
Text.prototype.publish("textColumn", null, "set", "Font awesome column", function () { return this.columns(); }, { optional: true });
Text.prototype.publish("textColor", "#ffffff", "html-color", "Default  font awesome Color");
Text.prototype.publish("textColorColumn", null, "set", "Text color column", function () { return this.columns(); }, { optional: true });
Text.prototype.publish("textFontFamily", null, "set", "Text color column", function () { return this.columns(); }, { optional: true });
Text.prototype.publish("strokeColor", "transparent", "html-color", "Default stroke Color", null, { optional: true });
Text.prototype.publish("strokeColorColumn", null, "set", "Stroke color column", function () { return this.columns(); }, { optional: true });
Text.prototype.publish("fillColor", "#376cea", "html-color", "Default fill Color", null, { optional: true });
Text.prototype.publish("fillColorColumn", null, "set", "Fill color column", function () { return this.columns(); }, { optional: true });
Text.prototype.publish("fontFamily", null, "string", "Font family", null, { optional: true });
Text.prototype.publish("fontSize", 16, "number", "Font family", null, { optional: true });
Text.prototype.publish("textFormat", null, "string", "Format rules for text", null, { optional: true });
