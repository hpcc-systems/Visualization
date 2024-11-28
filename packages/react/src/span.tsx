import { FunctionComponent } from "preact";

export interface SpanProps {
    text: string;
}

export const Span: FunctionComponent<SpanProps> = ({
    text
}) => <span>{text}</span>;
