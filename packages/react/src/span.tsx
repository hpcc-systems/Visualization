import React from "react";

export interface SpanProps {
    text: string;
}

export const Span: React.FunctionComponent<SpanProps> = ({
    text
}) => <span>{text}</span>;
