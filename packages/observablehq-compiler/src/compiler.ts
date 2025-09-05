
import { type Notebook, type Definition, compileNotebook, fixRelativeUrl, isRelativePath, obfuscatedImport } from "./kit/index.ts";
import { ohq, splitModule } from "./observable-shim.ts";
import { parseCell, ParsedImportCell } from "./cst.ts";
import { Writer } from "./writer.ts";
import { encodeBacktick, fetchEx, ojs2notebook, omd2notebook } from "./util.ts";

//  Inspector Factory  ---
export type InspectorFactoryEx = (name: string | undefined, id: string | number) => Inspector;

export interface Inspector {
    _node?: HTMLDivElement;
    pending(): void;
    fulfilled(value: any): void;
    rejected(error: Error): void;
}

//  Module  ---

interface ImportDefine {
    (runtime: ohq.Runtime, inspector?: InspectorFactoryEx): ohq.Module;
    delete: () => void;
    write: (w: Writer) => void;
}

async function importFile(relativePath: string, baseUrl: string) {
    const path = fixRelativeUrl(relativePath, baseUrl);
    const content = await fetchEx(path).then(r => r.text());
    let notebook: ohq.Notebook;
    if (relativePath.endsWith(".ojsnb")) {
        notebook = JSON.parse(content);
    } else if (relativePath.endsWith(".ojs")) {
        notebook = ojs2notebook(content);
    } else if (relativePath.endsWith(".omd")) {
        notebook = omd2notebook(content);
    } else {
        console.warn(`Unknown file type: ${relativePath}, assuming .ojsnb`);
        notebook = JSON.parse(content);
    }
    const retVal: ImportDefine = compile(notebook, { baseUrl }) as any;
    retVal.delete = () => { };
    retVal.write = (w: Writer) => {
        w.import(path);
    };
    return retVal;
}

// Import precompiled notebook from observable  ---
async function importCompiledNotebook(partial: string) {
    const url = `https://api.observablehq.com/${partial[0] === "@" ? partial : `d/${partial}`}.js?v=3`;
    let impMod = {
        default: function (runtime: ohq.Runtime, inspector?: InspectorFactoryEx): ohq.Module | undefined {
            return undefined;
        } as any
    };
    try {
        impMod = await obfuscatedImport(url);
    } catch (e) {
    }
    const retVal: ImportDefine = impMod.default;
    retVal.delete = () => { };
    retVal.write = (w: Writer) => {
        w.import(url);
    };
    return retVal;
}

// Recursive notebook parsing and compiling
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
    retVal.delete = () => { };
    retVal.write = (w: Writer) => {
        w.import(url);
    };
    return retVal;
}

