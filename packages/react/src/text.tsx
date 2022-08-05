import { Utility } from "@hpcc-js/common";
import * as React from "@hpcc-js/preact-shim";
import { Icon } from "./icon";
import { Rectangle } from "./shape";

interface TextLine {
    text: string;
    height?: number;
    anchor?: string;
    baseline?: string;
    fontFamily?: string;
    fill?: string;
}

export const TextLine: React.FunctionComponent<TextLine> = ({
    text,
    height = 12,
    anchor = "middle",
    baseline = "middle",
    fontFamily = "Verdana",
    fill = "black"
}) => {
    return <text
        font-family={fontFamily}
        font-size={`${height}px`}
        text-anchor={anchor}
        dominant-baseline={baseline}
        fill={fill}
    >{text}</text>;
};

interface Text {
    text: string;
    height?: number;
    fontFamily?: string;
    fill?: string;
    onSizeUpdate?: (size: { width: number, height: number }) => void;
}

export const Text: React.FunctionComponent<Text> = ({
    text,
    height = 12,
    fontFamily = "Verdana",
    fill = "black",
    onSizeUpdate
}) => {
    const [totalWidth, setTotalWidthUpdate] = React.useState(0);
    const [totalHeight, setTotalHeightUpdate] = React.useState(0);

    React.useEffect(() => {
        onSizeUpdate && onSizeUpdate({ width: totalWidth, height: totalHeight });
    }, [totalWidth, totalHeight, onSizeUpdate]);

    const parts = React.useMemo(() => {
        return text.split("\n");
    }, [text]);

    const ts = React.useMemo(() => {
        return Utility.textSize(parts, fontFamily, height);
    }, [fontFamily, height, parts]);

    setTotalWidthUpdate(ts.width);
    setTotalHeightUpdate(parts.length * (height + 2) - 2);

    const yOffset = -(totalHeight / 2) + (height / 2);
    const TextLines = React.useMemo(() => {
        return parts.map((p, i) => {
            return <g key={i} transform={`translate(0 ${yOffset + i * (height + 2)})`}>
                <TextLine
                    text={p}
                    height={height}
                    fontFamily={fontFamily}
                    fill={fill}
                />
            </g>;
        });
    }, [fill, fontFamily, height, parts, yOffset]);

    return <>{TextLines}</>;
};

export interface TextBox {
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

export const TextBox: React.FunctionComponent<TextBox> = ({
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
        onSizeUpdate && onSizeUpdate({ width: textWidth, height: textHeight });
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

export interface LabelledRect extends TextBox {
    width?: number;
    fontSize?: number;
}

export interface IconLabelledRect extends LabelledRect {
    icon: string;
    iconFontFamily: string;
    iconFontSize: number;
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
    onSizeUpdate = (size: { width: number, height: number }) => { }
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
    cornerRadius = 0,
    onSizeUpdate = (size: { width: number, height: number }) => { }
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
