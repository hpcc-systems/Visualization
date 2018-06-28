"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "../other/Html", "css!./Modal"], factory);
    } else {
        root.layout_Modal = factory(root.d3, root.common_HTMLWidget, root.other_Html);
    }
}(this, function (d3, HTMLWidget, Html) {
    function Modal() {
        HTMLWidget.call(this);
        this._tag = "div";
        this._widget = new Html()
            .overflowX("visible")
            .overflowY("visible")
        ;
    }
    Modal.prototype = Object.create(HTMLWidget.prototype);
    Modal.prototype.constructor = Modal;
    Modal.prototype._class += " layout_Modal";
    
    Modal.prototype.publishProxy("html","_widget");

    Modal.prototype.publish("title", "", "string", "title");
    Modal.prototype.publish("titleFontSize", "18px", "string", "titleFontSize");
    Modal.prototype.publish("titleFontColor", "#ffffff", "html-color", "titleFontColor");
    Modal.prototype.publish("relativeTargetId", null, "string", "relativeTargetId");

    Modal.prototype.publish("headerPadding", "15px", "string", "headerPadding");
    Modal.prototype.publish("bodyPadding", "15px", "string", "bodyPadding");

    Modal.prototype.publish("showFade", true, "boolean", "showFade");
    Modal.prototype.publish("enableClickFadeToClose", true, "boolean", "enableClickFadeToClose");

    Modal.prototype.publish("minWidth", "400px", "string", "minWidth");
    Modal.prototype.publish("minHeight", "400px", "string", "minHeight");
    Modal.prototype.publish("maxWidth", "800px", "string", "maxWidth");
    Modal.prototype.publish("maxHeight", "800px", "string", "maxHeight");
    Modal.prototype.publish("fixedWidth", null, "string", "fixedWidth");
    Modal.prototype.publish("fixedHeight", null, "string", "fixedHeight");

    Modal.prototype.closeModal = function () {
        this.visible(false);
    };

    Modal.prototype.getRelativeTarget = function(){
        var relativeTarget;
        if(this.relativeTargetId()){
            relativeTarget = document.getElementById(this.relativeTargetId());
            if(relativeTarget){
                return relativeTarget;
            }
        }
        if(!relativeTarget){
            relativeTarget = this.locateAncestor('layout_Grid');
            if(relativeTarget && relativeTarget.element){
                return relativeTarget.element().node();
            }
        }
        return document.body;
    };
    
    Modal.prototype.setModalSize = function () {
        if (this.fixedHeight() !== null && this.fixedWidth() !== null) {
            this._modal.style({
                'height':this.fixedHeight(),
                'width':this.fixedWidth(),
                'min-height':null,
                'min-width':null,
                'max-height':null,
                'max-width':null
            });
        } else if(this.minHeight() || this.minWidth()){
            this._modal.style({
                'min-height':this.minHeight(),
                'min-width':this.minWidth(),
                'max-height':this.maxHeight(),
                'max-width':this.maxWidth()
            });
        }
        var modalRect = this._modal.node().getBoundingClientRect();
        var headerRect = this._modalHeader.node().getBoundingClientRect();
        this._modalBody
            .style("height",(modalRect.height - headerRect.height) + "px")
            .style("width",modalRect.width);

        return modalRect;
    };
    
    Modal.prototype.setFadePosition = function(rect) {
        var _fadeStyles = {
            top: rect.top+"px",
            left: rect.left+"px",
            width: rect.width+"px",
            height: rect.height+"px",
        };
        this._fade.style(_fadeStyles);
    };
    
    Modal.prototype.setModalPosition = function(rect) {
        var modalRect = this.setModalSize();
        if (this.fixedHeight() !== null && this.fixedWidth() !== null) {
            this._modal.style({
                top: (rect.top + (rect.height/2) - (modalRect.height/2))+"px",
                left: (rect.left + (rect.width/2) - (modalRect.width/2))+"px",
            });
        } else if(this.minHeight() || this.minWidth()){
            var contentRect = this._modal.node().getBoundingClientRect();
            this._modal.style({
                top: (rect.top + (rect.height/2) - (contentRect.height/2))+"px",
                left: (rect.left + (rect.width/2) - (contentRect.width/2))+"px",
            });
        }
    };

    Modal.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        var context = this;
        this._fade = element.append('div')
            .classed('layout_Modal-fade',true)
            .classed('layout_Modal-fadeClickable',this.enableClickFadeToClose())
            .classed('layout_Modal-fade-hidden',!this.showFade())
        ;
        this._modal = element.append('div').classed('layout_Modal-content',true);
        this._modalHeader = this._modal.append('div')
            .classed('layout_Modal-header',true)
            .style('padding',this.headerPadding())
            .style('color',this.titleFontColor())
            .style('font-size',this.titleFontSize())
        ;
        this._modalBody = this._modal.append('div')
            .classed('layout_Modal-body',true)
            .style('padding',this.bodyPadding())
        ;

        this._modalHeaderTitle = this._modalHeader.append('div').classed('layout_Modal-title',true).text(this.title());
        this._modalHeaderTitle.style({
            "left": this.headerPadding(),
            "top": this.headerPadding()
        });
        this._modalHeaderAnnotations = this._modalHeader.append('div').classed('layout_Modal-annotations',true);
        this._modalHeaderAnnotations.style({
            "right": this.headerPadding(),
            "top": this.headerPadding()
        });

        this._modalHeaderCloseButton = this._modalHeaderAnnotations.append('div').classed('layout_Modal-closeButton',true).html('<i class="fa fa-close"></i>');
        this._modalHeaderCloseButton.on("click",function(){
            context.closeModal();
        });
        this._fade.on("click",function(){
            if(context.enableClickFadeToClose()){
                context.closeModal();
            }
        });

        this._widget.target(this._modalBody.node());
    };    
    
    Modal.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        
        this._fade.classed('layout_Modal-fade-hidden', !this.showFade());
        this._relativeTarget = this.getRelativeTarget();

        this._modalHeaderTitle.text(this.title());

        var rect = this._relativeTarget.getBoundingClientRect();
        this.setModalPosition(rect);
    };

    Modal.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
        this._widget.target(null);
    };

    Modal.prototype.render = function (callback) {
        var context = this;
        return HTMLWidget.prototype.render.call(this, function (w) { 
            context._widget
                .resize()
                .render(function (w2) {
                    var rect = context._relativeTarget.getBoundingClientRect();
                    context.setFadePosition(rect);
                    context.setModalPosition(rect);
                    if (callback) {
                        callback(w);
                    }
            });
        });
    };
    
    return Modal;
}));
