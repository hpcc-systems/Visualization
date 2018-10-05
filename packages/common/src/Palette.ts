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

// These color schemes are from www.flatuicolors.com
const flatuiSchemes = {
    FlatUI_default: ["rgb(26, 188, 156)", "rgb(46, 204, 113)", "rgb(52, 152, 219)", "rgb(155, 89, 182)", "rgb(52, 73, 94)", "rgb(22, 160, 133)", "rgb(39, 174, 96)", "rgb(41, 128, 185)", "rgb(142, 68, 173)", "rgb(44, 62, 80)", "rgb(241, 196, 15)", "rgb(230, 126, 34)", "rgb(231, 76, 60)", "rgb(236, 240, 241)", "rgb(149, 165, 166)", "rgb(243, 156, 18)", "rgb(211, 84, 0)", "rgb(192, 57, 43)", "rgb(189, 195, 199)", "rgb(127, 140, 141)"],
    FlatUI_American: ["rgb(85, 239, 196)", "rgb(129, 236, 236)", "rgb(116, 185, 255)", "rgb(162, 155, 254)", "rgb(223, 230, 233)", "rgb(0, 184, 148)", "rgb(0, 206, 201)", "rgb(9, 132, 227)", "rgb(108, 92, 231)", "rgb(178, 190, 195)", "rgb(255, 234, 167)", "rgb(250, 177, 160)", "rgb(255, 118, 117)", "rgb(253, 121, 168)", "rgb(99, 110, 114)", "rgb(253, 203, 110)", "rgb(225, 112, 85)", "rgb(214, 48, 49)", "rgb(232, 67, 147)", "rgb(45, 52, 54)"],
    FlatUI_Aussie: ["rgb(246, 229, 141)", "rgb(255, 190, 118)", "rgb(255, 121, 121)", "rgb(186, 220, 88)", "rgb(223, 249, 251)", "rgb(249, 202, 36)", "rgb(240, 147, 43)", "rgb(235, 77, 75)", "rgb(106, 176, 76)", "rgb(199, 236, 238)", "rgb(126, 214, 223)", "rgb(224, 86, 253)", "rgb(104, 109, 224)", "rgb(48, 51, 107)", "rgb(149, 175, 192)", "rgb(34, 166, 179)", "rgb(190, 46, 221)", "rgb(72, 52, 212)", "rgb(19, 15, 64)", "rgb(83, 92, 104)"],
    FlatUI_British: ["rgb(0, 168, 255)", "rgb(156, 136, 255)", "rgb(251, 197, 49)", "rgb(76, 209, 55)", "rgb(72, 126, 176)", "rgb(0, 151, 230)", "rgb(140, 122, 230)", "rgb(225, 177, 44)", "rgb(68, 189, 50)", "rgb(64, 115, 158)", "rgb(232, 65, 24)", "rgb(245, 246, 250)", "rgb(127, 143, 166)", "rgb(39, 60, 117)", "rgb(53, 59, 72)", "rgb(194, 54, 22)", "rgb(220, 221, 225)", "rgb(113, 128, 147)", "rgb(25, 42, 86)", "rgb(47, 54, 64)"],
    FlatUI_Canadian: ["rgb(255, 159, 243)", "rgb(254, 202, 87)", "rgb(255, 107, 107)", "rgb(72, 219, 251)", "rgb(29, 209, 161)", "rgb(243, 104, 224)", "rgb(255, 159, 67)", "rgb(238, 82, 83)", "rgb(10, 189, 227)", "rgb(16, 172, 132)", "rgb(0, 210, 211)", "rgb(84, 160, 255)", "rgb(95, 39, 205)", "rgb(200, 214, 229)", "rgb(87, 101, 116)", "rgb(1, 163, 164)", "rgb(46, 134, 222)", "rgb(52, 31, 151)", "rgb(131, 149, 167)", "rgb(34, 47, 62)"],
    FlatUI_Chinese: ["rgb(236, 204, 104)", "rgb(255, 127, 80)", "rgb(255, 107, 129)", "rgb(164, 176, 190)", "rgb(87, 96, 111)", "rgb(255, 165, 2)", "rgb(255, 99, 72)", "rgb(255, 71, 87)", "rgb(116, 125, 140)", "rgb(47, 53, 66)", "rgb(123, 237, 159)", "rgb(112, 161, 255)", "rgb(83, 82, 237)", "rgb(255, 255, 255)", "rgb(223, 228, 234)", "rgb(46, 213, 115)", "rgb(30, 144, 255)", "rgb(55, 66, 250)", "rgb(241, 242, 246)", "rgb(206, 214, 224)"],
    FlatUI_Dutch: ["rgb(255, 195, 18)", "rgb(196, 229, 56)", "rgb(18, 203, 196)", "rgb(253, 167, 223)", "rgb(237, 76, 103)", "rgb(247, 159, 31)", "rgb(163, 203, 56)", "rgb(18, 137, 167)", "rgb(217, 128, 250)", "rgb(181, 52, 113)", "rgb(238, 90, 36)", "rgb(0, 148, 50)", "rgb(6, 82, 221)", "rgb(153, 128, 250)", "rgb(131, 52, 113)", "rgb(234, 32, 39)", "rgb(0, 98, 102)", "rgb(27, 20, 100)", "rgb(87, 88, 187)", "rgb(111, 30, 81)"],
    FlatUI_French: ["rgb(250, 211, 144)", "rgb(248, 194, 145)", "rgb(106, 137, 204)", "rgb(130, 204, 221)", "rgb(184, 233, 148)", "rgb(246, 185, 59)", "rgb(229, 80, 57)", "rgb(74, 105, 189)", "rgb(96, 163, 188)", "rgb(120, 224, 143)", "rgb(250, 152, 58)", "rgb(235, 47, 6)", "rgb(30, 55, 153)", "rgb(60, 99, 130)", "rgb(56, 173, 169)", "rgb(229, 142, 38)", "rgb(183, 21, 64)", "rgb(12, 36, 97)", "rgb(10, 61, 98)", "rgb(7, 153, 146)"],
    FlatUI_German: ["rgb(252, 92, 101)", "rgb(253, 150, 68)", "rgb(254, 211, 48)", "rgb(38, 222, 129)", "rgb(43, 203, 186)", "rgb(235, 59, 90)", "rgb(250, 130, 49)", "rgb(247, 183, 49)", "rgb(32, 191, 107)", "rgb(15, 185, 177)", "rgb(69, 170, 242)", "rgb(75, 123, 236)", "rgb(165, 94, 234)", "rgb(209, 216, 224)", "rgb(119, 140, 163)", "rgb(45, 152, 218)", "rgb(56, 103, 214)", "rgb(136, 84, 208)", "rgb(165, 177, 194)", "rgb(75, 101, 132)"],
    FlatUI_Indian: ["rgb(254, 164, 127)", "rgb(37, 204, 247)", "rgb(234, 181, 67)", "rgb(85, 230, 193)", "rgb(202, 211, 200)", "rgb(249, 127, 81)", "rgb(27, 156, 252)", "rgb(248, 239, 186)", "rgb(88, 177, 159)", "rgb(44, 58, 71)", "rgb(179, 55, 113)", "rgb(59, 59, 152)", "rgb(253, 114, 114)", "rgb(154, 236, 219)", "rgb(214, 162, 232)", "rgb(109, 33, 79)", "rgb(24, 44, 97)", "rgb(252, 66, 123)", "rgb(189, 197, 129)", "rgb(130, 88, 159)"],
    FlatUI_Russian: ["rgb(243, 166, 131)", "rgb(247, 215, 148)", "rgb(119, 139, 235)", "rgb(231, 127, 103)", "rgb(207, 106, 135)", "rgb(241, 144, 102)", "rgb(245, 205, 121)", "rgb(84, 109, 229)", "rgb(225, 95, 65)", "rgb(196, 69, 105)", "rgb(120, 111, 166)", "rgb(248, 165, 194)", "rgb(99, 205, 218)", "rgb(234, 134, 133)", "rgb(89, 98, 117)", "rgb(87, 75, 144)", "rgb(247, 143, 179)", "rgb(61, 193, 211)", "rgb(230, 103, 103)", "rgb(48, 57, 82)"],
    FlatUI_Spanish: ["rgb(64, 64, 122)", "rgb(112, 111, 211)", "rgb(247, 241, 227)", "rgb(52, 172, 224)", "rgb(51, 217, 178)", "rgb(44, 44, 84)", "rgb(71, 71, 135)", "rgb(170, 166, 157)", "rgb(34, 112, 147)", "rgb(33, 140, 116)", "rgb(255, 82, 82)", "rgb(255, 121, 63)", "rgb(209, 204, 192)", "rgb(255, 177, 66)", "rgb(255, 218, 121)", "rgb(179, 57, 57)", "rgb(205, 97, 51)", "rgb(132, 129, 122)", "rgb(204, 142, 53)", "rgb(204, 174, 98)"],
    FlatUI_Swedish: ["rgb(239, 87, 119)", "rgb(87, 95, 207)", "rgb(75, 207, 250)", "rgb(52, 231, 228)", "rgb(11, 232, 129)", "rgb(245, 59, 87)", "rgb(60, 64, 198)", "rgb(15, 188, 249)", "rgb(0, 216, 214)", "rgb(5, 196, 107)", "rgb(255, 192, 72)", "rgb(255, 221, 89)", "rgb(255, 94, 87)", "rgb(210, 218, 226)", "rgb(72, 84, 96)", "rgb(255, 168, 1)", "rgb(255, 211, 42)", "rgb(255, 63, 52)", "rgb(128, 142, 155)", "rgb(30, 39, 46)"],
    FlatUI_Turkish: ["rgb(205, 132, 241)", "rgb(255, 204, 204)", "rgb(255, 77, 77)", "rgb(255, 175, 64)", "rgb(255, 250, 101)", "rgb(197, 108, 240)", "rgb(255, 184, 184)", "rgb(255, 56, 56)", "rgb(255, 159, 26)", "rgb(255, 242, 0)", "rgb(50, 255, 126)", "rgb(126, 255, 245)", "rgb(24, 220, 255)", "rgb(125, 95, 255)", "rgb(75, 75, 75)", "rgb(58, 227, 116)", "rgb(103, 230, 220)", "rgb(23, 192, 235)", "rgb(113, 88, 226)", "rgb(61, 61, 61)"]
};
const flatuiOrdinal = Object.keys(flatuiSchemes);

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
    if (!id) return ["default"].concat(d3Ordinal.concat(brewerOrdinal).concat(hpccOrdinal).concat(flatuiOrdinal));
    let scale = null;

    if (colors) {
        scale = d3ScaleOrdinal().range(colors);
    } else {
        if (d3Ordinal.indexOf(id) >= 0) {
            scale = d3ScaleOrdinal(d3Schemes[id]);
        } else if (flatuiOrdinal.indexOf(id) >= 0) {
            scale = d3ScaleOrdinal().range(flatuiSchemes[id]);
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
