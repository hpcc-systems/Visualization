import { MarkdownEditor } from "./MarkdownEditor";

export class ObservableMarkdownEditor extends MarkdownEditor {
    options(): any {
        return {
            ...super.options(),
            mode: {
                name: "text/x-gfm",
                defaultMode: "javascript"
            }
        };
    }
}
ObservableMarkdownEditor.prototype._class += " codemirror_ObservableMarkdownEditor";
