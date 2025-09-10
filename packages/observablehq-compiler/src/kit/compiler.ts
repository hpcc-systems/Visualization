
import { type Notebook, type Cell, transpile } from "@observablehq/notebook-kit";
import { type Definition } from "@observablehq/notebook-kit/runtime";
import { constructFunction } from "./util.ts";

export { Notebook, Cell };

export interface CompileCellOptions {
    inline?: boolean;
    resolveLocalImports?: boolean;
    includePinned?: boolean;
}

export function compileCell(cell: Cell, { inline = true, resolveLocalImports = false, includePinned = true }: CompileCellOptions = {}): Definition[] {
    const retVal: Definition[] = [];
    const sourceIDOffset = 1000000;
    try {
        const compiled = transpile(cell, { resolveLocalImports });
        retVal.push({
            id: cell.id,
            ...compiled,
            body: inline ? constructFunction(compiled.body, `cell_${cell.id}`) : compiled.body,
        });
        if (includePinned && cell.pinned) {
            const compiled = transpile({
                ...cell,
                mode: "md",
                value: `\
\`\`\`${cell.mode}
${cell.value}
\`\`\``
            });
            retVal.push({
                id: sourceIDOffset + cell.id,
                ...compiled,
                body: inline ? constructFunction(compiled.body, `cell_${sourceIDOffset + cell.id}`) : compiled.body,
            });
        }
    } catch (error) {
        console.error(`Error compiling cell ${cell.id}:`, error);
    }
    return retVal;
}

export function compileNotebook(notebook: Notebook, { inline = true, resolveLocalImports = false, includePinned = true }: CompileCellOptions = {}): Definition[] {
    const retVal: Definition[] = [];
    for (const cell of notebook.cells) {
        const cellDefs = compileCell(cell, { inline, resolveLocalImports, includePinned });
        retVal.push(...cellDefs);
    }
    return retVal;
}

export function resetCellIDs(notebook: Notebook, start: number = 0, increment: number = 1): Notebook {
    for (const cell of notebook.cells) {
        cell.id = start;
        start += increment;
    }
    return notebook;
}
