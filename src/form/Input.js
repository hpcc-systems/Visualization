"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "../api/IInput", "css!./Input"], factory);
    } else {
        root.form_Input = factory(root.d3, root.common_HTMLWidget, root.api_IInput);
    }
}(this, function (d3, HTMLWidget, IInput) {
    function Input() {
        HTMLWidget.call(this);
        IInput.call(this);

        this._tag = "div";
        this._inputElement = [];
    }
    Input.prototype = Object.create(HTMLWidget.prototype);
    Input.prototype.constructor = Input;
    Input.prototype._class += " form_Input";
    Input.prototype.implements(IInput.prototype);

    Input.prototype.publish("type", "text", "set", "Input type", ["textbox", "number", "checkbox", "button", "select", "textarea", "date", "html-color"]);
    Input.prototype.publish("selectOptions", [], "array", "Array of options used to fill a dropdown list");

    Input.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this.createInput(element);
    };

    Input.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        var context = this;
        this._inputElement.forEach(function(e) {
            e.attr("name", context.name());
        });

        switch (this.type()) {
            case "select":
                this.checkNodeName("SELECT", element);
                this._inputElement[0].property("value", this.value());
                this.insertSelectOptions(this.selectOptions());
                break;
            case "textarea":
                this.checkNodeName("TEXTAREA", element);
                this._inputElement[0].property("value", this.value());
                break;
            case "button":
                this.checkNodeName("BUTTON", element);
                this._inputElement[0].text(this.value());
                break;
            case "radio":
                /* falls through */
            case "checkbox":
                this.checkNodeName("INPUT", element);
                this._inputElement.forEach(function(e, idx) {
                    e.property("value", context.selectOptions()[idx]);
                    if (context.value().indexOf(context.selectOptions()[idx]) !== -1 && context.value() !== "false") {
                        e.property("checked", true);
                    } else {
                        e.property("checked", false);
                    }
                });
                break;
            case "html-color":
                this.checkNodeName("INPUT", element);
                this._inputElement[0].attr("type", "text");
                this._inputElement[1].attr("type", "color");
                this._inputElement[0].property("value", this.value());
                this._inputElement[1].property("value", this.value());
                break;
            default:
                this.checkNodeName("INPUT", element);
                this._inputElement[0].attr("type", this.type());
                this._inputElement[0].property("value", this.value());
                break;
        }
    };

    Input.prototype.createInput = function (element) {
        var context = this;
        switch (this.type()) {
            case "select":
                this._inputElement[0] = element.append("select");
                break;
            case "textarea":
                this._inputElement[0] = element.append("textarea");
                break;
            case "button":
                this._inputElement[0] = element.append("button");
                break;
            case "radio":
                /* falls through */
            case "checkbox":
                var checkboxContainer = element.append("ul");
                if (!this.selectOptions().length) {
                    this.selectOptions().push(""); // create an empty checkbox if we using .value and not selectOptions array
                }
                this.selectOptions().forEach(function(val, idx) {
                    context._inputElement[idx] = checkboxContainer.append("li").append("input").attr("type", context.type());
                    context._inputElement[idx].node().insertAdjacentHTML("afterend", "<text>" + val + "</text>");
                });
                break;
            case "html-color":
                this._inputElement[0] = element.append("input").attr("type", "text");
                this._inputElement[0].classed("color-text", true);
                this._inputElement[1] = element.append("input").attr("type", "color");
                break;
            default:
                this._inputElement[0] = element.append("input").attr("type", this.type());
                break;
        }

        this._inputElement.forEach(function(e, idx) {
            e.on("click", function (w) {
                w.click(w);
            });
        });
        this._inputElement.forEach(function(e, idx) {
            e.on("blur", function (w) {
                w.blur(w);
            });
        });

        this._inputElement.forEach(function(e, idx) {
            e.on("change", function (w) {
                switch (context.type()) {
                    case "checkbox":
                        var vals = [];
                        context._inputElement.forEach(function(d, idx) {
                            if (d.property("checked")) {
                                vals.push(d.property("value"));
                            }
                        });
                        context.value(vals);
                        break;
                    case "html-color":
                        if (idx === 0) {
                            context._inputElement[1].property("value",context._inputElement[0].property("value"));
                            context.value(context._inputElement[0].property("value"));
                        } else {       
                            context._inputElement[0].property("value",context._inputElement[1].property("value"));
                            context.value(context._inputElement[1].property("value"));
                        } 
                        break;         
                    default:
                        context.value([e.property("value")]);
                        break;
                }
                w.change(w);
            });
        });
    };

    Input.prototype.insertSelectOptions = function (optionsArr) {
        var optionHTML = "";
        if (optionsArr.length > 0) {
            optionsArr.forEach(function (opt) {
                var val = (opt instanceof Array ? opt[0] : opt);
                var text = (opt instanceof Array ? (opt[1] ? opt[1] : opt[0]) : opt);
                optionHTML += "<option value='" + val + "'>" + text + "</option>";
            });
        } else {
            optionHTML += "<option>selectOptions not set</option>";
        }
        this._inputElement[0].html(optionHTML);
    };

    Input.prototype.checkNodeName = function (expected, element) {
        var remove = this._inputElement.some(function(e) {
            if (e.node().nodeName !== expected) {
                return true;
            }
        });
        if (remove) {
            this._inputElement.forEach(function(e) {
               e.node().remove();
            });
            this.createInput(element);
        }
    };

    Input.prototype.resetValue = function (w) {
        if (w.type() === "checkbox") {
            w.value(w._inputElement.node().checked);
        } else {
            w.value(w._inputElement.node().value);
        }
    };

    return Input;
}));