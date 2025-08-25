import type { Notebook as ohqnkNotebook, Cell as ohqnkCell } from "@observablehq/notebook-kit";
import { compile as ohqnkCompile } from "./compiler.ts";
import { html2notebook as ohqnkHtml2notebook } from "./util.ts";

export namespace ohqnk {
    export interface Notebook extends ohqnkNotebook {
    }

    export interface Cell extends ohqnkCell {
    }

    export const compile = ohqnkCompile;
    export const html2notebook = ohqnkHtml2notebook;
}
