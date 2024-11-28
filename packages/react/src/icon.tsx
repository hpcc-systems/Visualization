import { FunctionComponent } from "preact";
import { Palette } from "@hpcc-js/common";
import { Image } from "./image.tsx";
import { ImageChar } from "./ImageChar.tsx";
import { Shape } from "./shape.tsx";

export interface IconProps {
    shape?: "circle" | "square" | "rectangle";
    width?: number;
    height?: number;
    padding?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    imageUrl?: string;
    imageFontFamily?: string;
    imageChar?: string;
    imageCharFill?: string;
    xOffset?: number;
    yOffset?: number;
    cornerRadius?: number;
    shapeRendering?: "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision";
}

export const Icon: FunctionComponent<IconProps> = ({
    shape = "circle",
    width,
    height = 32,
    fill,
    stroke,
    strokeWidth = 0,
    imageUrl = "",
    imageFontFamily = "FontAwesome",
    imageChar = "",
    imageCharFill = Palette.textColor(fill),
    padding = height / 5,
    xOffset = 0,
    yOffset = 0,
    cornerRadius,
    shapeRendering
}) => {
    return <>
        <Shape
            shape={shape}
            width={width}
            height={height}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            shapeRendering={shapeRendering}
            cornerRadius={cornerRadius}
        />
        {imageUrl ?
            <Image
                href={imageUrl}
                x={xOffset}
                y={yOffset}
                height={height - padding}
            ></Image> :
            <ImageChar
                x={xOffset}
                y={yOffset}
                height={height - padding}
                fontFamily={imageFontFamily}
                char={imageChar}
                fill={imageCharFill}
                fontWeight={400}
            ></ImageChar>
        }
    </>;
};

export interface IconEx extends IconProps {
    id: string;
}

export interface IconsProps {
    icons: IconEx[];
}

export const Icons: FunctionComponent<IconsProps> = ({
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
