import * as React from "@hpcc-js/preact-shim";

interface Image {
    href: string;
    x?: number;
    y?: number;
    height?: number;
    yOffset?: number;
}

export const Image: React.FunctionComponent<Image> = ({
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
