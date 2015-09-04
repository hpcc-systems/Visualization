"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/HTMLWidget", "../form/Form", "../form/Input", "../common/FAChar", "css!./CollapsibleList"], factory);
    } else {
        root.layout_CollapsibleList = factory(root.common_HTMLWidget, root.form_Form, root.form_Input, root.common_FAChar);
    }
}(this, function (HTMLWidget, Form, Input, FAChar) {
    function CollapsibleList() {
        HTMLWidget.call(this);

        this._tag = "div";
        this._isClosed = false;
    }
    CollapsibleList.prototype = Object.create(HTMLWidget.prototype);
    CollapsibleList.prototype.constructor = CollapsibleList;
    CollapsibleList.prototype._class += " layout_CollapsibleList";

    CollapsibleList.prototype.publish("validate", true, "boolean", "Enable/Disable input validation",null,{tags:["Basic"]});
    CollapsibleList.prototype.publish("content", [], "widgetArray", "Array of widgets",null,{tags:["Basic"]});
    CollapsibleList.prototype.publish("title", "", "string", "Title of collapsible section",null,{tags:["Basic"]});
    CollapsibleList.prototype.publish("openIcon", "\uf077", "string", "Icon to display when list is open",null,{tags:["Basic"]});
    CollapsibleList.prototype.publish("closedIcon", "\uf078", "string", "Icon to display when list is closed",null,{tags:["Basic"]});
    CollapsibleList.prototype.publish("titleFontColor", "#FFFFFF", "html-color", "Title font color",null,{tags:["Basic"]});
    CollapsibleList.prototype.publish("titleBackgroundColor", "#333333", "html-color", "Title background color",null,{tags:["Basic"]});
    
    CollapsibleList.prototype.publish("collapsedByDefault", false, "boolean", "Collapsed by default if true",null,{tags:["Basic"]});

    CollapsibleList.prototype.testData = function () {
        this.pushListItem(new CollapsibleList().title("Tier 2: 1").testData2().collapsedByDefault(true));
        this.pushListItem(new CollapsibleList().title("Tier 2: 2").testData2());
        return this;
    };
    CollapsibleList.prototype.testData2 = function () {
        this.pushListItem(new CollapsibleList().title("Tier 3: 1").testData3());
        this.pushListItem(new CollapsibleList().title("Tier 3: 2").testData3());
        return this;
    };
    CollapsibleList.prototype.testData3 = function () {
        
        this.pushListItem(
            new Form()
                .showSubmit(false)
                .inputs([
                    new Input().name("inp1").label("Input 1").type("textbox"),
                    new Input().name("inp2").label("Input 2").type("textbox"),
                    new Input().name("inp3").label("Input 3").type("textbox"),
                ])
        );
        return this;
    };
    
    CollapsibleList.prototype.pushListItem = function (widget) {
        var contentArr = this.content();
        contentArr.push(widget);
        this.content(contentArr);
        return this;
    };

    CollapsibleList.prototype.collapseClick = function (element) {
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

    CollapsibleList.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        var context = this;
        this._isClosed = this.collapsedByDefault();
        element.classed(this._isClosed ? "closed" : "open",true);
        
        this.titleSpan = element.append("span").classed("collapsible-title",true);
        this.iconDiv = element.append("div").classed("collapsible-icon",true);
        this.ul = element.append("ul");
        
        this.icon = new FAChar().target(this.iconDiv.node());
        
        this.iconDiv.on("click",function(){
            context.collapseClick(element);
            context.render();
        });
        this.titleSpan.on("click",function(){
            context.collapseClick(element);
            context.render();
        });
    };

    CollapsibleList.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;
        this.titleSpan.text(context.title().length > 0 ? context.title() : "CollapsibleList ["+context._id+"]");
        var rows = this.ul.selectAll("li").data(this.content(),function(d) { return d._id; });
        rows.enter()
            .append(function(widget) {
                var li = document.createElement("li");
                if(widget._target === null){
                    widget.target(li);
                } else {
                    return widget._target;
                }
                return li;
            })
        ;
        rows.exit().remove();
        rows.each(function(widget){
            widget.render();
        });
        
        this.icon
            .text_colorFill(this.titleFontColor())
            .char(this._isClosed ? this.closedIcon() : this.openIcon()).render()
        ;
    };

    CollapsibleList.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    return CollapsibleList;
}));