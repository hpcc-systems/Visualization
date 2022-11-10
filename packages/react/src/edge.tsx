import * as React from "@hpcc-js/preact-shim";
import { VertexProps } from "./vertex";
import { Text } from "./text";

type Point = [number, number];

export interface EdgeProps<V extends VertexProps = VertexProps> {
    id: string | number;
    origData?: any;
    source: V;
    target: V;
    label?: string;
    labelPos?: Point;
    weight?: number;
    strokeDasharray?: string;
    strokeWidth?: number;
    stroke?: string;
    fontFamily?: string;
    labelFill?: string;
    labelHeight?: number,
    path?: string;
    points?: Array<[number, number]>;
    curveDepth?: number;
}

export const Edge: React.FunctionComponent<EdgeProps> = ({
    label,
    labelPos,
    labelFill = "black",
    labelHeight = 12,
    path,
    stroke,
    strokeWidth,
    strokeDasharray
}) => {
    return <>
        <path d={path} stroke={stroke} style={{ strokeWidth, strokeDasharray }}></path>
        {
            label && labelPos && labelPos.length === 2 ?
                <g transform={`translate(${labelPos[0]} ${labelPos[1]})`}>
                    <Text text={label} fill={labelFill} height={labelHeight} />
                </g> : undefined
        }
    </>;
};
