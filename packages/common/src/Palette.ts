import * as _colorbrewer from "colorbrewer";
import { values as d3Values } from "d3-collection";
import { rgb as d3RGB } from "d3-color";
import { interpolateLab as d3InterpolateLab } from "d3-interpolate";
import { interpolateInferno as d3InterpolateInferno, interpolateMagma as d3InterpolateMagma, interpolatePlasma as d3InterpolatePlasma, interpolateViridis as d3InterpolateViridis, scaleLinear as d3ScaleLinear, scaleOrdinal as d3ScaleOrdinal, scaleQuantize as d3ScaleQuantize, scaleSequential as d3ScaleSequential, schemeCategory10 as d3SchemeCategory10, schemeCategory20 as d3SchemeCategory20, schemeCategory20b as d3SchemeCategory20b, schemeCategory20c as d3SchemeCategory20c } from "d3-scale";
import { select as d3Select } from "d3-selection";

const d3Schemes = {
    category10: d3SchemeCategory10,
    category20: d3SchemeCategory20,
    category20b: d3SchemeCategory20b,
    category20c: d3SchemeCategory20c
};

const m_colorbrewer = _colorbrewer.default || _colorbrewer;

const m_d3 = {
    Viridis: d3InterpolateViridis,
    Magma: d3InterpolateMagma,
    Inferno: d3InterpolateInferno,
    Plasma: d3InterpolatePlasma
};

const d3Ordinal = [
    "category10", "category20", "category20b", "category20c"
];

const brewerOrdinal = [
    "Accent", "Dark2", "Paired", "Pastel1", "Pastel2", "Set1", "Set2", "Set3"
];

const hpccOrdinal = [
    "hpcc10", "hpcc20"
];

const ordinalCache = {};

export function fetchOrdinalItem(id?, colors?) {
    if (!id) return palette_ordinal();
    let retVal = ordinalCache[id];
    if (!retVal) {
        retVal = palette_ordinal(id, colors);
        ordinalCache[id] = retVal;
    }
    return retVal;
}

