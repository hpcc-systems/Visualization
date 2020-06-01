import { HTMLEditor, ObservableMarkdownEditor } from "@hpcc-js/codemirror";
import { Button, SelectDropDown, Spacer, TitleBar, ToggleButton, Utility } from "@hpcc-js/common";
import { Table } from "@hpcc-js/dgrid";
import { Border2 } from "@hpcc-js/layout";
import { Observable, OJSRuntimeError } from "@hpcc-js/observable-md";
import { SplitPanel, TabPanel } from "@hpcc-js/phosphor";
import { html } from "./html";
import { samples, SampleT } from "./samples";

const sampleKeys = {};
for (const key in samples) {
    sampleKeys[key] = key;
}

export class App extends Border2 {

    _buttonGenerate = new Button().faChar("fa-arrow-right").tooltip("Render (Ctrl+S)")
        .on("click", () => {
            this.generate();
        });

    _buttonDownload = new Button().faChar("fa-download").tooltip("Download as Web Page")
        .on("click", () => {
            const omd = this._mdEditor.text();
            Utility.downloadString("TEXT", html(omd, this.mode()), `${this._selectSample.selected() || "omd"}.html`);
        });

    _toggleValues = new ToggleButton().faChar("fa-bug").tooltip("Show Developer Info")
        .selected(false)
        .on("click", () => {
            this.updateAddress();
            this._omd
                .showValues(this._toggleValues.selected())
                .lazyRender()
                ;
        });

    _sample: SampleT;
    _selectSample = new SelectDropDown()
        .values(sampleKeys)
        .on("click", key => {
            this._sample = samples[key];
            this.updateAddress();
            this._mdEditor
                .text(this._sample.content)
                .lazyRender()
                ;
            this.generate();
        })
        ;

    _buttonGithub = new Button().faChar("fa-github").tooltip("GitHub Repository")
        .on("click", () => {
            const win = window.open("https://github.com/hpcc-systems/Visualization/tree/master/packages/observable-md", "_blank");
            win.focus();
        })
        ;

    _titleBar = new TitleBar().buttons([this._buttonGenerate, new Spacer(), this._buttonDownload, this._toggleValues, new Spacer(), this._selectSample, new Spacer(), this._buttonGithub])
        .title("Observable Markdown Demo")
        ;

    _mdEditor: ObservableMarkdownEditor = new ObservableMarkdownEditor()
        .on("changes", () => {
            this.updateToolbar();
        })
        ;

    _mdErrors = new Table()
        .columns(["Type", "Message", "Row", "Col"])
        .sortable(true)
        .renderHtml(true)
        .on("click", (row, col, sel) => {
            if (sel) {
                this._mdEditor.setCursor(row.Row, row.Col);
            }
        })
        ;

    _lhsSplit = new SplitPanel("vertical")
        .addWidget(this._mdEditor)
        .addWidget(this._mdErrors)
        ;

    _omd = new Observable()
        .on("runtimeUpdated", () => {
            this.updateErrors(this._omd.errors());
        })
        ;

    _html = new HTMLEditor()
        ;

    _rhsTab = new TabPanel()
        .addWidget(this._omd, "Markdown", { overflowY: "auto" })
        .addWidget(this._html, "HTML")
        ;

    _split = new SplitPanel("horizontal")
        .addWidget(this._lhsSplit)
        .addWidget(this._rhsTab)
        ;

    constructor(defaultSelection?: string, debug = false) {
        super();
        if (!samples[defaultSelection]) {
            defaultSelection = "Hello World (.omd)";
        }
        this._selectSample.selected(defaultSelection);
        this._toggleValues.selected(debug);
    }

    updateAddress() {
        const newUrl = document.location.origin + document.location.pathname + encodeURI(`?${this._selectSample.selected()}${this._toggleValues.selected() === true ? "&debug" : ""}`);
        try {
            window.history.pushState("", "", newUrl);
        } catch (e) {
            //  Local files do not have history...
        }
    }

    mode(): "ojs" | "omd" {
        return this._selectSample.selected().indexOf("(.ojs)") >= 0 ? "ojs" : "omd";
    }

    generate() {
        this.clearErrors();
        const mode = this.mode();
        const text = this._mdEditor.text();

        this._omd
            .mode(mode)
            .text(text)
            .lazyRender()
            ;

        this._html
            .text(html(text, mode))
            .lazyRender()
            ;
        this.updateToolbar();
    }

    updateToolbar() {
        this._buttonGenerate.enabled(this._mdEditor.text() !== this._omd.text()).lazyRender();
    }

    clearErrors() {
        this._mdEditor.removeAllHighlight();
        this._mdErrors
            .data([])
            .lazyRender()
            ;
    }

    updateErrors(errors: OJSRuntimeError[]) {
        this._mdEditor.removeAllHighlight();

        const tableErrors = [];
        errors.forEach(e => {
            const startPos = this._mdEditor.positionAt(e.start);
            const endPos = this._mdEditor.positionAt(e.end - 1);
            if (e.severity === "rejected") {
                this._mdEditor.highlightError(startPos, endPos);
            }
            tableErrors.push([e.severity, e.message, startPos.line, startPos.ch, e.start, e.end]);
        });

        this._mdErrors
            .data(tableErrors)
            .lazyRender()
            ;
    }

    enter(domNode, element) {
        super.enter(domNode, element);

        this.top(this._titleBar);
        this.center(this._split);

        this._sample = samples[this._selectSample.selected()];
        this._mdEditor
            .text(this._sample ? this._sample.content : "")
            ;

        this._omd
            .showValues(this._toggleValues.selected())
            ;

        this.generate();
    }

    update(domNode, element) {
        super.update(domNode, element);
        this.updateToolbar();
    }
}
