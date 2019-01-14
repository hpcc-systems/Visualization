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
            .classed(".option-wrapper", true)
            .each(function(option) {
                const optionElement = d3Select(this);
                const labelElement = optionElement.append("label");
                const input = labelElement.append("input")
                    .attr("type", "radio")
                    .attr("name", `${context.id()}_${context.label()}`)
                    .property("value", option)
                    .property("checked", option === context.selectedOption())
                    ;
                if (option === context.selectedOption()) {
                    context.value(option);
                }
                labelElement.append("span")
                    .text(option)
                    .style("position", "absolute")
                    .style("line-height" )
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

        this._inputElement.forEach((e, idx) => {
            e.attr("name", this.name() ? this.name() : this.id());
            e.on("click", w => {
                this.click(this._inputElement[idx]);
            });
            e.on("blur", w => {
                this.blur(this._inputElement[idx]);
            });
            e.on("change", w => {
                const vals = [];
                this._inputElement.forEach(function (d) {
                    if (d.property("checked")) {
                        vals.push(d.property("value"));
                    }
                });
                this.value(vals[0]);
                this.change(w, true);
                this._input.property("value", vals[0]);
            });
        });
    }
    exit(domNode, element) {
        super.exit(domNode, element);
    }
}
SetInput.prototype._class += " html_SetInput";

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
