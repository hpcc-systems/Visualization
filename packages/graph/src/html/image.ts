import { svg } from "lit-html";
import { extend } from "./component.ts";

export interface ImageProps {
    href: string;
    x?: number;
    y?: number;
    height?: number;
    yOffset?: number;
}

export const Image = ({
    href,
    x = 0,
    y = 0,
    height = 12
}: ImageProps) => {
    return extend(svg`\
<image
    xlink:href=${href}
    x=${x - height / 2}
    y=${y - height / 2}
    width=${height}
    height=${height}
></image>`, height, height);
};
