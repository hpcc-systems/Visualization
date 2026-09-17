import { ColorCommonInstance, RGBColor, rgb } from "d3-color";

const darker = 0.7;
const brighter = 1 / darker;

export type ColorValue = string | ColorCommonInstance;

export class Hsv implements ColorCommonInstance {
    h: number;
    s: number;
    v: number;
    opacity: number;

    constructor(h: number, s: number, v: number, opacity: number = 1) {
        this.h = +h;
        this.s = +s;
        this.v = +v;
        this.opacity = +opacity;
    }

    brighter(k: number = 1): this {
        return new Hsv(this.h, this.s, this.v * Math.pow(brighter, k), this.opacity) as this;
    }

    darker(k: number = 1): this {
        return new Hsv(this.h, this.s, this.v * Math.pow(darker, k), this.opacity) as this;
    }

    rgb(): RGBColor {
        const hue = Number.isNaN(this.h) ? 0 : this.h % 360 + (this.h < 0 ? 360 : 0);
        const saturation = Number.isNaN(this.h) || Number.isNaN(this.s) ? 0 : this.s;
        const chroma = this.v * saturation;
        const secondary = chroma * (1 - Math.abs((hue / 60) % 2 - 1));
        const minimum = this.v - chroma;

        if (hue < 60) return hsvToRgb(chroma, secondary, 0, minimum, this.opacity);
        if (hue < 120) return hsvToRgb(secondary, chroma, 0, minimum, this.opacity);
        if (hue < 180) return hsvToRgb(0, chroma, secondary, minimum, this.opacity);
        if (hue < 240) return hsvToRgb(0, secondary, chroma, minimum, this.opacity);
        if (hue < 300) return hsvToRgb(secondary, 0, chroma, minimum, this.opacity);
        return hsvToRgb(chroma, 0, secondary, minimum, this.opacity);
    }

    displayable(): boolean {
        return (Number.isNaN(this.s) || 0 <= this.s && this.s <= 1) &&
            0 <= this.v && this.v <= 1 &&
            0 <= this.opacity && this.opacity <= 1;
    }

    formatHex(): string {
        return this.rgb().formatHex();
    }

    formatHex8(): string {
        return this.rgb().formatHex8();
    }

    formatHsl(): string {
        return this.rgb().formatHsl();
    }

    formatRgb(): string {
        return this.rgb().formatRgb();
    }

    hex(): string {
        return this.rgb().formatHex();
    }

    toString(): string {
        return this.rgb().toString();
    }
}

function hsvToRgb(red: number, green: number, blue: number, minimum: number, opacity: number): RGBColor {
    return rgb((red + minimum) * 255, (green + minimum) * 255, (blue + minimum) * 255, opacity);
}

export function hsv(color: ColorValue): Hsv;
export function hsv(h: number, s: number, v: number, opacity?: number): Hsv;
export function hsv(hOrColor: number | ColorValue, s?: number, v?: number, opacity: number = 1): Hsv {
    if (arguments.length > 1) {
        return new Hsv(hOrColor as number, s!, v!, opacity);
    }
    if (hOrColor instanceof Hsv) {
        return new Hsv(hOrColor.h, hOrColor.s, hOrColor.v, hOrColor.opacity);
    }
    const color = typeof hOrColor === "string" ? rgb(hOrColor) : rgb(hOrColor as ColorCommonInstance);
    const red = color.r / 255;
    const green = color.g / 255;
    const blue = color.b / 255;
    const minimum = Math.min(red, green, blue);
    const maximum = Math.max(red, green, blue);
    const difference = maximum - minimum;
    let hue = NaN;
    const saturation = difference / maximum;

    if (difference) {
        if (red === maximum) hue = (green - blue) / difference + (green < blue ? 6 : 0);
        else if (green === maximum) hue = (blue - red) / difference + 2;
        else hue = (red - green) / difference + 4;
        hue *= 60;
    }
    return new Hsv(hue, saturation, maximum, color.opacity);
}

type NumberInterpolator = (t: number) => number;

function constant(value: number): NumberInterpolator {
    return () => value;
}

function interpolateNumber(start: number, end: number): NumberInterpolator {
    const difference = end - start;
    return difference ? t => start + t * difference : constant(Number.isNaN(start) ? end : start);
}

function interpolateHue(start: number, end: number): NumberInterpolator {
    let difference = end - start;
    if (difference > 180 || difference < -180) difference -= 360 * Math.round(difference / 360);
    return difference ? t => start + t * difference : constant(Number.isNaN(start) ? end : start);
}

function hsvInterpolator(hueInterpolator: (start: number, end: number) => NumberInterpolator) {
    return (startColor: ColorValue, endColor: ColorValue) => {
        const start = hsv(startColor);
        const end = hsv(endColor);
        const hue = hueInterpolator(start.h, end.h);
        const saturation = interpolateNumber(start.s, end.s);
        const value = interpolateNumber(start.v, end.v);
        const opacity = interpolateNumber(start.opacity, end.opacity);
        return (t: number) => {
            start.h = hue(t);
            start.s = saturation(t);
            start.v = value(t);
            start.opacity = opacity(t);
            return start.toString();
        };
    };
}

export const interpolateHsv = hsvInterpolator(interpolateHue);
export const interpolateHsvLong = hsvInterpolator(interpolateNumber);