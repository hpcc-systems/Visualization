import { HPCCElement } from "./element";

export class Directive<_T> {
}

export class Ref<T = any> extends Directive<T> {

    constructor(public propertyName: keyof T & string) {
        super();
    }
}

export interface HTMLTemplate<T extends HPCCElement = HPCCElement> {
    html: string;
    directives: Directive<T>[];
}

export function html<T extends HPCCElement>(strings: TemplateStringsArray, ...values: Directive<T>[]): HTMLTemplate<T> {
    let html = strings[0];
    const directives: Directive<T>[] = [];
    for (let i = 0; i < values.length; ++i) {
        const arg = values[i];
        if (arg instanceof Directive) {
            directives.push(arg);
            if (arg instanceof Ref) {
                html += `id="${arg.propertyName}"`;
            } else {
                html += String(values[i]);
            }
        } else {
            throw new Error("Invalid Directive");
        }
        html += strings[i + 1];
    }
    return { html, directives };
}

export function ref<T = any>(propertyName: keyof T & string): Ref<T> {
    return new Ref<T>(propertyName);
}
