import * as React from "@hpcc-js/preact-shim";

interface Circle {
    radius?: number;
    fill?: string;
    stroke?: string;
}

export const Circle: React.FunctionComponent<Circle> = ({
    radius = 32,
    fill = "navy",
    stroke = fill
}) => <circle r={radius} fill={fill} stroke={stroke} />;

interface Square {
    radius?: number;
    cornerRadius?: number;
    fill?: string;
    stroke?: string;
}

export const Square: React.FunctionComponent<Square> = ({
    radius = 30,
    cornerRadius = 0,
    fill = "white",
    stroke
}) => <rect x={-radius} y={-radius} rx={cornerRadius} ry={cornerRadius} width={radius * 2} height={radius * 2} fill={fill} stroke={stroke || fill} />;

interface Rectangle {
    width?: number;
    height?: number;
    cornerRadius?: number;
    fill?: string;
    stroke?: string;
}

export const Rectangle: React.FunctionComponent<Rectangle> = ({
    width = 30,
    height = 30,
    cornerRadius = 0,
    fill = "white",
    stroke = "black"
}) => <rect x={-width / 2} y={-height / 2} rx={cornerRadius} ry={cornerRadius} width={width} height={height} fill={fill} stroke={stroke || fill} />;

interface Shape {
    shape?: "circle" | "square";
    height?: number;
    fill?: string;
    stroke?: string;
}

export const Shape: React.FunctionComponent<Shape> = ({
    shape = "circle",
    height = 128,
    fill,
    stroke
}) => {
    const Tag = shape === "square" ? Square : Circle;
    return <Tag radius={height / 2} fill={fill} stroke={stroke} />;
};
