(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "lib/colorbrewer/colorbrewer"], factory);
    } else {
        root.Entity = factory(root.d3);
    }
}(this, function (d3) {
    var sets = [
        "category10", "category20", "category20b", "category20c",
        "Accent", "Dark2", "Paired", "Pastel1", "Pastel2", "Set1", "Set2", "Set3"
    ];
    
    ordinal = function (palette) {
        if (!arguments.length) return sets;
        if (d3.scale[palette]) {
            return d3.scale[palette]();
        } else if (colorbrewer[palette]) {
            var largestPalette = 12;
            while (largestPalette > 0) {
                if (colorbrewer[palette][largestPalette]) {
                    return d3.scale.ordinal().range(colorbrewer[palette][largestPalette]);
                }
                --largestPalette;
            }
        }
        throw "Invalid color palette:  " + palette;
    };

    brewer = function (palette, from, to) {
        if (!arguments.length) {
            var retVal = [];
            for(var key in colorbrewer) {
                if (sets.indexOf(key) === -1) {
                    retVal.push(key);
                }
            }
            return retVal;
        };
        if (!colorbrewer[palette]) {
            throw "Invalid color palette:  " + palette;
        }
        var largestPalette = 12;
        while (largestPalette > 0) {
            if (colorbrewer[palette][largestPalette]) {
                return custom(colorbrewer[palette][largestPalette], from, to);
            }
            --largestPalette;
        }
        return null;
    };

    custom = function (colorArr, from, to, steps) {
        steps = steps || 32;
        var subPaletteSize = Math.ceil(steps / (colorArr.length - 1));
        var range = [];
        var prevColor = null;
        colorArr.forEach(function(color) {
            if (prevColor) {
                var scale = d3.scale.linear()
                    .domain([0, subPaletteSize])
                    .range([prevColor, color])
                    .interpolate(d3.interpolateLab)
                ;
                for(var i = 0; i < subPaletteSize; ++i) {
                    range.push(scale(i));
                }
            }
            prevColor = color;
        });
        return d3.scale.quantize().domain([from, to]).range(range);
    };
    
    test = function(ordinalDivID, brewerDivID, customDivID, customArr, steps) {
        d3.select(ordinalDivID)
          .selectAll(".palette")
            .data(ordinal(), function(d){ return d; })
          .enter().append("span")
            .attr("class", "palette")
            .attr("title", function(d) { return d; })
            .on("click", function(d) { 
                console.log(d3.values(d.value).map(JSON.stringify).join("\n")); 
            })
          .selectAll(".swatch").data(function(d) { return ordinal(d).range(); })
          .enter().append("span")
            .attr("class", "swatch")
            .style("background-color", function(d) { return d; });

        d3.select(brewerDivID)
          .selectAll(".palette")
            .data(brewer(), function(d){ return d; })
          .enter().append("span")
            .attr("class", "palette")
            .attr("title", function(d) { return d; })
            .on("click", function(d) { 
                console.log(d3.values(d.value).map(JSON.stringify).join("\n")); 
            })
          .selectAll(".swatch2").data(function(d) { return brewer(d).range(); })
          .enter().append("span")
            .attr("class", "swatch2")
            .style("height", (256 / 32)+"px")
            .style("background-color", function(d) { return d; });
            
        var scale = {id:customArr.join("_") + steps, scale: custom(customArr, 0, 255, steps)};
        d3.select(customDivID)
          .selectAll(".palette")
            .data([scale], function(d) {return d.id;})
          .enter().append("span")
            .attr("class", "palette")
            .attr("title", function(d) { return "aaa";/*d.from + "->" + d.to;*/ })
            .on("click", function(d) { 
                console.log(d3.values(d.value).map(JSON.stringify).join("\n")); 
            })
          .selectAll(".swatch2").data(function(d) {
                var domain = d.scale.domain();
                var retVal = [];
                for (var i = domain[0]; i <= domain[1]; ++i) 
                  retVal.push(d.scale(i));
                return retVal;
          })
          .enter().append("span")
            .attr("class", "swatch2")
            .style("background-color", function(d) { return d; });
    };    

    return {
        ordinal: ordinal,
        brewer: brewer,
        custom: custom,
        test: test        
    };
}));
