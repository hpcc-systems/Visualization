"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "css!./Toolbar"], factory);
    } else {
        root.other_Toolbar = factory(root.d3, root.common_HTMLWidget);
    }
}(this, function (d3, HTMLWidget) {
    function Toolbar() {
        HTMLWidget.call(this);

        this._tag = "div";
    }
    Toolbar.prototype = Object.create(HTMLWidget.prototype);
    Toolbar.prototype.constructor = Toolbar;
    Toolbar.prototype._class += " other_Toolbar";

    Toolbar.prototype.publish("title", "", "string", "Title",null,{tags:["Intermediate"]});
    
    Toolbar.prototype.publish("titleWidth", null, "string", "Title",null,{tags:["Intermediate"]});
    
    Toolbar.prototype.publish("backgroundColor", null, "html-color", "Styling",null,{tags:["Intermediate"]});
    
    Toolbar.prototype.publish("leftButtons", null, "widget", "Widget",null,{tags:["Basic"]});
    Toolbar.prototype.publish("rightButtons", null, "widget", "Widget",null,{tags:["Basic"]});

    Toolbar.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
    };

    Toolbar.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;
        
        var title = element.selectAll("div.toolbar-title")
                .data(this.title() ? [this.title()] : []);
        title.enter().append("div").classed("toolbar-title",true).each(function(){
            var div = d3.select(this);
            div.style("width",context.titleWidth());
            var span = div.append("span").text(context.title());

            var box = this.getBoundingClientRect();
            var spanBox = span.node().getBoundingClientRect();
            var offset = (box.height/2) - (spanBox.height/2) - (spanBox.top - box.top);
            span.style("padding", offset+"px");
        });
        title.exit().remove();
        
        element.style("background-color",this.backgroundColor());
                
        var leftBtns = element.selectAll("div.toolbar-left-buttons")
                .data(this.leftButtons() !== null ? [this.leftButtons()] : [],function(d){return d.id();});
        var rightBtns = element.selectAll("div.toolbar-right-buttons")
                .data(this.rightButtons() !== null ? [this.rightButtons()] : [],function(d){return d.id();});
        
        leftBtns.enter().append("div").classed("toolbar-left-buttons toolbar-buttons",true)
                .each(function(d){
                    d.target(this);
                });
        leftBtns.exit().each(function(d){
            d.target(null);
        }).remove();
        
        rightBtns.enter().append("div").classed("toolbar-right-buttons toolbar-buttons",true)
                .each(function(d){
                    d.target(this);
                });
        rightBtns.exit().each(function(d){
            d.target(null);
        }).remove();
        
        var thisBox = this.element().node().getBoundingClientRect();
        if(thisBox.width < 500){
            this.element()
                .classed("min-condensed",true)
                .classed("condensed",false);
        }
        else if(thisBox.width < 700){
            this.element()
                .classed("min-condensed",false)
                .classed("condensed",true);
        }
        else {
            this.element()
                .classed("min-condensed",false)
                .classed("condensed",false);
        }
    };

    Toolbar.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    return Toolbar;
}));
