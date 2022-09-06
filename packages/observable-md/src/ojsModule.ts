import { dirname, join } from "@hpcc-js/util";
import { parseCell, parseModule } from "@hpcc-js/observable-shim";
import { OJSRuntime } from "./ojsRuntime";
import { OJSVariable } from "./ojsVariable";
import { omd2ojs } from "./parsers";
import { OJSSyntaxError, obfuscatedImport } from "./util";

export class OJSModule {

    protected _ojsRuntime: OJSRuntime;
    protected _id: string;
    readonly _module;
    protected _ojs: string;
    protected _folder: string;

    protected _variableMap: { [id: string]: OJSVariable } = {};
    protected _variables: OJSVariable[] = [];

    constructor(ojsRuntime: OJSRuntime, id: string, module, ojs: string, folder: string) {
        this._ojsRuntime = ojsRuntime;
        this._id = id;
        this._module = module;
        this._ojs = ojs;
        this._folder = folder;
    }

    variables() {
        return this._variables;
    }

    async fetchUrl(url) {
        return fetch(url).then(r => r.text());
    }

    async importFile(partial) {
        const path = join(this._folder, partial);
        let ojs = await this.fetchUrl(path);
        if (partial.indexOf(".omd") > 1) {
            ojs = omd2ojs(ojs).ojsArr.map(row => row.ojs).join("\n");
        }

        const context = this;
        return {
            default: function define(runtime, observer) {
                const newModule = runtime.module();
                const ojsModule = new OJSModule(context._ojsRuntime, partial, newModule, ojs, dirname(path));
                ojsModule.parse(true);
            }
        };
    }

    async importNotebook(partial) {
        return obfuscatedImport(`https://api.observablehq.com/${partial[0] === "@" ? partial : `d/${partial}`}.js?v=3`);
    }

    private async module(cell, idx) {
        if (cell && cell.body && cell.body.source && cell.body.specifiers) {
            const impMod: any = [".", "/"].indexOf(cell.body.source.value[0]) === 0 ? await this.importFile(cell.body.source.value) : await this.importNotebook(cell.body.source.value);
            let mod = this._ojsRuntime.module(impMod.default);
            if (cell.body.injections) {
                mod = mod.derive(cell.body.injections.map(inj => {
                    return { name: inj.imported.name, alias: inj.local.name };
                }), this._module);
            }
            cell.body.specifiers.forEach(s => {
                if (s.view) {
                    if (s.imported.name === s.local.name) {
                        this._module.import(`viewof ${s.imported.name}`, mod);
                    } else {
                        this._module.import(`viewof ${s.imported.name}`, `viewof ${s.local.name}`, mod);
                    }
                }
                if (s.imported.name === s.local.name) {
                    this._module.import(s.imported.name, mod);
                } else {
                    this._module.import(s.imported.name, s.local.name, mod);
                }
            });
        }
    }

    async parse(foreign = false): Promise<OJSVariable[]> {
        const retVal: OJSVariable[] = [];
        try {
            const cells = parseModule(this._ojs);
            let idx = 0;
            for (const cell of cells) {
                const cellAst = parseCell(cell);
                switch (cellAst.body && cellAst.body.type) {
                    case "ImportDeclaration":
                        await this.module(cellAst, idx);
                        break;
                    default:
                        const ojsVar = new OJSVariable(this._ojsRuntime, this._module, cellAst, foreign);
                        const id = ojsVar.id();
                        if (!foreign) {
                            if (id) {
                                this._variableMap[id] = ojsVar;
                            }
                            this._variables.push(ojsVar);
                        }
                        retVal.push(ojsVar);
                }
                ++idx;
            }
        } catch (e) {
            const pos = e.pos || 0;
            let raisedAt = e.raisedAt || pos;
            raisedAt += raisedAt === pos ? 1 : 0;
            throw new OJSSyntaxError(pos, raisedAt, e.message);
        }
        return retVal;
    }
}

