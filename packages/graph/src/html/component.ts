import type { HTMLTemplateResult, SVGTemplateResult } from "lit-html";
import type { Pos, Segment, Extent } from "./intersection.ts";

export type TemplateResult = HTMLTemplateResult | SVGTemplateResult;
export type IntersectionFunc = (pos: Pos, line: Segment) => Pos | null;
export type TemplateResultEx = TemplateResult & {
    extent?: Extent;
    intersection: IntersectionFunc;
};
export function extend(result: TemplateResult, width: number, height: number, intersection: IntersectionFunc = (pos: Pos, line: Segment) => null): TemplateResultEx {
    return {
        ...result,
        extent: { width, height },
        intersection
    };
}
export type Component<T> = (props: T) => TemplateResult;

