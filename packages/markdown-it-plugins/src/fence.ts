import type { Env, MarkdownIt, RendererRule } from "markdown-it";
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

const proxy: RendererRule = (tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options);

export function hookFence(md: MarkdownIt) {
    const defaultFenceRenderer = md.renderer.rules.fence || proxy;
    const fenceRenderer: RendererRule = (tokens, idx, options, env, self) => {
        const renderEnv = (env ?? {}) as Env & { [ENV_KEY]?: RenderNode[] };
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
                    if (!renderEnv[ENV_KEY]) {
                        renderEnv[ENV_KEY] = [];
                    }
                    preHtml += generatePlaceholders(token.content, fenceInfo, renderEnv);
                }
                if (showSrc(fenceInfo)) {
                    return preHtml + defaultFenceRenderer(tokens, idx, options, renderEnv, self);
                }
                break;
            default:
                return preHtml + defaultFenceRenderer(tokens, idx, options, renderEnv, self);
        }
        return preHtml;
    };
    md.renderer.rules.fence = fenceRenderer;
}
