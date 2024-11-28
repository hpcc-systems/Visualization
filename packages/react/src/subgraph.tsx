import { FunctionComponent } from "preact";
import { Utility } from "@hpcc-js/common";
import { Rectangle } from "./shape.tsx";
import { Text } from "./text.tsx";

export interface SubgraphProps {
    id: string;
    origData?: any;
    text: string;
    width?: number;
    height?: number;
    fill?: string;
    stroke?: string;
    fontHeight?: number;
    fontFamily?: string;
}

export const Subgraph: FunctionComponent<SubgraphProps> = ({
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
