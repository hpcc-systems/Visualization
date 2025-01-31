import { Utility } from "@hpcc-js/common";
import { TextLine, TextProps } from "./text.ts";

export const ImageChar = ({
    text = "",
    fill,
    fontFamily = "FontAwesome",
    fontSize = 12
}: TextProps) => {
    const renderChar = fontFamily === "FontAwesome" ? Utility.faChar(text) : text;
    return TextLine({
        text: renderChar,
        fill,
        fontFamily,
        fontSize,
        dominantBaseline: fontFamily === "FontAwesome" ? "ideographic" : undefined
    });
};
