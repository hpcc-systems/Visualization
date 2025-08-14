import { Identifier } from "acorn";
import { FileAttachments } from "@observablehq/stdlib";
import { type Notebook, type Cell, parseJavaScript, transpile, type TranspiledJavaScript } from "@observablehq/notebook-kit";
import { type DefineState, type Definition } from "@observablehq/notebook-kit/runtime";
import type { Inspector } from "@observablehq/inspector";
import type { Runtime, Module } from "@observablehq/runtime";
import { define } from "@observablehq/notebook-kit/runtime";
import { fixRelativeUrl } from "../util/paths.ts";
import { fetchEx } from "../util/comms.ts";
import { html2notebook } from "./util.ts";

export type InspectorFactory = (name: string | undefined, id: string | number) => Inspector;

const FunctionConstructors = {
    regular: Object.getPrototypeOf(function () { }).constructor,
    async: Object.getPrototypeOf(async function () { }).constructor,
    generator: Object.getPrototypeOf(function* () { }).constructor,
    asyncGenerator: Object.getPrototypeOf(async function* () { }).constructor,
} as const;

type FunctionConstructor =
    | typeof FunctionConstructors.regular
    | typeof FunctionConstructors.async
    | typeof FunctionConstructors.generator
    | typeof FunctionConstructors.asyncGenerator;

type FunctionLikeExpression = {
    type: "FunctionExpression" | "ArrowFunctionExpression";
    body: { type: "BlockStatement" | "Expression"; start: number; end: number };
    async?: boolean;
    generator?: boolean;
    params?: Identifier[];
};

function constructFunction(input: string) {
    const { body } = parseJavaScript(input) as { body: FunctionLikeExpression };
    if (body.type !== "FunctionExpression" && body.type !== "ArrowFunctionExpression") {
        throw new Error(`Unsupported function type: ${body.type}`);
    }

    const Constructor = (body.async && body.generator) ?
        FunctionConstructors.asyncGenerator :
        body.async ?
            FunctionConstructors.async :
            body.generator ?
                FunctionConstructors.generator :
                FunctionConstructors.regular;

    const params = body.params?.map(param => input.substring(param.start, param.end)).join(", ") || "";
    const bodyStr = body.body.type === "BlockStatement" ? input.substring(body.body.start, body.body.end).slice(1, -1).trim() : input.substring(body.body.start, body.body.end);
    return Constructor(params, bodyStr);
}
interface CellEx extends Cell {
    transpiled: TranspiledJavaScript;
}
function transpileCell(cell: Cell): CellEx {
    const retVal: CellEx = {
        ...cell,
        transpiled: transpile(cell.value, cell.mode)
    };
    retVal.transpiled.body = constructFunction(retVal.transpiled.body);
    return retVal;
}
export interface CompileOptions {
    baseUrl?: string;
    importMode?: "recursive" | "precompiled";
}
export function notebook(_cells: CellEx[] = [], { baseUrl = ".", importMode = "precompiled" }: CompileOptions = {}) {
    const stateById = new Map<number, DefineState>();

    function add(vscodeCellID: number, definition: Definition, inspector: Inspector): void {
        let state = stateById.get(vscodeCellID);
        if (state) {
            state.variables.forEach((v) => v.delete());
            state.variables = [];
        } else {
            state = { root: inspector._node, expanded: [], variables: [] };
            stateById.set(vscodeCellID, state);
        }
        define(state, definition);
    }

    function remove(vscodeCellID: number): void {
        const state = stateById.get(vscodeCellID)!;
        state.root.remove();
        state.variables.forEach((v) => v.delete());
        stateById.delete(vscodeCellID);
    }

    function removeAll(): void {
        const keys = Array.from(stateById.keys());
        for (const key of keys) {
            remove(key);
        }
    }

    const files: any[] = [];
    const fileAttachmentsMap = new Map<string, any>(files);
    const cells = new Map<number, CellEx>(_cells.map(c => [c.id, c]));

    const retVal = (runtime: Runtime, inspectorFactory: InspectorFactory): Module => {
        runtime.main.builtin("fetchEx", fetchEx);
        cells.forEach(cell => {
            const inspector = inspectorFactory(`cell-${cell.id}`, cell.id);
            add(cell.id, { id: cell.id, ...cell.transpiled }, inspector);
        });
        return runtime.main;
    };
    retVal.fileAttachments = fileAttachmentsMap;
    retVal.cells = cells;
    // retVal.set = async (n: Cell): Promise<JavaScriptCell> => {
    //     const cell = await transpileCell(n, { baseUrl, importMode });
    //     retVal.delete(cell.id);
    //     cells.set(cell.id, cell);
    //     return cell;
    // };
    // retVal.get = (id: string | number): JavaScriptCell | undefined => {
    //     return cells.get(id);
    // };
    // retVal.delete = (id: string | number): boolean => {
    //     const cell = cells.get(id);
    //     if (cell) {
    //         cell.delete();
    //         return cells.delete(id);
    //     }
    //     return false;
    // };
    // retVal.clear = () => {
    //     cells.forEach(cell => cell.delete());
    //     cells.clear();
    // };
    // retVal.write = (w: Writer) => {
    //     w.files(_files);
    //     cells.forEach(cell => cell.write(w));
    // };
    // retVal.toString = (w = new Writer()) => {
    //     retVal.write(w);
    //     return w.toString().trim();
    // };
    return retVal;
}

export function compile(notebookOrOjs: Notebook | string, { baseUrl = ".", importMode = "precompiled" }: CompileOptions = {}) {
    const htmlNotebook = typeof notebookOrOjs === "string" ? html2notebook(notebookOrOjs) : notebookOrOjs;
    const _cells: CellEx[] = htmlNotebook.cells.map(n => transpileCell(n));
    return notebook(_cells, { baseUrl, importMode });
}
export type compileFunc = Awaited<ReturnType<typeof compile>>;
