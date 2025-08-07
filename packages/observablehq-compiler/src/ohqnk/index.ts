import { Notebook as ohqnkNotebook, Cell as ohqnkCell } from '@observablehq/notebook-kit';
import { compile as ohqnkCompile } from "./compiler.ts";

export namespace ohqnk {
    export interface Notebook extends ohqnkNotebook {
    }

    export interface Cell extends ohqnkCell {
    }

    export const compile = ohqnkCompile;
}
