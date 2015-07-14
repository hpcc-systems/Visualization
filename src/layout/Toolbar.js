"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "../form/Input", "./Cell", "../common/Text", "../common/Icon", "./Surface", "../form/Slider", "css!./Toolbar"], factory);
    } else {
        root.common_Toolbar = factory(root.d3, root.common_HTMLWidget, root.form_Input, root.layout_Cell, root.common_Text, root.common_Icon, root.layout_Surface, root.form_Slider);
    }
}(this, function (d3, HTMLWidget, FormInput, Cell, Text, Icon, Surface, Slider) {
    function Toolbar() {
        HTMLWidget.call(this);
        this._tag = "div";
        this.maxWidgetHeight = 0;
    }
    Toolbar.prototype = Object.create(HTMLWidget.prototype);
    Toolbar.prototype._class += " layout_Toolbar";

    Toolbar.prototype.publish("title", "", "string", "Title",null,{tags:["basic"]});
    Toolbar.prototype.publish("gutter", 4, "number", "Border Width",null,{tags:["basic"]});
    Toolbar.prototype.publish("borderWidth", 2, "number", "Border Width",null,{tags:["basic"]});
    Toolbar.prototype.publish("borderColor", "#000000", "html-color", "Borer Color",null,{tags:["basic"]});
    Toolbar.prototype.publish("borderStyle", "solid", "string", "Toolbar Height",null,{tags:["basic"]});
    Toolbar.prototype.publish("borderRadius", 0, "number", "Border Radius",null,{tags:["basic"]});
    Toolbar.prototype.publish("backgroundColor", null, "html-color", "Background Color",null,{tags:["basic"]});

    Toolbar.prototype.publish("toolbarAnnotations", [], "array", "widgets config",null,{tags:["Private"]});
    Toolbar.prototype.publish("widgetArr", [], "widgetArray", "widgets",null,{tags:["Private"]});

    Toolbar.prototype.testData = function () {
        this.widgetArr([
            new FormInput().name("textbox-test").label("Only Alpha").type("textbox").value("SomeString"),
            new FormInput().name("checkbox-test").label("Checkbox Test").type("checkbox").value(true),
            new Slider().name("slider-test").label("Slider Test").value(66),
            new FormInput().type("button").value("button 2").label("button 2").name("button2"),
            new Icon().testData()
        ]);
        this.toolbarAnnotations([
            {
                type: "button",
                alignment: "left"
            },
            {
                type: "button",
                alignment: "left"
            },
            {
                width:455,
                height: 35,
                type: "icon",
                alignment: "right"
            },
            {
                width:55,
                //height: 25,
                type: "button",
                alignment: "right"
            },
            {
                width:25,
                height: 25,
                type: "icon",
                alignment: "right"
            }
        ]);
        return this;
    };

    Toolbar.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._toolbarContainer = element
                .append("div")
                .attr("class", "toolbar-container")
                //.style("position","relative")
        ;
    };

    Toolbar.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;

        this._toolbarContainer
            .style("border-width",this.borderWidth()+"px")
            .style("border-color",this.borderColor())
            .style("border-style",this.borderStyle())
            .style("border-radius",this.borderRadius()+"px")
            .style("background-color",this.backgroundColor())
        ;

        var widgets = this._toolbarContainer.selectAll(".toolbar-widget").data(this.toolbarAnnotations());

        widgets.enter().append("div")
            .attr("class", "toolbar-widget")
            .style("position", "absolute")
            .each(function (obj, idx) {
                if (context.widgetArr()[idx]._name !== "button") {
                    if(typeof(obj.width) !== "undefined"){
                        d3.select(this).style("width",obj.width+"px");
                    }
                    if(typeof(obj.height) !== "undefined"){
                        d3.select(this).style("height",obj.height+"px");
                    }
                    d3.select(this).style("margin","0px");
                    d3.select(this).style("text-align","center");
                    context.widgetArr()[idx].target(this);
                }
                if (context.widgetArr()[idx]._name === "button") {
                    context.widgetArr()[idx].target(this).render(function(widget) {
                        widget._inputElement.style("display","inline-block");
                        if(typeof(obj.width) !== "undefined"){
                            widget._element.style("width",obj.width+"px");
                        }
                        if(typeof(obj.height) !== "undefined"){
                            widget._element.style("height",obj.height+"px");
                        }
                        //widget._element.style("text-align","center");
                        //widget._inputElement.style("margin","0px");
                    });
                }
                context.maxWidgetHeight = context.maxWidgetHeight < obj.height + context.gutter() ? obj.height + context.gutter() : context.maxWidgetHeight;
            })
        ;


        this._toolbarContainer
            .style("height",this.maxWidgetHeight + "px");

        var conBox = this._toolbarContainer.node().getBoundingClientRect();
        var leftConsumption = 0;
        var rightConsumption = 0;

        widgets
            .each(function (obj, idx) {
                d3.select(this)
                    .style("padding",context.gutter()/2+"px");

                var twNode = d3.select(this).node();
                var twBox = twNode.getBoundingClientRect();
                var twTop = (context.maxWidgetHeight/2 - twBox.height/2);

                var twLeft;
                if (typeof(obj.alignment) === "undefined") {
                    obj.alignment = "left";
                }
                if (obj.alignment === "left") {
                    twLeft = leftConsumption;
                    leftConsumption = twLeft + twBox.width + context.gutter();
                } else if (obj.alignment === "right") {
                    twLeft = conBox.width - rightConsumption - twBox.width;
                    rightConsumption = rightConsumption + twBox.width + context.gutter();
                }

                d3.select(this)
                    .style("top",twTop+"px")
                    .style("left",twLeft+"px");
                context.widgetArr()[idx].render();
            })
        ;

        widgets.exit().each(function (d) {
            d.target(null);
        }).remove();
    };

    Toolbar.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    return Toolbar;
}));
