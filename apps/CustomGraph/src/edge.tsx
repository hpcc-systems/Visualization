// , Shape, Text,
import { React, Text } from "@hpcc-js/react";
import { EdgeProps } from "@hpcc-js/graph";

export type Point = [number, number];

export interface CustomEdgeProps extends EdgeProps {
    label: string;
    labelPos?: Point;
    path?: string;
    width: number;
}

export const CustomEdge: React.FunctionComponent<CustomEdgeProps> = ({
    label,
    labelPos = [0, 0],
    path = "",
    width = 2,
    ...props
}) => {
    return <>
        <path d={path} stroke="#627ae7" fill="transparent" style={{ strokeWidth: width }}></path>
        {
            label && labelPos && labelPos.length === 2 ?
                <g transform={`translate(${labelPos[0]} ${labelPos[1]})`}>
                    <Text text={label} />
                </g> : undefined
        }
    </>;
};
