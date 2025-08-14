// Compare with ../../../node_modules/@observablehq/parser/src/parse.js
import { getLineInfo, tokTypes, Statement, ModuleDeclaration, Expression as ExpressionBase, Node } from "acorn";
import { ancestor, RecursiveVisitors, AncestorVisitors } from "acorn-walk";
import { CellParser, parseCell as ohqParseCell, walk as ohqWalk } from "@observablehq/parser";
import defaultGlobals from "../../../../node_modules/@observablehq/parser/src/globals.js";
import findReferences from "../../../../node_modules/@observablehq/parser/src/references.js";
import findFeatures from "../../../../node_modules/@observablehq/parser/src/features.js";

export interface MutableExpression extends Node {
    type: "MutableExpression"
}

export interface ViewExpression extends Node {
    type: "ViewExpression"
}

export type Expression = ExpressionBase | MutableExpression | ViewExpression;

// Find references.
// Check for illegal references to arguments.
// Check for illegal assignments to global references.
function parseReferences(cell, input, globals = defaultGlobals) {
    if (!cell.body) {
        cell.references = [];
    } else if (cell.body.type === "ImportDeclaration") {
        //  This is correct?!?
        cell.references = cell.body.specifiers
            ? cell.body.specifiers.map(i => i.imported)
            : [];
    } else {
        try {
            cell.references = findReferences(cell, globals);
        } catch (error: any) {
            if (error.node) {
                const loc = getLineInfo(input, error.node.start);
                error.message += ` (${loc.line}:${loc.column})`;
                error.pos = error.node.start;
                error.loc = loc;
                delete error.node;
            }
            throw error;
        }
    }
    return cell;
}

// Find features: file attachments, secrets, database clients.
// Check for illegal references to arguments.
// Check for illegal assignments to global references.
function parseFeatures(cell, input) {
    if (cell.body && cell.body.type !== "ImportDeclaration") {
        try {
            cell.fileAttachments = findFeatures(cell, "FileAttachment");
            cell.databaseClients = findFeatures(cell, "DatabaseClient");
            cell.secrets = findFeatures(cell, "Secret");
        } catch (error: any) {
            if (error.node) {
                const loc = getLineInfo(input, error.node.start);
                error.message += ` (${loc.line}:${loc.column})`;
                error.pos = error.node.start;
                error.loc = loc;
                delete error.node;
            }
            throw error;
        }
    } else {
        cell.fileAttachments = new Map();
        cell.databaseClients = new Map();
        cell.secrets = new Map();
    }
    return cell;
}

class ModuleParser extends CellParser {

    parseTopLevel(node: { cells?: Cell[] }) {
        if (!node.cells) node.cells = [];
        // @ts-ignore
        while (this.type !== tokTypes.eof) {
            // @ts-ignore
            const cell: Cell = this.parseCell(this.startNode());
            // @ts-ignore
            cell.input = this.input;
            node.cells.push(cell);
        }
        // @ts-ignore
        this.next();
        // @ts-ignore
        return this.finishNode(node, "Program");
    }
}

// @ts-ignore
export function parseModule(input, { globals }: { globals: any } = {}) {
    // @ts-ignore
    const program = ModuleParser.parse(input, { ecmaVersion: 2020 });
    for (const cell of program.cells) {
        parseReferences(cell, input, globals);
        parseFeatures(cell, input);
    }
    return program;
}

export interface Cell extends Node {
    type: "Cell";
    id: Expression;
    text: string;
    body?: Statement | ModuleDeclaration | Expression;
    references: unknown[];
    async: boolean;
    generator: boolean;
    strict: boolean;
}

export function splitModule(input: string): Cell[] {
    return (ModuleParser as any)
        .parse(input, { ecmaVersion: "latest" })
        .cells.map((cell: any) => ({
            type: "Cell",
            text: input.substring(cell.start, cell.end),
            start: cell.start,
            end: cell.end
        }));
}

export {
    type Node,
    ancestor,
    type AncestorVisitors
};

export function parseCell(input: string): Cell {
    return ohqParseCell(input);
}

export const walk: RecursiveVisitors<any> = ohqWalk;
