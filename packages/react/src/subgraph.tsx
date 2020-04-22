import { Utility } from "@hpcc-js/common";
import * as React from "@hpcc-js/preact-shim";
import { Rectangle } from "./shape";
import { Text } from "./text";

export interface Subgraph {
    text: string;
    width?: number;
    height?: number;
    fill?: string;
    stroke?: string;
    fontHeight?: number;
    fontFamily?: string;
}

export const Subgraph: React.FunctionComponent<Subgraph> = ({
    text,
    width = 100,
    height = 100,
    fill = "transparent",
    stroke = "black",
    fontHeight = 12,
    fontFamily
}) => {
    const tSize = Utility.textSize(text, fontFamily, fontHeight, false);
    return <>
        <Rectangle
            width={width}
            height={height}
            fill={fill}
            stroke={stroke}
        />
        <g
            transform={`translate(${(-width + tSize.width) / 2 + 4} ${(-height + tSize.height) / 2 + 4})`}
        >
            <Text
                height={fontHeight}
                text={text}
                fontFamily={fontFamily}
            />
        </g>
    </>;
};
