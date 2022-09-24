// , Shape, Text,
import { React, Text } from "@hpcc-js/react";
import { EdgeProps as EdgeProps } from "./layouts/placeholders";

export type Point = [number, number];

export interface CustomEdgeProps extends EdgeProps {
    label: string;
    labelPos: Point;
    path: string;
}

export const CustomEdge: React.FunctionComponent<CustomEdgeProps> = ({
    label,
    labelPos,
    path,
}) => {
    return <>
        <path stroke="#627ae7" d={path}></path>
        {
            label && labelPos && labelPos.length === 2 ?
                <g transform={`translate(${labelPos[0]} ${labelPos[1]})`}>
                    <Text text={label} />
                </g> : undefined
        }
    </>;
};
