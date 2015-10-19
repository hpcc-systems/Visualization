"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/HTMLWidget"], factory);
    } else {
        root.other_Image = factory(root.common_HTMLWidget);
    }
}(this, function (HTMLWidget) {
    function Image() {
        HTMLWidget.call(this);

        this._tag = "img";
        this._prevSource = undefined;
    }
    Image.prototype = Object.create(HTMLWidget.prototype);
    Image.prototype.constructor = Image;
    Image.prototype._class += " other_Image";

    Image.prototype.publish("source", null, "string", "Image Source",null,{tags:["Basic"]});

    Image.prototype.publish("sizing", "actual", "set", "Controls sizing mode", ["actual","fit","custom"], {tags:["Basic"]});
    
    Image.prototype.publish("customWidth", "50%", "string", "Applies this width to IMG element if 'sizing' is set to 'custom'", null, {tags:["Basic"]});
    Image.prototype.publish("customHeight", "20%", "string", "Applies this height to IMG element if 'sizing' is set to 'custom'", null, {tags:["Basic"]});
    
    Image.prototype.publish("lockAspectRatio", true, "boolean", "Locks the aspect ratio when scaling/stretching", null, {tags:["Basic"]});

    Image.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        element.attr("src",this.source());
        this._prevSource = this.source();
        this.initSource(element);
    };

    Image.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        
        if(this.changedSource()){
            this.initSource(element);
        }
        if(this.sizing() === "custom"){
            element.style({
                width:this.customWidth(),
                height:this.customHeight()
            });
        }
        else if (this.sizing() === "actual") {
            element.style({
                width:"auto",
                height:"auto"
            });
        }
        else if (this.sizing() === "fit") {
            element.style({
                width:"100%",
                height:"100%"
            });
        }
        if(this.lockAspectRatio()){
            this.applyAspectRatio(element);
        }
        
        var bbox = element.node().getBoundingClientRect();
        this._projectScaleY = bbox.height/this._sourceHeight;
        this._projectScaleX = bbox.width/this._sourceWidth;
    };
    
    Image.prototype.changedSource = function(){
        return this._prevSource !== this.source();
    };
    
    Image.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };
    
    Image.prototype.initSource = function(element){
        element.attr("src",this.source());
        element.style({width:"auto",height:"auto"});
        this._prevSource = this.source();
        this._sourceBBox = element.node().getBoundingClientRect();
        this._sourceWidth = this._sourceBBox.width;
        this._sourceHeight = this._sourceBBox.height;
        this._ratio = this._sourceBBox.width / this._sourceBBox.height;
    };
    
    Image.prototype.projection = function(x,y){
        return {
            x: x * this._projectScaleX,
            y: y * this._projectScaleY
        };
    };
        
    Image.prototype.applyAspectRatio = function(element){
        var bbox = element.node().getBoundingClientRect();
        if(bbox.width < bbox.height){
            element.style({
                height:(1/this._ratio)*bbox.width+"px",
            });
        } else {
            element.style({
                width:this._ratio*bbox.height+"px",
            });
        }
    };

    return Image;
}));
