import type { HTMLTemplateResult, SVGTemplateResult } from "lit-html";

export type TemplateResult = HTMLTemplateResult | SVGTemplateResult;
export type TemplateResultEx = TemplateResult & {
    extent?: { width: number, height: number };
};
export function extend(result: TemplateResult, width: number, height: number): TemplateResultEx {
    return {
        ...result,
        extent: { width, height }
    };
}
export type Component<T> = (props: T) => TemplateResult;

