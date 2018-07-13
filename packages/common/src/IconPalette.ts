import { scaleOrdinal as d3ScaleOrdinal } from "d3-scale";

const known_icon_palettes = {};
known_icon_palettes["alphabet"] = IconPalette("alphabet", "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));
known_icon_palettes["symbols"] = IconPalette("symbols", "!@#$%^&*()?+=-".split(""));
known_icon_palettes["ascii_120_to_430"] = IconPalette("ascii_120_to_430", Array(310)["fill"](0).map((n, i) => String.fromCharCode(i + 120)));

export function IconPalette(id?, icons?, prefill?) {
    if (!id) return Object.keys(known_icon_palettes);
    let retVal = known_icon_palettes[id];
    if (!retVal) {
        retVal = palette_ordinal(id, icons, prefill);
        known_icon_palettes[id] = retVal;
    }
    return retVal;
}

function palette_ordinal(id?, faChar_arr?, prefill_obj?): any {
    if (!id) return Object.keys(known_icon_palettes);
    let scale = null;

    if (faChar_arr) {
        const prefill_key_arr = prefill_obj ? Object.keys(prefill_obj) : [];
        if (prefill_key_arr.length > 0) {
            faChar_arr = prefill_key_arr.concat(faChar_arr.filter(n => prefill_key_arr.indexOf(n) === -1));
        }
        scale = d3ScaleOrdinal().range(faChar_arr);
        if (prefill_key_arr.length > 0) {
            prefill_key_arr.forEach(n => scale(n));
        }
    } else {
        scale = d3ScaleOrdinal(known_icon_palettes[id]);
        faChar_arr = scale.range();
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
    ordinal.icons = function (_) {
        if (!arguments.length) return faChar_arr;
        faChar_arr = _;
        return ordinal;
    };
    ordinal.clone = function (newID) {
        known_icon_palettes[newID] = palette_ordinal(newID, this.icons());
        return known_icon_palettes[newID];
    };
    ordinal.cloneNotExists = function (newID) {
        if (known_icon_palettes[newID]) {
            return known_icon_palettes[newID];
        }
        return this.clone(newID);
    };
    ordinal.switch = function (_id, _icons) {
        if (id === _id) {
            return this;
        }
        return arguments.length ? IconPalette(_id, _icons) : IconPalette();
    };

    return ordinal;
}
