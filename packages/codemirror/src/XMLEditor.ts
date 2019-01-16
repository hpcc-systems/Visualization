import { Editor } from "./Editor";

export class XMLEditor extends Editor {
    options(): any {
        return {
            ...super.options(),
            mode: "application/xml",
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        };
    }

    xml(): string;
    xml(_: string): this;
    xml(_?: string): string | this {
        if (!arguments.length) return this.text();
        this.text(_);
        return this;
    }

}
XMLEditor.prototype._class += " codemirror_XMLEditor";
