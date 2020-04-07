import { HTMLEditor, ObservableMarkdownEditor } from "@hpcc-js/codemirror";
import { Button, SelectDropDown, Spacer, TitleBar, ToggleButton, Utility } from "@hpcc-js/common";
import { Table } from "@hpcc-js/dgrid";
import { Border2 } from "@hpcc-js/layout";
import { ObservableMD } from "@hpcc-js/observable-md";
import { SplitPanel, TabPanel } from "@hpcc-js/phosphor";
import { html } from "./html";
import { samples } from "./samples";
import { inspect } from "./util";

export class App extends Border2 {

    _buttonGenerate = new Button().faChar("fa-arrow-right").tooltip("Render (Ctrl+S)")
        .on("click", () => {
            this.generate();
        });

    _buttonDownload = new Button().faChar("fa-download").tooltip("Download as Web Page")
        .on("click", () => {
            const omd = this._mdEditor.text();
            Utility.downloadString("TEXT", html(omd), `${this._selectSample.selected() || "omd"}.html`);
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

    _defaultSample: string;
    _selectSample = new SelectDropDown()
        .values(samples)
        .on("click", md => {
            this.updateAddress();
            this._mdEditor
                .markdown(md)
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

    _mdEditor = new ObservableMarkdownEditor()
        .on("changes", () => {
            this.updateToolbar();
        })
        ;

    _mdErrors = new Table()
        .columns(["Type", "Message", "Row", "Col"])
        .sortable(true)
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

    _omd = new ObservableMD()
        .on("runtimeUpdated", () => {
            this.updateErrors();
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
            if (defaultSelection[0] === "@") {
                // @lzxue/the-world-grid-map-use-l7
                inspect(defaultSelection).then(md => {
                    samples[defaultSelection] = md;
                });
            } else {
                defaultSelection = "Hello World";
            }
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

    generate() {
        this.clearErrors();
        const omd = this._mdEditor.text();
        this._omd
            .markdown(this._mdEditor.text())
            .lazyRender()
            ;
        this._html
            .text(html(omd))
            .lazyRender()
            ;
        this.updateToolbar();
    }

    clearErrors() {
        this._mdEditor.removeAllHighlight();
        this._mdErrors
            .data([])
            .lazyRender()
            ;
    }

    updateErrors() {
        this._mdEditor.removeAllHighlight();
        const tableErrors = [];
        this._omd.errors().forEach(e => {
            const startPos = this._mdEditor.positionAt(e.start);
            const endPos = this._mdEditor.positionAt(e.end - 1);
            if (e.source === "syntax") {
                this._mdEditor.highlightError(startPos, endPos);
            } else {
                this._mdEditor.highlightWarning(startPos, endPos);
            }
            tableErrors.push([e.source, e.message, startPos.line, startPos.ch, e.start, e.end]);
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

        this._mdEditor
            .text(samples[this._selectSample.selected()])
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

    updateToolbar() {
        this._buttonGenerate.enabled(this._mdEditor.text() !== this._omd.markdown()).lazyRender();
    }
}
