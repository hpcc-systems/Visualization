import type { ohq } from "@hpcc-js/observable-shim";
import { parseCell, splitModule } from "@hpcc-js/observable-shim";

const FuncTypes = {
    functionType: Object.getPrototypeOf(function () { }).constructor,
    asyncFunctionType: Object.getPrototypeOf(async function () { }).constructor,
    generatorFunctionType: Object.getPrototypeOf(function* () { }).constructor,
    asyncGeneratorFunctionType: Object.getPrototypeOf(async function* () { }).constructor
};

function funcType(async: boolean = false, generator: boolean = false) {
    if (!async && !generator) return FuncTypes.functionType;
    if (async && !generator) return FuncTypes.asyncFunctionType;
    if (!async && generator) return FuncTypes.generatorFunctionType;
    return FuncTypes.asyncGeneratorFunctionType;
}

interface Ref {
    start: number,
    end: number,
    newText: string
}

export interface Refs {
    inputs: string[];
    args: string[];
    patches: Ref[];
}

export function createFunction(refs: Refs, async = false, generator = false, blockStatement = false, body?: string) {
    if (body === undefined) {
        return undefined;
    }

    refs.patches.sort((l, r) => r.start - l.start);
    refs.patches.forEach(r => {
        body = body!.substring(0, r.start) + r.newText + body!.substring(r.end);
    });
    return new (funcType(async, generator))(...refs.args, blockStatement ?
        body.substring(1, body.length - 1).trim() :
        `return (\n${body}\n);`);
}

//  Hide "import" from bundlers as they have a habit of replacing "import" with "require"
export async function obfuscatedImport(url: string) {
    return new FuncTypes.asyncFunctionType("url", "return import(url)")(url);
}

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

export function fetchEx(url: string, proxyPrefix = "https://observable-cors.glitch.me/", proxyPostfix = "") {
    return fetch(url)
        .then(response => {
            if (response.ok) return response;
            throw new Error("CORS?");
        }).catch(e => {
            const matches = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img);
            url = `${proxyPrefix}${url}${proxyPostfix}`;
            return fetch(url, {
                headers: {
                    origin: matches[0],
                    referer: url
                }
            });
        });
}

export function download(impUrl: string): Promise<ohq.Notebook> {
    const isShared = impUrl.indexOf("https://observablehq.com/d") === 0;
    return fetchEx(impUrl.replace(`https://observablehq.com/${isShared ? "d/" : ""}`, "https://api.observablehq.com/document/"))
        .then(r => r.json())
        ;
}