import * as PReact from "./preact-shim.ts";
import { Utility } from "@hpcc-js/common";
import { Icon, IconProps } from "./icon.tsx";
import { TextBox } from "./text.tsx";
import { Annotations, VertexProps } from "./vertex.tsx";

export const Vertex2: PReact.FunctionComponent<VertexProps> = ({
    categoryID = "",
    text = "",
    textHeight = 12,
    textPadding = 4,
    icon = {} as IconProps,
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
    const { width } = PReact.useMemo(() => {
        return Utility.textSize(text, textFontFamily, textHeight, false);
    }, [text, textFontFamily, textHeight]);

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
                    xlinkHref={"#" + categoryID}
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
