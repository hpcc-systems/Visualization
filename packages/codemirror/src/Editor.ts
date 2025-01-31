import { CodeMirror } from "./codemirror-shim.ts";
import { HTMLWidget, Palette } from "@hpcc-js/common";

import "../src/Editor.css";

export interface IPosition {
    line: number;
    ch: number;
}

export interface ICompletion {
    list: string[],
    from: number,
    to: number
}

export class Editor extends HTMLWidget {
    private _codemirror: CodeMirror.EditorFromTextArea;
    private _markedText = [];
    protected _initialText: string = "";

    options(): any {
        return {
            gutters: this.guttersOption(),
            readOnly: this.readOnly(),
            lineNumbers: true,
            tabSize: 2
        };
    }

    private _options = new Map<string, string | number>();
    option(option: string): string | number;
    option(option: string, value: string | number): this;
    option(option: string, value?: string | number): string | number | this {
        if (this._codemirror) {
            if (arguments.length < 2) {
                return this._codemirror.getOption(option);
            }
            this._codemirror.setOption(option, value);
            return this;
        }
        if (arguments.length < 2) {
            return this._options.get(option);
        }
        this._options.set(option, value);
    }

    guttersOption(): (string | { className: string, style: string })[] {
        const gutters: (string | { className: string, style: string })[] = ["CodeMirror-linenumbers"];
        if (this.gutterMarkerWidth() > 0) {
            gutters.unshift({
                className: "CodeMirror-guttermarker",
                style: `width:${this.gutterMarkerWidth()}px;`
            });
        }
        return gutters;
    }

    addGutterMarker(lineNumber: number, commentText: string, backgroundColor: string = null, fontFamily: string = null, fontSize: string = null, onmouseenter = () => { }, onmouseleave = () => { }, onclick = (event: MouseEvent) => { }) {
        const line = this._codemirror.getLineHandle(lineNumber);
        const marker = document.createElement("div");
        marker.textContent = commentText;
        marker.style.paddingLeft = "3px";
        marker.style.paddingRight = "3px";
        marker.style.color = Palette.textColor(backgroundColor);
        if (fontFamily !== null) {
            marker.style.fontFamily = fontFamily;
        }
        if (fontSize !== null) {
            marker.style.fontSize = fontSize;
        }
        marker.style.backgroundColor = backgroundColor;
        marker.style.textAlign = this.markerTextAlign();
        this._codemirror.setGutterMarker(line, "CodeMirror-guttermarker", marker);
        marker.onmouseenter = onmouseenter;
        marker.onmouseleave = onmouseleave;
        marker.onclick = onclick;
    }

    removeGutterMarker(lineNumber: number) {
        const line = this._codemirror.getLineHandle(lineNumber);
        this._codemirror.setGutterMarker(line, "CodeMirror-guttermarker", null);
    }

    hasFocus(): boolean {
        return this._codemirror.hasFocus();
    }

    text(): string;
    text(_: string): this;
    text(_?: string): string | this {
        if (this._codemirror) {
            const doc = this._codemirror.getDoc();
            if (!arguments.length) return doc.getValue();
            doc.setValue(_);
            return this;
        }
        if (!arguments.length) return this._initialText;
        this._initialText = _;
        return this;
    }

    highlight(start: IPosition | number, end: IPosition | number, className = "cm-marked-text"): this {
        if (typeof start === "number") start = this.positionAt(start);
        if (typeof end === "number") end = this.positionAt(end);
        if (this._codemirror) {
            this._markedText.push(this._codemirror.markText(start, end, { className }));
        }
        return this;
    }

    highlightInfo(start: IPosition | number, end: IPosition | number): this {
        this.highlight(start, end, "cm-marked-info");
        return this;
    }

    highlightWarning(start: IPosition | number, end: IPosition | number): this {
        this.highlight(start, end, "cm-marked-warning");
        return this;
    }

    highlightError(start: IPosition | number, end: IPosition | number): this {
        this.highlight(start, end, "cm-marked-error");
        return this;
    }

    removeAllHighlight(): this {
        for (const marked of this._markedText) {
            marked.clear();
        }
        this._markedText = [];
        return this;
    }

    positionAt(i: number): IPosition {
        return this._codemirror.posFromIndex(i);
    }

    getLineLength(lineNumber: number): number {
        return this._codemirror.doc.getLine(lineNumber)?.length || 0;
    }

    highlightSubstring(str: string) {
        const splitTextArr = this.text().split(str).slice(0, -1);
        let idx = 0;
        splitTextArr.forEach(splitText => {
            idx += splitText.length;
            this.highlight(
                this.positionAt(idx),
                this.positionAt(idx + str.length)
            );
            idx += str.length;
        });
    }

    setCursor(row: number, col: number, focus = true) {
        this._codemirror.setCursor(row, col);
        if (focus) {
            setTimeout(() => {
                this._codemirror.focus();
            }, 0);
        }
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._codemirror = CodeMirror.fromTextArea(element.append("textarea").node(), this.options());
        this._codemirror.on("changes", (cm: CodeMirror.EditorFromTextArea, changes: object[]) => {
            this.changes(changes);
        });
        this._options.forEach((value, key) => {
            this._codemirror.setOption(key, value);
        });
        this.text(this._initialText);
    }

    update(domNode, Element) {
        super.update(domNode, Element);
        const extraKeys = this._codemirror.getOption("extraKeys") ?? {};
        if (this.showHints()) {
            extraKeys["Ctrl-Space"] = "autocomplete";
        } else {
            delete extraKeys["Ctrl-Space"];
        }
        this._codemirror.setOption("readOnly", this.readOnly());
        this._codemirror.setOption("gutters", this.guttersOption());
        this._codemirror.setOption("extraKeys", extraKeys);
        this._codemirror.setOption("hintOptions", this.showHints() ? { hint: (cm, option) => this.fetchHints(cm, option) } : {});
        this._codemirror.setSize(this.width() - 2, this.height() - 2);
        this._codemirror.refresh();
    }

    //  Events  ---
    changes(changes: object[]) {
    }

    fetchHints(cm, option): Promise<ICompletion> {
        return Promise.resolve(null);
    }
    /**
     * @deprecated Replaced with `option`
     */
    setOption(option: string, value: any): void {
        this._codemirror.setOption(option, value);
    }
}
Editor.prototype._class += " codemirror_Editor";

export interface Editor {
    readOnly(): boolean;
    readOnly(_: boolean): this;
    gutterMarkerWidth(): number;
    gutterMarkerWidth(_: number): this;
    markerTextAlign(): string;
    markerTextAlign(_: string): this;
    showHints(): boolean;
    showHints(_: boolean): this;
}
Editor.prototype.publish("markerTextAlign", "right", "string", "Gutter marker text alignment", ["left", "center", "right"]);
Editor.prototype.publish("readOnly", false, "boolean", "If true, the contents will be uneditable");
Editor.prototype.publish("gutterMarkerWidth", 0, "number", "Width of gutter marker column displayed to the left of line numbers (pixels)");
Editor.prototype.publish("showHints", false, "boolean", "Show autocomplete hints on ctrl+space");
