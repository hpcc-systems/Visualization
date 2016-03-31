"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/CanvasWidget", "simpleheat", "../common/Palette"], factory);
    } else {
        root.other_HeatMap = factory(root.d3, root.common_CanvasWidget, root.simpleheat, root.common_Palette);
    }
}(this, function (d3, CanvasWidget, simpleheat, Palette) {
    function HeatMap() {
        CanvasWidget.call(this);
    }
    HeatMap.prototype = Object.create(CanvasWidget.prototype);
    HeatMap.prototype.constructor = HeatMap;
    
    HeatMap.prototype._palette = Palette.rainbow("default");
    HeatMap.prototype._class += " other_HeatMap";
    
    HeatMap.prototype.publish("radius", 15, "number", "Set point radius", null, { tags: ["Basic"] });
    HeatMap.prototype.publish("blur", 15, "number", "Set point blur", null, { tags: ["Basic"] });
    HeatMap.prototype.publish("max", 1, "number", "Set max data value", null, { tags: ["Basic"] });
    
    HeatMap.prototype.publish("gradient", {0.4:"blue",0.6:"cyan",0.7:"lime",0.8:"yellow",1.0:"red"}, "object", "Set gradient colors", null, { tags: ["Basic"] });

    HeatMap.prototype.publish("usePalette", false, "boolean", "If true, uses paletteID and colorCount to determine gradient",null,{tags:["Basic"]});

    HeatMap.prototype.publish("colorCount", 10, "number", "Top left x-value",null,{tags:["Basic"]});
    HeatMap.prototype.publish("paletteID", "default", "set", "Palette ID", HeatMap.prototype._palette.switch(), { tags: ["Basic"] });
    HeatMap.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });

    HeatMap.prototype.publish("topLeftX", null, "number", "Top left x-value", null, { tags: ["Basic"], optional: true });
    HeatMap.prototype.publish("topLeftY", null, "number", "Top left y-value", null, { tags: ["Basic"], optional: true });
    HeatMap.prototype.publish("bottomRightX", null, "number", "Bottom right x-value", null, { tags: ["Basic"], optional: true });
    HeatMap.prototype.publish("bottomRightY", null, "number", "Bottom right y-value", null, { tags: ["Basic"], optional: true });

    HeatMap.prototype.enter = function (domNode, element) {
        CanvasWidget.prototype.enter.apply(this, arguments);
        // canvas size needs to be set before render
        this.resize(this._size);
        this._heat = simpleheat(domNode);
    };

    HeatMap.prototype.update = function (domNode, element) {
        CanvasWidget.prototype.update.apply(this, arguments);
        
        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }
        
        if(this.topLeftX_exists() && this.topLeftY_exists() && this.bottomRightX_exists() && this.bottomRightY_exists()){
            this._heat.data(this.skewedData());
        } else {
            this._heat.data(this.data());
        }
        

        if(this.radius()){
            this._heat.radius(this.radius(), this.blur());
        }
        if(this.usePalette()){
            var grad = {};
            for(var idx = 1;idx<=this.colorCount();idx++){
                var value = idx/this.colorCount();
                grad[value] = this._palette(idx,1,this.colorCount());
            }
            this._heat.defaultGradient = grad;
            this._heat.gradient(grad);
        }else if(this.gradient()){
            this._heat.defaultGradient = this.gradient();
            this._heat.gradient(this.gradient());
        }

        this._heat.draw();    
    };

    HeatMap.prototype.exit = function(domNode, element) {
        delete this._heat;
        CanvasWidget.prototype.exit.apply(this, arguments);
    };
    
    HeatMap.prototype.resize = function(size) {
        CanvasWidget.prototype.resize.apply(this, arguments);
        if(this._heat !== undefined){
            this._heat.resize();
        }
    };
    
    HeatMap.prototype.skewedData = function() {
        var context = this;
        var retArr = [];
        var arr = this.data();
        var box = this.element().node().getBoundingClientRect();
        
        var coordsWidth = this.bottomRightX() - this.topLeftX();
        var coordsHeight = this.bottomRightY() - this.topLeftY();
        
        var pixelValueX = coordsWidth / box.width;
        var pixelValueY = coordsHeight / box.height;
        
        arr.forEach(function(n){
            var left = Math.abs(n[0] - context.topLeftX());
            var top = Math.abs(n[1] - context.topLeftY());
            
            var newX = left / pixelValueX;
            var newY = top / pixelValueY;
            
            retArr.push([newX,newY,n[2]]);
        });
        
        return retArr;
    };
 
    return HeatMap;
}));
