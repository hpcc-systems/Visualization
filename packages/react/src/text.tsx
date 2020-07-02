import { Utility } from "@hpcc-js/common";
import * as React from "@hpcc-js/preact-shim";
import { Rectangle } from "./shape";

interface TextLine {
    text: string;
    height?: number;
    anchor?: string;
    baseline?: string;
    fontFamily?: string;
    fill?: string;
    domClass?: string;
}

export const TextLine: React.FunctionComponent<TextLine> = ({
    text,
    height = 12,
    anchor = "middle",
    baseline = "middle",
    fontFamily = "Verdana",
    fill = "black",
    domClass
}) => {
    return <text
        class={domClass}
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
    domClass?: string;
}

export const Text: React.FunctionComponent<Text> = ({
    text,
    height = 12,
    fontFamily = "Verdana",
    fill = "black",
    onSizeUpdate = (size: Utility.TextSize) => { },
    domClass
}) => {
    const [totalWidth, onTotalWidthUpdate] = React.useState(0);
    const [totalHeight, onTotalHeightUpdate] = React.useState(0);
    React.useEffect(() => onSizeUpdate({ width: totalWidth, height: totalHeight }), [totalWidth, totalHeight]);

    const parts = text.split("\n");
    const ts = Utility.textSize(parts, fontFamily, height);
    onTotalWidthUpdate(ts.width);
    onTotalHeightUpdate(parts.length * (height + 2) - 2);

    const yOffset = -(totalHeight / 2) + (height / 2);
    const TextLines = parts.map((p, i) => {
        return <g transform={`translate(0 ${yOffset + i * (height + 2)})`}>
            <TextLine
                domClass={domClass}
                text={p}
                height={height}
                fontFamily={fontFamily}
                fill={fill}
            />
        </g>;
    });

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
    domClass?: string;
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
    onSizeUpdate = (size: { width: number, height: number }) => { },
    domClass
}) => {
    const [textWidth, onTextWidthUpdate] = React.useState(0);
    const [textHeight, onTextHeightUpdate] = React.useState(0);
    React.useEffect(() => onSizeUpdate({ width: textWidth, height: textHeight }), [textWidth, textHeight]);

    const w = textWidth + padding * 2 + strokeWidth;
    const h = textHeight + padding * 2 + strokeWidth;
    const textOffsetY = Math.floor(height / 10);
    return <>
        <Rectangle
            domClass={domClass}
            width={w}
            height={h}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            cornerRadius={cornerRadius}
        />
        <g class={domClass} transform={`translate(0 ${textOffsetY})`}>
            <Text
                text={text}
                fontFamily={fontFamily}
                height={height}
                fill={textFill}
                onSizeUpdate={onTextSizeUpdate}
            />
        </g>
    </>
    ;

    function onTextSizeUpdate(size) {
        onTextWidthUpdate(size.width);
        onTextHeightUpdate(size.height);
    }
};
