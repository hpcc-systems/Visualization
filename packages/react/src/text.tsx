import { Utility } from "@hpcc-js/common";
import * as React from "@hpcc-js/preact-shim";
import { Rectangle } from "./shape";

interface Text {
    anchor?: string;
    baseline?: string;
    height?: number;
    fill?: string;
    text: string;
}

export const Text: React.FunctionComponent<Text> = ({
    anchor = "middle",
    baseline = "middle",
    height = 12,
    fill = "black",
    text = ""
}) => <text fill={fill} font-size={`${height}px`} dominant-baseline={baseline} text-anchor={anchor}> {text}</text >;

export interface TextBox {
    text: string;
    height?: number;
    fontFamily?: string;
    padding?: number;
    fill?: string;
    stroke?: string;
}

export const TextBox: React.FunctionComponent<TextBox> = ({
    text = "",
    height = 12,
    fontFamily = "Verdana",
    padding = 4,
    fill = "whitesmoke",
    stroke = "lightgray"
}) => {
    const ts = Utility.textSize(text, fontFamily, height, false);
    const w = ts.width + padding * 2;
    const h = ts.height + padding * 2;
    return <>
        <Rectangle width={w} height={h} stroke={stroke} fill={fill} />
        <Text text={text} height={height} />
    </>;
};
