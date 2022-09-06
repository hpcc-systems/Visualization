import { ohq } from "@hpcc-js/observable-shim";
import { ParsedImportCell, ParsedVariable } from "./cst";

export class Writer {

    protected _files: ohq.File[] = [];
    protected _imports: string[] = [];
    protected _functions: string[] = [];
    protected _defines: string[] = [];
    protected _defineUid = 0;
    protected _functionUid = 0;

    constructor() {
    }

    toString() {
        return `\
${this._imports.join("\n")}

${this._functions.join("\n").split("\n) {").join("){")}

export default function define(runtime, observer) {
  const main = runtime.module();

  function toString() { return this.url; }
  const fileAttachments = new Map([
    ${this._files.map(f => `["${f.name}", { url: new URL("${f.url}"), mimeType: ${JSON.stringify(f.mime_type)}, toString }]`).join(",\n    ")}
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));

  ${this._defines.join("\n  ")}

  return main;
}\n`;
    }

    files(files: ohq.File[]) {
        this._files = [...this._files, ...files];
    }

    import(url: string) {
        this._imports.push(`import define${++this._defineUid} from "${url}"; `);
    }

    importDefine(imp: Partial<ParsedImportCell>) {
        const injections = imp.injections.map(inj => {
            return inj.name === inj.alias ?
                `"${inj.name}"` :
                `{name: "${inj.name}", alias: "${inj.alias}"}`;
        });
        const derive = imp.injections.length ? `.derive([${injections.join(", ")}], main)` : "";
        this._defines.push(`const child${this._defineUid} = runtime.module(define${this._defineUid})${derive};`);
        imp.specifiers.forEach(s => {
            this._defines.push(`main.import("${s.name}"${s.alias && s.alias !== s.name ? `, "${s.alias}"` : ""}, child${this._defineUid}); `);
        });
    }

    function(variable: Partial<ParsedVariable>) {
        let id = variable.id ?? `${++this._functionUid}`;
        const idParts = id.split(" ");
        id = `_${idParts[idParts.length - 1]}`;
        this._functions.push(`${variable.func?.toString()?.replace("anonymous", `${id}`)}`);
        return id;
    }

    define(variable: Partial<ParsedVariable>, observable = true, inlineFunc = false, funcId?: string) {
        funcId = funcId ?? variable.id;
        const observe = observable ? `.variable(observer(${variable.id ? JSON.stringify(variable.id) : ""}))` : "";
        const id = variable.id ? `${JSON.stringify(variable.id)}, ` : "";
        const inputs = variable.inputs.length ? `[${variable.inputs.map(i => JSON.stringify(i)).join(", ")}], ` : "";
        const func = inlineFunc ?
            variable.func?.toString() :
            funcId;
        this._defines.push(`main${observe}.define(${id}${inputs}${func});`);
    }

    error(msg: string) {
    }
}

