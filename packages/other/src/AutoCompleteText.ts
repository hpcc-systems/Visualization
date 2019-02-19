import { HTMLWidget } from "@hpcc-js/common";
import * as AutoComplete from "javascript-autocomplete";

import "../src/AutoCompleteText.css";

export class AutoCompleteText extends HTMLWidget {
    _span;
    _prompt;
    _input;
    _prevMinCharsText;
    _autoComplete;

    constructor() {
        super();
        this._tag = "div";
    }

    autoCompleteTextData() {
        if (this.data().length === 0) return [];
        const view = this._db.rollupView([this.textColumn(), this.valueColumn()]);
        return view.entries().map(function (row, idx) {
            return {
                idx,
                text: row.key,
                value: row.values.length ? row.values[0].key : "",
                origRow: row.values.length && row.values[0].value.length ? row.values[0].value[0] : []
            };
        }, this);
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._span = element.append("span");
        this._prompt = this._span.append("label")
            .attr("for", this.id() + "_input")
            ;
        this._input = this._span.append("input")
            .attr("id", this.id() + "_input")
            .attr("name", this.id() + "_input_name")
            .attr("type", "text")
            .attr("placeholder", this.placeholder())
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);

        this._prompt.text(this.label());
        this._input.style("width", this.textboxWidth_exists() ? this.textboxWidth() + "px" : null);

        if (this._prevMinCharsText !== this.minCharsText()) {
            this._prevMinCharsText = this.minCharsText();

            if (this._autoComplete) {
                this._autoComplete.destroy();
            }
            const context = this;
            this._autoComplete = new AutoComplete({
                selector: "#" + this.id() + "_input",
                minChars: this.minCharsText(),
                delay: 150,
                offsetLeft: 0,
                offsetTop: 1,
                source: (term, suggest) => {
                    const field = context._db.fieldByLabel(context.textColumn());
                    if (field) {
                        term = term.toLowerCase();
                        const suggestions = context.autoCompleteTextData().filter(function (row) {
                            return row.origRow[field.idx].toLowerCase().indexOf(term) >= 0;
                        }).map(function (row) {
                            return {
                                text: row.origRow[field.idx],
                                rowIdx: row.idx
                            };
                        });
                        suggest(suggestions);
                    }
                },
                renderItem: (item, search) => {
                    search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
                    const re = new RegExp("(" + search.split(" ").join("|") + ")", "gi");
                    return '<div class="autocomplete-suggestion" data-val="' + item.text + '" data-row-idx="' + item.rowIdx + '">' + item.text.replace(re, "<b>$1</b>") + "</div>";
                },
                onSelect: (e, term, item) => {
                    const rowIdx = +item.getAttribute("data-row-idx");
                    const row = context.autoCompleteTextData()[rowIdx];
                    context.click(context.rowToObj(row.origRow), context.valueColumn(), true);
                }
            });
        }
    }

    exit(domNode, element) {
        if (this._autoComplete) {
            this._autoComplete.destroy();
        }
        this._span.remove();
        super.exit(domNode, element);
    }

    click(row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    }

    label: { (): string; (_: string): AutoCompleteText };
    label_exists: () => boolean;
    textboxWidth: { (): number; (_: number): AutoCompleteText };
    textboxWidth_exists: () => boolean;
    placeholder: { (): string; (_: string): AutoCompleteText };
    placeholder_exists: () => boolean;
    valueColumn: { (): string; (_: string): AutoCompleteText };
    valueColumn_exists: () => boolean;
    textColumn: { (): string; (_: string): AutoCompleteText };
    textColumn_exists: () => boolean;
    minCharsText: { (): number; (_: number): AutoCompleteText };
    minCharsText_exists: () => boolean;
}
AutoCompleteText.prototype._class += " other_AutoCompleteText";

AutoCompleteText.prototype.publish("label", "Label: ", "string", "Label for AutoCompleteText");
AutoCompleteText.prototype.publish("textboxWidth", null, "number", "width of textbox", null, { optional: true });
AutoCompleteText.prototype.publish("placeholder", "Search...", "string", "Placeholder for AutoCompleteText");
AutoCompleteText.prototype.publish("valueColumn", null, "set", "Select column for autocomplete", function () { return this.columns(); }, { optional: true });
AutoCompleteText.prototype.publish("textColumn", null, "set", "Select value(s)", function () { return this.columns(); }, { optional: true });
AutoCompleteText.prototype.publish("minCharsText", 1, "number", "Size of multiAutoCompleteText box");
