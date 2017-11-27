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
        this._html = new Html()
            .overflowX("visible")
            .overflowY("visible")
        ;
    }
    Modal.prototype = Object.create(HTMLWidget.prototype);
    Modal.prototype.constructor = Modal;
    Modal.prototype._class += " layout_Modal";
    
    Modal.prototype.publishProxy("html","_html");

    Modal.prototype.publish("title", null, "string", "title");
    Modal.prototype.publish("titleFontSize", "18px", "string", "titleFontSize");
    Modal.prototype.publish("titleFontColor", "#ffffff", "html-color", "titleFontColor");
    Modal.prototype.publish("relativeTargetId", null, "string", "relativeTargetId");

    Modal.prototype.publish("headerPadding", "15px", "string", "headerPadding");
    Modal.prototype.publish("bodyPadding", "15px", "string", "bodyPadding");

    Modal.prototype.publish("show", true, "boolean", "show");
    Modal.prototype.publish("showFade", true, "boolean", "showFade");
    Modal.prototype.publish("enableClickFadeToClose", true, "boolean", "enableClickFadeToClose");

    Modal.prototype.publish("minWidth", "400px", "string", "minWidth");
    Modal.prototype.publish("minHeight", "400px", "string", "minHeight");
    Modal.prototype.publish("maxWidth", "800px", "string", "maxWidth");
    Modal.prototype.publish("maxHeight", "800px", "string", "maxHeight");
    
    Modal.prototype.closeModal = function(){
        this.exit();
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
    
    Modal.prototype.setModalSizeLimits = function () {
        if(this.minHeight() || this.minWidth()){
            this._modal.style({
                'min-height':this.minHeight(),
                'min-width':this.minWidth(),
                'max-height':this.maxHeight(),
                'max-width':this.maxWidth(),
            });
        }
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
        var contentRect = this._modal.node().getBoundingClientRect();
        var _contentStyles = {
            top: (rect.top + (rect.height/2) - (contentRect.height/2))+"px",
            left: (rect.left + (rect.width/2) - (contentRect.width/2))+"px",
            width: contentRect.width+"px",
            height: contentRect.height+"px",
        };
        if(this.minHeight() || this.minWidth()){
            _contentStyles['min-height'] = this.minHeight();
            _contentStyles['min-width'] = this.minWidth();
        }
        this._modal.style(_contentStyles);
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
        this._modalHeaderAnnotations = this._modalHeader.append('div').classed('layout_Modal-annotations',true);
        this._modalHeaderAnnotations.style({
            "right": this._modalHeader.style('padding-right'),
            "top": this._modalHeader.style('padding-top')
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

        this._html.target(this._modalBody.node());
        this.setModalSizeLimits();
    };    
    
    Modal.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        
        this._fade.classed('layout_Modal-fade-hidden',!this.showFade());
        this._relativeTarget = this.getRelativeTarget();

        this.setModalSizeLimits();

        var context = this;
        this._html.html(this.html()).render(function(){
            var rect = context._relativeTarget.getBoundingClientRect();
            context.setFadePosition(rect);
            context.setModalPosition(rect);
        });
    };
    
    return Modal;
}));
