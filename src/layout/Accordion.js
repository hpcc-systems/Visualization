"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/HTMLWidget", "../common/FAChar", "css!./Accordion.css"], factory);
    } else {
        root.layout_Accordion = factory(root.common_HTMLWidget, root.common_FAChar);
    }
}(this, function (HTMLWidget, FAChar) {
    function Accordion() {
        HTMLWidget.call(this);

        this._tag = "div";
        this._isClosed = false;
    }
    Accordion.prototype = Object.create(HTMLWidget.prototype);
    Accordion.prototype.constructor = Accordion;
    Accordion.prototype._class += " layout_Accordion";

    Accordion.prototype.publish("content", [], "widgetArray", "Array of widgets",null,{tags:["Basic"]});
    Accordion.prototype.publish("title", "", "string", "Title of collapsible section",null,{tags:["Private"]});
    Accordion.prototype.publish("openIcon", "\uf147", "string", "Icon to display when list is open",null,{tags:["Private"]});
    Accordion.prototype.publish("closedIcon", "\uf196", "string", "Icon to display when list is closed",null,{tags:["Private"]});
    Accordion.prototype.publish("titleFontColor", "#FFFFFF", "html-color", "Title font color",null,{tags:["Private"]});
    Accordion.prototype.publish("titleBackgroundColor", "#333333", "html-color", "Title background color",null,{tags:["Private"]});
    
    Accordion.prototype.publish("defaultCollapsed", false, "boolean", "Collapsed by default if true",null,{tags:["Private"]});
    
    Accordion.prototype.pushListItem = function (widget,prepend,protect) {
        var contentArr = this.content();
        
        widget._protected = protect;
        
        if(prepend){
            contentArr.unshift(widget);
        } else {
            contentArr.push(widget);
        }
        this.content(contentArr);
        return this;
    };
    
    Accordion.prototype.clearListItems = function () {
        var arr = [];
        for(var i in this.content()){
            if(this.content()[i]._protected){
                arr.push(this.content()[i]);
            }
        }
        this.content(arr);
        return this;
    };

    Accordion.prototype.collapseClick = function (element) {
        if(element.classed("closed")){
            this._isClosed = false;
            element.classed("open",true);
            element.classed("closed",false);
        } else {
            this._isClosed = true;
            element.classed("open",false);
            element.classed("closed",true);
        }
    };

    Accordion.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        var context = this;
        this._isClosed = this.defaultCollapsed();
        element.classed(this._isClosed ? "closed" : "open",true);
        
        this.titleSpan = element.append("span").classed("collapsible-title",true);
        this.iconDiv = element.append("div").classed("collapsible-icon",true);
        this.ul = element.append("ul");
        
        this.icon = new FAChar()
                        .size({height:24,width:24})
                        .target(this.iconDiv.node());
        
        this.iconDiv.on("click",function(){
            context.collapseClick(element);
            context.render();
        });
        this.titleSpan.on("click",function(){
            context.collapseClick(element);
            context.render();
        });
    };

    Accordion.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;
        var this_id = "";
        this.titleSpan.text(context.title().length > 0 ? context.title() + this_id : "Accordion ["+context._id+"]" + this_id);
        var rows = this.ul.selectAll("#"+context._id+" > ul > li").data(this.content(),function(d) {
            return d._id; 
        });
        rows.enter()
            .append(function(widget) {
                var li = document.createElement("li");
                if(widget._target === null){
                    var wSize = widget.size();
                    if(wSize.width === 0 || wSize.height === 0){
                        var cSize = context.size();
                        widget.size({
                            width:cSize.width,
                            height:cSize.width
                        });
                    }
                    widget.target(li);
                } else {
                    return widget._target;
                }
                return li;
            })
        ;
        rows.exit().remove();
        
        this.icon
            .text_colorFill(this.titleFontColor())
            .char(this._isClosed ? this.closedIcon() : this.openIcon()).render()
        ;
    };

    Accordion.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    return Accordion;
}));