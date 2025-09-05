import { type DefineState, NotebookRuntime as NotebookRuntimeBase } from "@observablehq/notebook-kit/runtime";
import { type Definition } from "./index.ts";

import "@observablehq/notebook-kit/index.css";
import "@observablehq/notebook-kit/theme-air.css";

export { DefineState };

export class NotebookRuntime extends NotebookRuntimeBase {

    stateById = new Map<number, DefineState>();

    constructor() {
        super();
    }

    has(cellId: number): boolean {
        return this.stateById.has(cellId);
    }

    async add(definition: Definition): Promise<HTMLDivElement> {
        if (this.stateById.has(definition.id)) {
            throw new Error(`Cell with id ${definition.id} already exists`);
        }
        const placeholderDiv = document.createElement("div");
        placeholderDiv.className = "observablehq observablehq--cell";
        const state = { root: placeholderDiv, expanded: [], variables: [] };
        this.stateById.set(definition.id, state);
        this.define(state, definition);
        await this.runtime._computeNow();
        return state.root;
    }

    async update(definition: Definition): Promise<HTMLDivElement> {
        const state = this.stateById.get(definition.id);
        if (!state) {
            throw new Error(`Cell with id ${definition.id} does not exist`);
        }
        await this.clear(definition.id);
        this.define(state, definition);
        await this.runtime._computeNow();
        return state.root;
    }

    async clear(cellId: number): Promise<void> {
        const state = this.stateById.get(cellId);
        if (!state) {
            throw new Error(`Cell with id ${cellId} does not exist`);
        }
        [...state.variables].forEach(v => v.delete());
        await this.runtime._computeNow();
        state.variables = [];
        state.expanded = [];
        state.root.innerHTML = "";
    }

    async remove(cellId: number): Promise<void> {
        const state = this.stateById.get(cellId);
        if (!state) {
            throw new Error(`Cell with id ${cellId} does not exist`);
        }
        void this.clear(cellId);
        this.stateById.delete(cellId);
        state.root.remove();
        await this.runtime._computeNow();
    }

    async removeAll(): Promise<void> {
        const keys = [...this.stateById.keys()];
        for (const key of keys) {
            this.remove(key);
        }
        await this.runtime._computeNow();
    }

    async render(definitions: Definition[], target: HTMLElement) {
        for (const definition of definitions) {
            let observableDiv: HTMLDivElement;
            if (this.stateById.has(definition.id)) {
                observableDiv = await this.update(definition);
            } else {
                observableDiv = await this.add(definition);
            }
            target.appendChild(observableDiv);
        }
    }
}
