import React from "react";
import { Icon, IconProps } from "./icon.tsx";
import { TextBox } from "./text.tsx";

export interface AnnotationsProps {
    x: number;
    y: number;
    annotationIDs: string[];
    stepSize?: number;
}

export const Annotations: React.FunctionComponent<AnnotationsProps> = ({
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
    id: string | number;
    origData?: any;
    centroid?: boolean;
    categoryID?: string;
    text: string;
    textHeight?: number;
    textPadding?: number;
    icon?: IconProps;
    annotationsHeight?: number;
    annotationIDs?: string[];
    textFill?: string;
    textboxFill?: string;
    textboxStroke?: string;
    textFontFamily?: string;
    onSizeUpdate?: (size: { width: number, height: number }) => void;
    showLabel?: boolean;
    scale?: number
}

export const Vertex: React.FunctionComponent<VertexProps> = ({
    categoryID = "",
    text = "",
    textHeight = 12,
    textPadding = 4,
    icon = {} as IconProps,
    annotationsHeight = 12,
    annotationIDs = [],
    textFill,
    textboxFill,
    textboxStroke,
    textFontFamily,
    onSizeUpdate,
    showLabel = true,
    scale = 1
}) => {
    icon = {
        imageChar: "fa-question",
        height: 32,
        fill: "transparent",
        ...icon
    };

    const [textBoxWidth, setTextBoxWidthUpdate] = React.useState(0);
    const [textBoxHeight, setTextBoxHeightUpdate] = React.useState(0);

    React.useEffect(() => {
        if (onSizeUpdate) {
            onSizeUpdate({ width: 0, height: 0 });
        }
    }, [textBoxWidth, textBoxHeight, onSizeUpdate]);

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
        <g transform={`translate(0 ${offsetY}) scale(${scale})`}>
            <use href={"#" + categoryID} />
            {label}
            <Annotations x={width / 2} y={annotationOffsetY} annotationIDs={annotationIDs} />
        </g> :
        <g transform={`translate(0 ${offsetY}) scale(${scale})`}>
            <Icon {...icon} />
            {label}
        </g>;
};
