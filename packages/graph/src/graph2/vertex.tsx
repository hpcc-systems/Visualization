// , Shape, Text,
import { React, Text } from "@hpcc-js/react";
import { VertexProps } from "./layouts/placeholders";

export interface CustomVertexProps extends VertexProps {
}

export const CustomVertex: React.FunctionComponent<CustomVertexProps> = ({
    text,
}) => {
    return <g transform={`scale(${0.5 + 2 * Math.random()})`}>
        <circle cx="0" cy="0" r="16" fill="#a2bcf9" stroke="#627ae7" style={{ strokeWidth: 2 }} />
        <g transform={`translate(0 ${16 + 12})`}>
            <Text text={text}></Text>
        </g>
    </g>;
};
