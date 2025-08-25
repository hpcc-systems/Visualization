import { type Notebook, type Cell, toCell, toNotebook, parseJavaScript, serialize, deserialize } from "@observablehq/notebook-kit";

import type { ohq } from "./observable-shim.ts";
import { parseCell, splitModule } from "./observable-shim.ts";

// Shared function constructor utilities to avoid duplication between util modules.

export type RegularFunction = (...args: any[]) => any;
interface RegularFunctionConstructor {
    new(...args: string[]): RegularFunction;
    (...args: string[]): RegularFunction;
    readonly prototype: RegularFunction;
}

export type AsyncFunction = (...args: any[]) => Promise<any>;
interface AsyncFunctionConstructor {
    new(...args: string[]): AsyncFunction;
    (...args: string[]): AsyncFunction;
    readonly prototype: AsyncFunction;
}

export type GeneratorFunction = (...args: any[]) => Generator<any, any, any>;
interface GeneratorFunctionConstructor {
    new(...args: string[]): GeneratorFunction;
    (...args: string[]): GeneratorFunction;
    readonly prototype: GeneratorFunction;
}

export type AsyncGeneratorFunction = (...args: any[]) => AsyncGenerator<any, any, any>;
interface AsyncGeneratorFunctionConstructor {
    new(...args: string[]): AsyncGeneratorFunction;
    (...args: string[]): AsyncGeneratorFunction;
    readonly prototype: AsyncGeneratorFunction;
}

export type AnyFunction = RegularFunction | AsyncFunction | GeneratorFunction | AsyncGeneratorFunction;

export const FunctionConstructors: {
    regular: RegularFunctionConstructor;
    async: AsyncFunctionConstructor;
    generator: GeneratorFunctionConstructor;
    asyncGenerator: AsyncGeneratorFunctionConstructor;
} = {
    regular: Object.getPrototypeOf(function () { }).constructor as RegularFunctionConstructor,
    async: Object.getPrototypeOf(async function () { }).constructor as AsyncFunctionConstructor,
    generator: Object.getPrototypeOf(function* () { }).constructor as GeneratorFunctionConstructor,
    asyncGenerator: Object.getPrototypeOf(async function* () { }).constructor as AsyncGeneratorFunctionConstructor,
};

function funcType(async: boolean = false, generator: boolean = false) {
    if (!async && !generator) return FunctionConstructors.regular;
    if (async && !generator) return FunctionConstructors.async;
    if (!async && generator) return FunctionConstructors.generator;
    return FunctionConstructors.asyncGenerator;
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

function join(baseURL: string, relativeURL: string) {
    return relativeURL
        ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "")
        : baseURL;
}

export const isRelativePath = (path: string) => path[0] === ".";
export const fixRelativeUrl = (path: string, basePath: string) => {
    if (isRelativePath(path)) {
        return join(basePath, path);
    }
    return path;
};

//  Hide "import" from bundlers as they have a habit of replacing "import" with "require"
const obfuscatedImportFunction = new FunctionConstructors.async("url", "return import(url)");
export async function obfuscatedImport(url: string) {
    return obfuscatedImportFunction(url);
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

function _constructFunction(body, bodyStr: string) {
    if (body.type !== "FunctionExpression" && body.type !== "FunctionDeclaration" && body.type !== "ArrowFunctionExpression") {
        throw new Error(`Unsupported function type: ${body.type}`);
    }
    const func = body.async && body.generator ?
        FunctionConstructors.asyncGenerator :
        body.async ?
            FunctionConstructors.async :
            body.generator ?
                FunctionConstructors.generator :
                FunctionConstructors.regular;

    const params = body.params?.map((param) => bodyStr.slice(param.start, param.end)).join(", ") ?? "";
    const isBlock = body.body.type === "BlockStatement";
    const { start, end } = body.body;
    const inner = isBlock
        ? bodyStr.slice(start + 1, end - 1)
        : `return ${bodyStr.slice(start, end)}`;
    return func(params, inner);
}

export function constructFunction(bodyStr: string) {
    const { body } = parseJavaScript(bodyStr);
    if (body.type === "Program") {
        if (body.body.length !== 1) {
            throw new Error(`Expected a single function, but found ${body.body.length} statements`);
        }
        return _constructFunction(body.body[0], bodyStr);
    }
    return _constructFunction(body, bodyStr);
}

export const html2notebook = (html: string): Notebook => deserialize(html);
export const notebook2html = (notebook: Notebook): string => serialize(notebook);

