/**
 * @file Color Palette Object
 * @author HPCC Systems
 */

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "colorbrewer"], factory);
    } else {
        root.common_Palette = factory(root.d3);
    }
}(this, function (d3) {
    var d3Ordinal = [
        "category10", "category20", "category20b", "category20c"
    ];
    var brewerOrdinal = [
        "Accent", "Dark2", "Paired", "Pastel1", "Pastel2", "Set1", "Set2", "Set3"
    ];
    var hpccOrdinal = [
        "hpcc10", "hpcc20"
    ];

    var ordinalCache = {};

    function fetchOrdinalItem(id, colors) {
        if (!id) return palette_ordinal();
        var retVal = ordinalCache[id];
        if (!retVal) {
            retVal = palette_ordinal(id, colors);
            ordinalCache[id] = retVal;
        }
        return retVal;
    }

    function palette_ordinal(id, colors) {
        if (!id) return ["default"].concat(d3Ordinal.concat(brewerOrdinal).concat(hpccOrdinal));
        var scale = null;

        if (colors) {
            scale = d3.scale.ordinal().range(colors);
        } else {
            if (d3Ordinal.indexOf(id) >= 0) {
                scale = new d3.scale[id]();
            } else if (hpccOrdinal.indexOf(id) >= 0) {
                var newColors = [];
                switch (id) {
                    case "hpcc10":
                        var defColors = palette_ordinal("default").colors();
                        newColors = defColors.filter(function (item, idx) {
                            if (idx % 2) {
                                return true;
                            }
                            return false;
                        });
                        break;
                    case "hpcc20":
                        newColors = palette_ordinal("category10").colors().concat(palette_ordinal("hpcc10").colors());
                        break;
                }
                scale = d3.scale.ordinal().range(newColors);
            } else if (brewerOrdinal.indexOf(id) > 0) {
                var largestPalette = 12;
                while (largestPalette > 0) {
                    if (colorbrewer[id][largestPalette]) {
                        scale = d3.scale.ordinal().range(colorbrewer[id][largestPalette]);
                        break;
                    }
                    --largestPalette;
                }
            }
            if (!scale) {
                //  Default to Category20  ---
                scale = d3.scale.category20();
            }
            colors = scale.range();
        }
        function ordinal(_) {
            return scale(_);
        }
        ordinal.id = function (_) {
            if (!arguments.length) return id;
            id = _;
            return ordinal;
        };
        ordinal.colors = function (_) {
            if (!arguments.length) return colors;
            colors = _;
            return ordinal;
        };
        ordinal.clone = function (newID) {
            ordinalCache[newID] = palette_ordinal(newID, this.colors());
            return ordinalCache[newID];

        };
        ordinal.cloneNotExists = function (newID) {
            if (ordinalCache[newID]) {
                return ordinalCache[newID];
            }
            return this.clone(newID);
        };
        ordinal.switch = function (_id, _colors) {
            if (id === _id) {
                return this;
            }
            return arguments.length ? fetchOrdinalItem(_id, _colors) : fetchOrdinalItem();
        };

        return ordinal;
    }

    var rainbowCache = {};
    function fetchRainbowItem(id, colors, steps) {
        if (!id) return palette_rainbow();
        var retVal = rainbowCache[id];
        if (!retVal) {
            retVal = palette_rainbow(id, colors);
            rainbowCache[id] = retVal;
        }
        return retVal;
    }

    function palette_rainbow(id, _colors, _steps) {
        if (!arguments.length) {
            var retVal = ["default"];
            for (var key in colorbrewer) {
                if (brewerOrdinal.indexOf(key) === -1) {
                    retVal.push(key);
                }
            }
            return retVal;
        }

        var scale = null;
        var colors = _colors;

        var _custom = function (colors, steps) {
            steps = steps || 32;
            var subPaletteSize = Math.ceil(steps / (colors.length - 1));
            var range = [];
            var prevColor = null;
            colors.forEach(function (color) {
                if (prevColor) {
                    var scale = d3.scale.linear()
                        .domain([0, subPaletteSize])
                        .range([prevColor, color])
                        .interpolate(d3.interpolateLab)
                    ;
                    for (var i = 0; i < subPaletteSize; ++i) {
                        range.push(scale(i));
                    }
                }
                prevColor = color;
            });
            scale = d3.scale.quantize().domain([0, 100]).range(range);
            return scale;
        };

        if (_colors) {
            scale = _custom(_colors, _steps);
        } else {
            if (colorbrewer[id]) {
                var largestPalette = 12;
                while (largestPalette > 0) {
                    if (colorbrewer[id][largestPalette]) {
                        scale = _custom(colorbrewer[id][largestPalette]);
                        break;
                    }
                    --largestPalette;
                }
            }
            if (!scale) {
                scale = _custom(colorbrewer.RdYlGn[11]);
            }
            colors = scale.range();

        }
        function rainbow(x, low, high) {
            return scale.domain([low, high])(x);
        }
        rainbow.id = function (_) {
            if (!arguments.length) return id;
            id = _;
            return rainbow;
        };
        rainbow.colors = function (_) {
            if (!arguments.length) return colors;
            colors = _;
            return rainbow;
        };
        rainbow.clone = function (newID) {
            rainbowCache[newID] = palette_rainbow(newID, this.color());
            return rainbowCache[newID];
        };
        rainbow.cloneNotExists = function (newID) {
            if (rainbowCache[newID]) {
                return rainbowCache[newID];
            }
            return this.clone(newID);
        };
        rainbow.switch = function (_id, _colors) {
            if (id === _id) {
                return this;
            }
            return arguments.length ? fetchRainbowItem(_id, _colors) : fetchRainbowItem();
        };

        return rainbow;
    }

    var test = function(ordinalDivID, brewerDivID, customDivID, customArr, steps) {
        d3.select(ordinalDivID)
          .selectAll(".palette")
            .data(palette_ordinal(), function (d) { return d; })
          .enter().append("span")
            .attr("class", "palette")
            .attr("title", function(d) { return d; })
            .on("click", function(d) {
                console.log(d3.values(d.value).map(JSON.stringify).join("\n"));
            })
          .selectAll(".swatch").data(function (d) { return palette_ordinal(d).colors(); })
          .enter().append("span")
            .attr("class", "swatch")
            .style("background-color", function(d) { return d; });

        d3.select(brewerDivID)
          .selectAll(".palette")
            .data(palette_rainbow(), function (d) { return d; })
          .enter().append("span")
            .attr("class", "palette")
            .attr("title", function(d) { return d; })
            .on("click", function(d) {
                console.log(d3.values(d.value).map(JSON.stringify).join("\n"));
            })
          .selectAll(".swatch2").data(function (d) { return palette_rainbow(d).colors(); })
          .enter().append("span")
            .attr("class", "swatch2")
            .style("height", (256 / 32)+"px")
            .style("background-color", function(d) { return d; });

        var palette = { id: customArr.join("_") + steps, scale: palette_rainbow("custom", customArr, steps) };
        d3.select(customDivID)
          .selectAll(".palette")
            .data([palette], function (d) { return d.id; })
          .enter().append("span")
            .attr("class", "palette")
            .attr("title", function(d) { return "aaa";/*d.from + "->" + d.to;*/ })
            .on("click", function(d) {
                console.log(d3.values(d.value).map(JSON.stringify).join("\n"));
            })
          .selectAll(".swatch2").data(function(d) {
                var retVal = [];
                for (var i = 0; i <= 255; ++i) {
                    retVal.push(palette.scale(i, 0, 255));
                }
                return retVal;
          })
          .enter().append("span")
            .attr("class", "swatch2")
            .style("background-color", function(d) { return d; });
    };
    /**
     * @class common_Palette
     */
    return {
        /**
         * Returns an ordinal palette object. (Fixed set of colors)
         * @method ordinal
         * @memberof common_Palette
         * @instance
         * @param {String} id The name to set to the palette being created.
         * @param {Array<String>} colors An array of colors to use.
         * @returns {PaletteObject}
         * @TODO create paletteObject type for this
         * @example
         * var colorPalette = Palette.ordinal("MyPalette", ["red", "green", "blue"]); // 3 colors 3 bars
         * widget.paletteID("MyPalette").render();
         */
        ordinal: fetchOrdinalItem,
        /**
         * Returns a rainbow palette object. (Series of colors calculated based on input range and domain).  Will create color rainbow based off of input colors and how many steps through each set of colors.
         * @method rainbow
         * @memberof common_Palette
         * @instance
         * @param {String} id The name to set to the palette being created.
         * @param {Array<String>} colors An array of colors.
         * @param {Array<String>} steps The amount of colors total in the palette.
         * @returns {PaletteObject}
         * @TODO create paletteObject type for this
         * @example example
         * var colorPalette = Palette.rainbow("MyPalette", ["red", "green", "blue", 32]); // 32 colors between red, green and blue
         * widget.paletteID("MyPalette").render();
         */
        rainbow: fetchRainbowItem,
        test: test
    };
}));
