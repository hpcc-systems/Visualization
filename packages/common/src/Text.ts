import { SVGWidget } from "./SVGWidget";

import "../src/Text.css";

export class Text extends SVGWidget {

    private _textElement;

    constructor() {
        super();
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._textElement = element.append("text");
    }

    update(domNode, element) {
        super.update(domNode, element);
        const context = this;
        this._textElement
            .attr("font-family", this.fontFamily())
            .attr("font-size", this.fontSize())
            ;
        const textParts = this.text().split("\n");
        const textLine = this._textElement.selectAll("tspan").data(textParts);
        textLine.enter().append("tspan")
            .attr("class", function (_d, i) { return "tspan_" + i; })
            .attr("dy", "1em")
            .attr("x", "0")
            .merge(textLine)
            .style("fill", this.colorFill())
            .text(function (d) { return d; })
            ;
        textLine.exit()
            .remove()
            ;

        let bbox: any = { width: 0, height: 0 };
        try {   //  https://bugzilla.mozilla.org/show_bug.cgi?id=612118
            bbox = this._textElement.node().getBBox();
        } catch (e) {
        }
        let xOffset = -(bbox.x + bbox.width / 2);
        let yOffset = -(bbox.y + bbox.height / 2);
        switch (this.anchor()) {
            case "start":
                xOffset = -bbox.x + bbox.width / 2;
                break;
            case "end":
                xOffset = bbox.x + bbox.width / 2;
                break;
        }

        const theta = -this.rotation() * Math.PI / 180;
        xOffset = -1 * Math.abs(xOffset * Math.cos(theta) + yOffset * Math.sin(theta));
        yOffset = -1 * Math.abs(xOffset * Math.sin(theta) + yOffset * Math.cos(theta));

        this._textElement
            .style("text-anchor", this.anchor())
            .attr("transform", function (_d) { return "translate(" + xOffset + "," + yOffset + ")rotate(" + context.rotation() + ")"; })
            ;
    }

    text: { (): string; (_: string): Text; };
    fontFamily: { (): string; (_: string): Text; };
    fontSize: { (): number; (_: number): Text; };
    anchor: { (): string; (_: string): Text; };
    colorFill: { (): string; (_: string): Text; };
    rotation: { (): number; (_: number): Text; };
}
Text.prototype._class += " common_Text";

Text.prototype.publish("text", "", "string", "Display Text", null, { tags: ["Basic"] });
Text.prototype.publish("fontFamily", null, "string", "Font Family", null, { tags: ["Intermediate"], optional: true });
Text.prototype.publish("fontSize", null, "number", "Font Size (px)", null, { tags: ["Intermediate"] });
Text.prototype.publish("anchor", "middle", "set", "Anchor Position", ["start", "middle", "end"], { tags: ["Intermediate"] });
Text.prototype.publish("colorFill", null, "html-color", "Fill Color", null, { tags: ["Basic"] });

Text.prototype.publish("rotation", 0, "number", "Degrees of rotation", null, { tags: ["Basic"] });
