import { scaleOrdinal as d3ScaleOrdinal } from "d3-scale";

const known_shape_palettes = {};
known_shape_palettes["low_poly"] = ShapePalette("low_poly", [
    "8:2:2:0.3:0.2:0",
    "8:2:2:0.3:0.2:0.5",
    "circle",
    "6:3:2:0.15:0.22:3",
    "square",
    "4:2:2:0.3:0.2:0",
    "4:2:2:0.3:0.2:0.5",
    "5:2:2:0.3:0.2:1.75",
    "5:1:1:0.23:0.38:1.75"
]);
known_shape_palettes["clovers"] = ShapePalette("clovers", [
    "12:3:2:0.16:0.28:3.581",
    "24:3:2:0.16:0.28:3.581",
    "36:3:2:0.16:0.28:3.581",
    "48:3:2:0.16:0.28:3.581",
    "60:3:2:0.16:0.28:3.581",
]);
known_shape_palettes["stars"] = ShapePalette("stars", [
    "10:2:2:0.3:0.2:0.5",
    "12:2:2:0.3:0.2:0",
    "16:2:2:0.3:0.2:0",
    "20:2:2:0.3:0.2:0",
    "40:2:2:0.3:0.26:0",
]);

export function ShapePalette(id?, shapes?, prefill?) {
    if (!id) return Object.keys(known_shape_palettes);
    let retVal = known_shape_palettes[id];
    if (!retVal) {
        retVal = palette_ordinal(id, shapes, prefill);
        known_shape_palettes[id] = retVal;
    }
    return retVal;
}

function palette_ordinal(id?, shape_arr?, prefill_obj?): any {
    if (!id) return Object.keys(known_shape_palettes);
    let scale = null;

    if (shape_arr) {
        const prefill_key_arr = prefill_obj ? Object.keys(prefill_obj) : [];
        if (prefill_key_arr.length > 0) {
            shape_arr = prefill_key_arr.concat(shape_arr.filter(n => prefill_key_arr.indexOf(n) === -1));
        }
        scale = d3ScaleOrdinal().range(shape_arr);
        if (prefill_key_arr.length > 0) {
            prefill_key_arr.forEach(n => scale(n));
        }
    } else {
        scale = d3ScaleOrdinal(known_shape_palettes[id]);
        shape_arr = scale.range();
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
    ordinal.shapes = function (_) {
        if (!arguments.length) return shape_arr;
        shape_arr = _;
        return ordinal;
    };
    ordinal.clone = function (newID) {
        known_shape_palettes[newID] = palette_ordinal(newID, this.shapes());
        return known_shape_palettes[newID];
    };
    ordinal.cloneNotExists = function (newID) {
        if (known_shape_palettes[newID]) {
            return known_shape_palettes[newID];
        }
        return this.clone(newID);
    };
    ordinal.switch = function (_id, _shapes) {
        if (id === _id) {
            return this;
        }
        return arguments.length ? ShapePalette(_id, _shapes) : ShapePalette();
    };

    return ordinal;
}
