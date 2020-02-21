import { Utility } from "@hpcc-js/common";
import * as React from "@hpcc-js/preact-shim";
import { Icon } from "./icon";
import { TextBox } from "./text";

export interface Annotations {
    x: number;
    y: number;
    annotations: string[];
    stepSize?: number;
}

export const Annotations: React.FunctionComponent<Annotations> = ({
    x,
    y,
    annotations = [],
    stepSize = -16
}) => {
    const IconComponents = annotations.map((id, i) => <g
            key={id}
            transform={`translate(${x + i * stepSize} ${y})`}
        >
            <use
                href={"#" + id}
            />
        </g>
    );
    return <>{IconComponents}</>;
};

export interface Vertex {
    categoryID?: string;
    text: string;
    textHeight?: number;
    textPadding?: number;
    icon?: Icon;
    annotationsHeight?: number;
    annotations?: string[];
    textFill?: string;
    textboxFill?: string;
    textboxStroke?: string;
}

export const CategoryVertex: React.FunctionComponent<Vertex> = ({
    categoryID = "",
    text = "",
    textHeight = 12,
    textPadding = 4,
    icon = {},
    annotationsHeight = 12,
    annotations = []
}) => {
    icon = {
        imageChar: "fa-question",
        height: 32,
        fill: "transparent",
        ...icon
    };
    const textBoxHeight = textHeight + textPadding * 2;
    let { width } = Utility.textSize(text, "Verdana", 12, false);
    width += 4;
    return <g transform={`translate(0 ${-(icon.height * 2 / 6 + textHeight + 8) / 2})`}>
            <use href={"#" + categoryID} />
            <g transform={`translate(0 ${icon.height / 3 + textBoxHeight / 2 + textPadding})`}>
                <TextBox text={text} height={textHeight} padding={textPadding} />
            </g>
            <Annotations x={width / 2} y={icon.height / 3 + textBoxHeight + textPadding + annotationsHeight / 3} annotations={annotations} />
        </g >
        ;
};

export const Vertex: React.FunctionComponent<Vertex> = ({
    categoryID = "",
    text = "",
    textHeight = 12,
    textPadding = 4,
    icon = {},
    annotationsHeight = 12,
    annotations = []
}) => {
    icon = {
        imageChar: "fa-question",
        height: 32,
        fill: "transparent",
        ...icon
    };
    const textBoxHeight = textHeight + textPadding * 2;
    return <>
            <Icon {...icon} />
            <g transform={`translate(0 ${icon.height / 3 + textBoxHeight / 2 + textPadding})`}>
                <TextBox text={text} height={textHeight} padding={textPadding} />
            </g>
        </>;
};
