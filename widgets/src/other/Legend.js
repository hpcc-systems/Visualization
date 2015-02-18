(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/SVGWidget", "../chart/I2DChart"], factory);
    } else {
        root.Entity = factory(root.SVGWidget);
    }
}(this, function (SVGWidget,I2DChart) {
    function Legend() {  
        SVGWidget.call(this);  
        I2DChart.call(this);  
        this._class = "other_Legend"; 
    };  
    Legend.prototype = Object.create(SVGWidget.prototype);  
    Legend.prototype.implements(I2DChart.prototype);  
       
    Legend.prototype._columns = ["Label", "Count"];  
    Legend.prototype.publish("paletteID", "default", "set", "Palette ID", Legend.prototype._palette.switch());
    Legend.prototype.publish("col_count", 2, "number", "Col Count");
    
    Legend.prototype.publish("shape_type", "rect", "set", "Sample Shape", ["","rect","circle"]);
    Legend.prototype.publish("shape_width", 18, "number", "Sample Width");
    Legend.prototype.publish("shape_height", 18, "number", "Sample Height");
    Legend.prototype.publish("shape_margin", 2, "number", "Sample Margin");
    
    Legend.prototype.publish("text_x_offset", 0, "number", "Text X-Offset");
    Legend.prototype.publish("text_y_offset", 0, "number", "Text Y-Offset");
    
    Legend.prototype.update = function (domNode, element) {
        var context = this;
        
        this._palette = this._palette.switch(this._paletteID);
        
        var legend = element.selectAll(".legendShape").data(this._data); 
        var legend_enter = legend.enter().append('g').attr("class", "legendShape"); 
        var shape = legend_enter.append(this._shape_type); 
        var text = legend_enter.append('text');
        
        switch(this._shape_type){
            case 'rect':
                legend.select(this._shape_type)
                    .attr("width", this._shape_width)
                    .attr("height", this._shape_height)
                    .style("fill", function(d, i) {
                        return context._palette(i);
                    })
                ;
                break;
            case 'circle':
                legend.select(this._shape_type)
                    .attr("cx", this._shape_width/2)
                    .attr("cy", this._shape_height/2)
                    .attr("r", this._shape_width/2)
                    .style("fill", function(d, i) {
                        return context._palette(i);
                    })
                ;
                break;
        }
            
        legend.select('text')
            .attr("x", this._shape_width + this._shape_margin + this._text_x_offset)
            .attr("y", (this._shape_height)/2 + this._text_y_offset)
            .attr("dy", ".35em")
            .attr("font-family", "Calibri")
            .text(function(d) {
                return d[0];
            })
        ;
        
        var bbox_arr = [];
        var col_width = 0;
        var col_height = 0;
        legend.each(function(n,i) {
                var bbox = this.getBoundingClientRect();
                bbox_arr.push(bbox);
                col_width = bbox.width > col_width ? bbox.width : col_width;
                col_height += i%context._col_count === 0 ? bbox.height : 0;
            })
        ;
        
        var col_padding = 8;
        var total_cols_width = (col_width * context._col_count) + (col_padding * (context._col_count - 1));
        var centering_xOffset = total_cols_width/2;

        var total_cols_height = col_height;
        var centering_yOffset = total_cols_height/2;
        
        d3.select(this._target).select("g")
            .selectAll("g").attr("transform", function(d, i) {
                
                var row_offset = Math.ceil((i+1) / context._col_count) - 1;
        
                var trans_x = (col_width * (i%context._col_count)) - centering_xOffset;
                trans_x += i%context._col_count > 0 ? col_padding : 0;
                var trans_y = (row_offset * (context._shape_height + (2*context._shape_margin))) - centering_yOffset;
                
                return "translate(" + trans_x + "," + trans_y + ")";
            })
        ;
        legend.exit().remove();
    };
    
    return Legend;
}));
