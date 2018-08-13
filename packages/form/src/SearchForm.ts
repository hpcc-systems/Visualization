import { HTMLWidget, SVGWidget, Widget, WidgetArray } from "@hpcc-js/common";
import { event as d3Event, select as d3Select } from "d3-selection";

import "../src/SearchForm.css";

export class SearchForm extends HTMLWidget {
    _formDiv;

    constructor() {
        super();

        this._tag = "form";
    }

    data(): any;
    data(_: any): this;
    data(_?: any): any | this {
        if (!arguments.length) {
            const retVal = [];
            this.inputsForEach(function (input) {
                retVal.push(input.value());
            });
            return retVal;
        } else {
            this.inputsForEach(function (input, idx) {
                if (_.length > idx) {
                    input.value(_[idx]).render();
                }
            });
        }
        return this;
    }

    inputsForEach(callback, scope?) {
        let idx = 0;
        this.inputs().forEach(function (inp) {
            const inpArray = inp instanceof WidgetArray ? inp.content() : [inp];
            inpArray.forEach(function (inp2) {
                if (scope) {
                    callback.call(scope, inp2, idx++);
                } else {
                    callback(inp2, idx++);
                }
            });
        });
    }

    inputsMap(): { [name: string]: Widget } {
        const retVal: { [name: string]: Widget } = {};
        this.inputs().forEach(function (inp) {
            retVal[inp.name()] = inp;
        });
        return retVal;
    }

    values(): any;
    values(_: any): this;
    values(_?: any): any | this {
        if (!arguments.length) {
            const dataArr = {};
            this.inputsForEach(function (inp) {
                const value = inp.value();
                if (value || !this.omitBlank()) {
                    dataArr[inp.name()] = inp.value();
                }
            }, this);
            return dataArr;
        } else {
            this.inputsForEach(function (inp) {
                if (_[inp.name()]) {
                    inp.value(_[inp.name()]);
                } else if (this.omitBlank()) {
                    inp.value("");
                }
            }, this);
        }
        return this;
    }

    checkValidation() {
        let ret = true;
        const msgArr = [];
        this.inputsForEach(function (inp) {
            if (!inp.isValid()) {
                msgArr.push("'" + inp.label() + "'" + " value is invalid.");
            }
        });
        if (msgArr.length > 0) {
            alert(msgArr.join("\n"));
            ret = false;
        }
        return ret;
    }

    enter(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        element.on("submit", function () {
            d3Event.preventDefault();
        });
        this._formDiv = element.append("div")
            .attr("class", "SearchForm-form-div size1")
            ;
        this._placeholderElement.style("overflow", "auto");
    }

