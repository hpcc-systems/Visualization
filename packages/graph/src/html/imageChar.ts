import { Utility } from "@hpcc-js/common";
import { TextLine, TextLineProps } from "./text.ts";

export const ImageChar = ({
    text = "",
    fill,
    fontFamily = "FontAwesome",
    fontSize = 12
}: TextLineProps) => {
    const renderChar = fontFamily === "FontAwesome" ? Utility.faChar(text) : text;
    return TextLine({
        text: renderChar,
        fill,
        fontFamily,
        fontSize,
        dominantBaseline: fontFamily === "FontAwesome" ? "ideographic" : undefined
    });
};
