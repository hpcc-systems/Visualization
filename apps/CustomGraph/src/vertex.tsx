// , Shape, Text,
import { Palette, color as d3Color } from "@hpcc-js/common";
import { React, Text } from "@hpcc-js/react";
import { VertexProps } from "@hpcc-js/graph";

const palette = Palette.ordinal("hpcc10");

export interface CustomVertexProps extends VertexProps {
    scale: number;
    fill?: string;
    stroke?: string;
}

export const CustomVertex: React.FunctionComponent<CustomVertexProps> = ({
    categoryID,
    text,
    scale = 1,
    fill = palette(categoryID),
    stroke = d3Color(fill).darker()
}) => {
    return <g transform={`scale(${scale})`}>
        <circle cx="0" cy="0" r="16" fill={fill} stroke={stroke} style={{ strokeWidth: 2 }} />
        <g transform={`translate(0 ${16 + 12})`}>
            <Text text={text}></Text>
        </g>
    </g>;
};

// d3-interpolate-path