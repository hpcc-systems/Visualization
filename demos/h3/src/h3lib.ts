import { scaleLinear } from "d3-scale";
import { polyfill as h3Polyfill } from "h3-js";

export const zoomResScale = scaleLinear()
    .domain([0, 23])
    .range([0, 15])
    ;

export const zoomResScale2 = scaleLinear()
    .domain([0, 21])
    .range([0, 15])
    ;

export function tidyRes(res: number) {
    res = Math.floor(res);
    if (res > 15) return 15;
    if (res < 0) return 0;
    return res;
}

export function zoomToResolution(zoom: number, delta = 0): number {
    return tidyRes(zoomResScale(zoom) + delta);
}

export function zoomToResolution2(zoom: number, delta = 0): number {
    return tidyRes(zoomResScale2(zoom) + delta);
}

type Point = [number, number];
type Poly = Point[];
export function polyfill(poly: Poly, res: number): string[] {
    const westPoly: Poly = [];
    const eastPoly: Poly = [];
    let west;
    let east;
    poly.forEach(p => {
        if (!west || west > p[1]) west = p[1];
        if (!east || east < p[1]) east = p[1];
        westPoly.push([p[0], p[1] > 0 ? 0 : p[1]]);
        eastPoly.push([p[0], p[1] < 0 ? 0 : p[1]]);
    });
    if (east - west > 180) {
        return h3Polyfill(westPoly, res, false).concat(h3Polyfill(eastPoly, res, false));
    }
    return h3Polyfill(poly, res, false);
}

export function tidyLat(lat: number) {
    if (lat < -90) return -90;
    if (lat > 90) return 90;
    return lat;
}

export function tidyLon(lon: number) {
    if (lon <= -180) return -179;
    if (lon >= 180) return 179;
    return lon;
}
