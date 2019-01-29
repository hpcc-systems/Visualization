import { Editor } from "./Editor";

export class JSEditor extends Editor {
    options(): any {
        return {
            ...super.options(),
            mode: "text/javascript",
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        };
    }

    javascript(): string;
    javascript(_: string): this;
    javascript(_?: string): string | this {
        if (!arguments.length) return this.text();
        this.text(_);
        return this;
    }

}
JSEditor.prototype._class += " codemirror_JSEditor";
