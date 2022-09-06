import { tokTypes as tt } from "acorn";
import { CellParser } from "@observablehq/parser";

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
export function parseModule(input, { globals } = {}): string[] {
    // @ts-ignore
    return ModuleParser.parse(input).cells.map(cell => input.substring(cell.start, cell.end));
}
