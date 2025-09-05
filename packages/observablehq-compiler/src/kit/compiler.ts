
import { type Notebook, type Cell, transpile } from "@observablehq/notebook-kit";
import { type Definition } from "@observablehq/notebook-kit/runtime";
import { constructFunction } from "./util.ts";

export interface CompileKitOptions {
    inline?: boolean;
}

export function compileCell(cell: Cell, options: CompileKitOptions = { inline: true }): Definition[] {
    const retVal: Definition[] = [];
    const sourceIDOffset = 1000000;
    try {
        const compiled = transpile(cell);
        retVal.push({
            id: cell.id,
            ...compiled,
            body: options.inline ? constructFunction(compiled.body, `cell_${cell.id}`) : compiled.body,
        });
        if (cell.pinned) {
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
                body: options.inline ? constructFunction(compiled.body, `cell_source_${sourceIDOffset + cell.id}`) : compiled.body,
            });
        }
    } catch (error) {
        console.error(`Error compiling cell ${cell.id}:`, error);
    }
    return retVal;
}

export function compileNotebook(notebook: Notebook, options: CompileKitOptions = { inline: true }): Definition[] {
    const retVal: Definition[] = [];
    for (const cell of notebook.cells) {
        const cellDefs = compileCell(cell, options);
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
