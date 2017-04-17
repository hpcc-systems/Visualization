/**
* @file Form Input Widget
* @author HPCC Systems
*/

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "../api/IInput", "css!./Input"], factory);
    } else {
        root.form_Form = factory(root.d3, root.common_HTMLWidget, root.api_IInput);
    }
}(this, function (d3, HTMLWidget, IInput) {
    /**
     * @class form_Input
     * @extends common_HTMLWidget
     * @implements api_IInput
     */
    function Input() {
        HTMLWidget.call(this);
        IInput.call(this);
        /**
         * Specifies the HTML tag type of the container.
         * @member {string} _tag
         * @memberof form_Input
         * @private
         */
        this._tag = "div";
    }
    Input.prototype = Object.create(HTMLWidget.prototype);
    Input.prototype.constructor = Input;
    Input.prototype._class += " form_Input";
    Input.prototype.implements(IInput.prototype);

    Input.prototype.testData = function () {
        return this;
    };

    Input.prototype.publish("type", "text", "set", "Input type", ["textbox", "number", "checkbox", "button", "select", "textarea", "date"]);
    Input.prototype.publish("selectOptions", [], "array", "Array of options used to fill a dropdown list");

    /**
     * The function that is called when this widget "enters" the web page.
     * @method enter
     * @memberof form_Input
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Input.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this.createInput(element);
    };

    /**
     * The function that is called when this widget "enters" the web page. after enter() and everytime the widget is updated with subsequent render calls.
     * @method update
     * @memberof form_Input
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML/SVG DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Input.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        this._inputElement.attr("name", this.name());

        switch (this.type()) {
            case "select":
                this.checkNodeName("SELECT", element);
                this._inputElement.property("value", this.value());
                this.insertSelectOptions(this.selectOptions());
                break;
            case "textarea":
                this.checkNodeName("TEXTAREA", element);
                this._inputElement.property("value", this.value());
                break;
            case "button":
                this.checkNodeName("BUTTON", element);
                this._inputElement.text(this.value());
                break;
            case "checkbox":
                this.checkNodeName("INPUT", element);
                this._inputElement.property("checked", this.value());
                break;
            default:
                this.checkNodeName("INPUT", element);
                this._inputElement.attr("type", this.type());
                this._inputElement.property("value", this.value());
                break;
        }
    };

    /**
     * Creates an element ("select","textarea","button","input") appended to a given element
     * @method createInput
     * @memberof form_Input
     * @instance
     * @protected
     * @param {D3Selection} element d3 selection object of widget.
     */
    Input.prototype.createInput = function (element) {
        switch (this.type()) {
            case "select":
                this._inputElement = element.append("select");
                break;
            case "textarea":
                this._inputElement = element.append("textarea");
                break;
            case "button":
                this._inputElement = element.append("button");
                break;
            default:
                this._inputElement = element.append("input").attr("type", this.type());
                break;
        }
        this._inputElement.on("click", function (w) {
            w.click(w);
        });
        this._inputElement.on("blur", function (w) {
            w.blur(w);
        });
        var context = this;
        this._inputElement.on("change", function (w) {

            switch (context.type()) {
                case "checkbox":
                    context.value(context._inputElement.property("checked"));
                    break;
                default:
                    context.value(context._inputElement.property("value"));
                    break;
            }
            w.change(w);
        });
    };

    /**
     * Inserts options into a "select" html element.
     * @method insertSelectOptions
     * @memberof form_Input
     * @instance
     * @protected
     * @param {Array<Mixed>} optionsArr An array of options.
     */
    Input.prototype.insertSelectOptions = function (optionsArr) {
        var optionHTML = "";
        if (optionsArr.length > 0) {
            optionsArr.forEach(function (opt) {
                optionHTML += "<option value='" + opt + "'>" + opt + "</option>";
            });
        } else {
            optionHTML += "<option>selectOptions not set</option>";
        }
        this._inputElement.html(optionHTML);
    };

    /**
     * TODO
     * @method checkNodeName
     * @memberof form_Input
     * @instance
     * @protected
     * @param {type} expected
     * @param {D3Selection} element d3 selection object of widget.
     */
    Input.prototype.checkNodeName = function (expected, element) {
        var node = this._inputElement.node();
        if (node.nodeName !== expected) {
            node.remove();
            this.createInput(element);
        }
    };

    /**
     * Clears an inputs value.
     * @method resetValue
     * @memberof form_Input
     * @instance
     * @protected
     * @param {type} w
     */
    Input.prototype.resetValue = function (w) {
        if (w.type() === "checkbox") {
            w.value(w._inputElement.node().checked);
        } else {
            w.value(w._inputElement.node().value);
        }
    };

    return Input;
}));