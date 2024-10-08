import type MarkdownIt from "markdown-it";
import type { Options } from "markdown-it";
import type Token from "markdown-it/lib/token.mjs";
import type Renderer from "markdown-it/lib/renderer.mjs";
import type StateBlock from "markdown-it/lib/rules_block/state_block.mjs";
import type StateInline from "markdown-it/lib/rules_inline/state_inline.mjs";
import { generatePlaceholders } from "./util.ts";

function renderObservable(tokens: Token[], idx: number, _options: Options, env: any, _self: Renderer) {
    return generatePlaceholders(tokens[idx].content, { type: "js", exec: true }, env);
}

const DOLLAR = 0x24;
const CURLEY_OPEN = 0x7B;
const CURLEY_CLOSE = 0x7D;

function parseObservableRef(state: StateInline | StateBlock, stateEx: { pos: number, posMax: number }, silent: boolean) {

    const start = stateEx.pos;
    const max = stateEx.posMax;

    if (state.src.charCodeAt(start) !== DOLLAR || state.src.charCodeAt(start + 1) !== CURLEY_OPEN) {
        return false;
    }
    let pos = start + 2;

    const observableStart = pos;
    let nestedCurly = 0;
    let done = false;
    while (!done && pos < max) {
        switch (state.src.charCodeAt(pos)) {
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
    if (pos >= max || observableStart == observableEnd) return false;

    if (state.src.charCodeAt(pos) !== CURLEY_CLOSE) return false;

    const observableJs = state.src.slice(observableStart, observableEnd).trim();

    if (!silent) {
        const token = state.push("observable", "", 0);

        token.block = true;
        token.content = observableJs;
    }

    stateEx.pos = pos + 1;
    return true;
}

function parseObservableRefBlock(state: StateBlock, startLine: number, _endLine: number, silent: boolean) {
    const start = state.bMarks[startLine] + state.tShift[startLine];
    const max = state.eMarks[startLine];
    const pos = state.src.indexOf("${", start);
    if (pos < 0 || pos >= max) return false;
    const retVal = parseObservableRef(state, { pos, posMax: max }, silent);
    if (retVal) {
        state.line = startLine + 1;
    }
    return retVal;
}

function parseObservableRefInline(state: StateInline, silent: boolean) {
    return parseObservableRef(state, state, silent);
}

export function hookTemplateLiterals(md: MarkdownIt) {
    md.renderer.rules.observable = (tokens: Token[], idx: number, options: any, env: any, self: Renderer) => renderObservable(tokens, idx, options, env, self);
    md.block.ruler.before("html_block", "observable_ref", (state: StateBlock, startLine: number, _endLine: number, silent: boolean) => parseObservableRefBlock(state, startLine, _endLine, silent));
    md.inline.ruler.before("text", "observable_ref", (state: StateInline, silent: boolean) => parseObservableRefInline(state, silent));
}