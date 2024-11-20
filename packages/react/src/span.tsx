import * as React from "@hpcc-js/preact-shim";

export interface SpanProps {
    text: string;
}

export const Span: React.FunctionComponent<SpanProps> = ({
    text
}) => <span>{text}</span>;
