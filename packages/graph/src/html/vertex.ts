import { svg } from "lit-html";
import type { VertexBaseProps } from "../common/layouts/placeholders.ts";
import { icon as litIcon, IconProps } from "./icon.ts";
import { TextBox, TextBoxProps } from "./textBox.ts";
import { annotations, AnnotationProps } from "./annotation.ts";
import { Component, extend } from "./component.ts";

export interface VertexProps extends VertexBaseProps {
    icon?: IconProps;
    iconOffset?: number;
    iconAnnotations?: AnnotationProps[];
    iconAnnotationsOffset?: number;
    textBox?: TextBoxProps;
    textBoxAnnotationsE?: AnnotationProps[];
    textBoxAnnotationsSE?: AnnotationProps[];
    textBoxAnnotationsS?: AnnotationProps[];
    textBoxAnnotationsOffset?: number
}

export const vertex: Component<VertexProps> = ({
    text,
    textBox,
    textBoxAnnotationsE = [],
    textBoxAnnotationsSE = [],
    textBoxAnnotationsS = [],
    textBoxAnnotationsOffset = 4,
    icon = {},
    iconOffset = 6,
    iconAnnotations = [],
    iconAnnotationsOffset = 0,
}: VertexProps) => {
    const iconTpl = litIcon(icon);
    const iconAnnotationsTpl = annotations({
        annotations: iconAnnotations
    });
    const textBoxTpl = TextBox({ text: { text: text, ...textBox?.text } });
    const textBoxAnnotationsETpl = annotations({ annotations: textBoxAnnotationsE });
    const textBoxAnnotationsSETpl = annotations({ annotations: textBoxAnnotationsSE });
    const textBoxAnnotationsSTpl = annotations({ annotations: textBoxAnnotationsS });

    const yIconOffset = -iconOffset - (textBoxTpl.extent.height + iconTpl.extent.height) / 2;

    const radius = iconAnnotationsOffset + iconTpl.extent.width / 2;
    const xIconAnnotationOffset = radius * Math.cos(45 * (Math.PI / 180));
    const yIconAnnotationOffset = radius * Math.sin(45 * (Math.PI / 180));
    return extend(svg`\
${textBoxTpl}
<g transform="translate(${textBoxTpl.extent.width / 2 + textBoxAnnotationsOffset + textBoxAnnotationsETpl.extent.width / 2})">
    ${textBoxAnnotationsETpl}
</g>
<g transform="translate(${textBoxTpl.extent.width / 2 + textBoxAnnotationsOffset + textBoxAnnotationsETpl.extent.width / 2} ${textBoxTpl.extent.height / 2 + textBoxAnnotationsOffset + textBoxAnnotationsSETpl.extent.height / 2})">
    ${textBoxAnnotationsSETpl}
</g>
<g transform="translate(0 ${textBoxTpl.extent.height / 2 + textBoxAnnotationsOffset + textBoxAnnotationsSTpl.extent.height / 2})">
    ${textBoxAnnotationsSTpl}
</g>
<g data-click="icon" data-click-data=${JSON.stringify(icon)} transform="translate(0 ${yIconOffset})">
    ${iconTpl}
</g>
<g transform="translate(${iconAnnotationsTpl.extent.width / 2 + xIconAnnotationOffset} ${yIconOffset - yIconAnnotationOffset})">
    ${iconAnnotationsTpl}
</g>
`, textBoxTpl.extent.width, textBoxTpl.extent.height, (pos, line) => {
        return iconTpl.intersection({ x: pos.x, y: yIconOffset + pos.y }, line) ??
            textBoxTpl.intersection({ x: pos.x, y: pos.y }, line);
    });
};
