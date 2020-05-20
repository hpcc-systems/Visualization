import { Utility } from "@hpcc-js/common";
import * as React from "@hpcc-js/preact-shim";
import { Icon } from "./icon";
import { TextBox } from "./text";
import { Annotations, Vertex } from "./vertex";

export const Vertex2: React.FunctionComponent<Vertex> = ({
    categoryID = "",
    text = "",
    textHeight = 12,
    textPadding = 4,
    icon = {},
    textFill = "black",
    textboxFill = "white",
    textboxStroke = "black",
    textFontFamily,
    annotationsHeight = 12,
    annotationIDs = []
}) => {
    icon = {
        imageChar: "fa-question",
        imageCharFill: "white",
        height: 32,
        fill: "black",
        shape: "square",
        ...icon
    };
    const textBoxHeight = textHeight + textPadding * 2;
    const { width } = Utility.textSize(text, textFontFamily, textHeight, false);

    const stepSize = annotationsHeight;
    const textboxStrokeWidth = 1;

    const halfTextboxHeight = textBoxHeight / 2;

    const offsetX = 0;
    const offsetY = -(icon.height * 2 / 6 + textHeight + 8) / 2;
    const iconOffsetX = - icon.height / 2;
    const iconOffsetY = 0;
    const textboxOffsetX = Math.ceil((width / 2) + textPadding);
    const textboxOffsetY = halfTextboxHeight - (icon.height / 2);
    const annotationOffsetX = stepSize / 2;
    const annotationOffsetY = halfTextboxHeight;
    return categoryID ?
        <g
            transform={`translate(${offsetX} ${offsetY})`}
        >
            <g
                transform={`translate(${iconOffsetX} ${iconOffsetY})`}
            >
                <use
                    href={"#" + categoryID}
                />
            </g>
            <g
                transform={`translate(${textboxOffsetX} ${textboxOffsetY})`}
            >
                <TextBox
                    text={text}
                    height={textHeight}
                    padding={textPadding}
                    strokeWidth={textboxStrokeWidth}
                    stroke={textboxStroke}
                    fill={textboxFill}
                    textFill={textFill}
                    fontFamily={textFontFamily}
                />
            </g>
            <Annotations
                x={annotationOffsetX}
                y={annotationOffsetY}
                annotationIDs={annotationIDs}
                stepSize={stepSize}
            />
        </g>
        :
        <>
            <g
                transform={`translate(${iconOffsetX} ${iconOffsetY})scale(1.0002)`}
            >
                <Icon
                    {...icon}
                    shape="square"
                />
            </g>
            <g
                transform={`translate(${textboxOffsetX} ${textboxOffsetY})scale(1.0002)`}
            >
                <TextBox
                    text={text}
                    height={textHeight}
                    padding={textPadding}
                    stroke={textboxStroke}
                    fill={textboxFill}
                />
            </g>
        </>;
};
