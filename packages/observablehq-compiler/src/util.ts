import { type Notebook, type Cell, toNotebook, toCell } from "./kit/index.ts";

import type { ohq } from "./observable-shim.ts";
import { parseCell, splitModule } from "./observable-shim.ts";

interface ParsedOJS {
    ojs: string;
    offset: number;
    inlineMD: boolean;
    cell: any;
    error: any;
}

export function encodeBacktick(str: string) {
    return str
        .split("`").join("\\`")
        ;
}

function createParsedOJS(ojs: string, offset: number, inlineMD: boolean): ParsedOJS {
    let cell;
    let error;
    try {
        cell = parseCell(ojs);
    } catch (e) {
        error = e;
    }
    return {
        ojs,
        offset,
        inlineMD,
        cell,
        error
    };
}

function splitOmd(_: string): ParsedOJS[] {
    const retVal: ParsedOJS[] = [];
    //  Load Markdown  ---
    const re = /(```(?:\s|\S)[\s\S]*?```)/g;
    let prevOffset = 0;
    let match = re.exec(_);
    while (match !== null) {
        if (match.index > prevOffset) {
            retVal.push(createParsedOJS(_.substring(prevOffset, match.index), prevOffset, true));
        }

        const outer = match[0];
        if (outer.indexOf("``` ") === 0 || outer.indexOf("```\n") === 0 || outer.indexOf("```\r\n") === 0) {
            const prefixLen = 3;
            const inner = outer.substring(prefixLen, outer.length - prefixLen);
            retVal.push(createParsedOJS(inner, match.index + prefixLen, false));
        } else {
            retVal.push(createParsedOJS(outer, match.index, true));
        }

        prevOffset = match.index + match[0].length;
        match = re.exec(_);
    }
    if (_.length > prevOffset) {
        retVal.push(createParsedOJS(_.substring(prevOffset, _.length), prevOffset, true));
    }
    return retVal;
}

export function notebook2ojs(_: string): ParsedOJS[] {
    const parsed: ohq.Notebook = JSON.parse(_);
    return parsed.nodes.map(node => createParsedOJS(node.value, 0, node.mode === "md"));
}

export function ojs2notebook(ojs: string): ohq.Notebook {
    const cells = splitModule(ojs);
    return {
        files: [],
        nodes: cells.map((cell, idx) => {
            return {
                id: idx,
                mode: "js",
                value: cell.text,
                start: cell.start,
                end: cell.end
            };
        })
    } as ohq.Notebook;
}

export function ojs2notebookKit(ojs: string): Notebook {
    const cells: Cell[] = splitModule(ojs).map((cell, idx) => {
        return toCell({
            id: idx,
            mode: "ojs",
            value: cell.text
        });
    });
    return toNotebook({ cells });
}

export function omd2notebook(omd: string): ohq.Notebook {
    const cells = splitOmd(omd);
    return {
        files: [],
        nodes: cells.map((cell, idx) => {
            return {
                id: idx,
                mode: cell.inlineMD ? "md" : "js",
                value: cell.ojs,
                start: cell.offset,
                end: cell.offset + cell.ojs.length
            };
        })
    } as ohq.Notebook;
}

export function omd2notebookKit(omd: string): Notebook {
    const cells: Cell[] = [];
    splitOmd(omd).forEach((cell) => {
        if (!cell.inlineMD) {
            splitModule(cell.ojs).forEach((subCell) => {
                cells.push(toCell({
                    id: cells.length + 1,
                    mode: "ojs",
                    value: subCell.text
                }));
            });
        } else {
            cells.push(toCell({
                id: cells.length + 1,
                mode: "md",
                value: cell.ojs
            }));
        }
    });
    return toNotebook({ cells });
}

export function fetchEx(url: string, proxyPrefix = "https://api.codetabs.com/v1/proxy/?quest=", proxyPostfix = "") {
    const matches = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img);
    if (!matches || matches.length === 0) {
        throw new Error(`Invalid URL:  ${url}`);
    }
    return fetch(url, { headers: { origin: matches[0], referer: url } }).then(response => {
        if (response.ok) return response;
        throw new Error("CORS?");
    }).catch(e => {
        url = `${proxyPrefix}${url}${proxyPostfix}`;
        return fetch(url, { headers: { origin: matches[0], referer: url } });
    });
}

export function download(impUrl: string, proxyPrefix?: string, proxyPostfix?: string): Promise<ohq.Notebook> {
    const isShared = impUrl.indexOf("https://observablehq.com/d") === 0;
    return fetchEx(impUrl.replace(`https://observablehq.com/${isShared ? "d/" : ""}`, "https://api.observablehq.com/document/"), proxyPrefix, proxyPostfix)
        .then(r => r.json())
        ;
}
