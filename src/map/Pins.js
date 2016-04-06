"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "topojson", "./Layer", "./Utility", "../common/Palette", "../common/Utility", "css!./Pins"], factory);
    } else {
        root.map_Pins = factory(root.d3, root.topojson, root.map_Layer, root.map_Utility, root.common_Palette, root.common_Utility);
    }
}(this, function (d3, topojson, Layer, Utility, Palette, CommonUtility) {
    function Pins() {
        Layer.call(this);
    }
    Pins.prototype = Object.create(Layer.prototype);
    Pins.prototype.constructor = Pins;
    Pins.prototype._class += " map_Pins";

    Pins.prototype.publish("opacity", 1.0, "number", "Opacity", null, { tags: ["Advanced"] });

    Pins.prototype.publish("pinShape", "square", "set", "Shape of pin", ["circle","pin","square"]);
    Pins.prototype.publish("pinColor", "#006ccc", "html-color", "Pin Color", null, { optional: true });
    Pins.prototype.publish("meshStrokeWidth", 0.25, "number", "Stroke Width");

    Pins.prototype.layerEnter = function (base, svgElement, domElement) {
        Layer.prototype.layerEnter.apply(this, arguments);

        this._pinsTransform = svgElement;
        this._selection = new CommonUtility.SimpleSelection(this._pinsTransform);
        this.pinsPaths = d3.select(null);
    };

    Pins.prototype.layerUpdate = function (base) {
        Layer.prototype.layerUpdate.apply(this, arguments);
        
        this._pinsTransform
            .style("opacity", this.opacity())
        ; 
        
        this.pinsPaths = this._pinsTransform.selectAll(".data").data(this.visible() ? this.data() : [], function (d) { return d[0]; });
        var context = this;
        this.pinsPaths.enter().append("path")
            .attr("class", "data")
            .attr("d", function (d) {
                return context.pinPathCoords(context.pinShape());
            })
            .each(function(d,i){
                if(d[2]){
                    var rect = this.getBoundingClientRect();
                    if(d[2].icon){
                        var iconTextElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
                        this.parentNode.insertBefore(iconTextElement, this.nextSibling);
                        d3.select(iconTextElement)
                            .attr("class","pin-icon pin-icon-"+i)
                            .attr("x",0)
                            .attr("y",-rect.height * 1)
                            .attr("width",rect.width)
                            .attr("height",rect.height)
                            .attr("fill","#333333")
                            .attr("font-size",d[2].iconSize ? d[2].iconSize : "50px")
                            .attr("text-anchor","middle")
                            .attr("font-family",d[2].iconFont ? d[2].iconFont : "Verdana");
                        d3.select(iconTextElement).html(d[2].icon);
                    }
                    if(d[2].text){
                        var textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
                        this.parentNode.insertBefore(textElement, this.nextSibling);
                        d3.select(textElement)
                            .attr("class","pin-text pin-text-"+i)
                            .attr("x",0)
                            .attr("y",-rect.height * 0.5)
                            .attr("width",rect.width)
                            .attr("height",rect.height)
                            .attr("fill","#333333")
                            .attr("strokeFill","#333333")
                            .attr("stroke-width","1.")
                            .attr("font-size",d[2].textSize ? d[2].textSize : "20px")
                            .attr("text-anchor","middle")
                            .attr("font-family",d[2].textFont ? d[2].textFont : "Verdana");
                        d3.select(textElement).html(d[2].text);
                    }
                }
            })
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                context.click(context.rowToObj(d), "weight", context._selection.selected(this));
            })
        ;
        this.pinsPaths
            .style("fill", function (d) {
                if(d[3] && d[3].fillColor){
                    return d[3].fillColor;
                }
                return d[2] && d[2].fillColor ? d[2].fillColor : context.pinColor();
            })
            .style("stroke", function (d) {
                if(d[3] && d[3].strokeColor){
                    return d[3].strokeColor;
                }
                return d[2] && d[2].strokeColor ? d[2].strokeColor : context.pinColor();
            })
        ;
        this.pinsPaths.exit().remove();
    };

    Pins.prototype.pinPathCoords = function (shape) {
        var _path = '';
        switch(shape){
            case "circle":
                _path += "m-24,-31c0,10.8335 6.8925,20.0592 16.53,23.53l8.47,8.47l8.47,-8.47c9.6375,-3.4708 16.53,-12.6965 16.53,-23.53c0,-13.8073 -11.1927,-25 -25,-25c-13.8073,0 -25,11.1927 -25,25z";
                break;
            case "pin":
                _path += "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30";
                break;
            case "square":
                var _squareWidth = 50;
                var _cornerRadius = 6;
                var _pointHeight = 10;
                var _pointWidth = 20;
                _path += 'M0 0';
                _path += 'L-'+(_pointWidth/2)+' -'+(_pointHeight);
                _path += 'L-'+((_squareWidth/2)-_cornerRadius)+' -'+(_pointHeight);
                _path += 'Q-'+(_squareWidth/2)+' -'+(_pointHeight)+' -'+(_squareWidth/2)+' -'+(_pointHeight+_cornerRadius);
                _path += 'L-'+(_squareWidth/2)+' -'+((_pointHeight+_squareWidth-_cornerRadius));
                _path += 'Q-'+(_squareWidth/2)+' -'+((_pointHeight+_squareWidth))+' -'+(_squareWidth/2-_cornerRadius)+' -'+((_pointHeight+_squareWidth));
                _path += 'L'+((_squareWidth/2)-_cornerRadius)+' -'+((_pointHeight+_squareWidth));
                _path += 'Q'+(_squareWidth/2)+' -'+((_pointHeight+_squareWidth))+' '+(_squareWidth/2)+' -'+((_pointHeight+_squareWidth-_cornerRadius));
                _path += 'L'+(_squareWidth/2)+' -'+(_pointHeight+_cornerRadius);
                _path += 'Q'+(_squareWidth/2)+' -'+(_pointHeight)+' '+((_squareWidth/2)-_cornerRadius)+' -'+(_pointHeight);
                _path += 'L'+(_pointWidth/2)+' -'+(_pointHeight);
                _path += 'Z';
                break;
        }
        return _path;
    };
    Pins.prototype.layerZoomed = function (base) {
        Layer.prototype.layerZoomed.apply(this, arguments);
        this.pinsPaths
            .style("display", function (d) {
                var pos = base.project(d[0], d[1]);
                if (!pos) {
                    return "none";
                }
                return null;
            })
            .attr("transform", function (d,i) {
                var pos = base.project(d[0], d[1]);
                if (!pos) {
                    pos = [0, 0];
                }
                d3.select(".pin-icon-"+i).attr("transform","translate("+pos[0]+", "+pos[1]+")scale("+0.5+")");
                d3.select(".pin-text-"+i).attr("transform","translate("+pos[0]+", "+pos[1]+")scale("+0.5+")");
                return "translate(" + pos[0] + ", " + pos[1] + ")scale(" + 1 /* * base._zoom.scale() */ + ")";
            })
            .attr("stroke-width", 1 + "px")
        ;
    };

    //  Events  ---
    Pins.prototype.click = function (row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    return Pins;
}));
