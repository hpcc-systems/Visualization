if (typeof define === "function" && define.amd) {
  define('css',[], function () { 
    return {
      load: function ($1, $2, load) { load() }
    } 
  })
};


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('form/Input.js',["d3", "../common/HTMLWidget", "../api/IInput", "css!./Input"], factory);
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

    Input.prototype.publish("type", "text", "set", "Input type", ["html-color", "number", "checkbox", "button", "select", "textarea", "date", "text", "range", "search", "email", "time", "datetime"]);
    Input.prototype.publish("selectOptions", [], "array", "Array of options used to fill a dropdown list");
    Input.prototype.publish("low", null, "number", "Minimum value for Range input");
    Input.prototype.publish("high", null, "number", "Maximum value for Range input");
    Input.prototype.publish("step", null, "number", "Step value for Range input");

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
                this.insertSelectOptions(this.selectOptions());
                this._inputElement[0].property("value", this.value());
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
                this._inputElement[1].property("value", d3.rgb(this.value()).toString());
                break;
            case "range":
                this.checkNodeName("INPUT", element);
                this._inputElement[0].attr("type", "range");
                this._inputElement[0].property("value", this.value());
                this._inputElement[0].attr("min", this.low());
                this._inputElement[0].attr("max", this.high());
                this._inputElement[0].attr("step", this.step());
                this._inputElement[1].attr("type", "number");
                this._inputElement[1].property("value", this.value());
                this._inputElement[1].attr("min", this.low());
                this._inputElement[1].attr("max", this.high());
                this._inputElement[1].attr("step", this.step());
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
            case "range":
                this._inputElement[0] = element.append("input").attr("type", "range");
                this._inputElement[1] = element.append("input").attr("type", "number");
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
                    case "range":
                    case "html-color":
                        if (idx === 0) {
                            context._inputElement[1].property("value",d3.rgb(context._inputElement[0].property("value")).toString());
                            context.value(context._inputElement[0].property("value"));
                        } else {       
                            context._inputElement[0].property("value",context._inputElement[1].property("value"));
                            context.value(d3.rgb(context._inputElement[1].property("value")).toString());
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


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('form/Slider.js',["d3", "../common/SVGWidget", "../api/IInput", "../common/Icon", "css!./Slider"], factory);
    } else {
        root.form_Slider = factory(root.d3, root.common_SVGWidget, root.api_IInput, root.common_Icon);
    }
}(this, function (d3, SVGWidget, IInput, Icon) {
    function Slider() {
        SVGWidget.call(this);
        IInput.call(this);

        this.selectionLabel("");
        this._playing = false;
        this._loop = false;

        this.xScale = d3.scale.linear()
            .clamp(true)
        ;

        var context = this;
        this._playIcon = new Icon()
            .faChar("\uf04b")
        ;
        this._playIcon.click = function (d) {
            d3.event.stopPropagation();
            if (context._playing) {
                context.pause();
            } else {
                context.play();
            }
        };

        this._loopIcon = new Icon()
            .faChar("\uf01e")
            .image_colorFill(this._loop ? null : "#bbb")
            .shape_colorFill(this._loop ? null : "white")
            .paddingPercent(33)
        ;
        this._loopIcon.click = function (d) {
            if (context._loop) {
                context._loop = false;
            } else {
                context._loop = true;
            }
            context._loopIcon
                .image_colorFill(context._loop ? null : "#bbb")
                .shape_colorFill(context._loop ? null : "white")
                .render()
            ;
        };

        this.brush = d3.svg.brush()
            .x(this.xScale)
            .extent([0, 0])
            .on("brushstart", function (d) { context.brushstart(d, this); })
            .on("brush", function (d) { context.brushmove(d, this); })
            .on("brushend", function (d) { context.brushend(d, this); })
        ;
        this.brush.empty = function () {
            return false;
        };

        this.axis = d3.svg.axis()
              .scale(this.xScale)
              .orient("bottom")
              .tickValues(null)
              .tickFormat(function (d) { return d; })
              .tickSize(0)
              .tickPadding(12)
        ;
    }
    Slider.prototype = Object.create(SVGWidget.prototype);
    Slider.prototype.constructor = Slider;
    Slider.prototype._class += " form_Slider";
    Slider.prototype.implements(IInput.prototype);

    Slider.prototype.publish("padding", 16, "number", "Outer Padding", null, { tags: ["Basic"] });
    Slider.prototype.publish("fontSize", null, "number", "Font Size", null, { tags: ["Basic"] });
    Slider.prototype.publish("fontFamily", null, "string", "Font Name", null, { tags: ["Basic"] });
    Slider.prototype.publish("fontColor", null, "html-color", "Font Color", null, { tags: ["Basic"] });

    Slider.prototype.publish("allowRange", false, "boolean", "Allow Range Selection", null, { tags: ["Intermediate"] });
    Slider.prototype.publish("low", 0, "number", "Low", null, { tags: ["Intermediate"] });
    Slider.prototype.publish("high", 100, "number", "High", null, { tags: ["Intermediate"] });
    Slider.prototype.publish("step", 10, "number", "Step", null, { tags: ["Intermediate"] });
    Slider.prototype.publish("selectionLabel", "", "string", "Selection Label", null, { tags: ["Intermediate"] });

    Slider.prototype.publish("showPlay", false, "boolean", "Show Play Button");
    Slider.prototype.publish("playInterval", 1000, "number", "Play Interval");
    Slider.prototype.publishProxy("playDiameter", "_playIcon", "diameter", 32);
    Slider.prototype.publish("playGutter", 12, "number", "Play Gutter");
    Slider.prototype.publishProxy("loopDiameter", "_loopIcon", "diameter", 24);
    Slider.prototype.publish("loopGutter", 4, "number", "Play Gutter");

    Slider.prototype.name = function (_) {
        return Slider.prototype.columns.apply(this, arguments);
    };

    Slider.prototype.value = function (_) {
        return Slider.prototype.data.apply(this, arguments);
    };

    Slider.prototype.play = function () {
        this._playing = true;
        this._playIcon
            .faChar("\uf04c")
            .render()
        ;
        var tick = this.data();
        if (tick < this.low() || tick >= this.high()) {
            tick = this.low();
            this
                .data(tick)
                .render()
            ;
            this._click();
        }
        var context = this;
        this.intervalHandler = setInterval(function () {
            tick += context.step();
            if (tick > context.high()) {
                if (context._loop === true) {
                    tick = context.low();
                    context
                        .data(tick)
                        .render()
                    ;
                    context._click();
                } else {
                    context.pause();
                }
            } else {
                context
                    .data(tick)
                    .render()
                ;
                context._click();
            }
        }, context.playInterval());
    };

    Slider.prototype.pause = function () {
        this._playing = false;
        this._playIcon
            .faChar("\uf04b")
            .render()
        ;
        clearInterval(this.intervalHandler);
    };

    Slider.prototype.data = function (_) {
        var retVal = SVGWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            if (this.brushg) {
                this.brushg
                    .call(this.brush.extent(this.allowRange() ? this.data() : [this.data(), this.data()]))
                ;
            }
        }
        return retVal;
    };

    Slider.prototype.enter = function (domNode, element) {
        this.sliderElement = element.append("g");
        this.axisElement = this.sliderElement.append("g")
            .attr("class", "x axis")
        ;

        this.brushg = this.sliderElement.append("g")
            .attr("class", "brush")
            .call(this.brush)
        ;

        this.brushg.select(".background")
            .attr("y", -9)
            .attr("height", 18)
        ;

        this.brushg.select(".extent")
            .attr("y", "-10")
            .attr("height", "20")
        ;

        this.brushg.selectAll(".resize").select("rect")
            .attr("x", function (d) { return d === "e" ? 0 : -8; })
            .attr("y", "-10")
            .attr("width", "8")
            .attr("height", "20")
        ;

        this.handle = this.brushg.selectAll(".resize").append("path")
            .attr("class", "handle")
            .attr("transform", "translate(0,-27)")
        ;

        this._playIcon
            .target(this.sliderElement.node())
            .render()
        ;

        this._loopIcon
            .target(this.sliderElement.node())
            .render()
        ;
    };

    Slider.prototype.calcDelta = function (domNode, element, leftPos, width) {
        var axisElement = element.append("g")
             .attr("class", "x axis")
             .attr("transform", "translate(0, -64)")
             .call(this.axis)
        ;
        axisElement.selectAll(".tick > text")
            .style("fill", this.fontColor())
            .style("font-size", this.fontSize())
            .style("font-family", this.fontFamily())
        ;
        var x_bbox = axisElement.node().getBBox();
        var retVal = {
            left: x_bbox.x - leftPos,
            right: x_bbox.x - leftPos + x_bbox.width - width
        };
        axisElement.remove();
        return retVal;
    };

    Slider.prototype.update = function (domNode, element) {
        var context = this;
        var leftPos = -this.width() / 2 + this.padding();
        var width = this.width() - this.padding() * 2;

        this._playIcon
            .pos({ x: width / 2 - (this.loopDiameter() + this.loopGutter() + this.playDiameter() / 2), y: 0 })
            .diameter(this.playDiameter())
            .display(this.showPlay())
            .render()
        ;

        this._loopIcon
            .pos({ x: width / 2 - (this.loopDiameter() / 2), y: 0 })
            .diameter(this.loopDiameter())
            .display(this.showPlay())
            .render()
        ;

        if ((this.high() - this.low()) / this.step() <= 10) {
            this.axis.tickValues(d3.merge([d3.range(this.low(), this.high(), this.step()), [this.high()]]));
        } else {
            this.axis.tickValues(null);
        }

        width -= this.showPlay() ? this.loopDiameter() + this.loopGutter() + this.playDiameter() + this.playGutter() : 0;
        this.xScale
            .domain([this.low(), this.high()])
            .range([leftPos, leftPos + width])
        ;
        var delta = this.calcDelta(domNode, element, leftPos, width);
        this.xScale
            .range([leftPos - delta.left, leftPos + width - delta.right])
        ;
        this.axisElement
            .call(this.axis)
        ;

        this.axisElement.selectAll(".tick > text")
            .style("fill", this.fontColor())
            .style("font-size", this.fontSize())
            .style("font-family", this.fontFamily())
        ;

        var range = this.xScale.range();
        this.brushg.select(".background")
            .attr("x", range[0])
            .attr("width", range[1] - range[0])
        ;

        this.handle
            .attr("d", function (d) { return context.handlePath(d); })
        ;

        if (this.data().length === 0) {
            if( this.allowRange()) {
                  this.data([this.low(),this.low()]);
             } else {
                 this.data(this.low());
            }
        }

        this.brushg
            .call(this.brush.extent(this.allowRange() ? this.data() : [this.data(), this.data()]))
        ;

        var bbox = this.sliderElement.node().getBBox();
        this.sliderElement.attr("transform", "translate(0, " + -(bbox.y + bbox.height / 2) + ")");
    };

    Slider.prototype.brushstart = function (d, self) {
        if (!d3.event || !d3.event.sourceEvent) return;
        d3.event.sourceEvent.stopPropagation();
    };

    Slider.prototype.brushmove = function (d, self) {
        if (!d3.event || !d3.event.sourceEvent) return;
        d3.event.sourceEvent.stopPropagation();
        if (!this.allowRange()) {
            var mouseX = this.xScale.invert(d3.mouse(self)[0]);
            d3.select(self)
                .call(this.brush.extent([mouseX, mouseX]))
            ;
        }
    };

    Slider.prototype.brushend = function (d, self) {
        if (!d3.event || !d3.event.sourceEvent) return;
        d3.event.sourceEvent.stopPropagation();
        if (!this.allowRange()) {
            var mouseX = this.nearestStep(this.xScale.invert(d3.mouse(self)[0]));
            d3.select(self)
                .call(this.brush.extent([mouseX, mouseX]))
            ;
            this.data(mouseX);
            this._click();
        } else {
            var extent = this.brush.extent();
            extent[0] = this.nearestStep(extent[0]);
            extent[1] = this.nearestStep(extent[1]);
            this.data(extent);
            d3.select(self)
                .call(this.brush.extent(extent))
            ;
            this.newSelection(extent[0], extent[1]);
        }
    };

    Slider.prototype.nearestStep = function (value) {
        return this.low() + Math.round((value - this.low()) / this.step()) * this.step();
    };

    Slider.prototype.handlePath = function (d, i) {
        var e = +(d === "e");
        var x = e ? 1 : -1;
        var xOffset = this.allowRange() ? 0.5 : 0.0;
        var y = 18;
        var retVal = "M" + (xOffset * x) + "," + y +
            "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6) +
            "V" + (2 * y - 6) +
            "A6,6 0 0 " + e + " " + (xOffset * x) + "," + (2 * y)
        ;
        if (this.allowRange()) {
            retVal += "Z" +
                "M" + (2.5 * x) + "," + (y + 8) +
                "V" + (2 * y - 8) +
                "M" + (4.5 * x) + "," + (y + 8) +
                "V" + (2 * y - 8)
            ;
        } else {
            retVal += "M" + (1 * x) + "," + (y + 8) +
                "V" + (2 * y - 8)
            ;
        }
        return retVal;
    };

    Slider.prototype._click = function() {
        if (this.selectionLabel()) {
            var clickData = {};
            clickData[this.selectionLabel()] = this.data();
            this.click(clickData);
        } else {
            this.click(this.data());
        }
    };

    Slider.prototype.newSelection = function (value, value2) {
        console.log("newSelection:  " + value + ", " + value2);
    };

    return Slider;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('form/Form.js',["d3", "../common/HTMLWidget", "../common/SVGWidget", "../common/WidgetArray", "./Input", "./Slider", "css!./Form"], factory);
    } else {
        root.form_Form = factory(root.d3, root.common_HTMLWidget, root.common_SVGWidget, root.common_WidgetArray, root.form_Input, root.form_Slider);
    }
}(this, function (d3, HTMLWidget, SVGWidget, WidgetArray, Input, Slider) {
    function Form() {
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
                } else if (this.omitBlank()){
                    inp.value("");
                }
            }, this);
        }
        return this;
    };

    Form.prototype.submit = function(){
        var isValid = true;
        if (this.validate()) {
            isValid = this.checkValidation();
        }
        this.click(isValid ? this.values() : null);
    };

    Form.prototype.clear = function () {
        this.inputsForEach(function(inp){
            if (inp instanceof Slider) {
                if (inp.allowRange()) {
                    inp.value([inp.low(), inp.low()]).render();
                } else {
                    inp.value(inp.low()).render();
                }
            } else if(inp.type() === "checkbox"){
                inp.value(false).render();
            } else {
                inp.value("").render();
            }
        });
    };

    Form.prototype.checkValidation = function(){
        var ret = true;
        var msgArr = [];
        this.inputsForEach(function (inp) {
            if (!inp.isValid()) {
                msgArr.push("'" + inp.label() + "'" + " value is invalid.");
            }
        });
        if(msgArr.length > 0){
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
                new Input()
                    .type("button")
                    .value("Submit")
                    .on("click", function () {
                        context.submit(context.values());
                    }, true),
                new Input()
                    .type("button")
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
                });
            })
        ;
        rows.exit().remove();

        this.tfoot
            .style("display",this.showSubmit() ? "table-footer-group" : "none")
        ;
        this.btntd
            .attr("colspan", this._maxCols * 2)
        ;
    };

    Form.prototype.exit = function (domNode, element) {
        this.inputs_reset();
        this._controls.forEach(function (w) {
            w.target(null);
        });
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    Form.prototype.click = function (row) {
        console.log("Clicked Submit: "+JSON.stringify(row));
    };

    return Form;
}));

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('form/TextArea.js',["d3", "./Input"], factory);
    } else {
        root.form_TextArea = factory(root.d3, root.form_Input);
    }
}(this, function (d3, Input) {
    function TextArea() {
        Input.call(this);

        this._tag = "div";
        this.type("textarea");
    }
    TextArea.prototype = Object.create(Input.prototype);
    TextArea.prototype.constructor = TextArea;
    TextArea.prototype._class += " form_TextArea";

    TextArea.prototype.publish("rows", null, "number", "Rows", null, { optional: true });
    TextArea.prototype.publish("cols", null, "number", "Columns", null, { optional: true });
    TextArea.prototype.publish("wrap", "off", "set", "Wrap", ["off", "on"]);
    TextArea.prototype.publish("minHeight", null, "number", "Minimum Height", null, { optional: true });

    TextArea.prototype.enter = function (domNode, element) {
        Input.prototype.enter.apply(this, arguments);
    };

    TextArea.prototype.calcHeight = function () {
        return Math.max(this.minHeight_exists() ? this.minHeight() : 0, this.height());
    };

    TextArea.prototype.update = function (domNode, element) {
        Input.prototype.update.apply(this, arguments);
        this._inputElement[0]
            .attr("rows", this.rows())
            .attr("cols", this.cols())
            .attr("wrap", this.wrap())
            .style("height", this.calcHeight() + "px")
        ;
    };

    return TextArea;
}));
