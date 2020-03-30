import { HTMLWidget, publish } from "@hpcc-js/common";
import { parseModule } from "@observablehq/parser";
import { Inspector, Library, Runtime } from "@observablehq/runtime";

import "@observablehq/inspector/dist/inspector.css";
import "../src/observable.css";

//  Dynamic Functions ---
const FuncTypes = (new Function(`
return {
    functionType: Object.getPrototypeOf(function () { }).constructor,
    asyncFunctionType: Object.getPrototypeOf(async function () { }).constructor,
    generatorFunctionType: Object.getPrototypeOf(function* () { }).constructor,
    asyncGeneratorFunctionType: Object.getPrototypeOf(async function* () { }).constructor
};
`))();

function funcType(async: boolean = false, generator: boolean = false) {
    if (!async && !generator) return FuncTypes.functionType;
    if (async && !generator) return FuncTypes.asyncFunctionType;
    if (!async && generator) return FuncTypes.generatorFunctionType;
    return FuncTypes.asyncGeneratorFunctionType;
}

function createFunction(refs: { [key: string]: string }, _body: string, async = false, generator = false, blockStatement = false) {
    const args = [];
    let body = _body;
    for (const key in refs) {
        args.push(refs[key]);
        if (key !== refs[key]) {
            body = body.split(key).join(refs[key]);
        }
    }
    return new (funcType(async, generator))(...args, blockStatement ? body : `{ return (${body}); }`);
}

//  Widget  ---
function encodeMD(str: string) {
    return str
        .split("`").join("\\`")
        .split("$").join("\$")
        ;
}

function calcRefs(refs, str): { [key: string]: string } {
    if (refs === undefined) return {};
    const dedup = {};
    refs.forEach(r => {
        if (r.name) {
            dedup[r.name] = r.name.split(" ").join("_");
        } else if (r.start !== undefined && r.end !== undefined) {
            const name = str.substring(r.start, r.end);
            dedup[name] = name.split(" ").join("_");
        }
    });
    return dedup;
}

function errorMessage(message, code) {
    const msg = `\
---
<span style="color:red">${message}</span>
\`\`\`javascript
${code}
\`\`\`
---
`;
    return msg;
}

export class ObservableMD extends HTMLWidget {

    private _runtime = new Runtime(new Library());

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

    private variable(main, observer, cell, str) {
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

    private module(main, observer, inner: string) {
        try {
            const cells = parseModule(inner).cells;
            cells.forEach(cell => {
                this.variable(main, observer, cell, inner);
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
                        this.module(main, observer, "md`---`");
                    }
                    this.module(main, observer, inner);
                    if (this.showCode()) {
                        this.module(main, observer, "md`" + encodeMD("```javascript\n" + inner.trim() + "\n```") + "`");
                        this.module(main, observer, "md`---`");
                    }
                } else {
                    this.module(main, observer, "md`" + encodeMD(outer) + "`");
                }
            }

            const plugins = this.plugins();
            if (Object.keys(plugins).length && this.showValues()) {
                this.module(main, observer, "md`\n---\n#### Plugins:`");
            }
            for (const key in plugins) {
                main.variable(observer(key)).define(key, [], () => plugins[key]);
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
            this._runtime.module(this.createMain(), Inspector.into(domNode));
        }
    }
}
ObservableMD.prototype._class += " observable-md_ObservableMD";
