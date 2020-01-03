import { Utility } from "@hpcc-js/common";
import * as React from "@hpcc-js/preact-shim";

interface FAChar {
    x?: number;
    y?: number;
    height?: number;
    fill?: string;
    stroke?: string;
    faChar?: string;
}

export const FAChar: React.FunctionComponent<FAChar> = ({
    x,
    y = 0,
    height = 12,
    fill,
    stroke,
    faChar = ""
}) => <text x={x} y={y - height * 3.5 / 12} fill={fill} stroke={stroke} font-family="FontAwesome" font-size={`${height}px`} style="text-anchor: middle;" >{Utility.faChar(faChar)}</text>;
