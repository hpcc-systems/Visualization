import { describe, it, expect } from "vitest";
import markdownit from "markdown-it";
import { observable } from "@hpcc-js/markdown-it-plugins";

import "./style.css";

const md = markdownit({
    html: true,
    linkify: true,
    typographer: true
});

describe("markdown-it-observable", () => {

    it("minimal example", async () => {
        md.use(observable);

        const minimalMd = fetch("/tests/Basic usage/Minimal Example.md").then(response => {
            return response.text();
        });
        const minimalMdText = await minimalMd;
        expect(minimalMdText).to.be.a.string;
        expect(minimalMdText).to.not.be.empty;

        let minimalHtml = md.render(minimalMdText);
        expect(minimalHtml).to.be.a.string;
        expect(minimalHtml).to.not.be.empty;
        minimalHtml = minimalHtml.trim();
        expect(minimalHtml.charAt(0)).to.equal("<");
        expect(minimalHtml.charAt(minimalHtml.length - 1)).to.equal(">");
    });
});

