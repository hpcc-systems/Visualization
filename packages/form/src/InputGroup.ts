import { HTMLWidget } from "@hpcc-js/common";
import { VerticalList } from "@hpcc-js/layout";
import { select as d3Select } from "d3-selection";
import { TextInput } from "./TextInput";

export class InputGroup extends HTMLWidget {
    _grid;
    _maxTitleWidth;
    _sharedPublishParams;
    _widgetPrototypes;
    constructor() {
        super();
        this._grid = new VerticalList().flexWrap("wrap");
        this._widgetPrototypes = { TextInput };
        this._sharedPublishParams = ["padding", "placeholderSize", "pinnedLabelSize", "fontSize", "fontFamily", "spellcheck", "borderWidth"];
    }
    enter(domNode, element) {
        super.enter(domNode, element);
        d3Select(domNode.parentNode)
            .style("width", "100%")
            .style("height", "100%")
            ;
        this._grid.target(domNode);
    }
    update(domNode, element) {
        super.update(domNode, element);
        const inputHeight = (this.borderWidth() * 2) + (this.gutter() * 2) + this.fontSize() + (this.padding() * 2) + 4 + "px";
        this._maxTitleWidth = 0;
        this.data().forEach(d => {
            const titleWidth = this.textSize(d[1].title).width;
            if (titleWidth > this._maxTitleWidth) {
                this._maxTitleWidth = titleWidth;
            }
        });
        this._grid
            .itemMinHeight(inputHeight)
            .flexBasis(inputHeight)
            .widgets(this.data().map(d => {
                return this.getInputWidget(d);
            }))
            .resize()
            .render()
            ;
    }
    postUpdate() {
        super.postUpdate.apply(this, arguments);
        this._grid.resize().render();
    }
    getWigetPrototype(d) {
        return new this._widgetPrototypes[d[0]]();
    }
    getInputWidget(d) {
        return this.newWidget(d); // TODO: optimize by reusing existing widgets
    }
    newWidget(d) {
        const w = this.getWigetPrototype(d);
        for (const property of this._sharedPublishParams) {
            if (typeof w[property] === "function") {
                w[property](this[property]());
            }
            if (typeof w.change !== "undefined") {
                w.change = widget => {
                    d[1].value = widget.value();
                };
            }
            if (typeof w.keyup !== "undefined") {
                w.keyup = widget => {
                    d[1].value = widget.value();
                };
            }
        }
        if (typeof d[1] === "object") {
            for (const property in d[1]) {
                if (typeof w[property] === "function") {
                    w[property](d[1][property]);
                }
            }
        }
        return w;
    }
    values() {
        return this._widgetScale().map(n => n.value());
    }
}
InputGroup.prototype._class += " form_InputGroup";

export interface InputGroup {
    gutter(): number;
    gutter(_: number): this;
    padding(): number;
    padding(_: number): this;
    fontSize(): number;
    fontSize(_: number): this;
    spellcheck(): boolean;
    spellcheck(_: boolean): this;
    borderWidth(): number;
    borderWidth(_: number): this;
    pinnedLabelSize(): number;
    pinnedLabelSize(_: number): this;
    fontFamily(): string;
    fontFamily(_: string): this;
}

InputGroup.prototype.publishProxy("orientation", "_grid", "orientation");
InputGroup.prototype.publishProxy("itemMinWidth", "_grid", "itemMinWidth");
InputGroup.prototype.publishProxy("widgetsFlexBasis", "_grid", "widgetsFlexBasis");
InputGroup.prototype.publishProxy("widgetsFlexGrow", "_grid", "widgetsFlexGrow");
InputGroup.prototype.publishProxy("alignItems", "_grid", "alignItems");
InputGroup.prototype.publishProxy("alignContent", "_grid", "alignContent");
InputGroup.prototype.publish("borderWidth", 1, "number", "Width of border (pixels)");
InputGroup.prototype.publish("gutter", 4, "number", "Spacing between inputs (pixels)");
InputGroup.prototype.publish("padding", 4, "number", "Padding size (pixels)");
InputGroup.prototype.publish("fontSize", 38, "number", "Font size of value text (pixels)");
InputGroup.prototype.publish("spellcheck", false, "boolean", "Input spell checking");
InputGroup.prototype.publish("pinnedLabelSize", 10, "number", "Font size of pinned input label (label that displays while the input has content) (pixels)");
InputGroup.prototype.publish("fontFamily", "Verdana", "string", "Font family");
