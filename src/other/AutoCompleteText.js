"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/HTMLWidget", "autoComplete", "css!./AutoCompleteText", "css!autoComplete"], factory);
    } else {
        root.other_AutoCompleteText = factory(root.common_HTMLWidget, root.autoComplete);
    }
}(this, function (HTMLWidget, AutoComplete) {
    function AutoCompleteText() {
        HTMLWidget.call(this);
        this._tag = 'div';
    }
    AutoCompleteText.prototype = Object.create(HTMLWidget.prototype);
    AutoCompleteText.prototype.constructor = AutoCompleteText;
    AutoCompleteText.prototype._class += " other_AutoCompleteText";

    AutoCompleteText.prototype.publish("label", "Label: ", "string", "Label for AutoCompleteText");
    AutoCompleteText.prototype.publish("placeholder", "Search...", "string", "Placeholder for AutoCompleteText");
    AutoCompleteText.prototype.publish("valueColumn", null, "set", "Select column for autocomplete", function () { return this.columns(); }, { optional: true });
    AutoCompleteText.prototype.publish("textColumn", null, "set", "Select value(s)", function () { return this.columns(); }, { optional: true });
    AutoCompleteText.prototype.publish("minCharsText", 1, "number", "Size of multiAutoCompleteText box");

    AutoCompleteText.prototype.autoCompleteTextData = function (domNode, element) {
        var view = this._db.rollupView([this.textColumn(), this.valueColumn()]);
        return view.entries().map(function (row, idx) {
            return {
                idx: idx,
                text: row.key,
                value: row.values.length ? row.values[0].key : "",
                origRow: row.values.length && row.values[0].values.length ? row.values[0].values[0] : []
            };
        }, this);
    };

    AutoCompleteText.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._span = element.append("span");
        this._label = this._span.append("label")
            .attr("for", this.id() + "_input")
        ;
        this._input = this._span.append("input")
            .attr("id", this.id() + "_input")
            .attr("name", this.id() + "_input_name")
            .attr("type", "text")
            .attr("placeholder", this.placeholder())
        ;
    };

    AutoCompleteText.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        this._label.text(this.label());

        if (this._prevMinCharsText !== this.minCharsText()) {
            this._prevMinCharsText = this.minCharsText();

            if (this._autoComplete) {
                this._autoComplete.destroy();
            }
            var context = this;
            this._autoComplete = new AutoComplete({
                selector: '#' + this.id() + '_input',
                minChars: this.minCharsText(),
                delay: 150,
                offsetLeft: 0,
                offsetTop: 1,
                source: function (term, suggest) {
                    var field = context._db.fieldByLabel(context.textColumn());
                    if (field) {
                        term = term.toLowerCase();
                        var suggestions = context.autoCompleteTextData().filter(function (row) {
                            return row.origRow[field.idx].toLowerCase().indexOf(term) >= 0;
                        }).map(function(row) {
                            return {
                                text: row.origRow[field.idx],
                                rowIdx: row.idx
                            };
                        });
                        suggest(suggestions);
                    }
                },
                renderItem: function (item, search) {
                    search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
                    var re = new RegExp("(" + search.split(' ').join("|") + ")", "gi");
                    return '<div class="autocomplete-suggestion" data-val="' + item.text + '" data-row-idx="' + item.rowIdx + '">' + item.text.replace(re, "<b>$1</b>") + '</div>';
                },
                onSelect: function (e, term, item) {
                    var rowIdx = +item.getAttribute("data-row-idx");
                    var row = context.autoCompleteTextData()[rowIdx];
                    context.click(context.rowToObj(row.origRow), context.valueColumn(), true);
                }
            });
        }
    };

    AutoCompleteText.prototype.exit = function (domNode, element) {
        if (this._autoComplete) {
            this._autoComplete.destroy();
        }
        this._span.remove();
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    AutoCompleteText.prototype.click = function (row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    return AutoCompleteText;
}));
