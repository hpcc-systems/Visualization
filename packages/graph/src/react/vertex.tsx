import { React, Text } from "@hpcc-js/react";
import { VertexBaseProps } from "../common/layouts/placeholders.ts";

export interface BasicVertexProps extends VertexBaseProps {
    textFill?: string;
    textHeight?: number,
    scale?: number,
    circleRadius?: number,
    circleFill?: string,
    circleStroke?: string,
    circleStrokeWidth?: number
}

export const BasicVertex: React.FunctionComponent<BasicVertexProps> = ({
    text,
    textFill = "black",
    textHeight = 12,
    scale = 1,
    circleRadius = 16,
    circleFill = "#a2bcf9",
    circleStroke = "#627ae7",
    circleStrokeWidth = 2
}) => {
    return <g transform={`scale(${scale})`}>
        <circle cx="0" cy="0" r={circleRadius} fill={circleFill} stroke={circleStroke} style={{ strokeWidth: circleStrokeWidth }} />
        <g transform={`translate(0 ${circleRadius + textHeight})`}>
            <Text text={text} fill={textFill} height={textHeight} />
        </g>
    </g>;
};