    update(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        const context = this;
        const gutter = context.gutter();
        const row_height = 30;

        this._formDiv.style("height", (this.inputs().length * row_height) + "px");

        const rows = this._formDiv.selectAll("div.SearchForm-form-row").data(this.inputs());
        const percs = this.inputWidthPercentages();
        rows.enter().append("div")
            .attr("class", "SearchForm-form-row")
            .style("margin-bottom", `${gutter}px`)
            .each(function (inputWidget, i) {
                const element2 = d3Select(this);
                const inputWidgetArray = inputWidget instanceof WidgetArray ? inputWidget.content() : [inputWidget];
                inputWidgetArray.forEach(function (inputWidget2, i2) {
                    const inputDiv = element2.append("div")
                        .attr("class", "SearchForm-input-div")
                        .style("border-color", context.borderColor())
                        .style("border-radius", context.borderRadius() + "px")
                        ;
                    if (i2 === inputWidgetArray.length - 1) {
                        inputDiv
                            .style("margin-right", "0px")
                            .style("width", percs && percs[i] && percs[i][i2] ? `${percs[i][i2]}%` : "auto");
                    } else {
                        inputDiv
                            .style("margin-right", gutter + "px")
                            .style("width", percs && percs[i] && percs[i][i2] ? `calc(${percs[i][i2]}% - ${gutter}px)` : "auto");
                    }
                    const p = context.inputPadding();
                    const inputLabel = inputDiv.append("div")
                        .attr("class", "SearchForm-input-label")
                        .style("font-size", context.fontSize() + "px")
                        .style("font-family", context.fontFamily())
                        .style("color", context.placeholderColor())
                        ;
                    inputLabel.text(inputWidget2.label());
                    if (inputWidget2.type() === "text") {
                        inputLabel
                            .style("top", `${p}px`)
                            .style("left", p + "px")
                            ;
                        inputWidget2.target(inputDiv.node()).render(w => {
                            if (w._inputElement && w._inputElement[0]) {
                                w._inputElement[0]
                                    .attr("autocomplete", "off")
                                    .style("font-size", context.fontSize() + "px")
                                    .style("font-family", context.fontFamily())
                                    .style("padding", `${p + (p * 2 / 3)}px ${p}px ${p - (p / 3)}px ${p}px`)
                                    ;
                                w._inputElement[0].on("focus", placeholder_to_label);
                                w._inputElement[0].on("blur", function() {
                                    if (this.value === "") label_to_placeholder();
                                });
                                w._inputElement[0].on("keyup", function() {
                                    if (this.value === "" && document.activeElement !== this) label_to_placeholder();
                                });
                                w._inputElement[0].on("change", function() {
                                    if (this.value === "") label_to_placeholder();
                                });
                            }
                        });
                    } else if (inputWidget2.type() === "checkbox") {
                        inputLabel
                            .style("top", "0px")
                            .style("left", `${p * 3}px`)
                            .style("color", context.labelColor())
                            ;
                        inputDiv
                            .style("margin-top", (p / 2) + "px")
                            .style("border-width", "0px")
                            ;
                        inputWidget2.target(inputDiv.node()).render(w => {
                            if (w._inputElement && w._inputElement[0]) {
                                w._inputElement[0]
                                    .style("width", "auto")
                                    .style("margin-left", p + "px")
                                    ;
                            }
                        });
                    } else {
                        if (inputWidget2 instanceof SVGWidget) {
                            const bbox = inputWidget2.element().node().getBBox();
                            inputDiv.style("height", bbox.height + "px");
                            inputWidget2.resize().render();
                        }
                    }
                    function placeholder_to_label() {
                        inputLabel
                            .style("font-size", `${p * 1.2}px`)
                            .style("top", "-2px")
                            .style("left", `${p}px`)
                            .style("color", context.labelColor())
                            ;
                    }
                    function label_to_placeholder() {
                        inputLabel
                            .style("font-size", context.fontSize() + "px")
                            .style("top", context.inputPadding() + "px")
                            .style("left", context.inputPadding() + "px")
                            .style("color", context.placeholderColor())
                            ;
                    }
                });
            })
            .merge(rows)
            .each(function (inputWidget, i) {
                // const element2 = d3Select(this);
                const inputWidgetArray = inputWidget instanceof WidgetArray ? inputWidget.content() : [inputWidget];
                inputWidgetArray.forEach(function (inputWidget2, idx) {

                });
            })
            ;
        rows.each(function (inputWidget, i) {
            if (i === 0 && inputWidget.setFocus) {
                inputWidget.setFocus();
            }
        });
        rows.exit().remove();
    }

    exit(domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    }

    inputs: { (): any[]; (_: any[]): SearchForm };
}
SearchForm.prototype._class += " form_SearchForm";

export interface SearchForm {
    gutter(): number;
    gutter(_?: number): this;
    fontSize(): number;
    fontSize(_?: number): this;
    fontColor(): string;
    fontColor(_?: string): this;
    fontFamily(): string;
    fontFamily(_?: string): this;
    borderColor(): string;
    borderColor(_?: string): this;
    borderRadius(): number;
    borderRadius(_?: number): this;
    labelColor(): string;
    labelColor(_?: string): this;
    placeholderColor(): string;
    placeholderColor(_?: string): this;
    inputPadding(): number;
    inputPadding(_?: number): this;
    inputWidthPercentages(): number[];
    inputWidthPercentages(_?: number[]): this;
}

SearchForm.prototype.publish("inputs", [], "widgetArray", "Array of input widgets", null, { render: false });
SearchForm.prototype.publish("gutter", 2, "number", "gutter");
SearchForm.prototype.publish("fontSize", 16, "number", "fontSize");
SearchForm.prototype.publish("fontColor", "#333", "html-color", "fontColor");
SearchForm.prototype.publish("fontFamily", `"Helvetica","Arial",sans-serif`, "string", "fontFamily");
SearchForm.prototype.publish("borderColor", "#777", "html-color", "borderColor");
SearchForm.prototype.publish("borderRadius", 4, "number", "borderRadius");
SearchForm.prototype.publish("labelColor", "#333", "html-color", "labelColor");
SearchForm.prototype.publish("placeholderColor", "#777", "html-color", "placeholderColor");
SearchForm.prototype.publish("inputPadding", 8, "number", "inputPadding");
SearchForm.prototype.publish("inputWidthPercentages", [], "array", "Array of input widget width percentages", null, { render: false });
