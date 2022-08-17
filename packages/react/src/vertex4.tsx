/* eslint-disable no-debugger, no-console */
import { Utility } from "@hpcc-js/common";
import * as React from "@hpcc-js/preact-shim";
import { Icon } from "./icon";
import { TextBox } from "./text";
import { Vertex } from "./vertex";

export interface IVertex4Annotation extends Icon {
    shapeOffsetX?: number;
    shapeOffsetY?: number;
}

export interface IVertex4 extends Vertex {
    textboxStrokeWidth?: number;
    annotations?: IVertex4Annotation[];
    iconAnnotations?: IVertex4Annotation[];
    annotationGutter?: number;
    cornerRadius?: number;
    subText?: any;
    noLabelRadius?: number;
    iconBorderWidth?: number;
    iconBorderColor?: string;
    iconBackgroundColor?: string;
    shapeOffsetX?: number;
    shapeOffsetY?: number;
    iconOffsetX?: number;
    iconOffsetY?: number;
    iconPadding?: number;
    iconFontSize?: number;
    iconFontColor?: string;
    iconFontFamily?: string;
    iconText?: string;
    shapeRendering?: "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision";
}

export const Vertex4: React.FunctionComponent<IVertex4> = ({
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
    iconAnnotations = [],
    cornerRadius = 3,
    icon = {},
    subText = {},
    showLabel = true,
    noLabelRadius = 5,

    iconBorderWidth = 1,
    iconBorderColor = "#333",

    iconBackgroundColor = "#fff",

    iconFontColor = "#000",
    iconFontSize = 20,
    iconFontFamily = "FontAwesome",

    shapeOffsetX = 0,
    shapeOffsetY = 0,
    iconOffsetX = 0,
    iconOffsetY = 0,

    iconPadding = 4,
    iconText = "?",
    shapeRendering = "auto"
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

    const annoOffsetY = 0;
    const labelWidth = React.useMemo(() => {
        return Utility.textSize(text, textFontFamily, textHeight, false).width;
    }, [text, textFontFamily, textHeight]);

    let labelShapeWidth = 0;
    if (text !== "") {
        labelShapeWidth = labelWidth + (textPadding * 2) + (textboxStrokeWidth * 2);
    }
    let fullAnnotationWidth = labelShapeWidth + annotationGutter;
    const textOffsetX = fullAnnotationWidth - (labelShapeWidth / 2);

    const textShapeHeight = textHeight + (annotationGutter * 2) + (textboxStrokeWidth * 2);
    const annoWidthArr = annotations.map((anno, i) => {
        return Utility.textSize(anno.imageChar, anno.imageFontFamily, anno.height, false).width;
    });
    const annotationArr = [];
    let _labelAnnoOffsetX = fullAnnotationWidth;
    annotations.forEach((anno, i) => {
        const annoText = anno.imageChar;
        const annoTextHeight = anno.height ?? textShapeHeight;
        _labelAnnoOffsetX += annoWidthArr[i] + annotationGutter;
        const annoOffsetX = _labelAnnoOffsetX - (annoWidthArr[i] / 2);
        annotationArr.push(
            <g key={i} class="vertex3-anno" data-click={"annotation"} data-click-data={JSON.stringify(anno)} transform={`translate(${annoOffsetX} ${annoOffsetY})`}>
                <Icon
                    {...anno}
                    shape="rectangle"
                    width={annoWidthArr[i]}
                    height={annoTextHeight}
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
    const iconAnnotationArr = [];
    iconAnnotations.forEach((anno, i) => {
        const x = anno.shapeOffsetX;
        const y = anno.shapeOffsetY;
        iconAnnotationArr.push(
            <g key={i} class="vertex3-iconAnno" data-click={"icon-annotation"} data-click-data={JSON.stringify(anno)} transform={`translate(${x} ${y})`}>
                <Icon
                    {...anno}
                    shape={anno.shape ?? "square"}
                    imageChar={anno.imageChar}
                    imageFontFamily={anno.imageFontFamily}
                    cornerRadius={cornerRadius}
                    stroke={anno.stroke}
                    strokeWidth={anno.strokeWidth}
                />
            </g>
        );
    });

    const textElement = <g data-click={"text"} transform={`translate(${textOffsetX} ${annoOffsetY})`}>
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

    const subTextOffsetX = 0;
    const subTextOffsetY = textShapeHeight + (annotationGutter * 2);

    const subtextElement = subText.text === "" ? null : <g data-click={"subtext"}
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
        <g data-click={"icon"}
            transform={`translate(${shapeOffsetX} ${shapeOffsetY})`}
        >
            <Icon
                {...icon}
                strokeWidth={iconBorderWidth}
                shape="circle"
                height={iconFontSize}
                fill={iconBackgroundColor}
                stroke={iconBorderColor}
                imageFontFamily={iconFontFamily}
                imageChar={iconText}
                imageCharFill={iconFontColor}
                padding={iconPadding}
                xOffset={iconOffsetX}
                yOffset={iconOffsetY}
                cornerRadius={cornerRadius}
                shapeRendering={shapeRendering}
            />
            {iconAnnotationArr}
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

export const CentroidVertex4: React.FunctionComponent<IVertex4> = function ({
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
    iconAnnotations = [],
    cornerRadius,
    icon = {},
    subText = {},
    showLabel = true,
    noLabelRadius = 5,

    iconBorderWidth = 1,
    iconBorderColor = "#333",

    iconBackgroundColor = "#fff",

    iconFontColor = "#000",
    iconFontSize = 20,
    iconFontFamily = "FontAwesome",

    shapeOffsetX = 0,
    shapeOffsetY = 0,
    iconOffsetX = 0,
    iconOffsetY = 0,

    iconPadding = 4,
    iconText = "?",
    shapeRendering = "auto"
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
        iconAnnotations,
        cornerRadius,
        icon,
        subText,
        showLabel,
        noLabelRadius,
        iconBorderWidth,
        iconBorderColor,
        iconBackgroundColor,
        iconFontColor,
        iconFontSize,
        iconFontFamily,
        shapeOffsetX,
        shapeOffsetY,
        iconOffsetX,
        iconOffsetY,
        iconPadding,
        iconText,
        shapeRendering
    };
    return <Vertex4
        {...props}
        icon={icon}
        subText={subText}
    />;
};
