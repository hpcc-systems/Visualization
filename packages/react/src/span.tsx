import * as PReact from "./preact-shim.ts";

export interface SpanProps {
    text: string;
}

export const Span: PReact.FunctionComponent<SpanProps> = ({
    text
}) => <span>{text}</span>;
