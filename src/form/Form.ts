import * as d3 from "d3";
import { HTMLWidget } from "../common/HTMLWidget";
import { SVGWidget } from "../common/SVGWidget";
import { WidgetArray } from "../common/WidgetArray";
import { Button } from "./Button";
import "css!./Form";

export function Form() {
    HTMLWidget.call(this);

    this._tag = "form";
}
Form.prototype = Object.create(HTMLWidget.prototype);
Form.prototype.constructor = Form;
Form.prototype._class += " form_Form";

Form.prototype.publish("validate", true, "boolean", "Enable/Disable input validation");
Form.prototype.publish("inputs", [], "widgetArray", "Array of input widgets");
Form.prototype.publish("showSubmit", true, "boolean", "Show Submit/Cancel Controls");
Form.prototype.publish("omitBlank", false, "boolean", "Drop Blank Fields From Submit");
Form.prototype.publish("allowEmptyRequest", false, "boolean", "Allow Blank Form to be Submitted");

Form.prototype.data = function (_) {
    if (!arguments.length) {
        var retVal = [];
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
};

Form.prototype.inputsForEach = function (callback, scope) {
    var idx = 0;
    this.inputs().forEach(function (inp) {
        var inpArray = inp instanceof WidgetArray ? inp.content() : [inp];
        inpArray.forEach(function (inp) {
            if (scope) {
                callback.call(scope, inp, idx++);
            } else {
                callback(inp, idx++);
            }
        });
    });
};

Form.prototype.calcMaxColumns = function () {
    var retVal = 0;
    this.inputs().forEach(function (inputWidget) {
        var inputWidgetArray = inputWidget instanceof WidgetArray ? inputWidget.content() : [inputWidget];
        if (inputWidgetArray.length > retVal) {
            retVal = inputWidgetArray.length;
        }
    });
    return retVal;
};

Form.prototype.values = function (_) {
    if (!arguments.length) {
        var dataArr = {};
        this.inputsForEach(function (inp) {
            var value = inp.value();
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
};

Form.prototype.submit = function () {
    var isValid = true;
    if (this.validate()) {
        isValid = this.checkValidation();
    }
    if (!this.allowEmptyRequest() && !this.inputs().some(function (w) {
        if (w._class.indexOf("WidgetArray") !== -1) {
            return w.content().some(function (wa) {
                return wa.hasValue();
            });
        }
        return w.hasValue();
    })) {
        return;
    }
    this.click(isValid ? this.values() : null);
};

Form.prototype.clear = function () {
    this.inputsForEach(function (inp) {
        switch (inp.classID()) {
            case "form_Slider":
                if (inp.allowRange()) {
                    inp.value([inp.low(), inp.low()]).render();
                } else {
                    inp.value(inp.low()).render();
                }
                break;
            case "form_CheckBox":
                inp.value(false).render();
                break;
            case "form_Button":
                /* skip */
                break;
            default:
                inp.value("").render();
                break;
        }
    });
};

Form.prototype.checkValidation = function () {
    var ret = true;
    var msgArr = [];
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
};

Form.prototype.enter = function (domNode, element) {
    HTMLWidget.prototype.enter.apply(this, arguments);
    element.on("submit", function () {
        d3.event.preventDefault();
    });

    this._parentElement.style("overflow", "auto");
    var table = element
        .append("table")
        ;
    this.tbody = table.append("tbody");
    this.tfoot = table.append("tfoot");
    this.btntd = this.tfoot.append("tr").append("td")
        .attr("colspan", 2)
        ;

    var context = this;
    this._controls = [
        new Button()
                    .classed({"default": true})
            .value("Submit")
            .on("click", function () {
                context.submit(context.values());
            }, true),
        new Button()
            .value("Clear")
            .on("click", function () {
                context.clear({});
            }, true)
    ];
    var rightJust = context.btntd
        .append("div")
        .style("float", "right")
        ;
    this._controls.forEach(function (w) {
        var leftJust = rightJust
            .append("span")
            .style("float", "left")
            ;
        w.target(leftJust.node()).render();
    });
};

Form.prototype.update = function (domNode, element) {
    HTMLWidget.prototype.update.apply(this, arguments);

    this._maxCols = this.calcMaxColumns();

    var context = this;
    var rows = this.tbody.selectAll("tr").data(this.inputs());
    rows.enter().append("tr")
        .each(function (inputWidget, i) {
            var element = d3.select(this);

            var inputWidgetArray = inputWidget instanceof WidgetArray ? inputWidget.content() : [inputWidget];
            inputWidgetArray.forEach(function (inputWidget, idx) {
                element.append("td")
                    .attr("class", "prompt")
                    .text(inputWidget.label() + ":")
                    ;
                var input = element.append("td")
                    .attr("class", "input")
                    ;
                if (idx === inputWidgetArray.length - 1 && inputWidgetArray.length < context._maxCols) {
                    input.attr("colspan", (context._maxCols - inputWidgetArray.length + 1) * 2);
                }
                inputWidget.target(input.node()).render();
                if (inputWidget instanceof SVGWidget) {
                    var bbox = inputWidget.element().node().getBBox();
                    input.style("height", bbox.height + "px");
                    inputWidget.resize().render();
                }

                if (inputWidget._inputElement instanceof Array) {
                        inputWidget._inputElement.forEach(function (e) {
                            e.on("keyup.form", function(w) {
                                setTimeout(function() {
                                context._controls[0].disable(!context.allowEmptyRequest() && !context.inputs().some(function (w) {
                                    if (w._class.indexOf("WidgetArray") !== -1) {
                                        return w.content().some(function (wa) {
                                            return wa.hasValue();
                                        });
                                    }
                                    return w.hasValue();
                                }));
                            }, 100);
                        });
                    });
                }
            });
        })
        ;
        rows.each(function (inputWidget, i) {
            if (i === 0 && inputWidget.setFocus) {
                inputWidget.setFocus();
            }
        });
    rows.exit().remove();

    this.tfoot
        .style("display", this.showSubmit() ? "table-footer-group" : "none")
        ;
    this.btntd
        .attr("colspan", this._maxCols * 2)
        ;

    // Disable Submit unless there is data
    if (!this.allowEmptyRequest()) {
        setTimeout(function () {
            context._controls[0].disable(!context.allowEmptyRequest() && !context.inputs().some(function (w) {
                if (w._class.indexOf("WidgetArray") !== -1) {
                    return w.content().some(function (wa) {
                        return wa.hasValue();
                    });
                }
                return w.hasValue();
            }));
        }, 100);
    }

};

Form.prototype.exit = function (domNode, element) {
    this.inputs_reset();
    this._controls.forEach(function (w) {
        w.target(null);
    });
    HTMLWidget.prototype.exit.apply(this, arguments);
};

Form.prototype.click = function (row) {
    console.log("Clicked Submit: " + JSON.stringify(row));
};
