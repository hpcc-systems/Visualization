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

export interface VertexProps {
    id: string;
    centroid?: boolean;
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
    showLabel?: boolean;
}

export const Vertex: React.FunctionComponent<VertexProps> = ({
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
    onSizeUpdate,
    showLabel = true
}) => {
    const [textBoxWidth, setTextBoxWidthUpdate] = React.useState(0);
    const [textBoxHeight, setTextBoxHeightUpdate] = React.useState(0);

    React.useEffect(() => {
        onSizeUpdate && onSizeUpdate({ width: 0, height: 0 });
    }, [textBoxWidth, textBoxHeight, onSizeUpdate]);

    icon = {
        imageChar: "fa-question",
        height: 32,
        fill: "transparent",
        ...icon
    };
    let width = textBoxWidth;
    width += 4;
    let offsetY = -(icon.height * 2 / 6 + textHeight + 8) / 2;
    const textboxOffsetY = icon.height / 3 + textBoxHeight / 2 + textPadding;
    let annotationOffsetY = icon.height / 3 + textBoxHeight + textPadding + annotationsHeight / 3;
    if (!showLabel) {
        offsetY += (textHeight + 8) / 2;
        annotationOffsetY -= textBoxHeight + textPadding;
    }

    const onTextBoxSizeUpdate = React.useCallback(size => {
        setTextBoxWidthUpdate(size.width);
        setTextBoxHeightUpdate(size.height);
    }, []);

    const label = showLabel ? <g transform={`translate(0 ${textboxOffsetY})`}>
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
    </g> : undefined;
    return categoryID ?
        <g transform={`translate(0 ${offsetY})`}>
            <use href={"#" + categoryID} />
            {label}
            <Annotations x={width / 2} y={annotationOffsetY} annotationIDs={annotationIDs} />
        </g> :
        <g transform={`translate(0 ${offsetY})`}>
            <Icon {...icon} />
            {label}
        </g>;
};
