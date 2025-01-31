import { svg } from "lit-html";
import { Utility } from "@hpcc-js/common";
import { extend } from "./component.ts";

export interface TextProps {
    text: string;
    anchor?: "left" | "middle" | "end";
    fill?: string;
    fontFamily?: string;
    fontSize?: number;
    dominantBaseline?: string;
}

export const TextLine = ({
    text,
    anchor = "middle",
    fill = "black",
    fontFamily = "Verdana",
    fontSize = 12,
    dominantBaseline = "middle",
}: TextProps) => {
    const { width, height } = Utility.textSize(text, fontFamily, fontSize);
    return extend(svg`\
<text y=${height / 2} font-family=${fontFamily} font-size=${`${fontSize}px`} text-anchor=${anchor} fill=${fill} dominant-baseline=${dominantBaseline}>
    ${text}
</text>`, width, height);
};

export const Text = ({
    text,
    anchor = "middle",
    fill = "black",
    fontFamily = "Verdana",
    fontSize = 12,
}: TextProps) => {
    const parts = text.split("\n").map(line => TextLine({ text: line, anchor, fill, fontFamily, fontSize }));
    const { width, height } = parts.reduce((acc, part) => {
        return {
            width: Math.max(acc.width, part.extent.width),
            height: acc.height + part.extent.height
        };
    }, { width: 0, height: 0 });

    let xOffset = 0;
    if (anchor === "left") {
        xOffset = -width / 2;
    } else if (anchor === "end") {
        xOffset = width / 2;
    }
    const lineHeight = height / parts.length;
    const TextLines = parts.map((p, i) => {
        return svg`\
<g key=${`key-${i}`} transform="translate(${xOffset} ${-height / 2 + i * lineHeight})">
    ${p}
</g>`;
    });

    return extend(svg`${TextLines}`, width, height);
};
