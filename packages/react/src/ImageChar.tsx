import { Utility } from "@hpcc-js/common";
import * as React from "@hpcc-js/preact-shim";

interface ImageChar {
    x?: number;
    y?: number;
    height?: number;
    fill?: string;
    stroke?: string;
    fontFamily?: string;
    char?: string;
    yOffset?: number;
    domClass?: string;
}

export const ImageChar: React.FunctionComponent<ImageChar> = ({
    x,
    y = 0,
    height = 12,
    fill,
    stroke,
    fontFamily = "FontAwesome",
    char = "",
    yOffset = 0,
    domClass
}) => <text
        class={domClass}
        x={x}
        y={yOffset + y - height * 3.5 / 12}
        fill={fill}
        stroke={stroke}
        font-family={fontFamily}
        font-size={`${height}px`}
        style="text-anchor: middle;"
    >{fontFamily === "FontAwesome" ? Utility.faChar(char) : char}</text>;
