import type MarkdownIt from "markdown-it";
import { render } from "./render.ts";
import { ENV_KEY } from "./util.ts";
import { hookTemplateLiterals } from "./template-literal.ts";
import { hookFence } from "./fence.ts";

function hookRender(md: MarkdownIt) {
    const originalRender = md.render;
    md.render = (src: string, _env?: any): string => {
        const env = { ..._env };
        const retVal = originalRender.call(md, src, env);
        render(env[ENV_KEY] ?? []);
        return retVal;
    };
}

function hookVitepressRender(md: MarkdownIt) {

    const originalRender = md.render;
    md.render = (src: string, env?: any): string => {
        const myEnv = env ?? {};
        let retVal = originalRender.call(md, src, myEnv);
        if (env[ENV_KEY]?.length) {
            const content = encodeURI(JSON.stringify(env[ENV_KEY]));
            retVal += `<RenderComponent content="${content}" />`;
        }
        return retVal;
    };
}

export interface ObservableOptions {
    vitePress?: boolean;
}

export function observable(md: MarkdownIt, opts: ObservableOptions = {}) {
    hookTemplateLiterals(md);
    hookFence(md);
    if (opts.vitePress) {
        hookVitepressRender(md);
    } else {
        hookRender(md);
    }
}

export {
    render
};
