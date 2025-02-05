import { svg } from "lit-html";
import { Palette } from "@hpcc-js/common";
import { Image } from "./image.ts";
import { ImageChar } from "./imageChar.ts";
import { shape as litShape } from "./shape.ts";
import { extend } from "./component.ts";

export interface IconProps {
    shape?: "circle" | "square" | "rectangle";
    width?: number;
    height?: number;
    padding?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    imageUrl?: string;
    imageFontFamily?: string;
    imageChar?: string;
    imageCharFill?: string;
    cornerRadius?: number;
}

export function icon({
    shape = "circle",
    width,
    height = 32,
    fill = "transparent",
    stroke = fill !== "transparent" ? "black" : undefined,
    strokeWidth = stroke === undefined ? 0 : 1,
    imageUrl = "",
    imageFontFamily = "FontAwesome",
    imageChar = "",
    imageCharFill = Palette.textColor(fill),
    padding = height / 5,
    cornerRadius,
}: IconProps) {
    const shapeTpl = litShape({
        shape,
        width,
        height,
        fill,
        stroke,
        strokeWidth,
        cornerRadius
    });
    const imageTpl = imageUrl ?
        Image({
            href: imageUrl,
            height: height - padding * 2
        }) :
        ImageChar({
            text: imageChar,
            fill: imageCharFill,
            fontFamily: imageFontFamily,
            fontSize: height - padding * 2,
        });

    return extend(svg`\
<g>
${shapeTpl}
${imageTpl}
</g>`, shapeTpl.extent.width, shapeTpl.extent.height, shapeTpl.intersection);
};

