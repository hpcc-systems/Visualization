import * as React from "@hpcc-js/preact-shim";

interface IImage {
    height: number;
    width: number;
    href: string;
    text?: string;
}

export const Image: React.FunctionComponent<IImage> = function ({
    href,
    text,
    width,
    height
}) {
    const title = text !== undefined ? <title>{text}</title> : undefined;
    return <image 
            x={-width/2}
            y={-height/2}
            width={width}
            height={height}
            href={href}
        >
            {title}
        </image>
        ;
};
