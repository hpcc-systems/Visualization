import * as PReact from "./preact-shim.ts";

interface CircleProps {
    radius?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    shapeRendering?: "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision";
}

export const Circle: PReact.FunctionComponent<CircleProps> = ({
    radius = 32,
    fill = "navy",
    stroke = fill,
    strokeWidth = 1,
    shapeRendering
}) => <circle
        r={radius}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        shapeRendering={shapeRendering}
    />;

interface SquareProps {
    radius?: number;
    cornerRadius?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    shapeRendering?: "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision";
}

export const Square: PReact.FunctionComponent<SquareProps> = ({
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
        strokeWidth={strokeWidth}
        shapeRendering={shapeRendering}
    />;

interface RectangleProps {
    width?: number;
    height?: number;
    cornerRadius?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    shapeRendering?: "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision";
}

export const Rectangle: PReact.FunctionComponent<RectangleProps> = ({
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
        strokeWidth={strokeWidth}
        shapeRendering={shapeRendering}
    />;
};

interface ShapeProps {
    shape?: "circle" | "square" | "rectangle";
    height?: number;
    width?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    shapeRendering?: "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision";
    cornerRadius?: number;
}

export const Shape: PReact.FunctionComponent<ShapeProps> = ({
    shape = "circle",
    height = 128,
    width,
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
        case "rectangle":
            return <Rectangle
                width={width ?? height}
                height={height}
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
