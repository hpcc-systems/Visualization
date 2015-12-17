"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3","../common/HTMLWidget","css!./ButtonAnnotations"], factory);
    } else {
        root.other_ButtonAnnotations = factory(
                root.d3,
                root.common_HTMLWidget,
                root.common_Text
            )
        ;
    }
}(this, function (d3, HTMLWidget) {
    function ButtonAnnotations() {
        HTMLWidget.call(this);

        this._tag = "div";
        this._text = new Text();
    }
    ButtonAnnotations.prototype = Object.create(HTMLWidget.prototype);
    ButtonAnnotations.prototype.constructor = ButtonAnnotations;
    ButtonAnnotations.prototype._class += " other_ButtonAnnotations";

    ButtonAnnotations.prototype.publish("iconColor", null, "html-color", "styling",null,{tags:["Basic"]});
    ButtonAnnotations.prototype.publish("labelColor", null, "html-color", "styling",null,{tags:["Basic"]});
    ButtonAnnotations.prototype.publish("borderColor", null, "html-color", "styling",null,{tags:["Basic"]});
    ButtonAnnotations.prototype.publish("backgroundColor", null, "html-color", "styling",null,{tags:["Basic"]});
    
    ButtonAnnotations.prototype.publish("borderStyle", "solid", "string", "styling",null,{tags:["Basic"]});
    ButtonAnnotations.prototype.publish("showLabel", true, "boolean", "styling",null,{tags:["Basic"]});
    ButtonAnnotations.prototype.publish("borderWidth", null, "string", "styling",null,{tags:["Basic"]});
    ButtonAnnotations.prototype.publish("buttonMargin", null, "string", "styling",null,{tags:["Basic"]});
    ButtonAnnotations.prototype.publish("buttonPadding", null, "string", "styling",null,{tags:["Basic"]});
    ButtonAnnotations.prototype.publish("buttonWidth", null, "string", "Width of all buttons",null,{tags:["Basic"]});
    ButtonAnnotations.prototype.publish("buttonHeight", null, "string", "Height of all buttons",null,{tags:["Basic"]});
    ButtonAnnotations.prototype.publish("iconSize", null, "string", "Size of all icons",null,{tags:["Basic"]});
        
    ButtonAnnotations.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
    };
    ButtonAnnotations.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;
        var btns = element.selectAll(".button-annotation").data(this.data(),function(d){return d.icon;});
        btns.enter().append("div")
            .classed("button-annotation",true)
            .each(function(d){
                var btn = d3.select(this);
                if(d.icon){
                    var ico = btn.append("i").classed("fa "+d.icon,true);
                    if(context.iconSize()){
                        ico.style("font-size",context.iconSize());
                    }
                }
                if(context.showLabel() && d.label){
                    btn.append("span").text(d.label);
                }
                if(context.buttonWidth()){
                    btn.style("width",context.buttonWidth());
                }
                btn.style("height",context.buttonHeight() ? context.buttonHeight() : "100%");
                if(context.borderWidth()){
                    btn.style("border-width",context.borderWidth());
                }
                if(context.buttonMargin()){
                    btn.style("margin",context.buttonMargin());
                }
                if(context.buttonPadding()){
                    btn.style("padding",context.buttonPadding());
                }
                if(context.borderColor()){
                    btn.style("border-color",context.borderColor());
                }
                if(context.borderStyle()){
                    btn.style("border-style",context.borderStyle());
                }
                if(typeof d.click === "function"){
                    btn.on("click",d.click);
                }
                context.buttonContentsAlignment(btn);
            });
    };
    ButtonAnnotations.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };
    ButtonAnnotations.prototype.buttonContentsAlignment = function (btn) {
        var i = btn.select("i");
        var span = btn.select("span");
        
        var box = btn.node().getBoundingClientRect();
        var iBox;
        var spanBox;
        if(i.node()){
            iBox = i.node().getBoundingClientRect();
            i.style("top",((box.height/2) - (iBox.height/2) - (iBox.top - box.top)) + "px");
        }
        if(span.node()){
            spanBox = span.node().getBoundingClientRect();
            span.style("top",((box.height/2) - (spanBox.height/2) - (spanBox.top - box.top))+"px");
        }
    };

    return ButtonAnnotations;
}));