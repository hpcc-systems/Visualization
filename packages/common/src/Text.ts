import { SVGWidget } from "./SVGWidget";

import "../src/Text.css";

export class Text extends SVGWidget {

    private _textElement;

    constructor() {
        super();
    }

    getBBox(refresh = false, round = false) {
        const textParts = this.text().split("\n");
        const lineHeight = this.fontSize() || 12;
        const height = lineHeight * textParts.length;
        const widths: number[] = textParts.map(line => {
            return this.textSize(line, this.fontFamily() || "Verdana", lineHeight).width;
        });
        const width = Math.max(...widths);
        const retVal = {
            x: - width / 2,
            y: - height / 2 - lineHeight / (this.fontFamily() === "FontAwesome" ? 4 : 6), // baseLine offset
            width,
            height
        };
        switch (this.anchor()) {
            case "start":
                retVal.x = 0;
                break;
            case "end":
                retVal.x = -width;
                break;
        }
        return retVal;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        delete this._prevHash;
        this._textElement = element.append("text")
            .on("click", () => {
                this.click();
            })
            .on("dblclick", () => {
                this.dblclick();
            })
            ;
    }

    _prevHash;
    update(domNode, element) {
        super.update(domNode, element);
        const hash = this.hashSum([], { width: this.width() });
        if (this._prevHash !== hash) {
            this._prevHash = hash;

            const bbox = this.getBBox();

            this._textElement
                .attr("font-family", this.fontFamily())
                .attr("font-size", this.fontSize())
                .style("text-anchor", this.anchor())
                .attr("transform", d => `rotate(${this.rotation()}) translate(0,${bbox.y})`)
                ;

            const width = this.width();
            const context = this;
            const textParts = this.text().split("\n");
            const textLine = this._textElement.selectAll("tspan").data(textParts);
            textLine.enter().append("tspan")
                .attr("class", function (_d, i) { return "tspan_" + i; })
                .attr("dy", "1em")
                .attr("x", "0")
                .merge(textLine)
                .style("fill", this.colorFill())
                .text((d: string) => {
                    if (!width) return d;
                    let retVal = d;
                    const lineHeight = context.fontSize() || 12;
                    let clipPos = retVal.length - 1;
                    while (clipPos > -3 && this.textSize(retVal, this.fontFamily() || "Verdana", lineHeight).width > width) {
                        retVal = retVal.substr(0, --clipPos) + "...".substr(0, clipPos + 3);
                    }
                    return retVal;
                })
                ;
            textLine.exit()
                .remove()
                ;

        }
    }

    click() {
    }

    dblclick() {
    }
}
Text.prototype._class += " common_Text";

export interface Text {
    text(): string;
    text(_: string): this;
    fontFamily(): string;
    fontFamily(_: string): this;
    fontSize(): number;
    fontSize(_: number): this;
    anchor(): "start" | "middle" | "end";
    anchor(_: "start" | "middle" | "end"): this;
    colorFill(): string;
    colorFill(_: string): this;
    colorFill_default(): string;
    colorFill_default(_: string): this;
    rotation(): number;
    rotation(_: number): Text;
}

Text.prototype.publish("text", "", "string", "Display Text", null, { tags: ["Basic"] });
Text.prototype.publish("fontFamily", null, "string", "Font Family", null, { tags: ["Intermediate"], optional: true });
Text.prototype.publish("fontSize", null, "number", "Font Size (px)", null, { tags: ["Intermediate"] });
Text.prototype.publish("anchor", "middle", "set", "Anchor Position", ["start", "middle", "end"], { tags: ["Intermediate"] });
Text.prototype.publish("colorFill", null, "html-color", "Fill Color", null, { tags: ["Basic"] });
Text.prototype.publish("rotation", 0, "number", "Degrees of rotation", null, { tags: ["Basic"] });
