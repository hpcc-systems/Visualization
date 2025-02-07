import { Editor } from "./Editor";

export class YAMLEditor extends Editor {
    options(): any {
        return {
            ...super.options(),
            mode: "text/x-yaml",
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        };
    }

    yaml(): string;
    yaml(_: string): this;
    yaml(_?: string): string | this {
        if (!arguments.length) return this.text();
        this.text(_);
        return this;
    }

}
YAMLEditor.prototype._class += " codemirror_YAMLEditor";
