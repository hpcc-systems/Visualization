import { deserialize, type Notebook } from "@observablehq/notebook-kit";

export function html2notebook(html: string): Notebook {
    return deserialize(html);
}