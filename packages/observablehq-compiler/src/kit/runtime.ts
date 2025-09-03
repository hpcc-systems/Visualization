import { type DefineState, NotebookRuntime as NotebookRuntimeBase } from "@observablehq/notebook-kit/runtime";
import { type Definition } from "./index.ts";

import "@observablehq/notebook-kit/index.css";
import "@observablehq/notebook-kit/theme-air.css";

export class NotebookRuntime extends NotebookRuntimeBase {

    stateById = new Map<number, DefineState>();

    constructor() {
        super();
    }

    has(cellId: number): boolean {
        return this.stateById.has(cellId);
    }

    async add(cellId: number, definition: Definition, placeholderDiv: HTMLDivElement): Promise<void> {
        let state: DefineState | undefined = this.stateById.get(cellId);
        if (state) {
            this.remove(cellId);
        }
        state = { root: placeholderDiv, expanded: [], variables: [] };
        this.stateById.set(cellId, state);
        this.define(state, definition);
        await this.runtime._computeNow();
    }

    async remove(cellId: number): Promise<void> {
        const state = this.stateById.get(cellId);
        if (!state) return;
        [...state.variables].forEach(v => v.delete());
        this.stateById.delete(cellId);
        state.root?.remove();
        await this.runtime._computeNow();
    }

    async removeAll(): Promise<void> {
        const keys = [...this.stateById.keys()];
        for (const key of keys) {
            this.remove(key);
        }
        await this.runtime._computeNow();
    }

    render(definitions: Definition[], target: HTMLElement) {
        definitions.forEach(definition => {
            const placeholderDiv = document.createElement("div");
            placeholderDiv.id = `cell-${definition.id}`;
            placeholderDiv.className = "observablehq observablehq--cell";
            this.stateById.set(definition.id, { root: placeholderDiv, expanded: [], variables: [] });
            this.define(this.stateById.get(definition.id)!, definition);
            target.appendChild(placeholderDiv);
        });
    }
}
