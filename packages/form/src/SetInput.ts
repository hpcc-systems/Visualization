import { select as d3Select } from "d3-selection";
import { HTMLInput } from "./HTMLInput";

export class SetInput extends HTMLInput {
    _inputs;
    _inputWrapper;
    _inputElement;
    constructor() {
        super();
    }
    enter(domNode, element) {
        super.enter(domNode, element);
        this._input.attr("type", "hidden");
        this._inputWrapper = element.append("div");
    }
    update(domNode, element) {
        super.update(domNode, element);
        const context = this;
        this._inputWrapper
            .style("column-count", this.columnCount())
            .style("min-width", this.minWidth() + "px")
            .style("margin-top", this.gutter() + "px")
            ;
        const optionSelection = this._inputWrapper.selectAll(".option-wrapper").data(this.options());

        this._inputElement = [];

        const optionEnter = optionSelection.enter()
            .append("div")
            .attr("class", "option-wrapper")
            .each(function(option) {
                const optionElement = d3Select(this);
                const labelElement = optionElement.append("label");
                const input = labelElement.append("input")
                    .attr("type", "radio")
                    .attr("name", context.name() ? context.name() : context.id())
                    .property("value", option)
                    .property("checked", option === context.selectedOption())
                    .on("click", function(w) {
                        context.click(this);
                    })
                    .on("blur", function(w) {
                        context.blur(this);
                    })
                    .on("change", function(w) {
                        const vals = [];
                        context._inputElement.forEach(function (d) {
                            if (d.property("checked")) {
                                vals.push(d.property("value"));
                            }
                        });
                        context.value(vals[0]);
                        context.change(w, true);
                        context._input.property("value", vals[0]);
                    })
                    ;
                if (option === context.selectedOption()) {
                    context.value(option);
                }
                labelElement.append("span")
                    .text(option)
                    ;
                context._inputElement.push(input);
            })
            ;
        const optionUpdate = optionEnter
            .merge(optionSelection)
            .each(function(option) {
                d3Select(this).select("span")
                    .style("line-height", context.fontSize() + context.gutter() + "px")
                    ;
            })
            ;
        optionUpdate.exit().remove();
    }
}
SetInput.prototype._class += " form_SetInput";

export interface SetInput {
    options(): any;
    options(_: any): this;
    selectedOption(): string;
    selectedOption(_: string): this;
    columnCount(): number;
    columnCount(_: number): this;
    fontSize(): number;
    fontSize(_: number): this;
}

SetInput.prototype.publish("columnCount", 1, "number", "Number of columns for displaying the radio options");
SetInput.prototype.publish("options", [], "array");
SetInput.prototype.publish("selectedOption", null, "string", "Selected option", null, {optional: true});
