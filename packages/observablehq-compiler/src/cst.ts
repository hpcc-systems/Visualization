import { parseCell as ohqParseCell, ancestor, walk } from "@hpcc-js/observable-shim";
import { createFunction, Refs } from "./util";

function calcRefs(cellAst, cellStr): Refs {
    if (cellAst.references === undefined) return { inputs: [], args: [], patches: [] };

    const dedup = {};
    cellAst.references.forEach(r => dedup[cellStr.substring(r.start, r.end)] = true);
    const retVal: Refs = {
        inputs: Object.keys(dedup),
        args: Object.keys(dedup).map(r => r.split(" ").join("_")),
        patches: []
    };
    const pushPatch = (node, newText) => retVal.patches.push({ start: node.start - cellAst.body.start, end: node.end - cellAst.body.start, newText });
    if (cellAst.body) {
        ancestor(cellAst.body, {
            Identifier(node) {
                const value = cellStr.substring(node.start, node.end);
                if (dedup[value]) {
                }
            },
            MutableExpression(node) {
                const value = cellStr.substring(node.start, node.end);
                const newText = value.split(" ").join("_") + ".value";
                pushPatch(node, newText);
            },
            ViewExpression(node) {
                const value = cellStr.substring(node.start, node.end);
                const newText = value.split(" ").join("_");
                pushPatch(node, newText);
            },
            ThisExpression(node, ancestors: acorn.Node[]) {
                const value = cellStr.substring(node.start, node.end);
                if (value === "this" && !ancestors.find(n => n.type === "FunctionExpression")) {
                    pushPatch(node, "((this === globalThis || this === globalThis.window)? undefined : this?.valueOf())");
                }
            }
        }, walk);
    }
    return retVal;
}

export interface ParsedCell {
    type: "import" | "viewof" | "mutable" | "variable" | "identifier"
}

export interface ParsedImportCell extends ParsedCell {
    type: "import"
    src: string;
    specifiers: { view: boolean, name: string, alias?: string }[];
    injections: { name: string, alias: string }[];
}

function parseImportExpression(cellAst): ParsedImportCell {
    return {
        type: "import",
        src: cellAst.body.source.value,
        specifiers: cellAst.body.specifiers?.map(spec => {
            return {
                view: spec.view,
                name: spec.imported.name,
                alias: (spec.local?.name && spec.imported.name !== spec.local.name) ? spec.local.name : spec.imported.name
            };
        }) ?? [],
        injections: cellAst.body.injections?.map(inj => {
            return {
                name: inj.imported.name,
                alias: inj.local?.name ?? inj.imported.name
            };
        }) ?? [],
    };
}

export interface ParsedVariable extends ParsedCell {
    type: "variable"
    id?: string,
    inputs: string[],
    func: any,
}

export interface ParsedViewCell extends ParsedCell {
    type: "viewof",
    variable: ParsedVariable;
    variableValue: ParsedVariable;
}

function parseViewExpression(cellStr: string, cellAst, refs: Refs, bodyStr?: string): ParsedViewCell {
    const id = cellAst.id && cellStr.substring(cellAst.id.start, cellAst.id.end);
    return {
        type: "viewof",
        variable: {
            type: "variable",
            id,
            inputs: refs.inputs,
            func: createFunction(refs, cellAst.async, cellAst.generator, cellAst.body.type === "BlockStatement", bodyStr)
        },
        variableValue: {
            type: "variable",
            id: cellAst?.id?.id?.name,
            inputs: ["Generators", id],
            func: (G, _) => G.input(_)
        }
    };
}

interface ParsedMutableCell extends ParsedCell {
    type: "mutable",
    initial: ParsedVariable;
    variable: ParsedVariable;
    variableValue: ParsedVariable;
}

function parseMutableExpression(cellStr: string, cellAst, refs: Refs, bodyStr?: string): ParsedMutableCell {
    const id = cellAst.id && cellStr.substring(cellAst.id.start, cellAst.id.end);
    const initialValueId = cellAst?.id?.id?.name;
    const initialId = `initial ${initialValueId}`;
    return {
        type: "mutable",
        initial: {
            type: "variable",
            id: initialId,
            inputs: refs.inputs,
            func: createFunction(refs, cellAst.async, cellAst.generator, cellAst.body.type === "BlockStatement", bodyStr)
        },
        variable: {
            type: "variable",
            id,
            inputs: ["Mutable", initialId],
            func: (M, _) => new M(_)
        },
        variableValue: {
            type: "variable",
            id: initialValueId,
            inputs: [id],
            func: _ => _.generator
        }
    };
}

interface ParsedVariableCell extends ParsedCell {
    type: "variable",
    id: string,
    inputs: string[],
    func: any,
}

function parseVariableExpression(cellStr: string, cellAst, refs: Refs, bodyStr?: string): ParsedVariableCell {
    return {
        type: "variable",
        id: cellAst.id && cellStr.substring(cellAst.id?.start, cellAst.id?.end),
        inputs: refs.inputs,
        func: createFunction(refs, cellAst.async, cellAst.generator, cellAst.body.type === "BlockStatement", bodyStr)
    };
}

export function parseCell(cellStr: string): ParsedImportCell | ParsedViewCell | ParsedMutableCell | ParsedVariableCell {
    const cellAst = ohqParseCell(cellStr);
    if ((cellAst.body)?.type == "ImportDeclaration") {
        return parseImportExpression(cellAst);
    }
    const refs = calcRefs(cellAst, cellStr);

    const bodyStr = cellAst.body && cellStr.substring(cellAst.body.start, cellAst.body.end);
    switch (cellAst.id?.type) {
        case "ViewExpression":
            return parseViewExpression(cellStr, cellAst, refs, bodyStr);
        case "MutableExpression":
            return parseMutableExpression(cellStr, cellAst, refs, bodyStr);
        default:
            return parseVariableExpression(cellStr, cellAst, refs, bodyStr);
    }
}