async function createModule(node: ohq.Node, parsed: ParsedImportCell, text: string, { baseUrl, importMode }: CompileOptions) {
    const otherModule = isRelativePath(parsed.src) ?
        await importFile(parsed.src, baseUrl ?? "") :
        importMode === "recursive" ?
            await importNotebook(parsed.src) :
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

    const retVal = (runtime: ohq.Runtime, main: ohq.Module, inspector?: InspectorFactoryEx) => {

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
    retVal.delete = () => {
        importVariables.forEach(v => v.delete());
        variables.forEach(v => v.delete());
        otherModule.delete();
    };
    retVal.write = (w: Writer) => {
        otherModule.write(w);
        w.importDefine(parsed);
    };
    return retVal;
}
type ModuleFunc = Awaited<ReturnType<typeof createModule>>;

//  Variable  ---
function createVariable(node: ohq.Node, inspect: boolean, name?: string, inputs?: string[], definition?: any, inline = false) {

    let i: ohq.Inspector | undefined;
    let v: ohq.Variable | undefined;

    const retVal = (module: ohq.Module, inspector?: InspectorFactoryEx) => {
        if (inspect && inspector) {
            i = inspector(name, node.id);
        }
        v = module.variable(i);
        if (arguments.length > 1) {
            try {
                v.define(name, inputs, definition);
            } catch (e: any) {
                console.error(e?.message);
            }
        }
        if (node.pinned) {
            v = inspector ? module.variable(inspector(name, node.id)) : module.variable();
            try {
                v.define(undefined, ["md"], (md: any) => {
                    return md`\`\`\`js
${node.value}
\`\`\``;
                });
            } catch (e: any) {
                console.error(e?.message);
            }
        }
        return v;
    };
    retVal.delete = () => {
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

function createImportVariable(name: string, alias?: string) {

    let v: ohq.Variable;

    const retVal = (main: ohq.Module, otherModule: ohq.Module) => {
        v = main.variable();
        if (alias === undefined) {
            v.import(name, otherModule);
        } else {
            v.import(name, alias, otherModule);
        }
    };

    retVal.delete = () => {
        v?.delete();
    };
    return retVal;
}
type ImportVariableFunc = ReturnType<typeof createImportVariable>;

// Cell  ---
async function createCell(node: ohq.Node, options: CompileOptions) {
    const modules: ModuleFunc[] = [];
    const variables: VariableFunc[] = [];
    try {
        const text = node.mode && node.mode !== "js" ? `${node.mode}\`${encodeBacktick(node.value)}\`` : node.value;
        const parsedModule = splitModule(text);
        for (const cell of parsedModule) {
            const parsed = parseCell(cell.text, options.baseUrl ?? "");
            switch (parsed.type) {
                case "import":
                    modules.push(await createModule(node, parsed, cell.text, options));
                    break;
                case "viewof":
                    variables.push(createVariable(node, true, parsed.variable.id, parsed.variable.inputs, parsed.variable.func));
                    variables.push(createVariable(node, false, parsed.variableValue.id, parsed.variableValue.inputs, parsed.variableValue.func, true));
                    break;
                case "mutable":
                    variables.push(createVariable(node, false, parsed.initial.id, parsed.initial.inputs, parsed.initial.func));
                    variables.push(createVariable(node, false, parsed.variable.id, parsed.variable.inputs, parsed.variable.func));
                    variables.push(createVariable(node, true, parsed.variableValue.id, parsed.variableValue.inputs, parsed.variableValue.func, true));
                    break;
                case "variable":
                    variables.push(createVariable(node, true, parsed.id, parsed.inputs, parsed.func));
                    break;
            }
        }
    } catch (e: any) {
        variables.push(createVariable(node, true, undefined, [], e.message ?? "Unkown error"));
    }

    const retVal = (runtime: ohq.Runtime, main: ohq.Module, inspector?: InspectorFactoryEx) => {
        modules.forEach(imp => imp(runtime, main, inspector));
        variables.forEach(v => v(main, inspector));
    };
    retVal.id = node.id;
    retVal.modules = modules;
    retVal.variables = variables;
    retVal.delete = () => {
        variables.forEach(v => v.delete());
        modules.forEach(mod => mod.delete());
    };
    retVal.write = (w: Writer) => {
        modules.forEach(imp => imp.write(w));
        variables.forEach(v => v.write(w));
    };
    return retVal;
}
export type CellFunc = Awaited<ReturnType<typeof createCell>>;

//  File  ---
function createFile(file: ohq.File, options: CompileOptions): [string, any] {
    function toString() {
        // TODO Double check url should not be URL?
        return (globalThis as any).url ?? "";
    }
    return [file.name, { url: new URL(fixRelativeUrl(file.url, options.baseUrl ?? "")), mimeType: file.mime_type, toString }];
}
type FileFunc = ReturnType<typeof createFile>;

//  Interpret  ---
export interface CompileOptions {
    baseUrl?: string;
    importMode?: "recursive" | "precompiled";
}
export function notebook(_files: ohq.File[] = [], _cells: CellFunc[] = [], { baseUrl = ".", importMode = "precompiled" }: CompileOptions = {}) {
    const files: FileFunc[] = _files.map(f => createFile(f, { baseUrl, importMode }));
    const fileAttachments = new Map<string, any>(files);
    const cells = new Map<string | number, CellFunc>(_cells.map(c => [c.id, c]));

    const retVal = (runtime: ohq.Runtime, inspector?: InspectorFactoryEx): ohq.Module => {
        const main = runtime.module();
        main.builtin("FileAttachment", runtime.fileAttachments(name => {
            return fileAttachments.get(name) ?? { url: new URL(fixRelativeUrl(name, baseUrl)), mimeType: null };
        }));
        main.builtin("fetchEx", fetchEx);

        cells.forEach(cell => {
            cell(runtime, main, inspector);
        });
        return main;
    };
    retVal.fileAttachments = fileAttachments;
    retVal.cells = cells;
    retVal.set = async (n: ohq.Node): Promise<CellFunc> => {
        const cell = await createCell(n, { baseUrl, importMode });
        retVal.delete(cell.id);
        cells.set(cell.id, cell);
        return cell;
    };
    retVal.get = (id: string | number): CellFunc | undefined => {
        return cells.get(id);
    };
    retVal.delete = (id: string | number): boolean => {
        const cell = cells.get(id);
        if (cell) {
            cell.delete();
            return cells.delete(id);
        }
        return false;
    };
    retVal.clear = () => {
        cells.forEach(cell => cell.delete());
        cells.clear();
    };
    retVal.write = (w: Writer) => {
        w.files(_files);
        cells.forEach(cell => cell.write(w));
    };
    retVal.toString = (w = new Writer()) => {
        retVal.write(w);
        return w.toString().trim();
    };
    return retVal;
}
type NotebookFunc = ReturnType<typeof notebook>;

export function isNotebookKit(value: any): value is Notebook {
    return !!value && Array.isArray(value.cells);
}

export function isOhqNotebook(value: any): value is ohq.Notebook {
    return !!value && Array.isArray(value.nodes);
}
export async function compile(notebookOrOjs: Notebook): Promise<Definition[]>;
export async function compile(notebookOrOjs: ohq.Notebook, options?: CompileOptions): Promise<NotebookFunc>;
export async function compile(notebookOrOjs: string, options?: CompileOptions): Promise<NotebookFunc>;
export async function compile(notebookOrOjs: Notebook | ohq.Notebook | string, { baseUrl = ".", importMode = "precompiled" }: CompileOptions = {}) {
    if (isNotebookKit(notebookOrOjs)) {
        return compileNotebook(notebookOrOjs);
    } else if (typeof notebookOrOjs === "string") {
        notebookOrOjs = ojs2notebook(notebookOrOjs);
    }
    const _cells: CellFunc[] = await Promise.all(notebookOrOjs.nodes.map(n => createCell(n, { baseUrl, importMode })));
    return notebook(notebookOrOjs.files, _cells, { baseUrl, importMode });
}
export type CompileFunc = Awaited<ReturnType<typeof compile>>;
