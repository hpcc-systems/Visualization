import { SVGWidget } from "@hpcc-js/common";

import "../src/MorphText.css";

export class MorphText extends SVGWidget {
    _fontWidth;
    _textElement;

    constructor() {
        super();
    }

    enter(domNode, element) {
        if (!this.fontSize()) {
            const style = window.getComputedStyle(domNode, null);
            this.fontSize(parseInt(style.fontSize));
        }
        this._fontWidth = this.fontSize() * 32 / 48;
        this._textElement = element.append("g")
            ;
    }

    dateTime() {
        const d = new Date();
        const seconds = d.getSeconds().toString().length === 1 ? "0" + d.getSeconds() : d.getSeconds();
        const minutes = d.getMinutes().toString().length === 1 ? "0" + d.getMinutes() : d.getMinutes();
        const hours = d.getHours().toString().length === 1 ? "0" + d.getHours() : d.getHours();
        const ampm = d.getHours() >= 12 ? "pm" : "am";
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return days[d.getDay()] + " " + months[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear() + " " + hours + ":" + minutes + ":" + seconds + ampm;
    }

    update(domNode, element) {
        const context = this;
        const text = this._textElement.selectAll("text")
            .data(this.data(), function (d) { return d.id; })
            ;
        text
            .attr("class", "update")
            ;
        this.transition.apply(text)
            .attr("x", function (d, i) { return (-context.data().length / 2 + i) * context._fontWidth + context._fontWidth / 2; })
            ;

        const newText = text.enter().append("text")
            .attr("class", "enter")
            .attr("font-size", this.fontSize())
            .attr("dy", ".35em")
            .attr("y", (this.reverse() ? +1 : -1) * this._fontWidth * 2)
            .attr("x", function (d, i) { return (-context.data().length / 2 + i) * context._fontWidth + context._fontWidth / 2; })
            .style("fill-opacity", 1e-6)
            .style("text-anchor", this.anchor())
            .text(function (d) { return d.text; })
            ;
        this.transition.apply(newText)
            .attr("y", 0)
            .style("fill-opacity", 1)
            ;

        text.exit()
            .attr("class", "exit")
            ;
        this.transition.apply(text.exit())
            .attr("y", (this.reverse() ? -1 : +1) * this._fontWidth * 2)
            .style("fill-opacity", 1e-6)
            .remove()
            ;
    }
    anchor_exists: () => boolean;
    fontSize_exists: () => boolean;
    reverse_exists: () => boolean;
    text_exists: () => boolean;
}
MorphText.prototype._class += " other_MorphText";

const _origText = MorphText.prototype.text;
MorphText.prototype.text = function (_?: string) {
    const retVal: string = _origText.apply(this, arguments);
    if (arguments.length) {
        const usedChars = {};
        const chars = _.split("");
        this.data(chars.map(function (d) {
            const id = "_" + d;
            if (usedChars[id] === undefined) {
                usedChars[id] = 0;
            }
            usedChars[id]++;
            return { text: d, id: d.charCodeAt(0) + (1024 * usedChars[id]) };
        }));
        return this;
    }
    return retVal;
};

export interface MorphText {
    anchor(): string;
    anchor(_: string): this;
    fontSize(): number;
    fontSize(_: number): this;
    reverse(): boolean;
    reverse(_: boolean): this;
    text(): string;
    text(_: string): MorphText | this;
}
MorphText.prototype.publish("anchor", "middle", "set", "Sets anchor point", ["middle"], { tags: ["Basic"] });
MorphText.prototype.publish("fontSize", 14, "number", "Sets fontsize", null, { tags: ["Basic"] });
MorphText.prototype.publish("reverse", false, "boolean", "Reverse Animation", null, { tags: ["Basic"] });
MorphText.prototype.publish("text", "", "string", "Sets text/data of widget", null, { tags: ["Basic"] });
