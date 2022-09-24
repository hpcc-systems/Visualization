// , Shape, Text,
import { React } from "@hpcc-js/react";
import { SubgraphProps } from "./layouts/placeholders";

export interface CustomSubgraphProps extends SubgraphProps {
}

export const CustomSubgraph: React.FunctionComponent<CustomSubgraphProps> = ({
    width,
    height
}) => {
    return <g transform={`scale(${0.5 + 2 * Math.random()})`}>
        <rect width={width} height={height} fill="#a2bcf9" stroke="#627ae7" style={{ strokeWidth: 2 }} />
        <g transform={`translate(0 ${16 + 12})`}>
        </g>
    </g>;
};
