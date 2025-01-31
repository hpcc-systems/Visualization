import { svg } from "lit-html";
import { extend } from "./component.ts";
import { rectangle } from "./shape.ts";
import { Text, TextProps } from "./text.ts";

export interface TextBoxProps {
    text: TextProps;

    padding?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    cornerRadius?: number;
    yOffset?: number;
}

export const TextBox = ({
    text,

    padding = 4,
    fill = "whitesmoke",
    stroke = "lightgray",
    strokeWidth = 1,
    cornerRadius,
}: TextBoxProps) => {
    const textTpl = Text(text);
    const { width, height } = textTpl.extent;
    const rectTpl = rectangle({
        width: width + padding * 2,
        height: height + padding * 2,
        fill,
        stroke,
        strokeWidth,
        cornerRadius
    });

    return extend(svg`\
${rectTpl}
${textTpl}`, rectTpl.extent.width, rectTpl.extent.height);
};

