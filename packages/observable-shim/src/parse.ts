// Compare with ../../../node_modules/@observablehq/parser/src/parse.js
import { getLineInfo, tokTypes as tt } from "acorn";
import { parseCell as ohqParseCell, CellParser } from "@observablehq/parser";
import defaultGlobals from "../../../node_modules/@observablehq/parser/src/globals.js";
import findReferences from "../../../node_modules/@observablehq/parser/src/references.js";
import findFeatures from "../../../node_modules/@observablehq/parser/src/features.js";

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
        } catch (error) {
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
        } catch (error) {
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

    parseTopLevel(node) {
        if (!node.cells) node.cells = [];
        // @ts-ignore
        while (this.type !== tt.eof) {
            // @ts-ignore
            const cell = this.parseCell(this.startNode());
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
export function parseModule(input, { globals } = {}) {
    // @ts-ignore
    const program = ModuleParser.parse(input, { ecmaVersion: 2020 });
    for (const cell of program.cells) {
        parseReferences(cell, input, globals);
        parseFeatures(cell, input);
    }
    return program;
}

export function splitModule(input): string[] {
    // @ts-ignore
    return ModuleParser.parse(input, { ecmaVersion: "latest" }).cells.map(cell => input.substring(cell.start, cell.end));
}

export function parseCell(input: string) {
    return ohqParseCell(input);
}

