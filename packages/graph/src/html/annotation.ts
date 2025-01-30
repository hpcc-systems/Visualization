import { svg } from "lit-html";
import { Palette, Utility } from "@hpcc-js/common";
import { extend } from "./component.ts";
import { TextBox } from "./textBox.ts";

export interface AnnotationProps {
    text: string;
    fontFamily?: string;
    fontSize?: number;
    fill?: string;
    stroke?: string;
}

export const annotation = ({
    text,
    fontFamily = "FontAwesome",
    fontSize = 8,
    fill = "gray",
    stroke = "darkgray"
}: AnnotationProps) => {
    const renderChar = fontFamily === "FontAwesome" ? Utility.faChar(text) : text;
    const textBoxTpl = TextBox({
        text: {
            text: renderChar,
            fill: Palette.textColor(fill),
            fontFamily,
            fontSize,
            dominantBaseline: fontFamily === "FontAwesome" ? "ideographic" : undefined
        },
        padding: 3,
        fill,
        stroke,
        cornerRadius: 0
    });
    return extend(svg`\
 <g data-click="annotation" data-click-data=${JSON.stringify({ text, fill, fontFamily, fontSize, stroke })}>
    ${textBoxTpl}
</g>`, textBoxTpl.extent.width, textBoxTpl.extent.height);
};

export interface AnnotationsProps {
    annotations: AnnotationProps[];
    padding?: number;
}

export const annotations = ({
    annotations,
    padding = 3,
}: AnnotationsProps) => {
    let xOffset = 0;
    const items = annotations.map(annotationProp => {
        const ann = annotation(annotationProp);
        const itemSvg = extend(svg`\
<g transform="translate(${xOffset + ann.extent.width / 2} 0)">
    ${ann}
</g>`, ann.extent.width, ann.extent.height);
        xOffset += ann.extent.width + padding;
        return itemSvg;
    });
    const { width, height } = items.reduce((acc, item) => {
        return {
            width: acc.width + item.extent.width,
            height: Math.max(acc.height, item.extent.height)
        };
    }, { width: (items.length - 1) * padding, height: 0 });
    return extend(svg`\
<g transform="translate(${-width / 2} 0)">
    ${items}
</g>`, width, height);
};

