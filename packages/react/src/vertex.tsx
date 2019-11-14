import { Utility } from "@hpcc-js/common";
import * as React from "@hpcc-js/preact-shim";
import { Icon } from "./icon";
import { TextBox } from "./text";

export interface Annotations {
    x: number;
    y: number;
    annotations: string[];
}

export const Annotations: React.FunctionComponent<Annotations> = ({
    x,
    y,
    annotations = []
}) => {
    const IconComponents = annotations.map((id, i) => <g key={id} transform={`translate(${x - i * 16} ${y})`}><use href={"#" + id} /></g>);
    return <>{IconComponents}</>;
};

export interface Vertex {
    catID?: string;
    text: string;
    textHeight?: number;
    textPadding?: number;
    icon?: Icon;
    annotationsHeight?: number;
    annotations?: string[];
}

export const Vertex: React.FunctionComponent<Vertex> = ({
    catID = "",
    text = "",
    textHeight = 12,
    textPadding = 4,
    icon = {},
    annotationsHeight = 12,
    annotations = []
}) => {
    icon = {
        faChar: "fa-question",
        height: 32,
        fill: "transparent",
        ...icon
    };
    const textBoxHeight = textHeight + textPadding * 2;
    let { width } = Utility.textSize(text, "Verdana", 12, false);
    width += 4;
    return catID ?
        <g transform={`translate(0 ${-(icon.height * 2 / 6 + textHeight + 8) / 2})`}>
            <use href={"#" + catID} />
            <g transform={`translate(0 ${icon.height / 3 + textBoxHeight / 2 + textPadding})`}>
                <TextBox text={text} height={textHeight} padding={textPadding} />
            </g>
            <Annotations x={width / 2} y={icon.height / 3 + textBoxHeight + textPadding + annotationsHeight / 3} annotations={annotations} />
        </g > :
        <>
            <Icon {...icon} />
            <g transform={`translate(0 ${icon.height / 3 + textBoxHeight / 2 + textPadding})`}>
                <TextBox text={text} height={textHeight} padding={textPadding} />
            </g>
        </>;
};
