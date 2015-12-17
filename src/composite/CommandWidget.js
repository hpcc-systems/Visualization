"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "src/layout/Border",  "src/other/Toolbar", "src/other/ButtonAnnotations", "src/layout/Popup", "src/common/Text","css!./CommandWidget.css"], factory);
    } else {
        root.composite_CommandWidget = factory(
                root.d3,
                root.common_HTMLWidget,
                root.layout_Border,
                root.other_Toolbar,
                root.other_ButtonAnnotations,
                root.layout_Popup,
                root.common_Text
            )
        ;
    }
}(this, function (d3, HTMLWidget, Border, Toolbar, ButtonAnnotations, Popup, Text) {
    function CommandWidget() {
        HTMLWidget.call(this);

        this._tag = "div";
        this._layout = new Border()
            .gutter(0)
            .topSize(46)
            .topPercentage(0)
        ;
        this._toolbar = new Toolbar();
        this._modal = new Popup();
    }
    CommandWidget.prototype = Object.create(HTMLWidget.prototype);
    CommandWidget.prototype.constructor = CommandWidget;
    CommandWidget.prototype._class += " composite_CommandWidget";

    CommandWidget.prototype.publish("title", "", "string", "Title placed to the left in Toolbar",null,{tags:["Basic"]});
    
    CommandWidget.prototype.publish("gutter", 8, "number", "Gap Between Cells",null,{tags:["Basic"]});
        
    CommandWidget.prototype.publish("layout", null, "widget", "widget",null,{tags:["Basic"]});
    
    CommandWidget.prototype.publish("widget", null, "widget", "widget",null,{tags:["Basic"]});
    
    CommandWidget.prototype.publish("disableLeftButtons", false, "boolean", "Disable Left button group",null,{tags:["Basic"]});
    
    CommandWidget.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._layout.target(element.node());
        this.layout(this._layout);
        this.layout().setContent("center", this.widget());
        
        this.layout().setContent("top", this._toolbar);
        
        this.layout().getCell("top").surfaceBorderWidth(0);
        this.layout().getCell("center").surfaceBorderWidth(0);
        
        this._modal
            .target(element.node())
            .position("fixed")
            .popupState(false)
            .size({width:200, height:200})
            .widget(new Text().text("Hello\nand\nWelcome!"))
            .render()
        ;
    };
    CommandWidget.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;
        this._toolbar
            .title(this.title())
            .titleWidth("150px")
            .backgroundColor("#FFFFFF")
        ;
        if(!this.disableLeftButtons()){
            this._toolbar
                .leftButtons(
                    new ButtonAnnotations()
                        .buttonHeight("30px")
                        .buttonMargin("8px 0px")
                        .buttonPadding("0px 12px")
                        .backgroundColor("#FFFFFF")
                        .iconColor("#4C4A49")
                        .labelColor("#5C9ACD")
                        .borderColor("#CCCCCC")
                        .borderWidth("0 0 0 1px")
                        .iconSize("18px")
                        .data([
                            {
                                icon:"fa-crosshairs",
                                label:"GPS",
                                click:function(){
                                    console.log('GPS btn has been clicked.');
                                }
                            },
                            {
                                icon:"fa-map-o",
                                label:"Find Location",
                                click:function(){
                                    console.log('Find Location btn has been clicked.');
                                }
                            },
                            {
                                icon:"fa-calendar",
                                label:"Date Range",
                                click:function(){
                                    console.log('Date Range btn has been clicked.');
                                }
                            },
                        ])
                );
        }
    
    this._toolbar
            .rightButtons(
                new ButtonAnnotations()
                    .buttonPadding("0px 12px")
                    .backgroundColor("#FFFFFF")
                    .iconColor("#4C4A49")
                    .labelColor("#5C9ACD")
                    .borderColor("#CCCCCC")
                    .borderWidth("0 0 0 1px")
                    .iconSize("18px")
                    .data([
                        {
                            icon:"fa-link",
                            click:function(){console.log('Link btn has been clicked.');}
                        },
                        {
                            icon:"fa-th-large",
                            click:function(d){
                                var rect = this.getBoundingClientRect();
                                context._modal.left(rect.right - context._modal.size().width);
                                context._modal.top(rect.bottom);
                                context._modal.updateState(!(context._modal.popupState()));
                            }
                        },
                        {
                            icon:"fa-minus",
                            click:function(){console.log('Minus btn has been clicked.');}
                        },
                        {
                            icon:"fa-expand",
                            click:function(){
                                if(!context.element().classed("maximized")){
                                    d3.select(context._target).style({
                                        width:window.innerWidth+"px",
                                        height:window.innerHeight+"px"
                                    });
                                } else {
                                    d3.select(context._target).style({
                                        width:"100%",
                                        height:"100%"
                                    });
                                }
                                context.element().classed("maximized",!context.element().classed("maximized"));
                                context.resize().render();
                            }
                        },
                        {
                            icon:"fa-close",
                            click:function(){
                                context.target(null);
                            }
                        }
                    ])
            )
        ;
        this._layout.setContent("center",this.widget());
    };
    CommandWidget.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    return CommandWidget;
}));