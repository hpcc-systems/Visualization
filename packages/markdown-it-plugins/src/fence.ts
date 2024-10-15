import type MarkdownIt from "markdown-it";
import type { Options } from "markdown-it";
import type Token from "markdown-it/lib/token.mjs";
import type Renderer from "markdown-it/lib/renderer.mjs";
import { RenderNode } from "./render.ts";
import { ENV_KEY, executeSrc, FenceInfo, fenceInfoDefaults, generatePlaceholders, showSrc } from "./util.ts";

const deserializeFenceInfo = (attrs: string): FenceInfo =>
    attrs
        .split(/\s+/)
        .reduce((acc: FenceInfo, pair, idx: number) => {
            if (idx === 0) {
                acc.type = pair as "js" | "javascript" | string;
                return acc;
            }

            const [key, value] = pair.split("=") as [keyof FenceInfo, string];
            switch (key) {
                case "exec":
                case "echo":
                case "hide":
                    acc[key] = value !== "false";
                    break;
            }
            return acc;
        }, { ...fenceInfoDefaults })
    ;

const proxy = (tokens: Token[], idx: number, options: Options, _env: any, self: Renderer) => self.renderToken(tokens, idx, options);

export function hookFence(md: MarkdownIt) {
    const defaultFenceRenderer = md.renderer.rules.fence || proxy;
    const fenceRenderer = (tokens: Token[], idx: number, options: Options, env: { [ENV_KEY]?: RenderNode[] }, self: Renderer) => {
        const token = tokens[idx];
        const fenceInfo = deserializeFenceInfo(token.info);
        if (fenceInfo.type === "javascript") {
            fenceInfo.type = "js";
        }
        token.content += "\n";
        let preHtml = "";
        switch (fenceInfo.type) {
            case "js":
                if (executeSrc(fenceInfo)) {
                    if (!env[ENV_KEY]) {
                        env[ENV_KEY] = [];
                    }
                    preHtml += generatePlaceholders(token.content, fenceInfo, env);
                }
                if (showSrc(fenceInfo)) {
                    return preHtml + defaultFenceRenderer(tokens, idx, options, env, self);
                }
                break;
            default:
                return preHtml + defaultFenceRenderer(tokens, idx, options, env, self);
        }
        return preHtml;
    };
    md.renderer.rules.fence = fenceRenderer;
}
