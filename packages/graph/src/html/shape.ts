import { svg } from "lit-html";
import { extend } from "./component.ts";

export const DEFAULT_SHAPE_SIZE = 32;

interface BaseProps {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    shapeRendering?: "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision";
}

export interface CircleProps extends BaseProps {
    diameter?: number;
}
export const circle = ({
    diameter = DEFAULT_SHAPE_SIZE,
    fill = "whiteSmoke",
    stroke = fill,
    strokeWidth = 1,
    shapeRendering = "auto"
}: CircleProps) => {
    return extend(svg`\
<circle
    r=${diameter / 2}
    fill=${fill}
    stroke=${stroke}
    stroke-width=${strokeWidth}
    shape-rendering=${shapeRendering}
/>`, diameter, diameter);
};

export interface RectangleProps extends BaseProps {
    width: number;
    height: number;
    cornerRadius?: number;
}

export const rectangle = ({
    width = DEFAULT_SHAPE_SIZE,
    height = DEFAULT_SHAPE_SIZE,
    cornerRadius = 4,
    fill = "whiteSmoke",
    stroke = fill,
    strokeWidth = 1,
    shapeRendering = "crispEdges"
}: RectangleProps) => {
    return extend(svg`\
<rect
    x=${-width / 2}
    y=${-height / 2}
    rx=${cornerRadius}
    ry=${cornerRadius}
    width=${width}
    height=${height}
    fill=${fill}
    stroke=${stroke}
    stroke-width=${strokeWidth}
    shape-rendering=${shapeRendering}
/>`, width, height);
};

export interface SquareProps extends BaseProps {
    width?: number;
    cornerRadius?: number;
}

export const square = ({
    width = DEFAULT_SHAPE_SIZE,
    cornerRadius,
    fill,
    stroke,
    strokeWidth,
    shapeRendering
}: SquareProps) => {
    return rectangle({
        width,
        height: width,
        cornerRadius,
        fill,
        stroke,
        strokeWidth,
        shapeRendering
    });
};

export interface ShapeProps extends BaseProps {
    shape?: "circle" | "square" | "rectangle";
    diameter?: number;
    width?: number;
    height?: number;
    cornerRadius?: number;
}

export const shape = ({
    shape = "circle",
    diameter,
    width,
    height,
    fill,
    stroke,
    strokeWidth = 1,
    shapeRendering = "auto",
    cornerRadius
}: ShapeProps) => {
    switch (shape) {
        case "square":
            return square({
                width: width ?? height ?? diameter ?? DEFAULT_SHAPE_SIZE,
                fill,
                stroke,
                strokeWidth,
                shapeRendering,
                cornerRadius
            });
        case "rectangle":
            return rectangle({
                width: width ?? height ?? diameter ?? DEFAULT_SHAPE_SIZE,
                height: height ?? width ?? diameter ?? DEFAULT_SHAPE_SIZE,
                fill,
                stroke,
                strokeWidth,
                shapeRendering,
                cornerRadius
            });
        case "circle":
        default:
            return circle({
                diameter: diameter ?? width ?? height ?? DEFAULT_SHAPE_SIZE,
                fill,
                stroke,
                strokeWidth,
                shapeRendering
            });
    }
};
