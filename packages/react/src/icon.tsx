import { Palette } from "@hpcc-js/common";
import * as React from "@hpcc-js/preact-shim";
import { FAChar } from "./faChar";
import { Shape } from "./shape";

export interface Icon {
    shape?: "circle" | "square";
    height?: number;
    fill?: string;
    stroke?: string;
    faChar?: string;
    faCharFill?: string;
}

export const Icon: React.FunctionComponent<Icon> = ({
    shape = "circle",
    height = 32,
    fill,
    stroke,
    faChar = "",
    faCharFill = Palette.textColor(fill)
}) => {
    const padding = height / 5;
    return <>
        <Shape shape={shape} height={height} fill={fill} stroke={stroke} />
        <FAChar y={height / 2} height={height - padding} faChar={faChar} fill={faCharFill}></FAChar>
    </>;
};

export interface IconEx extends Icon {
    id: string;
}

export interface Icons {
    icons: IconEx[];
}

export const Icons: React.FunctionComponent<Icons> = ({
    icons = []
}) => {
    const IconComponents = icons.map(cat => <g key={cat.id} id={cat.id}><Icon {...cat} /></g>);
    return <>{IconComponents}</>;
};
