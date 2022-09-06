import type { ohq } from "@hpcc-js/observable-shim";

import { endsWith, join } from "@hpcc-js/util";
import { parseCell, ParsedImportCell } from "./cst";
import { Writer } from "./writer";
import { encodeBacktick, fetchEx, obfuscatedImport, ojs2notebook, omd2notebook } from "./util";

interface ImportDefine {
    (runtime: ohq.Runtime, inspector?: ohq.InspectorFactory): ohq.Module;
    dispose: () => void;
    write: (w: Writer) => void;
}

async function importFile(relativePath: string, baseUrl: string) {
    const path = join(baseUrl, relativePath);
    const content = await fetchEx(path).then(r => r.text());
    let notebook: ohq.Notebook;
    if (endsWith(relativePath, ".ojsnb")) {
        notebook = JSON.parse(content);
    } else if (endsWith(relativePath, ".ojs")) {
        notebook = ojs2notebook(content);
    } else if (endsWith(relativePath, ".omd")) {
        notebook = omd2notebook(content);
    }
    const retVal: ImportDefine = compile(notebook, baseUrl) as any;
    retVal.dispose = () => { };
    retVal.write = (w: Writer) => {
        w.import(path);
    };
    return retVal;
}

// @ts-ignore - use precompiled notebook from observable
async function importCompiledNotebook(partial: string) {
    const url = `https://api.observablehq.com/${partial[0] === "@" ? partial : `d/${partial}`}.js?v=3`;
    let impMod = {
        default: function (runtime: ohq.Runtime, inspector?: ohq.InspectorFactory): ohq.Module {
            return undefined;
        } as any
    };
    try {
        impMod = await obfuscatedImport(url);
    } catch (e) {
    }
    const retVal: ImportDefine = impMod.default;
    retVal.dispose = () => { };
    retVal.write = (w: Writer) => {
        w.import(url);
    };
    return retVal;
}

// @ts-ignore - recursive notebook parsing and compiling
async function importNotebook(partial: string) {
    const url = `https://api.observablehq.com/document/${partial}`;
    const notebook = fetchEx(url)
        .then(r => {
            return r.json();
        }).catch(e => {
            console.error(url);
            console.error(e);
        });
    const retVal: ImportDefine = compile(await notebook) as any;
    retVal.dispose = () => { };
    retVal.write = (w: Writer) => {
        w.import(url);
    };
    return retVal;
}

function createVariable(inspect: boolean, name?: string, inputs?: string[], definition?: any, inline = false) {

    let i: ohq.Inspector;
    let v: ohq.Variable;

    const retVal = (module: ohq.Module, inspector?: ohq.InspectorFactory) => {
        i = inspect ? inspector(name) : undefined;
        v = module.variable(i);
        if (arguments.length > 1) {
            try {
                v.define(name, inputs, definition);
            } catch (e: any) {
                console.error(e?.message);
            }
        }
        return v;
    };
    retVal.dispose = () => {
        try {
            i?._node?.remove();
        } catch (e) {
        }
        i = undefined;
        try {
            v?.delete();
        } catch (e) {
        }
        v = undefined;
    };
    retVal.write = (w: Writer) => {
        if (inline) {
            w.define({ id: name, inputs, func: definition }, inspect, true);
        } else {
            const id = w.function({ id: name, func: definition });
            w.define({ id: name, inputs, func: definition }, inspect, false, id);
        }
    };
    return retVal;
}
type VariableFunc = ReturnType<typeof createVariable>;

function createImportVariable(name?: string, alias?: string) {

    let v: ohq.Variable;

    const retVal = (main: ohq.Module, otherModule: ohq.Module) => {
        v = main.variable();
        v.import(name, alias, otherModule);
    };

    retVal.dispose = () => {
        v?.delete();
    };
    return retVal;
}
type ImportVariableFunc = ReturnType<typeof createImportVariable>;

