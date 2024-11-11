import React from "react";

interface ImageProps {
    href: string;
    x?: number;
    y?: number;
    height?: number;
    yOffset?: number;
}

export const Image: React.FunctionComponent<ImageProps> = ({
    href,
    x,
    y = 0,
    height = 12
}) => {

    return <image
        href={href}
        x={x - height / 2}
        y={y - height / 2}
        width={height}
        height={height}
    ></image>;
};
