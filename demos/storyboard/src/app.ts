import { HTMLEditor, MarkdownEditor } from "@hpcc-js/codemirror";
import { Button, SelectDropDown, Spacer, TitleBar, ToggleButton, Utility } from "@hpcc-js/common";
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

    _toggleCode = new ToggleButton().faChar("fa-code").tooltip("Show Code Inline")
        .on("click", () => {
            this.updateAddress();
            this._omd
                .showCode(this._toggleCode.selected())
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

    _titleBar = new TitleBar().buttons([this._buttonGenerate, this._buttonDownload, new Spacer(), this._toggleValues, this._toggleCode, new Spacer(), this._selectSample, new Spacer(), this._buttonGithub])
        .title("Observable Markdown Demo")
        ;

    _split = new SplitPanel("horizontal");
    _mdEditor = new MarkdownEditor()
        .on("changes", () => {
            this.updateToolbar();
        })
        ;
    _rhsTab = new TabPanel();
    _omd = new ObservableMD();
    _html = new HTMLEditor();

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
        const newUrl = document.location.origin + document.location.pathname + encodeURI(`?${this._selectSample.selected()}${this._toggleValues.selected() === true ? "&debug" : ""}${this._toggleCode.selected() === true ? "&code" : ""}`);
        try {
            window.history.pushState("", "", newUrl);
        } catch (e) {
            //  Local files do not have history...
        }
    }

    generate() {
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

    enter(domNode, element) {
        super.enter(domNode, element);
        this._rhsTab
            .addWidget(this._omd, "Markdown", { overflowY: "auto" })
            .addWidget(this._html, "HTML")
            ;

        this._split
            .addWidget(this._mdEditor)
            .addWidget(this._rhsTab)
            ;

        this.top(this._titleBar);
        this.center(this._split);

        this._mdEditor
            .text(samples[this._selectSample.selected()])
            ;

        this._omd
            .showValues(this._toggleValues.selected())
            .showCode(this._toggleCode.selected())
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
