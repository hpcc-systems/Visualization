if (typeof define === "function" && define.amd) {
  define('css',[], function () { 
    return {
      load: function ($1, $2, load) { load() }
    } 
  })
};


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('layout/AbsoluteSurface',["d3", "../common/HTMLWidget", "../common/TextBox", "css!./AbsoluteSurface",], factory);
    } else {
        root.layout_AbsoluteSurface = factory(root.d3, root.common_HTMLWidget, root.common_TextBox);
    }
}(this, function (d3, HTMLWidget, TextBox) {
    function AbsoluteSurface() {
        HTMLWidget.call(this);

        this._tag = "div";
    }
    AbsoluteSurface.prototype = Object.create(HTMLWidget.prototype);
    AbsoluteSurface.prototype.constructor = AbsoluteSurface;
    AbsoluteSurface.prototype._class += " layout_AbsoluteSurface";

    AbsoluteSurface.prototype.publish("units", "percent", "set", "Units", ["pixels", "percent"]);
    AbsoluteSurface.prototype.publish("widgetX", 0, "number", "Widget XPos");
    AbsoluteSurface.prototype.publish("widgetY", 0, "number", "Widget YPos");
    AbsoluteSurface.prototype.publish("widgetWidth", "100", "string", "Widget Width, omit for full");
    AbsoluteSurface.prototype.publish("widgetHeight", "100", "string", "Widget Height, omit for full");
    AbsoluteSurface.prototype.publish("widget", null, "widget", "Widget", null, { tags: ["Private"] });
    AbsoluteSurface.prototype.publish("opacity", 1, "number", "Opacity");

    AbsoluteSurface.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
    };

    AbsoluteSurface.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        var xPos = 0, yPos = 0, width = this.clientWidth(), height = this.clientHeight();
        switch (this.units()) {
            case "pixels":
                xPos = this.widgetX();
                yPos = this.widgetY();
                width = this.widgetWidth() === "" ? width - xPos : Number(this.widgetWidth());
                height = this.widgetHeight() === "" ? height - yPos : Number(this.widgetHeight());
                break;
            case "percent":
                xPos = this.widgetX() * width / 100;
                yPos = this.widgetY() * height / 100;
                width = this.widgetWidth() === "" ? width - xPos : Number(this.widgetWidth() * width / 100);
                height = this.widgetHeight() === "" ? height - yPos : Number(this.widgetHeight() * height / 100);
                break;
        }
        element.style("opacity", this.opacity());

        var widgets = element.selectAll("#" + this._id + " > .placeholder").data(this.widget() ? [this.widget()] : [], function (d) { return d._id; });
        widgets.enter().append("div")
            .attr("class", "placeholder")
            .each(function (d) {
                d.target(this);
            })
        ;
        widgets
            .style({
                left: xPos + "px",
                top: yPos + "px",
                width: width + "px",
                bottom: height + "px"
            })
            .each(function (d) {
                d
                    .resize({ width: width, height: height })
                ;
            })
        ;
        widgets.exit().each(function (d) {
            d.target(null);
        }).remove();
    };

    AbsoluteSurface.prototype.exit = function (domNode, element) {
        if (this.widget()) {
            this.widget(null);
            this.render();
        }
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    return AbsoluteSurface;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('layout/Accordion.js',["../common/HTMLWidget", "../common/FAChar", "css!./Accordion"], factory);
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



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('layout/Surface.js',["d3", "../common/HTMLWidget", "../common/TextBox", "css!./Surface", "css!font-awesome",], factory);
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
            .style("border-width",this.surfaceBorderWidth_exists() ? this.surfaceBorderWidth() + "px" : null)
            .style("border-color",this.surfaceBorderColor())
            .style("border-radius",this.surfaceBorderRadius_exists() ? this.surfaceBorderRadius() + "px" : null)
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
            .style("font-size",this.surfaceTitleFontSize_exists() ? this.surfaceTitleFontSize() + "px" : null)
            .style("font-family",this.surfaceTitleFontFamily())
            .style("font-weight",this.surfaceTitleFontBold() ? "bold" : "normal")
            .style("background-color",this.surfaceTitleBackgroundColor())
            .style("padding",this.surfaceTitlePadding_exists() ? this.surfaceTitlePadding() + "px" : null)
        ;
        titles.exit().remove();

        var surfaceTitle = element.select(".surfaceTitle");

        var surfaceButtons = surfaceTitle.append("div").attr("class","html-button-container").selectAll(".surface-button").data(this.buttonAnnotations());
        surfaceButtons.enter().append("button").classed("surface-button",true)
            .each(function (button, idx) {
                var el = context._surfaceButtons[idx] = d3.select(this)
                    .attr("class", "surface-button" + (button.class ? " " + button.class : ""))
                    .attr("id", button.id)
                    .style("padding", button.padding)
                    .style("width", button.width)
                    .style("height", button.height)
                    .style("cursor","pointer");
                if (button.font === "FontAwesome") {
                    el
                        .style("background", "transparent")
                        .style("border", "none")
                        .on("click", function(d) { context.click(d); })
                        .append("i")
                        .attr("class","fa")
                        .text(function(d) { return button.label; });
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
                d3.select(context.element().node().parentElement).classed("content-icon content-icon-"+(d.classID().split("_")[1]),true);
                d.target(this);
            })
        ;
        widgets
            .style("padding", this.surfacePadding_exists() ? this.surfacePadding() + "px" : null)
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

    Surface.prototype.click = function(obj) {
        console.log("Clicked: " + obj.id);
    };

    return Surface;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('layout/Cell.js',["d3", "./Surface"], factory);
    } else {
        root.layout_Cell = factory(root.d3, root.layout_Surface);
    }
}(this, function (d3, Surface) {
    function Cell() {
        Surface.call(this);
        this._dragHandles = ["nw", "n", "ne", "e", "se", "s", "sw", "w"];
        this._indicateTheseIds = [];
    }
    Cell.prototype = Object.create(Surface.prototype);
    Cell.prototype.constructor = Cell;
    Cell.prototype._class += " layout_Cell";

    Cell.prototype.publish("gridRow", 0, "number", "Grid Row Position",null,{tags:["Private"]});
    Cell.prototype.publish("gridCol", 0, "number", "Grid Column Position",null,{tags:["Private"]});
    Cell.prototype.publish("gridRowSpan", 1, "number", "Grid Row Span",null,{tags:["Private"]});
    Cell.prototype.publish("gridColSpan", 1, "number", "Grid Column Span",null,{tags:["Private"]});
    Cell.prototype.publish("handleSize", 6, "number", "Grid Row Position",null,{tags:["Private"]});
    
    Cell.prototype.publish("indicatorGlowColor", "#EEEE11", "html-color", "Glow color of update-indicator",null,{tags:["Basic"]});
    Cell.prototype.publish("indicatorBorderColor", "#F48A00", "html-color", "Border color of update-indicator",null,{tags:["Basic"]});
    Cell.prototype.publish("indicatorOpacity", 0.8, "number", "Opacity of update-indicator",null,{tags:["Basic"]});

    Cell.prototype.indicateTheseIds = function (_) {
        if (!arguments.length) return this._indicateTheseIds;
        this._indicateTheseIds = _;
        return this;
    };

    Cell.prototype.enter = function (domNode, element) {
        Surface.prototype.enter.apply(this, arguments);
        var context = this;
        element
            .classed("layout_Surface", true)
            .on("mouseenter", function (d) { context.onMouseEnter(); })
            .on("mouseleave", function (d) { context.onMouseLeave(); })
        ;
    };

    Cell.prototype.update = function (domNode, element) {
        Surface.prototype.update.apply(this, arguments);

        var dragHandles = element.selectAll("#"+this.id()+" > .dragHandle").data(this._dragHandles, function (d) { return d; });
        dragHandles.enter().append("div")
            .attr("class", function (d) { return "dragHandle dragHandle_" + d; })
            .style({
                padding:"0px",
                margin:"0px",
                position: "absolute"
            })
            .each(function(d){
                switch(d){
                    case "nw":
                        d3.select(this).style({
                            width:"6px",
                            height:"6px",
                            left:"0px",
                            top:"0px",
                            "z-index":1000
                        });
                        break;
                    case "ne":
                        d3.select(this).style({
                            width:"6px",
                            height:"6px",
                            left:"calc(100% - 6px)",
                            top:"0px",
                            "z-index":1000
                        });
                        break;
                    case "se":
                        d3.select(this).style({
                            width:"6px",
                            height:"6px",
                            left:"calc(100% - 6px)",
                            top:"calc(100% - 6px)",
                            "z-index":1000
                        });
                        break;
                    case "sw":
                        d3.select(this).style({
                            width:"6px",
                            height:"6px",
                            left:"0px",
                            top:"calc(100% - 6px)",
                            "z-index":1000
                        });
                        break;
                    case "n":
                        d3.select(this).style({
                            width:"100%",
                            height:"6px",
                            left:"0px",
                            top:"0px",
                            "z-index":900
                        });
                        break;
                    case "e":
                        d3.select(this).style({
                            width:"6px",
                            height:"100%",
                            left:"calc(100% - 6px)",
                            top:"0px",
                            "z-index":900
                        });
                        break;
                    case "s":
                        d3.select(this).style({
                            width:"100%",
                            height:"6px",
                            left:"0px",
                            top:"calc(100% - 6px)",
                            "z-index":900
                        });
                        break;
                    case "w":
                        d3.select(this).style({
                            width:"6px",
                            height:"100%",
                            left:"0px",
                            top:"0px",
                            "z-index":900
                        });
                        break;
                }
            })
        ;

        dragHandles.exit().remove();
    };

    Cell.prototype.onMouseEnter = function (widgetArr){
        var arr = this.indicateTheseIds();
        var opacity = this.indicatorOpacity();
        var indicatorBorderColor = this.indicatorBorderColor();
        var indicatorGlowColor = this.indicatorGlowColor();
        for (var i = 0; i < arr.length; i++) {
            var otherElement = d3.select("#" + arr[i]);
            if (otherElement.node()) {
                var rect = otherElement.node().getBoundingClientRect();
                otherElement.append("div")
                    .classed("update-indicator", true)
                    .style({
                        "box-sizing": "border-box",
                        position: "fixed",
                        top: rect.top + "px",
                        left: rect.left + "px",
                        width: rect.width + "px",
                        height: rect.height + "px",
                        opacity: opacity,
                        padding: "0px",
                        "z-index": 1000,
                        "border": "4px solid " + indicatorBorderColor,
                        "-webkit-box-shadow": "inset 0px 0px 30px 0px " + indicatorGlowColor,
                        "-moz-box-shadow": "inset 0px 0px 30px 0px " + indicatorGlowColor,
                        "box-shadow": "inset 0px 0px 30px 0px " + indicatorGlowColor,
                    })
                ;
            }
        }
    };
    Cell.prototype.onMouseLeave = function () {
        var arr = this.indicateTheseIds();
        for (var i = 0; i < arr.length; i++) {
            d3.selectAll("#" + arr[i] + " > div.update-indicator").remove();
        }
    };

    return Cell;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('layout/Border.js',["d3", "../common/HTMLWidget", "./Cell", "../common/Text", "css!./Border"], factory);
    } else {
        root.layout_Border = factory(root.d3, root.common_HTMLWidget, root.layout_Cell, root.common_Text);
    }
}(this, function (d3, HTMLWidget, Cell, Text) {
    function Border() {
        HTMLWidget.call(this);

        this._tag = "div";

        this._colCount = 0;
        this._rowCount = 0;
        this._colSize = 0;
        this._rowSize = 0;
        
        this._shrinkWrapBoxes = {};

        this.content([]);
        this.sectionTypes([]);
    }
    Border.prototype = Object.create(HTMLWidget.prototype);
    Border.prototype.constructor = Border;
    Border.prototype._class += " layout_Border";

    Border.prototype.publish("designMode", false, "boolean", "Design Mode",null,{tags:["Basic"]});
    
    Border.prototype.publish("content", [], "widgetArray", "widgets", null, { tags: ["Intermediate"] });
    
    Border.prototype.publish("gutter", 0, "number", "Gap Between Widgets",null,{tags:["Basic"]});

    Border.prototype.publish("topShrinkWrap", false, "boolean", "'Top' Cell shrinks to fit content",null,{tags:["Intermediate"]});
    Border.prototype.publish("leftShrinkWrap", false, "boolean", "'Left' Cell shrinks to fit content",null,{tags:["Intermediate"]});
    Border.prototype.publish("rightShrinkWrap", false, "boolean", "'Right' Cell shrinks to fit content",null,{tags:["Intermediate"]});
    Border.prototype.publish("bottomShrinkWrap", false, "boolean", "'Bottom' Cell shrinks to fit content",null,{tags:["Intermediate"]});
    
    Border.prototype.publish("topSize", 0, "number", "Height of the 'Top' Cell (px)",null,{tags:["Private"]});
    Border.prototype.publish("leftSize", 0, "number", "Width of the 'Left' Cell (px)",null,{tags:["Private"]});
    Border.prototype.publish("rightSize", 0, "number", "Width of the 'Right' Cell (px)",null,{tags:["Private"]});
    Border.prototype.publish("bottomSize", 0, "number", "Height of the 'Bottom' Cell (px)",null,{tags:["Private"]});

    Border.prototype.publish("topPercentage", 20, "number", "Percentage (of parent) Height of the 'Top' Cell",null,{tags:["Private"]});
    Border.prototype.publish("leftPercentage", 20, "number", "Percentage (of parent) Width of the 'Left' Cell",null,{tags:["Private"]});
    Border.prototype.publish("rightPercentage", 20, "number", "Percentage (of parent) Width of the 'Right' Cell",null,{tags:["Private"]});
    Border.prototype.publish("bottomPercentage", 20, "number", "Percentage (of parent) Height of the 'Bottom' Cell",null,{tags:["Private"]});

    Border.prototype.publish("surfacePadding", 0, "number", "Cell Padding (px)", null, { tags: ["Intermediate"] });


    Border.prototype.publish("sectionTypes", [], "array", "Section Types sharing an index with 'content' - Used to determine position/size.", null, { tags: ["Private"] });

    Border.prototype.watchWidget = function (widget) {
        if(this._watch === undefined){
            this._watch = {};
        }
        if (this._watch[widget.id()]) {
            this._watch[widget.id()].remove();
            delete this._watch[widget.id()];
        }
        if (widget) {
            var context = this;
            this._watch[widget.id()] = widget.monitor(function (paramId, newVal, oldVal) {
                if (oldVal !== newVal) {
                    context.lazyRender();
                }
            });
        }
    };
    
    Border.prototype.lazyRender = Border.prototype.debounce(function(){
        this.postUpdate();
    },100);

    Border.prototype.applyLayoutType = function () {
        var layoutObj = this.borderLayoutObject();
        this.content().forEach(function (cell, i) {
            cell._fixedLeft = layoutObj[this.sectionTypes()[i]].left;
            cell._fixedTop = layoutObj[this.sectionTypes()[i]].top;
            cell._fixedWidth = layoutObj[this.sectionTypes()[i]].width;
            cell._fixedHeight = layoutObj[this.sectionTypes()[i]].height;
            cell._dragHandles = this.cellSpecificDragHandles(this.sectionTypes()[i]);
        }, this);
    };
    Border.prototype.cellSpecificDragHandles = function (sectionType) {
        switch(sectionType){
            case "top":return ["s"];
            case "right":return ["w"];
            case "bottom":return ["n"];
            case "left":return ["e"];
            case "center":return [];
        }
    };
    Border.prototype.borderLayoutObject = function (layoutType) {        var t,b,r,l,c,retObj = {},context=this;
        var topSize,topPerc,bottomSize,bottomPerc,leftSize,leftPerc,rightSize,rightPerc;

        var bcRect = this.target().getBoundingClientRect();
        var gridRect = {};
        gridRect.top = bcRect.top;
        gridRect.left = bcRect.left;
        gridRect.bottom = bcRect.bottom;
        gridRect.right = bcRect.right;
        if(this.target() instanceof SVGElement){
            gridRect.width = parseFloat(this.target().getAttribute("width"));
            gridRect.height = parseFloat(this.target().getAttribute("height"));
        } else {
            gridRect.width = bcRect.width;
            gridRect.height = bcRect.height;
        }
        if(this.sectionTypes().indexOf("top") !== -1){
            topSize = this.topSize();
            topPerc = this.topPercentage();
            if(typeof (this._shrinkWrapBoxes["top"]) !== "undefined"){
                topSize = this._shrinkWrapBoxes["top"].height + this.gutter();
                topPerc = 0;
            }
        }
        if(this.sectionTypes().indexOf("bottom") !== -1){
            bottomSize = this.bottomSize();
            bottomPerc = this.bottomPercentage();
            if(typeof (this._shrinkWrapBoxes["bottom"]) !== "undefined"){
                bottomSize = this._shrinkWrapBoxes["bottom"].height + this.gutter();
                bottomPerc = 0;
            }
        }
        if(this.sectionTypes().indexOf("left") !== -1){
            leftSize = this.leftSize();
            leftPerc = this.leftPercentage();
            if(typeof (this._shrinkWrapBoxes["left"]) !== "undefined"){
                leftSize = this._shrinkWrapBoxes["left"].width + this.gutter();
                leftPerc = 0;
            }
        }
        if(this.sectionTypes().indexOf("right") !== -1){
            rightSize = this.rightSize();
            rightPerc = this.rightPercentage();
            if(typeof (this._shrinkWrapBoxes["right"]) !== "undefined"){
                rightSize = this._shrinkWrapBoxes["right"].width + this.gutter();
                rightPerc = 0;
            }
        }

        t = _sectionPlacementObject({
            width:{"px":0,"%":100},
            height:{"px":topSize,"%":topPerc},
            top:{"px":0,"%":0},
            left:{"px":0,"%":0}
        });
        b = _sectionPlacementObject({
            width:{"px":0,"%":100},
            height:{"px":bottomSize,"%":bottomPerc},
            top:{"px":0,"%":100},
            left:{"px":0,"%":0}
        });
        b.top -= b.height;
        l = _sectionPlacementObject({
            width:{"px":leftSize,"%":leftPerc},
            height:{"px":-t.height-b.height,"%":100},
            top:{"px":t.height,"%":0},
            left:{"px":0,"%":0}
        });
        r = _sectionPlacementObject({
            width:{"px":rightSize,"%":rightPerc},
            height:{"px":-t.height-b.height,"%":100},
            top:{"px":t.height,"%":0},
            left:{"px":0,"%":100}
        });
        r.left -= r.width;
        c = _sectionPlacementObject({
            width:{"px":-r.width-l.width,"%":100},
            height:{"px":-t.height-b.height,"%":100},
            top:{"px":t.height,"%":0},
            left:{"px":l.width,"%":0}
        });
        retObj["top"] = t;
        retObj["bottom"] = b;
        retObj["right"] = r;
        retObj["left"] = l;
        retObj["center"] = c;
        return retObj;

        function _sectionPlacementObject(obj){
            obj.width["px"] = typeof (obj.width["px"]) !== "undefined" ? obj.width["px"] : 0;
            obj.width["%"] = typeof (obj.width["%"]) !== "undefined" ? obj.width["%"] : 0;
            obj.height["px"] = typeof (obj.height["px"]) !== "undefined" ? obj.height["px"] : 0;
            obj.height["%"] = typeof (obj.height["%"]) !== "undefined" ? obj.height["%"] : 0;
            var ret = {
                width:obj.width["px"] + (obj.width["%"]/100 * context.width()),
                height:obj.height["px"] + (obj.height["%"]/100 * context.height()),
                top:obj.top["px"] + (obj.top["%"]/100 * context.height()) + context.gutter()/2,
                left:obj.left["px"] + (obj.left["%"]/100 * context.width()) + context.gutter()/2
            };
            return ret;
        }
    };

    Border.prototype.clearContent = function (sectionType) {
        if (!sectionType) {
            this.content().forEach(function (contentWidget) {
                contentWidget.target(null);
                return false;
            });
            d3.select("#" + this.id() + " > div.borderHandle")
                .classed("borderHandleDisabled", true)
            ;
            delete this._watch;
            this.content([]);
            this.sectionTypes([]);
        } else {
            var idx = this.sectionTypes().indexOf(sectionType);
            if (idx >= 0) {
                if (this._watch && this.content()[idx]) {
                    delete this._watch[this.content()[idx].id()];
                }
                this.content()[idx].target(null);
                d3.select("#" + this.id() + " > div.borderHandle_" + sectionType)
                    .classed("borderHandleDisabled", true)
                ; 
                this.content().splice(idx, 1);
                this.sectionTypes().splice(idx, 1);
            }
        }
    };

    Border.prototype.hasContent = function (sectionType, widget, title) {
        return this.sectionTypes().indexOf(sectionType) >= 0;
    };

    Border.prototype.setContent = function (sectionType, widget, title) {
        this.clearContent(sectionType);
        title = typeof (title) !== "undefined" ? title : "";
        if (widget) {
            var cell = new Cell()
                .surfaceBorderWidth(0)
                .widget(widget)
                .title(title)
            ;
            this.watchWidget(widget);
            this.content().push(cell);
            this.sectionTypes().push(sectionType);
        }
        return this;
    };

    Border.prototype.getContent = function (id) {
        var idx = this.sectionTypes().indexOf(id);
        if (idx >= 0) {
            return this.content()[idx].widget();
        }
        return null;
    };

    Border.prototype.setLayoutOffsets = function () {
        this._offsetX = this._element.node().getBoundingClientRect().left + (this.gutter()/2);
        this._offsetY = this._element.node().getBoundingClientRect().top + (this.gutter()/2);
    };

    Border.prototype.dragStart = function(handle){
        d3.event.sourceEvent.stopPropagation();
        var context = this;

        this._dragCell = handle;
        this._dragCellStartSize = this[handle+"Size"]();
        
        if(this[handle+"ShrinkWrap"]()){
            this[handle+"Percentage"](0);
            this[handle+"ShrinkWrap"](false);
        }
        
        var handleElm = d3.select("#" + context.id() + " > div.borderHandle_"+handle);
        context._handleTop = parseFloat(handleElm.style("top").split("px")[0]);
        context._handleLeft = parseFloat(handleElm.style("left").split("px")[0]);
        
        this._dragPrevX = d3.event.sourceEvent.clientX;
        this._dragPrevY = d3.event.sourceEvent.clientY;
    };
    Border.prototype.dragTick = function(handle){
        var context = this;
        
        var xDelta = this._dragPrevX - d3.event.sourceEvent.clientX;
        var yDelta = this._dragPrevY - d3.event.sourceEvent.clientY;

        switch(handle){
            case "top":
            case "bottom":
                _moveHandles(handle,yDelta);
                break;
            case "right":
            case "left":
                _moveHandles(handle,xDelta);
                break;
        }
        
        function _moveHandles(handle,delta){
            if(delta===0)return;
            var handles = d3.selectAll("#" + context.id() + " > div.borderHandle");
            var grabbedHandle = d3.select("#" + context.id() + " > div.borderHandle_"+handle);
            
            if(grabbedHandle.classed("borderHandle_top")){
                grabbedHandle.style({
                    top: (context._handleTop-delta)+"px"
                });
                context._cellSizes.topHeight = context._handleTop-delta;
                context._cellSizes.leftHeight = context._cellSizes.height;
                context._cellSizes.leftHeight -= context._cellSizes.topHeight;
                context._cellSizes.leftHeight -= context._cellSizes.bottomHeight;
                context._cellSizes.rightHeight = context._cellSizes.leftHeight;
            }
            else if(grabbedHandle.classed("borderHandle_right")){
                grabbedHandle.style({
                    left: (context._handleLeft-delta)+"px"
                });
                context._cellSizes.rightWidth = context._cellSizes.width - context._handleLeft + delta;
            }
            else if(grabbedHandle.classed("borderHandle_bottom")){
                grabbedHandle.style({
                    top: (context._handleTop-delta)+"px"
                });
                context._cellSizes.bottomHeight = context._cellSizes.height - context._handleTop + delta;
                context._cellSizes.leftHeight = context._cellSizes.height;
                context._cellSizes.leftHeight -= context._cellSizes.bottomHeight;
                context._cellSizes.leftHeight -= context._cellSizes.topHeight;
                context._cellSizes.rightHeight = context._cellSizes.leftHeight;
            }
            else if(grabbedHandle.classed("borderHandle_left")){
                grabbedHandle.style({
                    left: (context._handleLeft-delta)+"px"
                });
                context._cellSizes.leftWidth = context._handleLeft-delta;
            }
            
            handles.each(function(){
                var handle = d3.select(this);
                if(handle.classed("borderHandle_top")){
                    handle.style({
                        width:context._cellSizes.width+"px",
                        top:(context._cellSizes.topHeight - 3)+"px"
                    });
                }
                else if(handle.classed("borderHandle_right")){
                    handle.style({
                        left:(context._cellSizes.width - context._cellSizes.rightWidth)+"px",
                        top:(context._cellSizes.topHeight + 3)+"px",
                        height:context._cellSizes.rightHeight+"px"
                    });
                }
                else if(handle.classed("borderHandle_bottom")){
                    handle.style({
                        width:context._cellSizes.width+"px",
                        top:(context._cellSizes.height - context._cellSizes.bottomHeight - 3)+"px"
                    });
                }
                else if(handle.classed("borderHandle_left")){
                    handle.style({
                        left:context._cellSizes.leftWidth+"px",
                        height:context._cellSizes.leftHeight+"px",
                        top:(context._cellSizes.topHeight + 3)+"px"
                    });
                }
            });
        }
    };
    Border.prototype.dragEnd = function(handle){
        if(handle){
            var xDelta = this._dragPrevX - d3.event.sourceEvent.clientX;
            var yDelta = this._dragPrevY - d3.event.sourceEvent.clientY;
            
            switch(handle){
                case "top":
                    if(yDelta !== 0){
                        this.topPercentage(0);
                        this.topSize(this.topSize() === 0 ? this.getContent("top").getBBox().height - yDelta : this.topSize() - yDelta);
                    }
                    break;
                case "right":
                    if(xDelta !== 0){
                        this.rightPercentage(0);
                        this.rightSize(this.rightSize() === 0 ? this.getContent("right").getBBox().width + xDelta : this.rightSize() + xDelta);
                    }
                    break;
                case "bottom":
                    if(yDelta !== 0){
                        this.bottomPercentage(0);
                        this.bottomSize(this.bottomSize() === 0 ? this.getContent("bottom").getBBox().height + yDelta : this.bottomSize() + yDelta);
                    }
                    break;
                case "left":
                    if(xDelta !== 0){
                        this.leftPercentage(0);
                        this.leftSize(this.leftSize() === 0 ? this.getContent("left").getBBox().width - xDelta : this.leftSize() - xDelta);
                    }
                    break;
            }
            
            this._dragPrevX = d3.event.sourceEvent.clientX;
            this._dragPrevY = d3.event.sourceEvent.clientY;
        }
        this.render();
    };

    Border.prototype.size = function (_) {
        var retVal = HTMLWidget.prototype.size.apply(this, arguments);
        if (arguments.length && this.contentDiv) {
            this.contentDiv
                .style("width", this._size.width + "px")
                .style("height", this._size.height + "px")
            ;
        }
        return retVal;
    };
    
    Border.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        var context = this;
        element.style("position", "relative");
        this.contentDiv = element.append("div").classed("border-content",true);
        this._scrollBarWidth = this.getScrollbarWidth();
        this._borderHandles = ["top","left","right","bottom"];
        
        var handles = element.selectAll("div.borderHandle").data(this._borderHandles);
        handles.enter().append("div")
            .classed("borderHandle",true)
            .each(function(handle){
                var h = d3.select(this);
                h.classed("borderHandle_"+handle,true)
                    .classed("borderHandleDisabled",context.getContent(handle) === null)
                ;
            });
    };
    
    Border.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        this._sectionTypeArr = this.sectionTypes();
        var context = this;

        element.classed("design-mode",this.designMode());

        this.setLayoutOffsets();

        var rows = this.contentDiv.selectAll(".cell_" + this._id).data(this.content(), function (d) { return d._id; });
        rows.enter().append("div")
            .classed("cell_" + this._id,true)
            .style("position", "absolute")
            .each(function (d,i) {
                d3.select(this).classed("border-cell border-cell-"+context._sectionTypeArr[i],true);
                d.target(this);
                d3.select("#"+context.id()+" > div.borderHandle_"+context._sectionTypeArr[i])
                        .classed("borderHandleDisabled",false);
            });
        rows.each(function (d, idx) {
                var sectionType = context.sectionTypes()[idx];
                if(typeof (context[sectionType + "ShrinkWrap"]) !== "undefined" && context[sectionType + "ShrinkWrap"]()){
                    d.render();
                    context._shrinkWrapBoxes[sectionType] = d.widget().getBBox(true);
                } else {
                    delete context._shrinkWrapBoxes[sectionType];
                }
            });

        var drag = d3.behavior.drag()
            .on("dragstart", function (d,i) { context.dragStart.call(context,d,i); })
            .on("drag", function (d,i) { context.dragTick.call(context,d,i); })
            .on("dragend", function (d,i) { context.dragEnd.call(context,d,i); })
        ;
        if(this.designMode()){
            element.selectAll("#"+this.id()+" > div.borderHandle").call(drag);
        } else {
            element.selectAll("#"+this.id()+" > div.borderHandle").on(".drag", null);
        }
        
        var layoutObj = this.borderLayoutObject();
        this.content().forEach(function (cell, i) {
            cell._fixedLeft = layoutObj[this.sectionTypes()[i]].left;
            cell._fixedTop = layoutObj[this.sectionTypes()[i]].top;
            cell._fixedWidth = layoutObj[this.sectionTypes()[i]].width;
            cell._fixedHeight = layoutObj[this.sectionTypes()[i]].height;
            cell._dragHandles = [];
        }, this);

        rows
            .style("left", function (d) { return d._fixedLeft + "px"; })
            .style("top", function (d) { return d._fixedTop + "px"; })
            .style("width", function (d) { return d._fixedWidth - context.gutter() + "px"; })
            .style("height", function (d) { return d._fixedHeight - context.gutter() + "px"; })
            .each(function (d) {
                d._parentElement
                    .attr("draggable", context.designMode())
                    .selectAll(".dragHandle")
                        .attr("draggable", context.designMode())
                ;
                d
                    .surfacePadding(context.surfacePadding())
                    .resize()
                ;
            });
        rows.exit().each(function (d) {
            d
               .target(null)
            ;
        }).remove();
        
        this.getCellSizes();
        
        element
            .selectAll("#"+this.id()+" > div.borderHandle")
            .each(function(){
                var handle = d3.select(this);
                if(handle.classed("borderHandle_top")){
                    handle.style({
                        width:context._cellSizes.width+"px",
                        top:(context._cellSizes.topHeight - 3)+"px"
                    });
                }
                else if(handle.classed("borderHandle_right")){
                    handle.style({
                        left:(context._cellSizes.width - context._cellSizes.rightWidth)+"px",
                        top:(context._cellSizes.topHeight + 3)+"px",
                        height:context._cellSizes.rightHeight+"px"
                    });
                }
                else if(handle.classed("borderHandle_bottom")){
                    handle.style({
                        width:context._cellSizes.width+"px",
                        top:(context._cellSizes.height - context._cellSizes.bottomHeight - 3)+"px"
                    });
                }
                else if(handle.classed("borderHandle_left")){
                    handle.style({
                        left:context._cellSizes.leftWidth+"px",
                        height:context._cellSizes.leftHeight+"px",
                        top:(context._cellSizes.topHeight + 3)+"px"
                    });
                }
                
            })
        ;
    };

    Border.prototype.getCellSizes = function () {
        var context = this;
        context._cellSizes = {};
        var contentRect = this.element().node().getBoundingClientRect();
        context._cellSizes.width = contentRect.width;
        context._cellSizes.height = contentRect.height;
        this.element()
            .selectAll("#"+this.id()+" > div > div.border-cell")
            .each(function(){
                var cell = d3.select(this);
                if(typeof cell.node === "function"){
                    var rect = cell.node().getBoundingClientRect();
                    if(cell.classed("border-cell-top")){
                        context._cellSizes.topHeight = rect.height;
                    }else if(cell.classed("border-cell-left")){
                        context._cellSizes.leftWidth = rect.width;
                        context._cellSizes.leftHeight = rect.height;
                    }else if(cell.classed("border-cell-right")){
                        context._cellSizes.rightWidth = rect.width;
                        context._cellSizes.rightHeight = rect.height;
                    }else if(cell.classed("border-cell-bottom")){
                        context._cellSizes.bottomHeight = rect.height;
                    }
                }
            });
        var sizes = ['height','width','topHeight','bottomHeight','leftHeight','rightHeight','leftWidth','rightWidth'];
        sizes.forEach(function(size){
            context._cellSizes[size] = context._cellSizes[size] === undefined ? 0 : context._cellSizes[size];
        });
    };

    
    Border.prototype.postUpdate = function (domNode, element) {
        var context = this;
        this.content().forEach(function(n){
            if(n._element.node() !== null){
                var prevBox = n.widget().getBBox();
                var currBox = n.widget().getBBox(true);
                if(prevBox.width !== currBox.width || prevBox.height !== currBox.height){
                    context.render();
                }
            }
        });
    };
    Border.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    return Border;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('layout/Grid.js',["d3", "../common/HTMLWidget", "./Cell", "../common/TextBox", "../common/Utility", "css!./Grid"], factory);
    } else {
        root.layout_Grid = factory(root.d3, root.common_HTMLWidget, root.layout_Cell, root.common_TextBox, root.common_Utility);
    }
}(this, function (d3, HTMLWidget, Cell, TextBox, Utility) {
    function Grid() {
        HTMLWidget.call(this);

        this._tag = "div";
        
        this._colCount = 0;
        this._rowCount = 0;
        this._colSize = 0;
        this._rowSize = 0;
        this._selectionBag = new Utility.Selection();
        
        this.content([]);
    }
    Grid.prototype = Object.create(HTMLWidget.prototype);
    Grid.prototype.constructor = Grid;
    Grid.prototype._class += " layout_Grid";

    Grid.prototype.publish("designMode", false, "boolean", "Design Mode",null,{tags:["Basic"]});
    Grid.prototype.publish("designModeOpacity", 1, "number", "Opacity of Cells and drag handles in Design Mode",null,{tags:["Basic"]});
    Grid.prototype.publish("hideDragHandles", false, "boolean", "Hide Drag Handles in Design Mode",null,{tags:["Basic"]});
    Grid.prototype.publish("hideDesignGrid", false, "boolean", "Hide Design Mode Grid",null,{tags:["Basic"]});
    Grid.prototype.publish("disableCellSelection", false, "boolean", "Disable the ability to 'select' cells while in designMode",null,{tags:["Basic"]});
    Grid.prototype.publish("restrictDraggingOut", false, "boolean", "Restrict Cell dragging to the bounds of the Grid",null,{tags:["Basic"]});
    Grid.prototype.publish("gutter", 4, "number", "Gap Between Widgets",null,{tags:["Basic"]});
    Grid.prototype.publish("fitTo", "all", "set", "Sizing Strategy", ["all", "width"], { tags: ["Basic"] });
    
    Grid.prototype.publish("designGridColor", "#dddddd", "html-color", "Color of grid lines in Design Mode",null,{tags:["Private"]});
    Grid.prototype.publish("designGridColorExtra", "#333333", "html-color", "Color of excess grid lines in Design Mode",null,{tags:["Private"]});

    Grid.prototype.publish("surfacePadding", null, "string", "Cell Padding (px)", null, { tags: ["Intermediate"] });
    
    Grid.prototype.publish("surfaceBorderWidth", 1, "number", "Width (px) of Cell Border", null, { tags: ["Intermediate"] });
    
    Grid.prototype.publish("extraDesignModeWidth", 0, "number", "Number of additional columns added when in Design Mode.",null,{tags:["Private"]});
    Grid.prototype.publish("extraDesignModeHeight", 0, "number", "Number of additional rows added when in Design Mode.",null,{tags:["Private"]});
    Grid.prototype.publish("cellDensity", 3, "string", "Increase the cell density with this multiplier (Ex: 3 results in 3 cols per col and 3 rows per row)", null, { tags: ["Intermediate"] });

    Grid.prototype.publish("content", [], "widgetArray", "widgets",null,{tags:["Basic"]});

    Grid.prototype.getDimensions = function () {
        var size = { width: 0, height: 0 };
        this.content().forEach(function (cell) {
            if (size.width < cell.gridCol() + cell.gridColSpan()) {
                size.width = cell.gridCol() + cell.gridColSpan();
            }
            if (size.height < cell.gridRow() + cell.gridRowSpan()) {
                size.height = cell.gridRow() + cell.gridRowSpan();
            }
        }, this);
        return size;
    };

    Grid.prototype.clearContent = function (widget) {
        this.content(this.content().filter(function (contentWidget) {
            if (!widget) {
                contentWidget.target(null);
                return false;
            }
            var w = contentWidget;
            while (w) {
                if (widget === w) {
                    contentWidget.target(null);
                    return false;
                }
                w = w.widget ? w.widget() : null;
            }
            return true;
        }));
    };

    Grid.prototype.setContent = function (row, col, widget, title, rowSpan, colSpan) {
        rowSpan = rowSpan || 1;
        colSpan = colSpan || 1;
        title = title || "";
        var mult = this.cellDensity();
        this.content(this.content().filter(function (contentWidget) {
            if (contentWidget.gridRow() === row*mult && contentWidget.gridCol() === col*mult) {
                contentWidget.target(null);
                return false;
            }
            return true;
        }));
        if (widget) {
            var cell = new Cell()
                .gridRow(row*mult)
                .gridCol(col*mult)
                .widget(widget)
                .title(title)
                .gridRowSpan(rowSpan*mult)
                .gridColSpan(colSpan*mult)
            ;
            this.prevDensity = mult;
            this.content().push(cell);
        }
        return this;
    };

    Grid.prototype.getCell = function (row, col) {
        var retVal = null;
        this.content().some(function (cell) {
            if (row >= cell.gridRow() && row < cell.gridRow() + cell.gridRowSpan() &&
                col >= cell.gridCol() && col < cell.gridCol() + cell.gridColSpan()) {
                retVal = cell;
                return true;
            }
            return false;
        });
        return retVal;
    };

    Grid.prototype.getWidgetCell = function (id) {
        var retVal = null;
        this.content().some(function (cell) {
            if (cell.widget()._id === id) {
                retVal = cell;
                return true;
            }
            return false;
        });
        return retVal;
    };

    Grid.prototype.getContent = function (id) {
        var retVal = null;
        this.content().some(function (cell) {
            if (cell.widget()._id === id) {
                retVal = cell.widget();
                return true;
            }
            return false;
        });
        return retVal;
    };
    
    Grid.prototype.updateCellMultiples = function () {
        var context = this;
        if(this.prevDensity !== this.cellDensity()){
            this.content().forEach(function (cell) {
                if(context.prevDensity && context.cellDensity()){
                    var m1 = context.prevDensity;
                    var m2 = context.cellDensity();
                    cell.gridRow(Math.floor(cell.gridRow() * m2/m1));
                    cell.gridCol(Math.floor(cell.gridCol() * m2/m1));
                    cell.gridRowSpan(Math.floor(cell.gridRowSpan() * m2/m1));
                    cell.gridColSpan(Math.floor(cell.gridColSpan() * m2/m1));
                }
            });
            this.prevDensity = this.cellDensity();
        }
    };
    
    Grid.prototype.childMoved = Grid.prototype.debounce(function (domNode, element) {
        this.render();
    }, 250);

    Grid.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        element.style("position", "relative");
        this.dropDiv = element.append("div");
        this.contentDiv = element.append("div");
        this._scrollBarWidth = this.getScrollbarWidth();
    };

    Grid.prototype.findCurrentLocation = function (e) {
        this._currLoc = [
            Math.floor((e.clientX - this._offsetX)/this._colSize),
            Math.floor((e.clientY - this._offsetY)/this._rowSize)
        ];
    };
    
    Grid.prototype.overHandle = function (e) {
        var handle = "";
        var handleSize = this._dragCell.handleSize();
        
        //Determines which edge cell (if any) this._currLoc is hovering over
        //An "edge" meaning a dropCell on the exterrior edge of a surface that covers many cells
        var onSouthEdge = this._dragCell.gridRowSpan() === this._currLoc[1] - this._dragCell.gridRow() + 1;
        var onNorthEdge = this._dragCell.gridRow() === this._currLoc[1];
        var onEastEdge = this._dragCell.gridColSpan() === this._currLoc[0] - this._dragCell.gridCol() + 1;
        var onWestEdge = this._dragCell.gridCol() === this._currLoc[0];
        
        var top = this._offsetY + ((this._currLoc[1]) * this._rowSize);
        var left = this._offsetX + ((this._currLoc[0]) * this._colSize);
        var width = this._colSize - this.gutter();
        var height = this._rowSize - this.gutter();
        
        if(Math.ceil(top + height) >= e.clientY && Math.floor(top + height - handleSize) <= e.clientY && onSouthEdge){
            handle = "s";//within SOUTH handle range
        }
        else if(Math.floor(top) <= e.clientY && Math.ceil(top + handleSize) >= e.clientY && onNorthEdge){
            handle = "n";//within NORTH handle range
        }
        if(Math.ceil(left + width) >= e.clientX && Math.floor(left + width - handleSize) <= e.clientX && onEastEdge){
            handle += "e";//within EAST handle range
        }
        else if(Math.floor(left) <= e.clientX && Math.ceil(left + handleSize) >= e.clientX && onWestEdge){
            handle += "w";//within WEST handle range
        }
        return handle;
    };
    
    Grid.prototype.createDropTarget = function (loc,handle) {
        var col = loc[0] - this._dragCellOffsetX;
        var row = loc[1] - this._dragCellOffsetY;
        var colSpan = this._dragCell.gridColSpan();
        var rowSpan = this._dragCell.gridRowSpan();
        
        var dropTarget = document.createElement("div");
        dropTarget.id = "grid-drop-target"+this.id();
        dropTarget.className = "grid-drop-target grid-drag-handle-"+handle;
        
        this._element.node().appendChild(dropTarget);
        this.updateDropTarget(col,row,colSpan,rowSpan);
    };
    
    Grid.prototype.setGridOffsets = function () {
        this._offsetX = this._element.node().getBoundingClientRect().left + (this.gutter()/2);
        this._offsetY = this._element.node().getBoundingClientRect().top + (this.gutter()/2);
    };
    
    Grid.prototype.updateDropTarget = function (col,row,colSpan,rowSpan) {
        if(this.restrictDraggingOut()){
            var beyondTop = row < 0;
            var beyondRight = col+colSpan > this._colCount;
            var beyondBottom = row+rowSpan > this._rowCount;
            var beyondLeft = col < 0;
            if(beyondRight){
                var rDiff = col+colSpan - this._colCount;
                col -= rDiff;
            }
            if(beyondBottom){
                var bDiff = row+rowSpan - this._rowCount;
                row -= bDiff;
            }
            if(beyondLeft){
                col = 0;
            }
            if(beyondTop){
                row = 0;
            }
        }
        var top,left,width,height;
        top = this._offsetY + (row * this._rowSize);
        left = this._offsetX + (col * this._colSize);
        width = colSpan * this._colSize - this.gutter();
        height = rowSpan * this._rowSize - this.gutter();
        
        var dropTarget = document.getElementById("grid-drop-target"+this.id());
        dropTarget.style.top = top + "px";
        dropTarget.style.left = left + "px";
        dropTarget.style.width = width + "px";
        dropTarget.style.height = height + "px";
    };
    
    Grid.prototype.moveDropTarget = function (loc) {
        if(this.restrictDraggingOut()){
            loc[0] = loc[0] > this._colCount-1 ? this._colCount-1 : loc[0];
            loc[0] = loc[0] < 0 ? 0 : loc[0];
            loc[1] = loc[1] > this._rowCount-1 ? this._rowCount-1 : loc[1];
            loc[1] = loc[1] < 0 ? 0 : loc[1];
        }
        if(this._handle){
            var pivotCell = [];
            switch(this._handle){
                case "nw":
                    pivotCell = [this._dragCell.gridCol()+this._dragCell.gridColSpan()-1,this._dragCell.gridRow()+this._dragCell.gridRowSpan()-1];
                    break;
                case "n":
                case "ne":
                    pivotCell = [this._dragCell.gridCol(),this._dragCell.gridRow()+this._dragCell.gridRowSpan()-1];
                    break;
                case "e":
                case "se":
                case "s":
                    pivotCell = [this._dragCell.gridCol(),this._dragCell.gridRow()];
                    break;
                case "sw":
                case "w":
                    pivotCell = [this._dragCell.gridCol()+this._dragCell.gridColSpan()-1,this._dragCell.gridRow()];
                    break;
            }
            switch(this._handle){
                case "e":
                case "w":
                    this._locY = pivotCell[1];
                    break;
                default:
                    this._locY = loc[1] <= pivotCell[1] ? loc[1] : pivotCell[1];
                    break;
            }
            switch(this._handle){
                case "n":
                case "s":
                    this._locX = pivotCell[0];
                    break;
                default:
                    this._locX = loc[0] <= pivotCell[0] ? loc[0] : pivotCell[0];
                    break;
            }
            switch(this._handle){
                case "n":
                case "s":
                    this._sizeX = this._dragCell.gridColSpan();
                    break;
                default:
                    this._sizeX = Math.abs(loc[0] - pivotCell[0]) + 1;
                    break;
            }
            switch(this._handle){
                case "e":
                case "w":
                    this._sizeY = this._dragCell.gridRowSpan();
                    break;
                default:
                    this._sizeY = Math.abs(loc[1] - pivotCell[1]) + 1;
                    break;
            }
        } else if (document.getElementById("grid-drop-target"+this.id()) !== null) {
            var target = this.getCell(loc[1], loc[0]);
            if(target !== null && this._dragCell._id !== target._id){
                document.getElementById("grid-drop-target"+this.id()).className = "grid-drop-target drop-target-over";
                this._locX = target.gridCol();
                this._locY = target.gridRow();
                this._sizeX = target.gridColSpan();
                this._sizeY = target.gridRowSpan();
            } else {
                document.getElementById("grid-drop-target"+this.id()).className = "grid-drop-target";
                this._locX = loc[0] - this._dragCellOffsetX;
                this._locY = loc[1] - this._dragCellOffsetY;
                this._sizeX = this._dragCell.gridColSpan();
                this._sizeY = this._dragCell.gridRowSpan();
            }
        }
        
        this.updateDropTarget(this._locX,this._locY,this._sizeX,this._sizeY);
    };
    
    Grid.prototype.updateCells = function (cellWidth, cellHeight) {
        var context = this;
        
        this.updateCellMultiples();
        
        var rows = this.contentDiv.selectAll(".cell_." + this._id).data(this.content(), function (d) { return d._id; });
        rows.enter().append("div")
            .attr("class", "cell_ " + this._id)
            .style("position", "absolute")
            .each(function (d) {
                d
                   .target(this)
                ;
                d.__grid_watch = d.monitor(function (key, newVal, oldVal) {
                    if (context._renderCount && key.indexOf("grid") === 0 && newVal !== oldVal) {
                        context.childMoved();
                    }
                });
            });
        var drag = d3.behavior.drag()
            .on("dragstart", function (d) {
                d3.event.sourceEvent.stopPropagation();
        
                context._dragCell = d;
                
                context.setGridOffsets();
                context.findCurrentLocation(d3.event.sourceEvent);
                
                context._startLoc = [context._currLoc[0],context._currLoc[1]];
                
                context._element.selectAll(".dragHandle")
                    .style("visibility", "hidden")
                ;
                
                context._handle = context.overHandle(d3.event.sourceEvent);
                if(context._dragCell._dragHandles.indexOf(context._handle) === -1){
                    context._handle = undefined;
                }
                
                context._dragCellOffsetX = context._currLoc[0] - d.gridCol();
                context._dragCellOffsetY = context._currLoc[1] - d.gridRow();
                context.createDropTarget(context._currLoc,context._handle);
                setTimeout(function () {
                    context.contentDiv.selectAll(".cell_." + context._id)
                        .classed("dragItem", function (d2) {
                            return d._id === d2._id;
                        }).classed("notDragItem", function (d2) {
                            return d._id !== d2._id;
                        })
                    ;
                }, 0);
                
                context._initSelection = true;
            })
            .on("drag", function (d) {
                context._initSelection = false;
                context._dragCell = d;
                context.findCurrentLocation(d3.event.sourceEvent);
                if(typeof (context._currLocation) === "undefined" || (context._currLocation[0] !== context._currLoc[0] || context._currLocation[1] !== context._currLoc[1])){
                    context._currLocation = context._currLoc;
                    context.moveDropTarget(context._currLoc);
                }
            })
            .on("dragend", function () {
                d3.event.sourceEvent.stopPropagation();
        
                if(context._initSelection || context._startLoc[0] === context._currLoc[0] || context._startLoc[1] === context._currLoc[1]){
                    if(!context.disableCellSelection()){
                        context.selectionBagClick(context.getCell(context._currLoc[1],context._currLoc[0]));
                    }
                }
        
                context._element.selectAll(".dragHandle")
                    .style("visibility", null)
                ;
        
                if (context._handle) {
                    if(context.restrictDraggingOut()){
                        //Contain the dragCell (while 'resizing') within the bounds of the Grid
                        var locY = context._locY > 0 ? context._locY : 0;
                        var locX = context._locX > 0 ? context._locX : 0;
                        locY = context._locY+context._sizeY < context._rowCount ? context._locY : context._rowCount-context._sizeY;
                        locX = context._locX+context._sizeX < context._colCount ? context._locX : context._colCount-context._sizeX;
                        
                        context._dragCell.gridRow(locY);
                        context._dragCell.gridRowSpan(context._sizeY);
                        context._dragCell.gridCol(locX);
                        context._dragCell.gridColSpan(context._sizeX);
                    } else {
                        context._dragCell.gridRow(context._locY);
                        context._dragCell.gridRowSpan(context._sizeY);
                        context._dragCell.gridCol(context._locX);
                        context._dragCell.gridColSpan(context._sizeX);
                    }
                } else {
                    var targetRow = context._currLoc[1];
                    var targetCol = context._currLoc[0];
                    var targetRowSpan = context._dragCell.gridRowSpan();
                    var targetColSpan = context._dragCell.gridColSpan();
                    var targetCell = context.getCell(context._currLoc[1], context._currLoc[0]);
                    if (targetCell === context._dragCell) {
                        targetRowSpan = targetCell.gridRowSpan();
                        targetColSpan = targetCell.gridColSpan();
                        targetCell = null;
                    }
                    var newDragCellCol;
                    var newDragCellRow;
                    if (targetCell) {
                        //If dragCell is dropped onto another Cell... swap Cell sizes and positions
                        targetRow = targetCell.gridRow();
                        targetCol = targetCell.gridCol();
                        targetRowSpan = targetCell.gridRowSpan();
                        targetColSpan = targetCell.gridColSpan();
                        targetCell
                            .gridCol(context._dragCell.gridCol())
                            .gridColSpan(context._dragCell.gridColSpan())
                            .gridRow(context._dragCell.gridRow())
                            .gridRowSpan(context._dragCell.gridRowSpan())
                        ;
                        newDragCellCol = targetCol;
                        newDragCellRow = targetRow;
                    } else {
                        newDragCellCol = targetCol - context._dragCellOffsetX;
                        newDragCellRow = targetRow - context._dragCellOffsetY;
                        if(context.restrictDraggingOut()){
                            //Contain the dragCell (while 'moving') within the bounds of the Grid
                            targetRowSpan = context._dragCell.gridRowSpan();
                            targetColSpan = context._dragCell.gridColSpan();
                            var rightExcess = newDragCellCol + targetColSpan - context._colCount;
                            var bottomExcess = newDragCellRow + targetRowSpan - context._rowCount;
                            newDragCellCol -= rightExcess > 0 ? rightExcess : 0;
                            newDragCellRow -= bottomExcess > 0 ? bottomExcess : 0;

                            newDragCellCol = newDragCellCol > 0 ? newDragCellCol : 0;
                            newDragCellRow = newDragCellRow > 0 ? newDragCellRow : 0;
                        }
                    }
                    context._dragCell
                        .gridCol(newDragCellCol)
                        .gridRow(newDragCellRow)
                        .gridColSpan(targetColSpan)
                        .gridRowSpan(targetRowSpan)
                    ;
                }
                var gridDropTarget = document.getElementById("grid-drop-target"+context.id());
                gridDropTarget.parentNode.removeChild(gridDropTarget);
                
                setTimeout(function () {
                    context.contentDiv.selectAll(".cell_." + context._id)
                        .classed("dragItem", false)
                        .classed("notDragItem", false)
                    ;
                }, 0);

                context._dragCell = null;
            });
            
        if(this.designMode()){ 
            this.contentDiv.selectAll(".cell_." + this._id).call(drag);
            d3.select(context._target).on("click",function(){
                context._selectionBag.clear();
                context.postSelectionChange();
            });
        } else {
            this.contentDiv.selectAll(".cell_." + this._id).on(".drag", null);
            this._selectionBag.clear();
        }
        
        rows.style("left", function (d) { return d.gridCol() * cellWidth + context.gutter() / 2 + "px"; })
            .style("top", function (d) { return d.gridRow() * cellHeight + context.gutter() / 2 + "px"; })
            .style("width", function (d) { return d.gridColSpan() * cellWidth - context.gutter() + "px"; })
            .style("height", function (d) { return d.gridRowSpan() * cellHeight - context.gutter() + "px"; })
            .each(function (d) {
                d._parentElement
                    .attr("draggable", context.designMode())
                    .selectAll(".dragHandle")
                        .attr("draggable", context.designMode())
                ;

                d
                    .surfacePadding(context.surfacePadding())
                    .surfaceBorderWidth(context.surfaceBorderWidth())
                    .resize()
                ;
            });
        rows.exit().each(function (d) {
            d
               .target(null)
            ;
            if (d.__grid_watch) {
                d.__grid_watch.remove();
            }
        }).remove();
    };

    Grid.prototype.postSelectionChange = function(){};

    Grid.prototype.updateDropCells = function (dimensions, cellWidth, cellHeight) {
        var context = this;
        if(_needsCanvasRedraw()){
            if(this.designMode() && !this.hideDesignGrid()){
                var c_canvas = document.createElement("canvas");
                c_canvas.width = dimensions.width * cellWidth;
                c_canvas.height = dimensions.height * cellHeight;
                var contentWidth = (dimensions.width - this.extraDesignModeWidth()) * cellWidth;
                var contentHeight = (dimensions.height  - this.extraDesignModeHeight()) * cellHeight;
                var canvasContext = c_canvas.getContext("2d");

                //Draw vertical lines
                var xCount = 0;
                for (var x = 0.5 + cellWidth; x < c_canvas.width; x += cellWidth) {
                    xCount++;
                    if(xCount < dimensions.width - this.extraDesignModeWidth()){
                        _drawLine(_roundHalf(x),_roundHalf(x),0,contentHeight,this.designGridColor());
                    } else {
                        _drawLine(_roundHalf(x),_roundHalf(x),0,c_canvas.height,this.designGridColorExtra());
                    }
                }
                //Draw horizontal lines
                var yCount = 0;
                for (var y = 0.5 + cellHeight; y < c_canvas.height; y += cellHeight) {
                    yCount++;
                    if(yCount < dimensions.height - this.extraDesignModeHeight()){
                        _drawLine(0,contentWidth,_roundHalf(y),_roundHalf(y),this.designGridColor());
                    } else {
                        _drawLine(0,c_canvas.width,_roundHalf(y),_roundHalf(y),this.designGridColorExtra());
                    }
                }
                //Draw excess (short) vertical lines
                xCount = 0;
                for (var x2 = 0.5 + cellWidth; x2 < c_canvas.width; x2 += cellWidth) {
                    if(xCount < dimensions.width - this.extraDesignModeWidth()){
                        _drawLine(_roundHalf(x2),_roundHalf(x2),contentHeight,c_canvas.height,this.designGridColorExtra());
                    }
                }
                //Draw excess (short) horizontal lines
                yCount = 0;
                for (var y2 = 0.5 + cellHeight; y2 < c_canvas.height; y2 += cellHeight) {
                    if(yCount < dimensions.height - this.extraDesignModeHeight()){
                        _drawLine(contentWidth,c_canvas.width,_roundHalf(y2),_roundHalf(y2),this.designGridColorExtra());
                    }
                }

                if(this._target){
                    this._target.style.backgroundImage = "url("+ c_canvas.toDataURL()+")";
                }
                
                this.prevDimensions = {
                    "width":dimensions.width,
                    "height":dimensions.height
                };
                this.prevCellWidth = cellWidth;
                this.prevCellHeight = cellHeight;
            } else {
                this._target.style.backgroundImage = "";
            }
        }
        
        
        function _roundHalf(n){
            return parseInt(n) - 0.5;
        }
        function _drawLine(x1,x2,y1,y2,color){
            canvasContext.beginPath();
            canvasContext.strokeStyle = color;
            canvasContext.moveTo(x1,y1);
            canvasContext.lineTo(x2,y2);
            canvasContext.stroke();
        }
        function _needsCanvasRedraw(){
            var ret = false;
            if(typeof (context.prevDimensions) === "undefined"){
                ret = true;
            } else if (context.prevDimensions.width !== dimensions.width || context.prevDimensions.height !== dimensions.height) {
                ret = true;
            } else if (context.prevCellWidth !== cellWidth || context.prevCellHeight !== cellHeight) {
                ret = true;
            } else if (context._target.style.backgroundImage === "" && context.designMode() && !context.hideDesignGrid()) {
                ret = true;
            } else if (context._target.style.backgroundImage !== "" && !context.designMode()) {
                ret = true;
            } else if (context._target.style.backgroundImage !== "" && context.hideDesignGrid()) {
                ret = true;
            }
            return ret;
        }
    };

    Grid.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        
        this._parentElement.style("overflow-x", this.fitTo() === "width" ? "hidden" : null);
        this._parentElement.style("overflow-y", this.fitTo() === "width" ? "scroll" : null);
        var dimensions = this.getDimensions();
        if (this.designMode()) {
            dimensions.width+=this.extraDesignModeWidth();
            dimensions.height+=this.extraDesignModeHeight();
        }
        var cellWidth = (this.width() - (this.fitTo() === "width" ? this._scrollBarWidth : 0)) / dimensions.width;
        var cellHeight = this.fitTo() === "all" ? this.height() / dimensions.height : cellWidth;

        this._colCount = dimensions.width;
        this._rowCount = dimensions.height;
        this._colSize = cellWidth;
        this._rowSize = cellHeight;
        
        element.selectAll("#"+this.id()+" > div > div.cell_ > div[draggable=true]").style({opacity:this.designModeOpacity()});
        element.selectAll("#"+this.id()+" > div > div.cell_ > div[draggable=true] > div > div.dragHandle").style({opacity:this.designModeOpacity()});
        element.selectAll("#"+this.id()+" > div > div.cell_ > div[draggable=false]").style({opacity:1});
        element.selectAll("#"+this.id()+" > div > div.cell_ > div[draggable=false] > div > div.dragHandle").style({opacity:1});
        

        this.updateCells(cellWidth, cellHeight);
        this.updateDropCells(dimensions, cellWidth, cellHeight);
        
        element.classed("hideHandles",this.hideDragHandles());
    };

    Grid.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };
    
    Grid.prototype._createSelectionObject = function (d) {
        return {
            _id: d._id,
            element: function () {
                return d._element;
            },
            widget:d
        };
    };
    
    Grid.prototype.selection = function (_) {
        if (!arguments.length) return this._selectionBag.get().map(function (d) { return d._id; });
        this._selectionBag.set(_.map(function (row) {
            return this._createSelectionObject(row);
        }, this));
        return this;
    };

    Grid.prototype.selectionBagClick = function (d) {
        if(d !== null){
            var selectionObj = this._createSelectionObject(d);
            if(d3.event.sourceEvent.ctrlKey){
                if(this._selectionBag.isSelected(selectionObj)){
                    this._selectionBag.remove(selectionObj);
                    this.postSelectionChange();
                } else {
                    this._selectionBag.append(selectionObj);
                    this.postSelectionChange();
                }
            } else {
                this._selectionBag.set([selectionObj]);
                this.postSelectionChange();
            }
        }
    };

    return Grid;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('layout/Layered.js',["d3", "../common/HTMLWidget", "../layout/AbsoluteSurface", "../common/TextBox", "../common/Text", "css!./Layered"], factory);
    } else {
        root.layout_Layered = factory(root.d3, root.common_HTMLWidget, root.layout_AbsoluteSurface, root.common_TextBox, root.common_Text);
    }
}(this, function (d3, HTMLWidget, AbsoluteSurface, TextBox, Text) {
    function Layered() {
        HTMLWidget.call(this);

        this._tag = "div";
    }
    Layered.prototype = Object.create(HTMLWidget.prototype);
    Layered.prototype.constructor = Layered;
    Layered.prototype._class += " layout_Layered";

    Layered.prototype.publish("surfacePadding", 0, "number", "Padding");

    Layered.prototype.publish("widgets", [], "widgetArray", "widgets", null, { tags: ["Private"] });

    Layered.prototype.addLayer = function(widget) {
        var widgets = this.widgets();
        widgets.push(widget ? widget : new Text().text("No widget defined for layer."));
        this.widgets(widgets);
        return this;
    };

    Layered.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._contentContainer = element.append("div")
            .attr("class", "container")
        ;
    };

    Layered.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;

        element.style("padding", this.surfacePadding() + "px");

        var content = this._contentContainer.selectAll(".content.id" + this.id()).data(this.widgets(), function (d) { return d.id(); });
        content.enter().append("div")
            .attr("class", "content id" + this.id())
            .each(function (widget, idx) {
                widget.target(this);
            })
        ;
        content
            .each(function (widget, idx) {
                widget
                    .resize({ width: context.clientWidth(), height: context.clientHeight() })
                    .render()
                ;
            })
        ;
        content.exit()
            .each(function (widget, idx) {
                widget
                    .target(null)
                ;
            })
            .remove()
        ;
        content.order();
    };

    return Layered;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('layout/Popup.js',["d3", "../common/HTMLWidget", "../layout/Surface", "../common/Icon"], factory);
    } else {
        root.layout_Popup = factory(root.d3, root.common_HTMLWidget, root.layout_Surface, root.common_Icon);
    }
}(this, function (d3, HTMLWidget, Surface, Icon) {
    function Popup() {
        HTMLWidget.call(this);
        this._tag = "div";
        this._surfaceButtons = [];
    }
    
    Popup.prototype = Object.create(HTMLWidget.prototype);
    Popup.prototype.constructor = Popup;
    Popup.prototype._class += " layout_Popup";
    
    Popup.prototype.publish("popupState", false, "boolean", "State of the popup, visible (true) or hidden (false)",null,{});
    Popup.prototype.publish("shrinkWrap", false, "boolean", "The popup parent container either shrinks to the size of its contents (true) or expands to fit thge popup's parentDiv (false)",null,{});
    Popup.prototype.publish("centerPopup", "none", "set", "Center the widget in its container element (target) or in the window",["none", "container", "window"],{});
    Popup.prototype.publish("top", null, "number", "Top position property of popup",null,{});
    Popup.prototype.publish("bottom", null, "number", "Bottom position property of popup",null,{});
    Popup.prototype.publish("left", null, "number", "Left position property of popup",null,{});
    Popup.prototype.publish("right", null, "number", "Right position property of popup",null,{});
    Popup.prototype.publish("position", "relative", "set", "Value of the 'position' property",["absolute", "relative", "fixed", "static", "initial", "inherit" ],{tags:["Private"]});

    Popup.prototype.publish("widget", null, "widget", "Widget",null,{tags:["Private"]});

    Popup.prototype.updateState = function (visible) {
        visible  = visible || !this.popupState();
        this.popupState(visible).render();
    };

    Popup.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this.widget()
            .target(domNode)
        ;       
        this._originalPosition = this.position();
    };    

    Popup.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        element.style({
            visibility: this.popupState() ? null : "hidden",
            opacity: this.popupState() ? null : 0,
            width: this.shrinkWrap() ? this.widget().width() + "px": this._size.width + "px",
            height: this.shrinkWrap() ? this.widget().height() + "px" : this._size.height + "px",
        });
        if (this.widget().size().height === 0 ) {
            this.widget().resize(this.size());
        }
    };

    Popup.prototype.postUpdate = function (domNode, element) {
        var left, top; 
        switch (this.centerPopup()) {
            case "container":
                if (this._parentElement) {
                    left = parseInt(this._parentElement.style("width"))/2 - this.widget().width()/2;
                    top = parseInt(this._parentElement.style("height"))/2 - this.widget().height()/2;
                }
                this.position("absolute");
                break;

            case "window":
                left = window.innerWidth/2 - this.widget().width()/2;
                top = window.innerHeight/2 - this.widget().height()/2;
                this.position("fixed");
                break;

            default:
                left = 0;
                top = 0;
                this.position(this._originalPosition);
                break;
        } 

        this.pos({ x: left, y: top });
        
        HTMLWidget.prototype.postUpdate.apply(this, arguments);
        
        element
            .style("position",this.position())
            .style("left",this.left() + "px")
            .style("right",this.right() + "px")
            .style("top",this.top() + "px")
            .style("bottom",this.bottom() + "px")
        ;
    };

    Popup.prototype.exit = function (domNode, element) {
        if (this.widget()) {
            this.widget(null);
            this.render();
        }
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    Popup.prototype.click = function(obj) {
        console.log("Clicked: " + obj.id);
    };

    return Popup;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('layout/Tabbed.js',["d3", "../common/HTMLWidget", "../layout/Surface", "../common/Text", "css!./Tabbed"], factory);
    } else {
        root.layout_Tabbed = factory(root.d3, root.common_HTMLWidget, root.layout_Surface, root.common_Text);
    }
}(this, function (d3, HTMLWidget, Surface,Text) {
    function Tabbed() {
        HTMLWidget.call(this);

        this._tag = "div";
    }
    Tabbed.prototype = Object.create(HTMLWidget.prototype);
    Tabbed.prototype.constructor = Tabbed;
    Tabbed.prototype._class += " layout_Tabbed";

    Tabbed.prototype.publish("showTabs", true, "boolean", "Show Tabs", null, {});
    Tabbed.prototype.publish("surfacePadding", 4, "number", "Padding");
    Tabbed.prototype.publish("activeTabIdx", 0, "number", "Index of active tab", null, {});

    Tabbed.prototype.publish("labels", [], "array", "Array of tab labels sharing an index with ", null, { tags: ["Private"] });
    Tabbed.prototype.publish("tabLocation", "top", "set", "Position the tabs at the bottom of the widget", ["top", "bottom"], { tags: ["Private"] });
    Tabbed.prototype.publish("widgets", [], "widgetArray", "widgets", null, { tags: ["Private"] });

    Tabbed.prototype.clearTabs = function () {
        this.labels([]);
        this.widgets([]);
        return this;
    };

    Tabbed.prototype.addTab = function (widget, label, isActive, callback) {
        var widgetSize = widget.size();
        if(widgetSize.width === 0 && widgetSize.height === 0){
            widget.size({width:"100%",height:"100%"});
        }
        var labels = this.labels();
        var widgets = this.widgets();
        if (isActive) {
            this.activeTabIdx(this.widgets().length);
        }
        labels.push(label);
        var surface = new Surface().widget(widget ? widget : new Text().text("No widget defined for tab"));
        widgets.push(surface);
        this.labels(labels);
        this.widgets(widgets);
        if (callback) {
            callback(surface);
        }
        return this;
    };

    Tabbed.prototype.widgetSize = function (widgetDiv) {
        var width = this.clientWidth();
        var height = this.clientHeight();

        var tcBox = this._tabContainer.node().getBoundingClientRect();
        if(typeof (tcBox.height) !== "undefined"){
            height -= tcBox.height;
        }
        return { width: width, height: height };
    };

    Tabbed.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._tabContainer = element.append("div");
        this._contentContainer = element.append("div");
    };

    Tabbed.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;

        element.style("padding", this.surfacePadding_exists() ? this.surfacePadding() + "px" : null);

        var tabs = this._tabContainer.selectAll(".tab-button.id" + this.id()).data(this.showTabs() ? this.labels() : [], function (d) { return d; });
        tabs.enter().append("span")
            .attr("class", "tab-button id" + this.id())
            .style("cursor", "pointer")
            .on("click", function (d, idx) {
                context.click(context.widgets()[idx].widget(), d, idx);
                context
                    .activeTabIdx(idx)
                    .render()
                ;
            })
        ;
        tabs
            .classed("active", function (d, idx) { return context.activeTabIdx() === idx; })
            .text(function (d) { return d; })
        ;
        tabs.exit().remove();

        var content = this._contentContainer.selectAll(".tab-content.id" + this.id()).data(this.widgets(), function (d) { return d.id(); });
        content.enter().append("div")
            .attr("class", "tab-content id" + this.id())
            .each(function (widget, idx) {
                widget.target(this);
            })
        ;
        content
            .classed("active", function (d, idx) { return context.activeTabIdx() === idx; })
            .style("display", function (d, idx) { return context.activeTabIdx() === idx ? "block" : "none"; })
            .each(function (surface, idx) {
                surface.visible(context.activeTabIdx() === idx);
                if (context.activeTabIdx() === idx) {
                    var wSize = context.widgetSize(d3.select(this));
                    surface
                        .surfaceBorderWidth(context.showTabs() ? null : 0)
                        .surfacePadding(context.showTabs() ? null : 0)
                        .resize(wSize)
                    ;
                }
            })
        ;
        content.exit()
            .each(function (widget, idx) {
                widget
                    .target(null)
                ;
            })
            .remove();

        switch(this.tabLocation()) {
            case "bottom":
                this._tabContainer
                    .attr("class", "on_bottom")
                    .style("top", (this._contentContainer.node().offsetHeight + this.surfacePadding()) + "px")
                    .style("position", "absolute")
                ;
                this._contentContainer
                    .style("top", this.surfacePadding_exists() ? this.surfacePadding() + "px" : null)
                    .style("position", "absolute")
                ;
                break;
            default:
                this._tabContainer
                    .attr("class", "on_top")
                    .style("top", null)
                    .style("position", "relative")
                ;
                this._contentContainer
                    .style("top", (this._tabContainer.node().offsetHeight + this.surfacePadding()) + "px")
                    .style("position", "absolute")
                ;
                break;
        }
    };

    Tabbed.prototype.click = function (widget, column, idx) {
    };

    return Tabbed;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('layout/Toolbar.js',["d3", "../common/HTMLWidget", "css!./Toolbar"], factory);
    } else {
        root.layout_Toolbar = factory(root.d3, root.common_HTMLWidget);
    }
}(this, function (d3, HTMLWidget) {
    function Toolbar() {
        HTMLWidget.call(this);

        this._tag = "div";
    }
    Toolbar.prototype = Object.create(HTMLWidget.prototype);
    Toolbar.prototype.constructor = Toolbar;
    Toolbar.prototype._class += " layout_Toolbar";

    Toolbar.prototype.publish("title", "", "string", "Title",null,{tags:["Intermediate"]});
    
    Toolbar.prototype.publish("fontSize", null, "number", "Title Font Size (px)", null, { tags: ["Advanced"], optional: true });
    Toolbar.prototype.publish("fontColor", null, "html-color", "Title Font Color", null, { tags: ["Advanced"], optional: true });
    Toolbar.prototype.publish("fontFamily", null, "string", "Title Font Family", null, { tags: ["Advanced"], optional: true });
    Toolbar.prototype.publish("fontBold", true, "boolean", "Enable Bold Title Font", null, { tags: ["Advanced"], optional: true });
    Toolbar.prototype.publish("backgroundColor", null, "html-color", "Background Color", null, { tags: ["Intermediate"], optional: true });
    
    Toolbar.prototype.publish("responsive", true, "boolean", "Adapts to pixel width",null,{tags:["Basic"]});
    
    Toolbar.prototype.publish("widgets", [], "widgetArray", "Child widgets of the toolbar",null,{tags:["Basic"]});
    Toolbar.prototype.publish("widgetClasses", [], "array", "Array of Html Element classes to be assigned to the child widgets (shares index with widgets param)",null,{tags:["Basic"]});

    Toolbar.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
    };

    Toolbar.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;

        element
            .attr("title", context.title())
            .style("background-color", this.backgroundColor())
        ;

        var title = element.selectAll("div.toolbar-title")
                .data(this.title() ? [this.title()] : []);
        title.enter().append("div").classed("toolbar-title",true).each(function(){
            var div = d3.select(this);
            var span = div.append("span").text("QQQ");

            var box = this.getBoundingClientRect();
            var spanBox = span.node().getBoundingClientRect();
            var offset = (box.height/2) - (spanBox.height/2) - (spanBox.top - box.top);
            span.style("padding", offset+"px");
        });
        title.selectAll("div.toolbar-title > span")
            .style("font-size", this.fontSize_exists() ? this.fontSize() + "px" : null)
            .style("color", this.fontColor_exists() ? this.fontColor() : null)
            .style("font-family", this.fontFamily_exists() ? this.fontFamily() : null)
            .style("font-weight", this.fontBold_exists() ? (this.fontBold() ? "bold" : "normal") : null)
            .style("background-color", this.backgroundColor_exists() ? this.backgroundColor() : null)
            .text(context.title())
        ;
        title.exit().remove();
        
        var childWidgets = element.selectAll("div.toolbar-child")
                .data(this.widgets() !== null ? this.widgets() : [],function(d){return d.id();});
        
        childWidgets.enter().insert("div", "div.toolbar-title")
            .each(function(d,i){
                var widgetClass = context.widgetClasses()[i] ? context.widgetClasses()[i] + " toolbar-child" : "toolbar-child";
                d3.select(this).classed(widgetClass,true);
                d.target(this);
            });
        childWidgets.exit().each(function(d){
            d.target(null);
        }).remove();
        childWidgets.order();
    };

    Toolbar.prototype.render = function (callback) {
        var context = this;
        HTMLWidget.prototype.render.call(this, function (w) {
            var toolbarBBox = context.element().node().getBoundingClientRect();
            var minX = toolbarBBox.left + toolbarBBox.width;
            context.element().selectAll("div.toolbar-child")
                .each(function (d, i) {
                    var childBBox = this.getBoundingClientRect();
                    if (minX > childBBox.left)
                        minX = childBBox.left;
                })
            ;
            context.element().select(".toolbar-title span")
                .style("width", (minX - toolbarBBox.left - 4) + "px")
            ;
            if (callback) {
                callback(w);
            }
        });
    };

    Toolbar.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
        this.widgets().forEach(function (w) {
            w.target(null);
        });
    };

    return Toolbar;
}));
