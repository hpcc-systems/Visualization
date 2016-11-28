import { SVGWidget } from "./SVGWidget";
import "css!./Text";

export function Text() {
    SVGWidget.call(this);
}
Text.prototype = Object.create(SVGWidget.prototype);
Text.prototype.constructor = Text;
Text.prototype._class += " common_Text";

Text.prototype.publish("text", "", "string", "Display Text", null, { tags: ["Basic"] });
Text.prototype.publish("fontFamily", null, "string", "Font Family", null, { tags: ["Intermediate"], optional: true });
Text.prototype.publish("fontSize", null, "number", "Font Size (px)", null, { tags: ["Intermediate"] });
Text.prototype.publish("anchor", "middle", "set", "Anchor Position", ["start", "middle", "end"], { tags: ["Intermediate"] });
Text.prototype.publish("colorFill", null, "html-color", "Fill Color", null, { tags: ["Basic"] });

Text.prototype.publish("rotation", 0, "number", "Degrees of rotation", null, { tags: ["Basic"] });

Text.prototype.enter = function (domNode, element) {
    SVGWidget.prototype.enter.apply(this, arguments);
    this._textElement = element.append("text");
};

Text.prototype.update = function (domNode, element) {
    SVGWidget.prototype.update.apply(this, arguments);
    var context = this;
    this._textElement
        .attr("font-family", this.fontFamily())
        .attr("font-size", this.fontSize())
        ;
    var textParts = this.text().split("\n");
    var textLine = this._textElement.selectAll("tspan").data(textParts);
    textLine.enter().append("tspan")
        .attr("class", function (d, i) { return "tspan_" + i; })
        .attr("dy", "1em")
        .attr("x", "0")
        ;
    textLine
        .style("fill", this.colorFill())
        .text(function (d) { return d; })
        ;
    textLine.exit()
        .remove()
        ;

    var bbox: any = { width: 0, height: 0 };
    try {   //  https://bugzilla.mozilla.org/show_bug.cgi?id=612118
        bbox = this._textElement.node().getBBox();
    } catch (e) {
    }
    var xOffset = -(bbox.x + bbox.width / 2);
    var yOffset = -(bbox.y + bbox.height / 2);
    switch (this.anchor()) {
        case "start":
            xOffset = -bbox.x + bbox.width / 2;
            break;
        case "end":
            xOffset = bbox.x + bbox.width / 2;
            break;
    }

    var theta = -this.rotation() * Math.PI / 180;
    xOffset = -1 * Math.abs(xOffset * Math.cos(theta) + yOffset * Math.sin(theta));
    yOffset = -1 * Math.abs(xOffset * Math.sin(theta) + yOffset * Math.cos(theta));

    this._textElement
        .style("text-anchor", this.anchor())
        .attr("transform", function (d) { return "translate(" + xOffset + "," + yOffset + ")rotate(" + context.rotation() + ")"; })
        ;
};
