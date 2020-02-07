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
}

export const Subgraph: React.FunctionComponent<Subgraph> = ({
    text,
    width = 100,
    height = 100,
    fill = "transparent",
    stroke = "black"
}) => {
    const tSize = Utility.textSize(text, "Verdana", 12, false);
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
                height={12}
                text={text}
            />
        </g>
    </>;
};
