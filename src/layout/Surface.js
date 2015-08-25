"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "../common/TextBox", "css!./Surface", "css!font-awesome",], factory);
    } else {
        root.layout_Surface = factory(root.d3, root.common_HTMLWidget, root.common_TextBox);
    }
}(this, function (d3, HTMLWidget, TextBox) {
    function Surface() {
        HTMLWidget.call(this);

        this._tag = "div";

        this._surfaceButtons = [];
    }
    Surface.prototype = Object.create(HTMLWidget.prototype);
    Surface.prototype.constructor = Surface;
    Surface.prototype._class += " layout_Surface";

   Surface.prototype.publish("title", "", "string", "Title",null,{tags:["Intermediate"]});
   Surface.prototype.publish("widget", null, "widget", "Widget",null,{tags:["Basic"]});
   
   Surface.prototype.publish("surfaceTitlePadding", null, "number", "Title Padding (px)", null, { tags: ["Advanced"] });
   Surface.prototype.publish("surfaceTitleFontSize", null, "number", "Title Font Size (px)", null, { tags: ["Advanced"] });
   Surface.prototype.publish("surfaceTitleFontColor", null, "html-color", "Title Font Color", null, { tags: ["Advanced"] });
   Surface.prototype.publish("surfaceTitleFontFamily", null, "string", "Title Font Family", null, { tags: ["Advanced"] });
   Surface.prototype.publish("surfaceTitleFontBold", true, "boolean", "Enable Bold Title Font", null, { tags: ["Advanced"] });
   Surface.prototype.publish("surfaceTitleBackgroundColor", null, "html-color", "Title Background Color", null, { tags: ["Advanced"] });

   Surface.prototype.publish("surfacePadding", null, "string", "Surface Padding (px)", null, { tags: ["Intermediate"] });
   Surface.prototype.publish("surfaceBackgroundColor", null, "html-color", "Surface Background Color", null, { tags: ["Advanced"] });
   Surface.prototype.publish("surfaceBorderWidth", null, "number", "Surface Border Width (px)", null, { tags: ["Advanced"] });
   Surface.prototype.publish("surfaceBorderColor", null, "html-color", "Surface Border Color", null, { tags: ["Advanced"] });
   Surface.prototype.publish("surfaceBorderRadius", null, "number", "Surface Border Radius (px)", null, { tags: ["Advanced"] });

   Surface.prototype.publish("surfaceTitleAlignment", "center", "set", "Title Alignment", ["left","right","center"],{tags:["Basic"]});

   Surface.prototype.publish("buttonAnnotations", [], "array", "Button Array",null,{tags:["Private"]});


    Surface.prototype.testData = function () {
        this.title("ABC");
        this.widget(new Surface().widget(new TextBox().testData()));

        this.buttonAnnotations([
            {
                id:"button_1",
                label:"\uf00e",
                width:60,
                padding:"5px",
                class: "",
                font: "FontAwesome",
                callback: function(domNode) {
                    console.log("Click Override on button " + domNode);
                }
            },{
                id:"button_2",
                label:"\uf010",
                width:30,
                padding:"5px",
                class:"",
                font: "FontAwesome",
                callback: function(domNode) {
                    console.log("Click Override on button " + domNode);
                }
            }]);

        return this;
    };

    Surface.prototype.widgetSize = function (titleDiv, widgetDiv) {
        var width = this.clientWidth();
        var height = this.clientHeight();
        if (this.title()) {
            height -= this.calcHeight(titleDiv);
        }
        height -= this.calcFrameHeight(widgetDiv);
        width -= this.calcFrameWidth(widgetDiv);
        return { width: width, height: height };
    };

    Surface.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
    };

    Surface.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;

        element
            .style("border-width",this.surfaceBorderWidth_modified() ? this.surfaceBorderWidth() + "px" : null)
            .style("border-color",this.surfaceBorderColor())
            .style("border-radius",this.surfaceBorderRadius_modified() ? this.surfaceBorderRadius() + "px" : null)
            .style("background-color",this.surfaceBackgroundColor())
        ;

        var titles = element.selectAll(".surfaceTitle").data(this.title() ? [this.title()] : []);
        titles.enter().insert("h3", "div")
            .attr("class", "surfaceTitle")
        ;
        titles
            .text(function (d) { return d; })
            .style("text-align",this.surfaceTitleAlignment())
            .style("color",this.surfaceTitleFontColor())
            .style("font-size",this.surfaceTitleFontSize()+"px")
            .style("font-family",this.surfaceTitleFontFamily())
            .style("font-weight",this.surfaceTitleFontBold() ? "bold" : "normal")
            .style("background-color",this.surfaceTitleBackgroundColor())
            .style("padding",this.surfaceTitlePadding()+"px")
        ;
        titles.exit().remove();

        var surfaceTitle = element.select(".surfaceTitle");

        var surfaceButtons = surfaceTitle.append("div").attr("class","html-button-container").selectAll(".surface-button").data(this.buttonAnnotations());
        surfaceButtons.enter().append("button").classed("surface-button",true)
            .each(function (button, idx) {
                var el = context._surfaceButtons[idx] = d3.select(this)
                    .attr("class", "surface-button " + button.class)
                    .attr("id", button.id)
                    .style("padding", button.padding)
                    .style("width", button.width)
                    .style("height", button.height)
                    .style("cursor","pointer");
                if (button.font === "FontAwesome") {
                    el
                      .append("i")
                      .attr("class","fa")
                      .text(function(d) { return button.label; })
                      .on("click", function(d) { context.click(d); });
                } else {
                    el
                      .text(function(d) { return button.label; })
                      .on("click", function(d) { context.click(d); });
                }
            })
        ;
        surfaceButtons.exit()
            .each(function (d, idx) {
                var element = d3.select(this);
                delete context._surfaceButtons[idx];
                element.remove();
            })
        ;
        var widgets = element.selectAll("#" + this._id + " > .surfaceWidget").data(this.widget() ? [this.widget()] : [], function (d) { return d._id; });

        widgets.enter().append("div")
            .attr("class", "surfaceWidget")
            .each(function (d) {
                d.target(this);
            })
        ;
        widgets
            .style("padding", this.surfacePadding() ? this.surfacePadding() + "px" : null)
            .each(function (d) {
                var widgetSize = context.widgetSize(element.select("h3"), d3.select(this));
                if (widgetSize.width < 0) widgetSize.width = 0;
                if (widgetSize.height < 0) widgetSize.height = 0;
                d
                    .resize({ width: widgetSize.width, height: widgetSize.height })
                ;
            })
        ;
        widgets.exit().each(function (d) {
            d.target(null);
        }).remove();
    };

    Surface.prototype.exit = function (domNode, element) {
        if (this.widget()) {
            this.widget(null);
            this.render();
        }
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    Surface.prototype.render = function (callback) {
        var context = this;
        return HTMLWidget.prototype.render.call(this, function (widget) {
            if (context.widget()) {
                context.widget().render(function (widget) {
                    if (callback) {
                        callback(widget);
                    }
                });
            } else {
                if (callback) {
                    callback(widget);
                }
            }
        });
    };

    Surface.prototype.click = function(obj) {
        console.log("Clicked: " + obj.id);
    };

    return Surface;
}));
