import * as React from "@hpcc-js/preact-shim";
import { Icon } from "./icon";
import { TextBox } from "./text";

export interface Annotations {
    x: number;
    y: number;
    annotationIDs: string[];
    stepSize?: number;
}

export const Annotations: React.FunctionComponent<Annotations> = ({
    x,
    y,
    annotationIDs = [],
    stepSize = -16
}) => {
    const IconComponents = annotationIDs.map((id, i) => <g
        class="vertex-anno"
        key={id}
        transform={`translate(${x + i * stepSize} ${y})`}
    >
        <use
            href={"#" + id}
        />
    </g>
    );
    return <>{IconComponents}</>;
};

export interface Vertex {
    categoryID?: string;
    text: string;
    textHeight?: number;
    textPadding?: number;
    icon?: Icon;
    annotationsHeight?: number;
    annotationIDs?: string[];
    textFill?: string;
    textboxFill?: string;
    textboxStroke?: string;
    textFontFamily?: string;
    onSizeUpdate?: (size: { width: number, height: number }) => void;
}

export const Vertex: React.FunctionComponent<Vertex> = ({
    categoryID = "",
    text = "",
    textHeight = 12,
    textPadding = 4,
    icon = {},
    annotationsHeight = 12,
    annotationIDs = [],
    textFill,
    textboxFill,
    textboxStroke,
    textFontFamily,
    onSizeUpdate = (size: { width: number, height: number }) => { }
}) => {
    const [textBoxWidth, onTextBoxWidthUpdate] = React.useState(0);
    const [textBoxHeight, onTextBoxHeightUpdate] = React.useState(0);
    React.useEffect(() => onSizeUpdate({ width: 0, height: 0 }), [textBoxWidth, textBoxHeight]);

    icon = {
        imageChar: "fa-question",
        height: 32,
        fill: "transparent",
        ...icon
    };
    let width = textBoxWidth;
    width += 4;
    return categoryID ?
        <g transform={`translate(0 ${-(icon.height * 2 / 6 + textHeight + 8) / 2})`}>
            <use href={"#" + categoryID} />
            <g class="vertex-label" transform={`translate(0 ${icon.height / 3 + textBoxHeight / 2 + textPadding})`}>
                <TextBox
                    text={text}
                    height={textHeight}
                    padding={textPadding}
                    onSizeUpdate={onTextBoxSizeUpdate}
                    textFill={textFill}
                    fill={textboxFill}
                    stroke={textboxStroke}
                    fontFamily={textFontFamily}
                />
            </g>
            <Annotations x={width / 2} y={icon.height / 3 + textBoxHeight + textPadding + annotationsHeight / 3} annotationIDs={annotationIDs} />
        </g> :
        <g transform={`translate(0 ${-(icon.height * 2 / 6 + textHeight + 8) / 2})`}>
            <Icon
                {...icon}
                domClass="vertex-icon"
            />
            <g class="vertex-label" transform={`translate(0 ${icon.height / 3 + textBoxHeight / 2 + textPadding})`}>
                <TextBox
                    text={text}
                    height={textHeight}
                    padding={textPadding}
                    onSizeUpdate={onTextBoxSizeUpdate}
                    textFill={textFill}
                    fill={textboxFill}
                    stroke={textboxStroke}
                    fontFamily={textFontFamily}
                />
            </g>
        </g>;

    function onTextBoxSizeUpdate(size) {
        onTextBoxWidthUpdate(size.width);
        onTextBoxHeightUpdate(size.height);
    }
};
