import * as React from "@hpcc-js/preact-shim";

interface Circle {
    radius?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    shapeRendering?: "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision";
}

export const Circle: React.FunctionComponent<Circle> = ({
    radius = 32,
    fill = "navy",
    stroke = fill,
    strokeWidth = 1,
    shapeRendering
}) => <circle
        r={radius}
        fill={fill}
        stroke={stroke}
        stroke-width={strokeWidth}
        shape-rendering={shapeRendering}
    />;

interface Square {
    radius?: number;
    cornerRadius?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    shapeRendering?: "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision";
}

export const Square: React.FunctionComponent<Square> = ({
    radius = 30,
    cornerRadius = 0,
    fill = "white",
    stroke,
    strokeWidth = 1,
    shapeRendering
}) => <rect
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
    width?: number;
    height?: number;
    cornerRadius?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    shapeRendering?: "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision";
}

export const Rectangle: React.FunctionComponent<Rectangle> = ({
    width = 30,
    height = 30,
    cornerRadius = 0,
    fill = "white",
    stroke = "black",
    strokeWidth = 1,
    shapeRendering
}) => {
    return <rect
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
    shape?: "circle" | "square";
    height?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    shapeRendering?: "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision";
    cornerRadius?: number;
}

export const Shape: React.FunctionComponent<Shape> = ({
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
                radius={height / 2}
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
                shapeRendering={shapeRendering}
            />;
    }
};