async function createModule(parsed: ParsedImportCell, text: string, baseUrl: string) {
    const otherModule = [".", "/"].indexOf(parsed.src[0]) === 0 ?
        await importFile(parsed.src, baseUrl) :
        await importCompiledNotebook(parsed.src);

    const importVariables: ImportVariableFunc[] = [];
    const variables: VariableFunc[] = [];
    parsed.specifiers.forEach(spec => {
        const viewof = spec.view ? "viewof " : "";
        importVariables.push(createImportVariable(viewof + spec.name, viewof + spec.alias));
        if (spec.view) {
            importVariables.push(createImportVariable(spec.name, spec.alias));
        }
    });
    variables.push(createVariable(true, undefined, ["md"], md => {
        return md`\`\`\`JavaScript
${text}
\`\`\``;
    }));

    const retVal = (runtime: ohq.Runtime, main: ohq.Module, inspector?: ohq.InspectorFactory) => {

        let mod = runtime.module(otherModule);
        if (parsed.injections.length) {
            mod = mod.derive(parsed.injections, main);
        }
        variables.forEach(v => v(main, inspector));
        importVariables.forEach(v => v(main, mod));
        return mod;
    };
    retVal.importVariables = importVariables;
    retVal.variables = variables;
    retVal.dispose = () => {
        importVariables.forEach(v => v.dispose());
        variables.forEach(v => v.dispose());
        otherModule.dispose();
    };
    retVal.write = (w: Writer) => {
        otherModule.write(w);
        w.importDefine(parsed);
    };
    return retVal;
}
type ModuleFunc = Awaited<ReturnType<typeof createModule>>;

async function createCell(node: ohq.Node, baseUrl: string) {
    const modules: ModuleFunc[] = [];
    const variables: VariableFunc[] = [];
    try {
        const text = node.mode && node.mode !== "js" ? `${node.mode}\`${encodeBacktick(node.value)}\`` : node.value;
        const parsed = parseCell(text);
        switch (parsed.type) {
            case "import":
                modules.push(await createModule(parsed, text, baseUrl));
                break;
            case "viewof":
                variables.push(createVariable(true, parsed.variable.id, parsed.variable.inputs, parsed.variable.func));
                variables.push(createVariable(false, parsed.variableValue.id, parsed.variableValue.inputs, parsed.variableValue.func, true));
                break;
            case "mutable":
                variables.push(createVariable(false, parsed.initial.id, parsed.initial.inputs, parsed.initial.func));
                variables.push(createVariable(false, parsed.variable.id, parsed.variable.inputs, parsed.variable.func));
                variables.push(createVariable(true, parsed.variableValue.id, parsed.variableValue.inputs, parsed.variableValue.func, true));
                break;
            case "variable":
                variables.push(createVariable(true, parsed.id, parsed.inputs, parsed.func));
                break;
        }
    } catch (e) {
    }

    const retVal = (runtime: ohq.Runtime, main: ohq.Module, inspector?: ohq.InspectorFactory) => {
        modules.forEach(imp => imp(runtime, main, inspector));
        variables.forEach(v => v(main, inspector));
    };
    retVal.modules = modules;
    retVal.variables = variables;
    retVal.dispose = () => {
        variables.forEach(v => v.dispose());
        modules.forEach(mod => mod.dispose());
    };
    retVal.write = (w: Writer) => {
        modules.forEach(imp => imp.write(w));
        variables.forEach(v => v.write(w));
    };
    return retVal;
}
export type CellFunc = Awaited<ReturnType<typeof createCell>>;

function createFile(file: ohq.File): [string, any] {
    function toString() { return globalThis.url; }
    return [file.name, { url: new URL(file.url), mimeType: file.mime_type, toString }];
}
export type FileFunc = ReturnType<typeof createFile>;

export async function compile(notebook: ohq.Notebook, baseUrl: string = ".") {

    const files = notebook.files.map(f => createFile(f));
    const fileAttachments = new Map<string, any>(files);
    let cells: CellFunc[] = await Promise.all(notebook.nodes.map(n => createCell(n, baseUrl)));

    const retVal = (runtime: ohq.Runtime, inspector?: ohq.InspectorFactory): ohq.Module => {
        const main = runtime.module();
        main.builtin("FileAttachment", runtime.fileAttachments(name => {
            return fileAttachments.get(name) ?? { url: new URL(name), mimeType: null };
        }));
        cells.forEach(cell => {
            cell(runtime, main, inspector);
        });
        return main;
    };
    retVal.fileAttachments = fileAttachments;
    retVal.cells = cells;
    retVal.appendCell = async (n: ohq.Node, baseUrl: string = ".") => {
        const cell = await createCell(n, baseUrl);
        cells.push(cell);
        return cell;
    };
    retVal.disposeCell = async (cell: CellFunc) => {
        cells = cells.filter(c => c !== cell);
        cell.dispose();
    };
    retVal.dispose = () => {
        cells.forEach(cell => cell.dispose());
        cells = [];
    };
    retVal.write = (w: Writer) => {
        w.files(notebook.files);
        cells.forEach(cell => cell.write(w));
    };
    retVal.toString = (w = new Writer()) => {
        retVal.write(w);
        return w.toString().trim();
    };
    return retVal;
}
export type compileFunc = Awaited<ReturnType<typeof compile>>;
