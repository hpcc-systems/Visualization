// , Shape, Text,
import { React, Text } from "@hpcc-js/react";
import { EdgeProps as EdgeProps } from "./layouts/placeholders";

export interface CustomEdgeProps extends EdgeProps {
    path?: string;
}

export const CustomEdge: React.FunctionComponent<CustomEdgeProps> = ({
    label,
    labelPos,
    path,
    color,
    strokeWidth,
    strokeDasharray
}) => {
    return <>
        <path d={path} stroke={color} style={{ strokeWidth, strokeDasharray }}></path>
        {
            label && labelPos && labelPos.length === 2 ?
                <g transform={`translate(${labelPos[0]} ${labelPos[1]})`}>
                    <Text text={label} />
                </g> : undefined
        }
    </>;
};
