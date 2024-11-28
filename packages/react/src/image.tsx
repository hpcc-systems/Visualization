import { FunctionComponent } from "preact";

interface ImageProps {
    href: string;
    x?: number;
    y?: number;
    height?: number;
    yOffset?: number;
}

export const Image: FunctionComponent<ImageProps> = ({
    href,
    x,
    y = 0,
    height = 12
}) => {

    return <image
        xlinkHref={href}
        x={x - height / 2}
        y={y - height / 2}
        width={height}
        height={height}
    ></image>;
};