function palette_ordinal(id?, colors?): any {
    if (!id) return ["default"].concat(d3Ordinal.concat(brewerOrdinal).concat(hpccOrdinal));
    let scale = null;

    if (colors) {
        scale = d3ScaleOrdinal().range(colors);
    } else {
        if (d3Ordinal.indexOf(id) >= 0) {
            scale = d3ScaleOrdinal(d3Schemes[id]);
        } else if (hpccOrdinal.indexOf(id) >= 0) {
            let newColors = [];
            switch (id) {
                case "hpcc10":
                    const defColors = palette_ordinal("default").colors();
                    newColors = defColors.filter(function (_item, idx) {
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
            scale = d3ScaleOrdinal().range(newColors);
        } else if (brewerOrdinal.indexOf(id) > 0) {
            let largestPalette = 12;
            while (largestPalette > 0) {
                if (m_colorbrewer[id][largestPalette]) {
                    scale = d3ScaleOrdinal().range(m_colorbrewer[id][largestPalette]);
                    break;
                }
                --largestPalette;
            }
        }
        if (!scale) {
            //  Default to Category20  ---
            scale = d3ScaleOrdinal(d3SchemeCategory20);
        }
        colors = scale.range();
    }
    const ordinal: any = function (_) {
        return scale(_);
    };
    ordinal.type = function () {
        return "ordinal";
    };
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

const rainbowCache = {};
export function fetchRainbowItem(id?, colors?, steps?) {
    if (!id) return palette_rainbow();
    let retVal = rainbowCache[id];
    if (!retVal) {
        retVal = palette_rainbow(id, colors, steps);
        rainbowCache[id] = retVal;
    }
    return retVal;
}

function palette_rainbow(id?, _colors?, _steps?) {
    if (!arguments.length) {
        const retVal = ["default"];
        for (const key in m_colorbrewer) {
            if (brewerOrdinal.indexOf(key) === -1) {
                retVal.push(key);
            }
        }
        return retVal;
    }

    let scale = null;
    let colors = _colors;

    const _custom = function (colors, steps?) {
        steps = steps || 32;
        const subPaletteSize = Math.ceil(steps / (colors.length - 1));
        const range = [];
        let prevColor = null;
        colors.forEach(function (color) {
            if (prevColor) {
                const scale = d3ScaleLinear()
                    .domain([0, subPaletteSize])
                    .range([prevColor, color])
                    .interpolate(d3InterpolateLab as any)
                    ;
                for (let i = 0; i < subPaletteSize; ++i) {
                    range.push(scale(i));
                }
            }
            prevColor = color;
        });
        scale = d3ScaleQuantize().domain([0, 100]).range(range);
        return scale;
    };

    if (_colors) {
        scale = _custom(_colors, _steps);
    } else {
        if (m_colorbrewer[id]) {
            let largestPalette = 12;
            while (largestPalette > 0) {
                if (m_colorbrewer[id][largestPalette]) {
                    scale = _custom(m_colorbrewer[id][largestPalette]);
                    break;
                }
                --largestPalette;
            }
        }
        if (m_d3[id]) {
            scale = d3ScaleSequential(m_d3[id]).domain([0, 100]);
        }
        if (!scale) {
            scale = _custom(m_colorbrewer.RdYlGn[11]);
        }
        colors = scale.range ? scale.range() : scale;

    }
    const rainbow: any = function (x, low, high) {
        if (low === high) {
            return scale.domain([low - 1, high + 1])(x);
        }
        return scale.domain([low, high])(x);
    };
    rainbow.type = function () {
        return "rainbow";
    };
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
        rainbowCache[newID] = palette_rainbow(newID, this.colors());
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

export function test(ordinalDivID, brewerDivID, customDivID, customArr, steps) {
    d3Select(ordinalDivID)
        .selectAll(".palette")
        .data(palette_ordinal(), function (d: any) { return d; })
        .enter().append("span")
        .attr("class", "palette")
        .attr("title", function (d) { return d; })
        .on("click", function (d) {
            console.log(d3Values(d.value).map(JSON.stringify as any).join("\n"));
        })
        .selectAll(".swatch").data(function (d) { return palette_ordinal(d).colors(); })
        .enter().append("span")
        .attr("class", "swatch")
        .style("background-color", function (d: any) { return d; });

    d3Select(brewerDivID)
        .selectAll(".palette")
        .data(palette_rainbow(), function (d: any) { return d; })
        .enter().append("span")
        .attr("class", "palette")
        .attr("title", function (d) { return d; })
        .on("click", function (d) {
            console.log(d3Values(d.value).map(JSON.stringify as any).join("\n"));
        })
        .selectAll(".swatch2").data(function (d) { return palette_rainbow(d).colors(); })
        .enter().append("span")
        .attr("class", "swatch2")
        .style("height", (256 / 32) + "px")
        .style("background-color", function (d: any) { return d; });

    const palette = { id: customArr.join("_") + steps, scale: palette_rainbow("custom", customArr, steps) };
    d3Select(customDivID)
        .selectAll(".palette")
        .data([palette], function (d: any) { return d.id; })
        .enter().append("span")
        .attr("class", "palette")
        .attr("title", function () { return "aaa"; /*d.from + "->" + d.to;*/ })
        .on("click", function (d) {
            console.log(d3Values(d.id).map(JSON.stringify as any).join("\n"));
        })
        .selectAll(".swatch2").data(function () {
            const retVal = [];
            for (let i = 0; i <= 255; ++i) {
                retVal.push(palette.scale(i, 0, 255));
            }
            return retVal;
        })
        .enter().append("span")
        .attr("class", "swatch2")
        .style("background-color", function (d) { return d; });
}

m_colorbrewer.RdWhGr = {
    3: ["red", "white", "green"]
};

export const ordinal = fetchOrdinalItem;
export const rainbow = fetchRainbowItem;
export function textColor(backgroundColor: string): string {
    const rgb = d3RGB(backgroundColor);
    return ((rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114) > 149) ? "black" : "white";
}
