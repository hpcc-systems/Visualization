import * as React from "@hpcc-js/preact-shim";

interface Circle {
    domClass?: string;
    radius?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    shapeRendering?: "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision";
}

export const Circle: React.FunctionComponent<Circle> = ({
    domClass,
    radius = 32,
    fill = "navy",
    stroke = fill,
    strokeWidth = 1,
    shapeRendering
}) => <circle
        class={domClass}
        r={radius}
        fill={fill}
        stroke={stroke}
        stroke-width={strokeWidth}
        shape-rendering={shapeRendering}
    />;

interface Square {
    domClass?: string;
    radius?: number;
    cornerRadius?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    shapeRendering?: "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision";
}

export const Square: React.FunctionComponent<Square> = ({
    domClass,
    radius = 30,
    cornerRadius = 0,
    fill = "white",
    stroke,
    strokeWidth = 1,
    shapeRendering
}) => <rect
        class={domClass}
        x={-radius}
        y={-radius}
        rx={cornerRadius}
        ry={cornerRadius}
        width={radius * 2}
        height={radius * 2}
        fill={fill}
        stroke={stroke || fill}
        stroke-width={strokeWidth}
        shape-rendering={shapeRendering}
    />;

interface Rectangle {
    domClass?: string;
    width?: number;
    height?: number;
    cornerRadius?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    shapeRendering?: "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision";
}

export const Rectangle: React.FunctionComponent<Rectangle> = ({
    domClass,
    width = 30,
    height = 30,
    cornerRadius = 0,
    fill = "white",
    stroke = "black",
    strokeWidth = 1,
    shapeRendering
}) => {
    return <rect
        class={domClass}
        x={-width / 2}
        y={-height / 2}
        rx={cornerRadius}
        ry={cornerRadius}
        width={width}
        height={height}
        fill={fill}
        stroke={stroke || fill}
        stroke-width={strokeWidth}
        shape-rendering={shapeRendering}
    />;
};

interface Shape {
    domClass?: string;
    shape?: "circle" | "square";
    height?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    shapeRendering?: "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision";
    cornerRadius?: number;
}

export const Shape: React.FunctionComponent<Shape> = ({
    domClass,
    shape = "circle",
    height = 128,
    fill,
    stroke,
    strokeWidth = 1,
    shapeRendering,
    cornerRadius
}) => {
    switch (shape) {
        case "square":
            return <Square
                domClass={domClass}
                radius={height / 2}
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
                shapeRendering={shapeRendering}
                cornerRadius={cornerRadius}
            />;
        case "circle":
        default:
            return <Circle
                domClass={domClass}
                radius={height / 2}
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
                shapeRendering={shapeRendering}
            />;
    }
};
