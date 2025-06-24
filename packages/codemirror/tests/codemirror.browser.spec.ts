import * as codemirror from "@hpcc-js/codemirror";
import { CSSEditor, DOTEditor, Editor, ECLEditor, HTMLEditor, JSEditor, JSONEditor, MarkdownEditor, ObservableMarkdownEditor, SQLEditor, XMLEditor, YAMLEditor } from "@hpcc-js/codemirror";
import { Class, HTMLWidget, SVGWidget } from "@hpcc-js/common";
import { describe, it, expect } from "vitest";
import { classDef, renderMedium } from "../../common/tests/index.ts";

const urlSearch: string = "";

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
