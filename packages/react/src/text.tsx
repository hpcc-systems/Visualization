import React from "react";
import { Utility } from "@hpcc-js/common";
import { Icon } from "./icon.tsx";
import { Rectangle } from "./shape.tsx";

export interface TextLineProps {
    text: string;
    height?: number;
    anchor?: string;
    baseline?: string;
    fontFamily?: string;
    fill?: string;
}

export const TextLine: React.FunctionComponent<TextLineProps> = ({
    text,
    height = 12,
    anchor = "middle",
    baseline = "middle",
    fontFamily = "Verdana",
    fill = "black"
}) => {
    return <text
        fontFamily={fontFamily}
        fontSize={`${height}px`}
        textAnchor={anchor}
        dominantBaseline={baseline}
        fill={fill}
    >{text}</text>;
};

export interface TextProps {
    text: string;
    height?: number;
    fontFamily?: string;
    fill?: string;
    onSizeUpdate?: (size: { width: number, height: number }) => void;
}

export const Text: React.FunctionComponent<TextProps> = ({
    text,
    height = 12,
    fontFamily = "Verdana",
    fill = "black",
    onSizeUpdate
}) => {
    const [totalWidth, setTotalWidth] = React.useState(0);
    const [totalHeight, setTotalHeight] = React.useState(0);

    React.useEffect(() => {
        if (onSizeUpdate) {
            onSizeUpdate({ width: totalWidth, height: totalHeight });
        }
    }, [totalWidth, totalHeight, onSizeUpdate]);

    const parts = React.useMemo(() => {
        return text.split("\n");
    }, [text]);

    React.useLayoutEffect(() => {
        const size = Utility.textSize(parts, fontFamily, height);
        setTotalWidth(size.width);
        setTotalHeight(size.height);
    }, [fontFamily, height, parts]);

    const TextLines = React.useMemo(() => {
        const yOffset = -(totalHeight / 2) + (height / 2);
        return parts.map((p, i) => {
            return <g key={`key-${i}`} transform={`translate(0 ${yOffset + i * (height + 2)})`}>
                <TextLine
                    text={p}
                    height={height}
                    fontFamily={fontFamily}
                    fill={fill}
                />
            </g>;
        });
    }, [parts, totalHeight, height, fontFamily, fill]);

    return <g>{TextLines}</g>;
};

export interface TextBoxProps {
    text: string;
    height?: number;
    fontFamily?: string;
    padding?: number;
    fill?: string;
    stroke?: string;
    textFill?: string;
    strokeWidth?: number;
    cornerRadius?: number;
    textOffsetY?: number;
    onSizeUpdate?: (size: { width: number, height: number }) => void;
}

export const TextBox: React.FunctionComponent<TextBoxProps> = ({
    text,
    height = 12,
    fontFamily = "Verdana",
    padding = 4,
    fill = "whitesmoke",
    stroke = "lightgray",
    textFill = "black",
    strokeWidth = 1,
    cornerRadius = 0,
    onSizeUpdate
}) => {
    const [textWidth, setTextWidthUpdate] = React.useState(0);
    const [textHeight, setTextHeightUpdate] = React.useState(0);

    React.useEffect(() => {
        if (onSizeUpdate) {
            onSizeUpdate({ width: textWidth, height: textHeight });
        }
    }, [textWidth, textHeight, onSizeUpdate]);

    const onTextSizeUpdate = React.useCallback(size => {
        setTextWidthUpdate(size.width);
        setTextHeightUpdate(size.height);
    }, []);

    const w = textWidth + padding * 2 + strokeWidth;
    const h = textHeight + padding * 2 + strokeWidth;
    const textOffsetY = Math.floor(height / 10);

    return <>
        <Rectangle
            width={w}
            height={h}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            cornerRadius={cornerRadius}
        />
        <g transform={`translate(0 ${textOffsetY})`}>
            <Text
                text={text}
                fontFamily={fontFamily}
                height={height}
                fill={textFill}
                onSizeUpdate={onTextSizeUpdate}
            />
        </g>
    </>;
};

export interface LabelledRect extends TextBoxProps {
    width?: number;
    fontSize?: number;
}

export const LabelledRect: React.FunctionComponent<LabelledRect> = ({
    text,
    height = 12,
    width = 12,
    fontFamily = "Verdana",
    fontSize = 10,
    padding = 3,
    fill = "whitesmoke",
    stroke = "lightgray",
    textFill = "black",
    strokeWidth = 1,
    cornerRadius = 0,
    onSizeUpdate
}) => {

    const [actualWidth, setActualWidthUpdate] = React.useState(width);
    const [actualHeight, setActualHeightUpdate] = React.useState(height);

    React.useLayoutEffect(() => {
        const size = Utility.textSize(text, fontFamily, fontSize);
        setActualWidthUpdate(size.width + padding * 2);
        setActualHeightUpdate(size.height + padding * 2);
    }, [text, fontFamily, fontSize, padding]);

    React.useLayoutEffect(() => {
        if (onSizeUpdate) {
            onSizeUpdate({ width: actualWidth, height: actualHeight });
        }
    }, [actualWidth, actualHeight, padding, onSizeUpdate]);

    return <>
        <Rectangle
            width={actualWidth}
            height={actualHeight}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            cornerRadius={cornerRadius}
        />
        <g transform={`translate(${-(actualWidth / 2) + padding} ${-(actualHeight / 2) + padding + fontSize * 0.15})`}>
            <TextLine
                text={text}
                fontFamily={fontFamily}
                height={fontSize}
                fill={textFill}
                anchor="start"
                baseline="hanging"
            />
        </g>
    </>;
};

export interface IconLabelledRect extends LabelledRect {
    icon: string;
    iconFontFamily?: string;
    iconFontSize?: number;
}

export const IconLabelledRect: React.FunctionComponent<IconLabelledRect> = ({
    icon,
    iconFontFamily,
    text,
    height = 12,
    width = 12,
    fontFamily = "Verdana",
    fontSize = 10,
    padding = 3,
    fill = "whitesmoke",
    stroke = "lightgray",
    textFill = "black",
    strokeWidth = 1,
    cornerRadius = 0
}) => {

    return <>
        <Rectangle
            width={width}
            height={height}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            cornerRadius={cornerRadius}
        />
        <g transform={`translate(${-(width / 2) + padding} ${-(height / 2) + padding})`}>
            <Icon
                shape="square"
                imageFontFamily={iconFontFamily}
                imageChar={icon}
                height={height}
                fill={fill}
                imageCharFill={textFill}
            />
        </g>
        <g transform={`translate(${-(width / 2) + (padding * 2) + height} ${-(height / 2) + padding})`}>
            <TextLine
                text={text}
                fontFamily={fontFamily}
                height={fontSize}
                fill={textFill}
                anchor="start"
                baseline="hanging"
            />
        </g>
    </>;
};
