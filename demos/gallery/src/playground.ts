import { JSEditor } from "@hpcc-js/codemirror";
import { Widget } from "@hpcc-js/common";
import { PropertyEditor } from "@hpcc-js/other";
import { DockPanel } from "@hpcc-js/phosphor";
import { DemoWidget } from "./DemoWidget";

declare const System: any;

export class App extends DockPanel {

    _skipUpdate: boolean = false;
    _editor = new JSEditor()
        .on("changes", (changes) => {
            this.changed(this._editor);
        })
        ;
    _propEditor = new PropertyEditor();
    _demo = new DemoWidget()
        .on("changed", (widget: Widget) => {
            this.changed(this._demo);
        })
        ;

    constructor(path) {
        super();
        this._propEditor.monitor((id, newValue, oldValue, source) => {
            this.changed(this._propEditor);
        });
        window["cm_editor"] = this._editor;

        this.addWidget(this._demo, '<div id="target">');
        this.addWidget(this._propEditor, "Properties", "split-right", this._demo);
        this.addWidget(this._editor, "JavaScript", "split-bottom", this._demo);
    }

    load(fileName) {
        System.import(`./samples/${fileName}.js!./plugins/text.js`).then(text => {
            this._editor.text(text);
        });
    }

    loadPath(fileName) {
        System.import(`${fileName}!./plugins/text.js`).then(text => {
            this._editor.text(text);
        });
    }

    changed(source: Widget) {
        switch (source) {
            case this._demo:
                this._propEditor
                    .widget(this._demo._widget)
                    .render()
                    ;
                break;
            case this._editor:
                if (this._skipUpdate) {
                    this._skipUpdate = false;
                } else {
                    this._demo.lazyRender();
                }
                break;
            case this._propEditor:
                if (this._editor.hasFocus()) {
                    return;
                }
                if (this._demo._widget) {
                    this._demo._widget
                        .lazyRender()
                        ;
                    this.syncJavaScript(this._demo._widget);
                }
                break;
        }
    }

    syncJavaScript(w: Widget) {
        const srcCodeLines = this._editor.text().split("\n");
        const props = w.serialize();
        let renderIdx = 0;
        let inProps = false;
        for (let i = srcCodeLines.length - 1; i >= 0; --i) {
            const line = srcCodeLines[i];
            const dotIndex = line.indexOf(".");
            const parenIndex = line.indexOf("(");
            if (dotIndex >= 0 && parenIndex > dotIndex) {
                const func = line.substring(dotIndex + 1, parenIndex);
                switch (func) {
                    case "render":
                        inProps = true;
                        renderIdx = i;
                        break;
                    case "target":
                        inProps = false;
                        break;
                    case "columns":
                    case "data":
                        break;
                    default:
                        if (inProps) {
                            if (props[func]) {
                                srcCodeLines[i] = srcCodeLines[i].substring(0, parenIndex) + `(${JSON.stringify(props[func])})`;
                                delete props[func];
                            } else {
                                srcCodeLines.splice(i, 1);
                                renderIdx--;
                            }
                        }
                }
            }
        }
        for (const key in props) {
            if (typeof w[key] === "function") {
                srcCodeLines.splice(renderIdx, 0, `    .${key}(${JSON.stringify(props[key])})`);
            }
        }
        this._skipUpdate = true;
        this._editor.text(srcCodeLines.join("\n"));
    }
}
