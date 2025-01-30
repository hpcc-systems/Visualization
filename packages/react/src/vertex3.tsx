import * as PReact from "./preact-shim.ts";
import { Utility } from "@hpcc-js/common";
import { Icon, IconProps } from "./icon.tsx";
import { TextBox, TextBoxProps } from "./text.tsx";
import { VertexProps } from "./vertex.tsx";

export interface Vertex3Props extends VertexProps {
    id: string;
    origData?: any;
    categoryID?: string;
    text: string;
    textHeight?: number;
    textPadding?: number;
    textboxStrokeWidth?: number;
    icon?: IconProps;
    annotations?: IconProps[];
    annotationsHeight?: number;
    annotationGutter?: number;
    textFill?: string;
    textboxFill?: string;
    textboxStroke?: string;
    textFontFamily?: string;
    cornerRadius?: number;
    subText?: TextBoxProps;
    onSizeUpdate?: (size: { width: number, height: number }) => void;
    showLabel?: boolean;
    noLabelRadius?: number;
    expansionIcon?: IconProps;
    scale?: number;
}

export const Vertex3: PReact.FunctionComponent<Vertex3Props> = ({
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
    icon = {} as IconProps,
    subText = { text: "" } as TextBoxProps,
    showLabel = true,
    noLabelRadius = 5,
    expansionIcon,
    scale = 1
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
    expansionIcon = expansionIcon ? {
        height: 16,
        shape: "circle",
        padding: 6,
        imageChar: "?",
        imageFontFamily: "FontAwesome",
        imageCharFill: "black",
        fill: "whitesmoke",
        stroke: "whitesmoke",
        strokeWidth: 0,
        ...expansionIcon
    } : undefined;
    let fullAnnotationWidth = 0;

    const annoOffsetY = 0;

    const labelWidth = PReact.useMemo(() => {
        return Utility.textSize(text, textFontFamily, textHeight, false).width;
    }, [text, textFontFamily, textHeight]);

    let labelShapeWidth = 0;
    if (text !== "") {
        labelShapeWidth = labelWidth + (textPadding * 2) + (textboxStrokeWidth * 2);
    }
    fullAnnotationWidth += labelShapeWidth + annotationGutter;
    const textOffsetX = fullAnnotationWidth - (labelShapeWidth / 2);

    const textShapeHeight = textHeight + (textPadding * 2) + (textboxStrokeWidth * 2);
    const annotationArr = [];
    annotations.forEach((anno, idx) => {
        const annoText = anno.imageChar;
        const annoShapeWidth = textShapeHeight;
        fullAnnotationWidth += annoShapeWidth + annotationGutter;
        const annoOffsetX = fullAnnotationWidth - (annoShapeWidth / 2);
        annotationArr.push(
            <g key={idx} className="vertex3-anno" data-click={"annotation"} data-click-data={JSON.stringify(anno)} transform={`translate(${annoOffsetX} ${annoOffsetY})`}>
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

    return <g transform={`scale(${scale})`}>
        <g data-click={"icon"} transform={`translate(${iconOffsetX} ${iconOffsetY})`}>
            <Icon {...icon} />
            {expansionIcon &&
                <g data-click={"expanded-icon"} data-click-data={JSON.stringify(expansionIcon)} transform={`translate(${(icon.height + iconStrokeWidth) / 2 - expansionIcon.height / 2} ${-(icon.height + iconStrokeWidth) / 2 + expansionIcon.height / 2})`}>
                    <Icon {...expansionIcon} />
                </g>
            }
        </g>
        <g transform={`translate(${-fullAnnotationWidth / 2} ${annoOffsetY})`} >
            {textElement}
            {annotationArr}
        </g>
        {subtextElement}
    </g >;
};

export const CentroidVertex3: PReact.FunctionComponent<Vertex3Props> = function ({
    id,
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
    subText = {},
    expansionIcon,
    scale = 1
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
        id,
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
        subText,
        expansionIcon,
        scale
    };
    return <Vertex3
        {...props}
        icon={icon}
        subText={subText}
    />;
};
