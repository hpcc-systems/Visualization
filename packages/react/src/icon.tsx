import { Palette } from "@hpcc-js/common";
import * as React from "@hpcc-js/preact-shim";
import { ImageChar } from "./ImageChar";
import { Shape } from "./shape";

export interface Icon {
    shape?: "circle" | "square";
    height?: number;
    fill?: string;
    stroke?: string;
    imageFontFamily?: string;
    imageChar?: string;
    imageCharFill?: string;
}

export const Icon: React.FunctionComponent<Icon> = ({
    shape = "circle",
    height = 32,
    fill,
    stroke,
    imageFontFamily = "FontAwesome",
    imageChar = "",
    imageCharFill = Palette.textColor(fill)
}) => {
    const padding = height / 5;
    return <>
        <Shape shape={shape} height={height} fill={fill} stroke={stroke} />
        <ImageChar y={height / 2} height={height - padding} fontFamily={imageFontFamily} char={imageChar} fill={imageCharFill} font-weight={400}></ImageChar>
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
