import type MarkdownIt from "markdown-it";
import type { Options } from "markdown-it";
import type Token from "markdown-it/lib/token.mjs";
import type Renderer from "markdown-it/lib/renderer.mjs";
import type { RuleCore } from "markdown-it/lib/parser_core.mjs";
import type { RuleInline } from "markdown-it/lib/parser_inline.mjs";
import { generatePlaceholders } from "./util.ts";

function renderObservable(tokens: Token[], idx: number, _options: Options, env: any, _self: Renderer) {
    return generatePlaceholders(tokens[idx].content, { type: "js", exec: true }, env);
}

const DOLLAR = 0x24;
const CURLEY_OPEN = 0x7B;
const CURLEY_CLOSE = 0x7D;

function* parsePlaceholderInline(src: string, pos: number = 0, posMax: number = src.length) {
    if (src.charCodeAt(pos) === DOLLAR && src.charCodeAt(pos + 1) === CURLEY_OPEN) {
        pos += 2;

        const observableStart = pos;
        let nestedCurly = 0;
        let done = false;
        while (!done && pos < posMax) {
            switch (src.charCodeAt(pos)) {
                case CURLEY_OPEN:
                    nestedCurly++;
                    break;
                case CURLEY_CLOSE:
                    if (nestedCurly === 0) {
                        done = true;
                        --pos;
                    } else {
                        nestedCurly--;
                    }
                    break;
            }
            pos++;
        }
        const observableEnd = pos;
        if (pos >= posMax || observableStart == observableEnd) return;
        if (src.charCodeAt(pos) !== CURLEY_CLOSE) return;
        pos++;

        const observableJs = src.slice(observableStart, observableEnd).trim();
        yield { type: "placeholder", content: observableJs, pos };
    }
}

function* parsePlaceholderBlock(src: string) {
    let pos = 0;
    let prevPos = 0;
    const posMax = src.length;
    while (pos < posMax) {
        if (src.charCodeAt(pos) === DOLLAR && src.charCodeAt(pos + 1) === CURLEY_OPEN) {
            yield ({ type: "html_block", content: src.slice(prevPos, pos) });
            for (const placeholder of parsePlaceholderInline(src, pos, posMax)) {
                yield placeholder;
                pos = placeholder.pos;
                prevPos = pos;
            }
        } else {
            pos++;
        }
    }
    if (pos > prevPos) {
        yield ({ type: "html_block", content: src.slice(prevPos, pos) });
    }
}

const transformPlaceholderInline: RuleInline = (state, silent) => {
    if (silent || state.pos + 2 > state.posMax) return false;
    const marker1 = state.src.charCodeAt(state.pos);
    const marker2 = state.src.charCodeAt(state.pos + 1);
    if (marker1 !== DOLLAR || marker2 !== CURLEY_OPEN) return false;
    for (const { type, content, pos } of parsePlaceholderInline(state.src, state.pos, state.posMax)) {
        if (type !== "placeholder") break;
        const token = state.push(type, "", 0);
        token.content = content;
        state.pos = pos;
        return true;
    }
    return false;
};

const transformPlaceholderCore: RuleCore = (state) => {
    const { tokens } = state;
    for (let i = 0, n = tokens.length; i < n; ++i) {
        const token = tokens[i];
        if (token.type === "html_block") {
            const children: Token[] = [];
            for (const { type, content } of parsePlaceholderBlock(token.content)) {
                const child = new state.Token(type, "", 0);
                child.content = content;
                children.push(child);
            }
            if (children.length === 1 && children[0].type === "html_block") {
                tokens[i].content = children[0].content;
            } else {
                const inline = new state.Token("inline", "", 0);
                inline.children = children;
                tokens[i] = inline;
            }
        }
    }
};

export function hookTemplateLiterals(md: MarkdownIt) {
    md.inline.ruler.push("placeholder", transformPlaceholderInline);
    md.core.ruler.after("inline", "placeholder", transformPlaceholderCore);
    md.renderer.rules.placeholder = (tokens: Token[], idx: number, options: any, env: any, self: Renderer) => renderObservable(tokens, idx, options, env, self);
}

