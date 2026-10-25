import * as codemirror from "@hpcc-js/codemirror";
import { CSSEditor, DOTEditor, Editor, ECLEditor, HTMLEditor, JSEditor, JSONEditor, MarkdownEditor, ObservableMarkdownEditor, SQLEditor, XMLEditor, YAMLEditor } from "@hpcc-js/codemirror";
import { Class, HTMLWidget, SVGWidget } from "@hpcc-js/common";
import { CodeMirror } from "../src/codemirror-shim.ts";
import { describe, it, expect } from "vitest";
import { classDef, renderMedium } from "../../common/tests/index.ts";

const urlSearch: string = "";

describe("Markdown mode compatibility", () => {
    const mode = CodeMirror.getMode(CodeMirror.defaults, "markdown");

    it("recognizes an XML start tag with attributes", () => {
        const state = CodeMirror.startState(mode);
        const stream = new CodeMirror.StringStream('<div markdown="1">');

        mode.token(stream, state);

        expect(CodeMirror.innerMode(mode, state).mode.name).not.toBe("markdown");
    });

    it("tokenizes a link title after a URL", () => {
        const host = document.createElement("div");
        document.body.appendChild(host);
        const editor = CodeMirror(host, {
            value: '[ref]: https://example.test "a title"',
            mode: "markdown"
        });
        try {
            const styles = editor.getLineTokens(0).map(token => token.type ?? "");
            expect(styles).toContain("string url");
        } finally {
            editor.getWrapperElement().remove();
            host.remove();
        }
    });
});

describe("@hpcc-js/codemirror", () => {
    for (const key in codemirror) {
        const item = (codemirror as any)[key];
        if (item) {
            if (!urlSearch || urlSearch === item.prototype.constructor.name) {
                describe(`${item.prototype?.constructor?.name}`, () => {
                    it("Simple", () => {
                        expect(true).to.be.true;
                    });
                    if (item.prototype instanceof Class) {
                        classDef("codemirror", item);
                    }
                    if (item.prototype instanceof HTMLWidget || item.prototype instanceof SVGWidget) {
                        switch (item.prototype.constructor) {
                            case Editor:
                            case CSSEditor:
                            case DOTEditor:
                            case HTMLEditor:
                            case JSEditor:
                            case JSONEditor:
                            case MarkdownEditor:
                            case ObservableMarkdownEditor:
                            case SQLEditor:
                            case XMLEditor:
                            case YAMLEditor:
                            case ECLEditor:
                                renderMedium(new item.prototype.constructor());
                                break;

                            default:
                                it("Has render test", () => {
                                    expect(false).to.be.true;
                                });
                        }
                    }
                });
            }
        }
    }
});
