import { Editor } from "./Editor";

export class MarkdownEditor extends Editor {
    options(): any {
        return {
            ...super.options(),
            mode: "text/x-gfm",
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        };
    }

    markdown(): string;
    markdown(_: string): this;
    markdown(_?: string): string | this {
        if (!arguments.length) return this.text();
        this.text(_);
        return this;
    }

}
MarkdownEditor.prototype._class += " codemirror_MarkdownEditor";
