import type { Notebook } from "@observablehq/notebook-kit";
import { define, type DefineState, type Definition } from "@observablehq/notebook-kit/runtime";
import type { Inspector } from "@observablehq/inspector";
import type { Runtime, Module } from "@observablehq/runtime";

export type InspectorFactory = (name: string | undefined, id: string | number) => Inspector;

class RuntimeWrapper {
    protected stateById = new Map<string, DefineState>();

    constructor() {

    }

    add(vscodeCellID: string, definition: Definition, placeholderDiv: HTMLDivElement): void {
        let state = this.stateById.get(vscodeCellID);
        if (state) {
            state.variables.forEach((v) => v.delete());
            state.variables = [];
        } else {
            state = { root: placeholderDiv, expanded: [], variables: [] };
            this.stateById.set(vscodeCellID, state);
        }
        define(state, definition);
    }

    remove(vscodeCellID: string): void {
        const state = this.stateById.get(vscodeCellID)!;
        state.root.remove();
        state.variables.forEach((v) => v.delete());
        this.stateById.delete(vscodeCellID);
    }

    removeAll(): void {
        const keys = Array.from(this.stateById.keys());
        for (const key of keys) {
            this.remove(key);
        }
    }

}

//  File  ---
export function compile(notebook: Notebook) {
    const retVal = (runtime: Runtime, inspector?: InspectorFactory): Module => {
        const main: Module = runtime.module();

        notebook.cells.forEach(cell => {
            main.define(cell.id, cell.value);
        });
        return main;
    };
    return retVal;
}
