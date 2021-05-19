import { Utility } from "@hpcc-js/common";
import * as React from "@hpcc-js/preact-shim";
import { Icon } from "./icon";
import { TextBox } from "./text";
import { Vertex } from "./vertex";

export interface IVertex3 extends Vertex {
    categoryID?: string;
    text: string;
    textHeight?: number;
    textPadding?: number;
    textboxStrokeWidth?: number;
    icon?: Icon;
    annotations?: Icon[];
    annotationsHeight?: number;
    annotationGutter?: number;
    textFill?: string;
    textboxFill?: string;
    textboxStroke?: string;
    textFontFamily?: string;
    cornerRadius?: number;
    subText?: TextBox;
    onSizeUpdate?: (size: { width: number, height: number }) => void;
    showLabel?: boolean;
    noLabelRadius?: number;
}

export const Vertex3: React.FunctionComponent<IVertex3> = ({
    categoryID = "",
    text = "",
    textHeight = 10,
    textPadding = 4,
    textFill = "#287EC4",
    textboxFill = "white",
    textboxStroke = "#CCCCCC",
    textboxStrokeWidth = 1,
    textFontFamily = "Verdana",
    annotationGutter = 2,
    annotations = [],
    cornerRadius = 3,
    icon = {},
    subText = {},
    showLabel = true,
    noLabelRadius = 5

}) => {
    icon = {
        height: 50,
        imageChar: "?",
        imageFontFamily: "FontAwesome",
        imageCharFill: "#555555",
        fill: "transparent",
        strokeWidth: 0,
        ...icon
    };
    subText = {
        text: "",
        fill: "white",
        textFill: "#555555",
        ...subText
    };
    let fullAnnotationWidth = 0;

    const annoOffsetY = 0;

    const labelWidth = Utility.textSize(text, textFontFamily, textHeight, false).width;
    let labelShapeWidth = 0;
    if (text !== "") {
        labelShapeWidth = labelWidth + (textPadding * 2) + (textboxStrokeWidth * 2)
    }
    fullAnnotationWidth += labelShapeWidth + annotationGutter;
    const textOffsetX = fullAnnotationWidth - (labelShapeWidth / 2);

    const textShapeHeight = textHeight + (textPadding * 2) + (textboxStrokeWidth * 2);
    const annotationArr = [];
    annotations.forEach(anno => {
        const annoText = anno.imageChar;
        const annoShapeWidth = textShapeHeight;
        fullAnnotationWidth += annoShapeWidth + annotationGutter;
        const annoOffsetX = fullAnnotationWidth - (annoShapeWidth / 2);
        annotationArr.push(
            <g class="vertex3-anno" transform={`translate(${annoOffsetX} ${annoOffsetY})`}>
                <Icon
                    {...anno}
                    shape="square"
                    height={textShapeHeight}
                    imageChar={annoText}
                    imageFontFamily={anno.imageFontFamily}
                    cornerRadius={cornerRadius}
                    strokeWidth={0}
                />
            </g>
        );
    });
    if (annotations.length > 0) {
        fullAnnotationWidth += annotationGutter * (annotations.length - 1);
    }
    const textElement = <g transform={`translate(${textOffsetX} ${annoOffsetY})`}>
        {!showLabel || text === "" ? <circle r={noLabelRadius} stroke={textboxStroke} fill={textFill} /> : <TextBox
            text={text}
            height={textHeight}
            padding={textPadding}
            strokeWidth={textboxStrokeWidth}
            stroke={textboxStroke}
            fill={textboxFill}
            textFill={textFill}
            fontFamily={textFontFamily}
            cornerRadius={cornerRadius}
        />}
    </g>;
    const iconHeight = icon.height || 20;
    const iconStrokeWidth = icon.strokeWidth || 0;
    const iconOffsetX = 0;
    let iconOffsetY = 0;

    const subTextOffsetX = 0;
    let subTextOffsetY = textShapeHeight + (annotationGutter * 2);

    if (text !== "" || annotationArr.length > 0) {
        iconOffsetY = - (iconHeight / 2) - (iconStrokeWidth) - (textShapeHeight / 2) - (annotationGutter * 2);
    } else if (subText.text !== "") {
        subTextOffsetY = (iconHeight / 2) + iconStrokeWidth + (annotationGutter * 2);
    }
    const subtextElement = subText.text === "" ? null : <g
        transform={`translate(${subTextOffsetX} ${subTextOffsetY})`}
    >
        <TextBox
            fill={subText.fill || "#FFFFFF"}
            textFill={subText.textFill || textFill}
            {...subText}
            height={textHeight}
            padding={textPadding}
            strokeWidth={0}
            stroke={textboxStroke}
            fontFamily={textFontFamily}
            cornerRadius={cornerRadius}
        />
    </g>;
    return <g>
        <g
            transform={`translate(${iconOffsetX} ${iconOffsetY})`}
        >
            <Icon
                {...icon}
            />
        </g>
        <g
            transform={`translate(${-fullAnnotationWidth / 2} ${annoOffsetY})`}
        >
            {textElement}
            {annotationArr}
        </g>
        {subtextElement}
    </g>
        ;
};

export const CentroidVertex3: React.FunctionComponent<IVertex3> = function ({
    categoryID = "",
    text = "",
    textHeight = 12,
    textPadding = 10,
    textFill = "#287EC4",
    textboxFill = "white",
    textboxStroke = "#CCCCCC",
    textboxStrokeWidth = 1,
    textFontFamily = "Verdana",
    annotationGutter = 2,
    annotations = [],
    cornerRadius,
    icon = {},
    subText = {}
}) {
    icon = {
        height: 91,
        padding: 40,
        imageCharFill: "#555555",
        imageFontFamily: "FontAwesome",
        fill: "#FFCC33",
        stroke: "#DFDFDF",
        imageChar: "?",
        strokeWidth: 4,
        yOffset: -15,
        ...icon
    };
    subText = {
        text: "",
        fill: "transparent",
        textFill: "#555555",
        ...subText
    };
    const props = {
        categoryID,
        text,
        textHeight,
        textPadding,
        textFill,
        textboxFill,
        textboxStroke,
        textboxStrokeWidth,
        textFontFamily,
        annotationGutter,
        annotations,
        cornerRadius,
        icon,
        subText
    };
    return <Vertex3
        {...props}
        icon={icon}
        subText={subText}
    />;
};
