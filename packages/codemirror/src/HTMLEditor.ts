import { Editor } from "./Editor";

export class HTMLEditor extends Editor {
    options(): any {
        return {
            ...super.options(),
            mode: "htmlmixed",
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        };
    }

    html(): string;
    html(_: string): this;
    html(_?: string): string | this {
        if (!arguments.length) return this.text();
        this.text(_);
        return this;
    }

}
HTMLEditor.prototype._class += " codemirror_HTMLEditor";
