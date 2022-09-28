// , Shape, Text,
import { React, Text } from "@hpcc-js/react";
import { SubgraphProps } from "./layouts/placeholders";

export interface BasicSubgraphProps extends SubgraphProps {
    label?: string;
    labelFill?: string;
    labelHeight?: number,
    rectFill?: string;
    rectStroke?: string;
    rectStrokeWidth?: number;
}

export const BasicSubgraph: React.FunctionComponent<BasicSubgraphProps> = ({
    label = "",
    labelFill = "black",
    labelHeight = 12,
    width = 0,
    height = 0,
    rectFill: fill,
    rectStroke: stroke = "#627ae7",
    rectStrokeWidth: strokeWidth = 2
}) => {
    return <g transform={`translate(${-width / 2} ${-height / 2})`}>
        <rect width={width} height={height} fill={fill} stroke={stroke} style={{ strokeWidth }} />
        <g transform={`translate(8 ${8 + labelHeight})`}>
            <Text text={label} fill={labelFill} height={labelHeight} />
        </g>
    </g>;
};
