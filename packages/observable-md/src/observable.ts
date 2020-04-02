import { HTMLWidget, publish } from "@hpcc-js/common";
import { parseModule } from "@observablehq/parser";
import { Inspector, Library, Runtime } from "@observablehq/runtime";
import * as stdlib from "./stdlib/index";
import { calcRefs, createFunction, encodeMD, errorMessage, FuncTypes } from "./util";

import "@observablehq/inspector/dist/inspector.css";
import "../src/observable.css";

export class ObservableMD extends HTMLWidget {

    constructor() {
        super();
    }

    @publish("", "string", "Markdown Text")
    markdown: publish<this, string>;

    @publish({}, "object", "Plugins")
    plugins: publish<this, { [key: string]: object }>;

    @publish(false, "boolean", "Show Observable Values")
    showValues: publish<this, boolean>;

    @publish(false, "boolean", "Show Observable Source Code")
    showCode: publish<this, boolean>;

    private async module(runtime, main, cell) {
        if (cell && cell.body && cell.body.source && cell.body.specifiers) {
            const doImport = new FuncTypes.asyncFunctionType("x", "return import(x)");
            const impMod = await doImport(`https://api.observablehq.com/${cell.body.source.value}.js?v=3`);
            const mod = runtime.module(impMod.default);
            cell.body.specifiers.forEach(s => {
                if (s.view) {
                    if (s.imported.name === s.local.name) {
                        main.import(`viewof ${s.imported.name}`, mod);
                    } else {
                        main.import(`viewof ${s.imported.name}`, `viewof ${s.local.name}`, mod);
                    }
                }
                if (s.imported.name === s.local.name) {
                    main.import(s.imported.name, mod);
                } else {
                    main.import(s.imported.name, s.local.name, mod);
                }
            });
        }
    }

    private async variable(main, observer, cell, str) {
        const id = cell.id ? str.substring(cell.id.start, cell.id.end) : null;
        const body = cell.body ? str.substring(cell.body.start, cell.body.end) : "";
        const refs = calcRefs(cell.references, str);
        const func = createFunction(refs, body, cell.async, cell.generator, cell.body && cell.body.type === "BlockStatement");
        main.variable(observer(id)).define(id, Object.keys(refs), func);
        if (cell.id && cell.id.type === "ViewExpression") {
            const viewID = str.substring(cell.id.id.start, cell.id.id.end);
            main.variable(observer(viewID)).define(viewID, ["Generators", id], (G, _) => G.input(_));
        }
    }

    private async mdPart(runtime, main, observer, inner: string) {
        try {
            const cells = parseModule(inner).cells;
            cells.forEach(async cell => {
                switch (cell.body && cell.body.type) {
                    case "ImportDeclaration":
                        await this.module(runtime, main, cell);
                        break;
                    default:
                        await this.variable(main, observer, cell, inner);
                }
            });
        } catch (e) {
            try {
                const error = encodeMD(errorMessage(e.message, inner));
                const func = createFunction({ md: "md" }, "md`" + error + "`");
                main.variable(observer()).define(undefined, ["md"], func);
            } catch (e) {
                try {
                    const error = encodeMD(errorMessage(e.message, ""));
                    const func = createFunction({ md: "md" }, "md`" + error + "`");
                    main.variable(observer()).define(undefined, ["md"], func);
                } catch (e) {
                    console.log(e.message);
                }
            }
        }
    }

    private createMain() {
        return (runtime, observer) => {
            const main = runtime.module();

            const re = /(```(?:\s|\S)[\s\S]*?```)/g;
            const matches = this.markdown().split(re);
            for (let i = 0; i < matches.length; ++i) {
                const outer = matches[i];
                if (outer.indexOf("``` ") === 0 || outer.indexOf("```\n") === 0) {
                    const inner = outer.substring("```".length, outer.length - 3);
                    if (this.showCode()) {
                        this.mdPart(runtime, main, observer, "md`---`");
                    }
                    this.mdPart(runtime, main, observer, inner);
                    if (this.showCode()) {
                        this.mdPart(runtime, main, observer, "md`" + encodeMD("```javascript\n" + inner.trim() + "\n```") + "`");
                        this.mdPart(runtime, main, observer, "md`---`");
                    }
                } else {
                    this.mdPart(runtime, main, observer, "md`" + encodeMD(outer) + "`");
                }
            }

            const plugins = this.plugins();
            if (Object.keys(plugins).length && this.showValues()) {
                this.mdPart(runtime, main, observer, "md`\n---\n#### Plugins:`");
            }
            for (const key in plugins) {
                main.variable(observer(key)).define(key, [], () => plugins[key]);
            }
            if (this.showValues()) {
                this.mdPart(runtime, main, observer, "md`\n---\n#### Standard Library:`");
            }
            for (const key in stdlib) {
                main.variable(observer(key)).define(key, [], () => stdlib[key]);
            }
            return main;
        };
    }

    _prevHash: string | undefined;
    update(domNode, element) {
        super.update(domNode, element);
        this._placeholderElement
            .style("width", null)
            .style("height", null)
            ;
        element
            .style("width", null)
            .style("height", null)
            ;
        element.classed("hide-values", !this.showValues() ? true : null);
        const hash = this.propertyHash(["markdown", "showValues", "showCode"]);
        if (this._prevHash !== hash) {
            this._prevHash = hash;
            element.html("");
            new Runtime(new Library()).module(this.createMain(), Inspector.into(domNode));
        }
    }
}
ObservableMD.prototype._class += " observable-md_ObservableMD";
