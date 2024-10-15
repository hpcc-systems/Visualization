import { ojs2notebook } from "@hpcc-js/observablehq-compiler";
import { RenderNode } from "./render.ts";

export interface FenceInfo {
    type: "js" | "javascript" | string;
    exec?: boolean;
    echo?: boolean;
    hide?: boolean;
}

export const fenceInfoDefaults: Readonly<FenceInfo> = {
    type: "js",
    exec: false,
    echo: undefined,
    hide: undefined
};

export function showSrc(fetchInfo: FenceInfo): boolean {
    if (fetchInfo.exec === true) {
        return fetchInfo.echo === true;
    }
    return fetchInfo.echo !== false;
}

export function executeSrc(fenceInfo: FenceInfo): boolean {
    return fenceInfo.exec === true;
}

export function renderExecutedSrc(fetchInfo: FenceInfo): boolean {
    return fetchInfo.exec == true && fetchInfo.hide !== true;
}

let idx = 0;
function calcPlaceholders(content: string, fenceInfo: FenceInfo): RenderNode[] {
    const retVal: RenderNode[] = [];
    ++idx;
    try {
        const cellNb = ojs2notebook(content);
        for (let i = 0; i < cellNb.nodes.length; ++i) {
            const id = `fence-${idx}-${i + 1}`;
            const content = cellNb.nodes[i].value;
            retVal.push({
                ...fenceInfo,
                id,
                content,
                innerHTML: `\
<span id="${id}" >
    ${renderExecutedSrc(fenceInfo) ? content : ""}
</span>`
            });
        }
    } catch (e: any) {
        const id = `fence-${idx}-error`;
        retVal.push({
            ...fenceInfo,
            id,
            content: JSON.stringify(e),
            innerHTML: `\
<span id="${id}" >
    ${content}
</span>`
        });
    }
    return retVal;
}

export const ENV_KEY = "ENV_OBSERVABLE";

export function generatePlaceholders(content: string, fenceInfo: FenceInfo, env: any): string {
    if (!env[ENV_KEY]) {
        env[ENV_KEY] = [];
    }
    return calcPlaceholders(content, fenceInfo).reduce((acc, cur) => {
        env[ENV_KEY]!.push({ ...cur, innerHTML: undefined });
        return acc + cur.innerHTML;
    }, "");
}

