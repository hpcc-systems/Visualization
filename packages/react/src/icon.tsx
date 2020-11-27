import { Palette } from "@hpcc-js/common";
import * as React from "@hpcc-js/preact-shim";
import { ImageChar } from "./ImageChar";
import { Shape } from "./shape";

export interface Icon {
    shape?: "circle" | "square";
    height?: number;
    padding?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    imageFontFamily?: string;
    imageChar?: string;
    imageCharFill?: string;
    yOffset?: number;
    cornerRadius?: number;
    shapeRendering?: "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision";
}

export const Icon: React.FunctionComponent<Icon> = ({
    shape = "circle",
    height = 32,
    fill,
    stroke,
    strokeWidth = 0,
    imageFontFamily = "FontAwesome",
    imageChar = "",
    imageCharFill = Palette.textColor(fill),
    padding = height / 5,
    yOffset = 0,
    cornerRadius,
    shapeRendering
}) => {
    return <>
        <Shape
            shape={shape}
            height={height}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            shapeRendering={shapeRendering}
            cornerRadius={cornerRadius}
        />
        <ImageChar
            y={yOffset}
            height={height - padding}
            fontFamily={imageFontFamily}
            char={imageChar}
            fill={imageCharFill}
            font-weight={400}
        ></ImageChar>
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
    const IconComponents = icons.map(cat => {
        return <g
                key={cat.id}
                id={cat.id}
            >
                <Icon
                    {...cat}
                />
            </g>;
    });
    return <>{IconComponents}</>;
};
