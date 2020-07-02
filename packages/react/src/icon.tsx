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
    domClass?: string;
}

export const Icon: React.FunctionComponent<Icon> = ({
    shape = "circle",
    height = 32,
    fill,
    stroke,
    strokeWidth,
    imageFontFamily = "FontAwesome",
    imageChar = "",
    imageCharFill = Palette.textColor(fill),
    padding = height / 5,
    yOffset = 0,
    cornerRadius,
    shapeRendering,
    domClass
}) => {
    return <>
        <Shape
            domClass={domClass}
            shape={shape}
            height={height}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            shapeRendering={shapeRendering}
            cornerRadius={cornerRadius}
        />
        <ImageChar
            domClass={domClass}
            y={height / 2}
            height={height - padding}
            fontFamily={imageFontFamily}
            char={imageChar}
            fill={imageCharFill}
            font-weight={400}
            yOffset={yOffset}
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
