import { Editor } from "./Editor";

export class CSSEditor extends Editor {
    options(): any {
        return {
            ...super.options(),
            mode: "text/css",
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        };
    }

    css(): string;
    css(_: string): this;
    css(_?: string): string | this {
        if (!arguments.length) return this.text();
        this.text(_);
        return this;
    }

}
CSSEditor.prototype._class += " codemirror_CSSEditor";
