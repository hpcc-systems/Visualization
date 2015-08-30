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
    }
    Input.prototype = Object.create(HTMLWidget.prototype);
    Input.prototype._class += " form_Input";
    Input.prototype.implements(IInput.prototype);

    Input.prototype.testData = function () {
        return this;
    };

    Input.prototype.publish("type", "text", "set", "Input type", ["textbox", "number", "checkbox", "button", "select", "textarea", "date"]);
    Input.prototype.publish("selectOptions", [], "array", "Array of options used to fill a dropdown list");

    Input.prototype.testData = function () {
        return this;
    };

    Input.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this.createInput(element);
    };

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

    Input.prototype.checkNodeName = function (expected, element) {
        var node = this._inputElement.node();
        if (node.nodeName !== expected) {
            node.remove();
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

    Slider.prototype.testData = function (_) {
        this.columns("Percent");
        this.data(20);
        return this;
    };

    Slider.prototype.testData2 = function (_) {
        this.allowRange(true);
        this.columns("Percent");
        this.data([20, 40]);
        return this;
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
                    .call(this.brush.extent(this.allowRange() ? this._data : [this._data, this._data]))
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
        axisElement.selectAll('.tick > text')
            .style('fill', this.fontColor())
            .style('font-size', this.fontSize())
            .style('font-family', this.fontFamily())
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

        this.axisElement.selectAll('.tick > text')
            .style('fill', this.fontColor())
            .style('font-size', this.fontSize())
            .style('font-family', this.fontFamily())
        ;

        var range = this.xScale.range();
        this.brushg.select(".background")
            .attr("x", range[0])
            .attr("width", range[1] - range[0])
        ;

        this.handle
            .attr("d", function (d) { return context.handlePath(d); })
        ;

        this.brushg
            .call(this.brush.extent(this.allowRange() ? this._data : [this._data, this._data]))
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
            this._data = mouseX;
            this._click();
        } else {
            var extent = this.brush.extent();
            extent[0] = this.nearestStep(extent[0]);
            extent[1] = this.nearestStep(extent[1]);
            this._data = extent;
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
            clickData[this.selectionLabel()] = this._data;
            this.click(clickData);
        } else {
            this.click(this._data);
        }
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
    Form.prototype._class += " form_Form";

    Form.prototype.publish("validate", true, "boolean", "Enable/Disable input validation");
    Form.prototype.publish("inputs", [], "widgetArray", "Array of input widgets");
    Form.prototype.publish("showSubmit", true, "boolean", "Show Submit/Cancel Controls");
    Form.prototype.publish("omitBlank", false, "boolean", "Drop Blank Fields From Submit");

    Form.prototype.testData = function () {
        this
            .inputs([
                new Input()
                    .name("textbox-test")
                    .label("Alphanumeric")
                    .type("textbox")
                    .validate("^[A-Za-z0-9]+$")
                    .value("SomeString123"),
                new Input()
                    .name("number-test")
                    .label("Number Test")
                    .type("number")
                    .validate("\\d+")
                    .value(123),
                new Input()
                    .name("select-test")
                    .label("Select Test")
                    .type("select")
                    .selectOptions(["A","B","C"])
                    .value("B"),
                new WidgetArray()
                    .content([
                        new Input()
                            .name("textbox-test")
                            .label("Only Alpha")
                            .type("textbox")
                            .validate("^[A-Za-z]+$")
                            .value("SomeString"),
                        new Input()
                            .name("checkbox-test")
                            .label("Checkbox Test")
                            .type("checkbox")
                            .value(true)
                    ]),
                new Input()
                    .name("textarea-test")
                    .label("Textarea Test")
                    .type("textarea")
                    .value("Textarea Text")
            ])
        ;
        return this;
    };

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

    Form.prototype.values = function () {
        var dataArr = {};
        this.inputsForEach(function (inp) {
            var value = inp.value();
            if (value || !this.omitBlank()) {
                dataArr[inp.name()] = inp.value();
            }
        }, this);
        return dataArr;
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
        this.btntd = table.append("tfoot").append("tr").append("td")
            .attr("colspan", 2)
        ;

        var context = this;
        var controls = [
                new Input()
                    .type("button")
                    .value("Submit")
                    .on("click", function () {
                        context.submit();
                    }, true),
                new Input()
                    .type("button")
                    .value("Clear")
                    .on("click", function () {
                        context.clear();
                    }, true)
        ];
        var rightJust = context.btntd
            .append("div")
            .style("float", "right")
        ;
        controls.forEach(function (w) {
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

        this.btntd
            .attr("colspan", this._maxCols * 2)
            .style("visibility", this.showSubmit() ? null : "hidden")
        ;
    };

    Form.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    Form.prototype.click = function (row) {
        console.log("Clicked Submit: "+JSON.stringify(row));
    };

    return Form;
}));

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('form/ISlider.js',[], factory);
    } else {
        root.other_ISlider = factory();
    }
}(this, function () {
    function ISlider() {
    }

    //  Properties  ---
    ISlider.prototype._range = { low: 0, high: 100 };
    ISlider.prototype._step = 1;
    ISlider.prototype._allowRange = false;   //  TODO:  range selections is not supported yet  ---

    //  Events  ---
    ISlider.prototype.click = function (value) {
        console.log("click:  " + value);
    };
    ISlider.prototype.newSelection = function (value, value2) {
        console.log("newSelection:  " + value + ", " + value2);
    };
    return ISlider;
}));

