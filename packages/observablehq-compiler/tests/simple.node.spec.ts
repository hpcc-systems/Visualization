import { describe, it, expect } from "vitest";
import { compile, type ohq, Writer } from "@hpcc-js/observablehq-compiler";
import { createDeserializeParser, getSerializeDocument } from "../src/kit/dom-shim.ts";
import { imports } from "./Introduction to Imports.ts";

describe("observablehq-compiler-node", function () {
    it("writer", async () => {
        const writer = new Writer();
        const define = await compile(imports as any as ohq.Notebook);
        define.write(writer);
        expect(writer.toString()).to.be.a("string");
    });
});

// ---------------------------------------------------------------------------
// dom-shim suite
// Install explicitly for this suite so we don't depend on package-level side
// effects in the node entrypoint.
// ---------------------------------------------------------------------------

/** Typed accessor for the shim document. */
function shimDoc() {
    return getSerializeDocument() as {
        createElement(tag: string): any;
        createTextNode(text: string): any;
    };
}

/** Creates a fresh ShimDOMParser instance. */
function makeParser() {
    return createDeserializeParser() as {
        parseFromString(data: string, type: string): any;
    };
}

describe("dom-shim", function () {
    describe("shim wiring", () => {
        it("can create a document", () => {
            expect(getSerializeDocument()).toBeDefined();
        });

        it("exposes a parser instance", () => {
            expect(createDeserializeParser()).toBeDefined();
        });
    });

    // -----------------------------------------------------------------------
    // document.createElement
    // -----------------------------------------------------------------------
    describe("document.createElement", () => {
        it("returns an element object", () => {
            expect(shimDoc().createElement("div")).toBeDefined();
        });

        it("normalises tagName to lowercase", () => {
            expect(shimDoc().createElement("DIV").tagName).toBe("div");
        });

        it("preserves already-lowercase tagName", () => {
            expect(shimDoc().createElement("span").tagName).toBe("span");
        });
    });

    // -----------------------------------------------------------------------
    // document.createTextNode
    // -----------------------------------------------------------------------
    describe("document.createTextNode", () => {
        it("stores the supplied text in .value", () => {
            expect(shimDoc().createTextNode("hello").value).toBe("hello");
        });

        it("stores an empty string", () => {
            expect(shimDoc().createTextNode("").value).toBe("");
        });
    });

    // -----------------------------------------------------------------------
    // ShimElement – attribute access
    // -----------------------------------------------------------------------
    describe("ShimElement – setAttribute / getAttribute / hasAttribute", () => {
        it("sets and gets a simple attribute", () => {
            const el = shimDoc().createElement("div");
            el.setAttribute("data-x", "42");
            expect(el.getAttribute("data-x")).toBe("42");
        });

        it("returns null for a missing attribute", () => {
            expect(shimDoc().createElement("div").getAttribute("missing")).toBeNull();
        });

        it("hasAttribute returns true when the attribute exists", () => {
            const el = shimDoc().createElement("div");
            el.setAttribute("class", "foo");
            expect(el.hasAttribute("class")).toBe(true);
        });

        it("hasAttribute returns false when the attribute is absent", () => {
            expect(shimDoc().createElement("div").hasAttribute("class")).toBe(false);
        });

        it("attribute names are case-insensitive (set lower, get upper)", () => {
            const el = shimDoc().createElement("div");
            el.setAttribute("data-foo", "bar");
            expect(el.getAttribute("DATA-FOO")).toBe("bar");
        });

        it("attribute names are case-insensitive (set upper, get lower)", () => {
            const el = shimDoc().createElement("div");
            el.setAttribute("DATA-FOO", "bar");
            expect(el.getAttribute("data-foo")).toBe("bar");
        });

        it("overwrites an existing attribute value", () => {
            const el = shimDoc().createElement("div");
            el.setAttribute("x", "1");
            el.setAttribute("x", "2");
            expect(el.getAttribute("x")).toBe("2");
        });
    });

    // -----------------------------------------------------------------------
    // ShimElement – id / type convenience properties
    // -----------------------------------------------------------------------
    describe("ShimElement – id property", () => {
        it("returns empty string when not set", () => {
            expect(shimDoc().createElement("div").id).toBe("");
        });

        it("round-trips via setter / getter", () => {
            const el = shimDoc().createElement("div");
            el.id = "my-id";
            expect(el.id).toBe("my-id");
        });

        it("appears in outerHTML", () => {
            const el = shimDoc().createElement("div");
            el.id = "test";
            expect(el.outerHTML).toContain('id="test"');
        });
    });

    describe("ShimElement – type property", () => {
        it("returns empty string when not set", () => {
            expect(shimDoc().createElement("input").type).toBe("");
        });

        it("round-trips via setter / getter", () => {
            const el = shimDoc().createElement("input");
            el.type = "text";
            expect(el.type).toBe("text");
        });
    });

    // -----------------------------------------------------------------------
    // ShimElement – textContent
    // -----------------------------------------------------------------------
    describe("ShimElement – textContent", () => {
        it("returns empty string for a fresh element", () => {
            expect(shimDoc().createElement("div").textContent).toBe("");
        });

        it("setter populates text", () => {
            const el = shimDoc().createElement("div");
            el.textContent = "hello";
            expect(el.textContent).toBe("hello");
        });

        it("setter replaces prior content", () => {
            const el = shimDoc().createElement("div");
            el.textContent = "first";
            el.textContent = "second";
            expect(el.textContent).toBe("second");
        });

        it("accumulates text from nested child elements", () => {
            const parent = shimDoc().createElement("div");
            const child = shimDoc().createElement("span");
            child.textContent = "nested";
            parent.appendChild(child);
            parent.appendChild(shimDoc().createTextNode(" text"));
            expect(parent.textContent).toBe("nested text");
        });
    });

    // -----------------------------------------------------------------------
    // ShimElement – appendChild
    // -----------------------------------------------------------------------
    describe("ShimElement – appendChild", () => {
        it("returns the appended node", () => {
            const parent = shimDoc().createElement("div");
            const child = shimDoc().createElement("span");
            expect(parent.appendChild(child)).toBe(child);
        });

        it("appended text node appears in outerHTML", () => {
            const el = shimDoc().createElement("p");
            el.appendChild(shimDoc().createTextNode("plain"));
            expect(el.outerHTML).toBe("<p>plain</p>");
        });

        it("appended child element appears in outerHTML", () => {
            const parent = shimDoc().createElement("div");
            const child = shimDoc().createElement("span");
            child.textContent = "hi";
            parent.appendChild(child);
            expect(parent.outerHTML).toBe("<div><span>hi</span></div>");
        });
    });

    // -----------------------------------------------------------------------
    // ShimElement – outerHTML serialisation
    // -----------------------------------------------------------------------
    describe("ShimElement – outerHTML", () => {
        it("serialises an empty element as open+close tags", () => {
            expect(shimDoc().createElement("br").outerHTML).toBe("<br></br>");
        });

        it("includes all set attributes", () => {
            const el = shimDoc().createElement("a");
            el.setAttribute("href", "https://example.com");
            el.setAttribute("target", "_blank");
            expect(el.outerHTML).toContain('href="https://example.com"');
            expect(el.outerHTML).toContain('target="_blank"');
        });

        it("escapes & in text content", () => {
            const el = shimDoc().createElement("p");
            el.textContent = "a & b";
            expect(el.outerHTML).toBe("<p>a &amp; b</p>");
        });

        it("escapes < in text content", () => {
            const el = shimDoc().createElement("p");
            el.textContent = "a < b";
            expect(el.outerHTML).toBe("<p>a &lt; b</p>");
        });

        it("escapes > in text content", () => {
            const el = shimDoc().createElement("p");
            el.textContent = "a > b";
            expect(el.outerHTML).toBe("<p>a &gt; b</p>");
        });

        it("escapes & in attribute values", () => {
            const el = shimDoc().createElement("a");
            el.setAttribute("title", "a & b");
            expect(el.outerHTML).toContain('title="a &amp; b"');
        });

        it('escapes " in attribute values', () => {
            const el = shimDoc().createElement("a");
            el.setAttribute("title", 'say "hi"');
            expect(el.outerHTML).toContain('title="say &quot;hi&quot;"');
        });

        it("does NOT escape text content in <script> (raw text element)", () => {
            const el = shimDoc().createElement("script");
            el.textContent = 'if (a < b && c > d) { return "ok"; }';
            expect(el.outerHTML).toBe('<script>if (a < b && c > d) { return "ok"; }</script>');
        });

        it("does NOT escape text content in <style> (raw text element)", () => {
            const el = shimDoc().createElement("style");
            el.textContent = "a > b { color: red; }";
            expect(el.outerHTML).toBe("<style>a > b { color: red; }</style>");
        });

        it("serialises nested child elements recursively", () => {
            const outer = shimDoc().createElement("div");
            const inner = shimDoc().createElement("em");
            inner.textContent = "bold & italic";
            outer.appendChild(inner);
            expect(outer.outerHTML).toBe("<div><em>bold &amp; italic</em></div>");
        });
    });

    // -----------------------------------------------------------------------
    // DOMParser – parseFromString → ShimDocument
    // -----------------------------------------------------------------------
    describe("DOMParser.parseFromString", () => {

        describe("querySelector", () => {
            it("returns the notebook element when present", () => {
                const doc = makeParser().parseFromString('<notebook id="nb1"><title>T</title></notebook>', "text/html");
                const el = doc.querySelector("notebook");
                expect(el).not.toBeNull();
                expect(el.id).toBe("nb1");
            });

            it("returns null for notebook when absent", () => {
                const doc = makeParser().parseFromString("<html></html>", "text/html");
                expect(doc.querySelector("notebook")).toBeNull();
            });

            it("returns the title element when present inside notebook", () => {
                const doc = makeParser().parseFromString("<notebook><title>My Title</title></notebook>", "text/html");
                const el = doc.querySelector("title");
                expect(el).not.toBeNull();
                expect(el.textContent).toBe("My Title");
            });

            it("returns title even when there is no notebook wrapper", () => {
                const doc = makeParser().parseFromString("<title>Bare</title>", "text/html");
                expect(doc.querySelector("title")?.textContent).toBe("Bare");
            });

            it("returns null for an unrecognised selector", () => {
                const doc = makeParser().parseFromString("<notebook></notebook>", "text/html");
                expect(doc.querySelector("body")).toBeNull();
            });
        });

        describe("querySelectorAll", () => {
            it("returns all script elements inside notebook", () => {
                const html = '<notebook><script type="module">const x=1;</script><script type="module">const y=2;</script></notebook>';
                const scripts = makeParser().parseFromString(html, "text/html").querySelectorAll("notebook script");
                expect(scripts).toHaveLength(2);
            });

            it("returns an empty array for an unrecognised selector", () => {
                const doc = makeParser().parseFromString("<notebook><script>x;</script></notebook>", "text/html");
                expect(doc.querySelectorAll("div")).toEqual([]);
            });

            it("returns an empty array when there are no scripts", () => {
                const doc = makeParser().parseFromString("<notebook></notebook>", "text/html");
                expect(doc.querySelectorAll("notebook script")).toHaveLength(0);
            });

            it("does not return scripts that sit outside the notebook element", () => {
                const html = '<script>outside();</script><notebook></notebook>';
                const doc = makeParser().parseFromString(html, "text/html");
                expect(doc.querySelectorAll("notebook script")).toHaveLength(0);
            });
        });

        describe("attribute parsing", () => {
            it("parses a double-quoted attribute", () => {
                const doc = makeParser().parseFromString('<notebook version="2"></notebook>', "text/html");
                expect(doc.querySelector("notebook").getAttribute("version")).toBe("2");
            });

            it("parses a single-quoted attribute", () => {
                const doc = makeParser().parseFromString("<notebook data-x='hello'></notebook>", "text/html");
                expect(doc.querySelector("notebook").getAttribute("data-x")).toBe("hello");
            });

            it("parses an unquoted attribute", () => {
                const doc = makeParser().parseFromString("<notebook data-n=42></notebook>", "text/html");
                expect(doc.querySelector("notebook").getAttribute("data-n")).toBe("42");
            });

            it("parses a boolean (value-less) attribute", () => {
                const doc = makeParser().parseFromString("<notebook async></notebook>", "text/html");
                expect(doc.querySelector("notebook").hasAttribute("async")).toBe(true);
            });

            it("hasAttribute returns true for a present attribute", () => {
                const doc = makeParser().parseFromString('<notebook id="x"></notebook>', "text/html");
                expect(doc.querySelector("notebook").hasAttribute("id")).toBe(true);
            });

            it("hasAttribute returns false for an absent attribute", () => {
                const doc = makeParser().parseFromString("<notebook></notebook>", "text/html");
                expect(doc.querySelector("notebook").hasAttribute("id")).toBe(false);
            });

            it("decodes &amp; in attribute values", () => {
                const doc = makeParser().parseFromString('<notebook data-val="a &amp; b"></notebook>', "text/html");
                expect(doc.querySelector("notebook").getAttribute("data-val")).toBe("a & b");
            });

            it("decodes &lt; and &gt; in attribute values", () => {
                const doc = makeParser().parseFromString('<notebook data-val="a &lt; b &gt; c"></notebook>', "text/html");
                expect(doc.querySelector("notebook").getAttribute("data-val")).toBe("a < b > c");
            });

            it("decodes &quot; in attribute values", () => {
                const doc = makeParser().parseFromString('<notebook data-val="say &quot;hi&quot;"></notebook>', "text/html");
                expect(doc.querySelector("notebook").getAttribute("data-val")).toBe('say "hi"');
            });

            it("decodes &apos; in attribute values", () => {
                const doc = makeParser().parseFromString("<notebook data-val=\"it&apos;s\"></notebook>", "text/html");
                expect(doc.querySelector("notebook").getAttribute("data-val")).toBe("it's");
            });

            it("decodes &nbsp; in attribute values", () => {
                const doc = makeParser().parseFromString('<notebook data-val="a&nbsp;b"></notebook>', "text/html");
                expect(doc.querySelector("notebook").getAttribute("data-val")).toBe("a\u00a0b");
            });

            it("leaves unknown named entities unchanged in attribute values", () => {
                const doc = makeParser().parseFromString('<notebook data-val="&unknown;"></notebook>', "text/html");
                expect(doc.querySelector("notebook").getAttribute("data-val")).toBe("&unknown;");
            });
        });

        describe("title text decoding", () => {
            it("decodes &amp; in title text", () => {
                const doc = makeParser().parseFromString("<notebook><title>a &amp; b</title></notebook>", "text/html");
                expect(doc.querySelector("title")!.textContent).toBe("a & b");
            });

            it("decodes decimal numeric entity in title text", () => {
                const doc = makeParser().parseFromString("<notebook><title>&#65;</title></notebook>", "text/html");
                expect(doc.querySelector("title")!.textContent).toBe("A");
            });

            it("decodes hex numeric entity (lowercase x) in title text", () => {
                const doc = makeParser().parseFromString("<notebook><title>&#x41;</title></notebook>", "text/html");
                expect(doc.querySelector("title")!.textContent).toBe("A");
            });

            it("leaves hex numeric entity with uppercase X unchanged (regex only matches #x…)", () => {
                const doc = makeParser().parseFromString("<notebook><title>&#X41;</title></notebook>", "text/html");
                expect(doc.querySelector("title")!.textContent).toBe("&#X41;");
            });
        });

        describe("script element parsing", () => {
            it("script textContent is verbatim – not entity-decoded", () => {
                const html = '<notebook><script>const x = a &amp; b;</script></notebook>';
                const doc = makeParser().parseFromString(html, "text/html");
                expect(doc.querySelectorAll("notebook script")[0].textContent).toBe("const x = a &amp; b;");
            });

            it("script type attribute is accessible via getAttribute", () => {
                const html = '<notebook><script type="module">export default 1;</script></notebook>';
                const doc = makeParser().parseFromString(html, "text/html");
                const script = doc.querySelectorAll("notebook script")[0];
                expect(script.getAttribute("type")).toBe("module");
            });

            it("script type attribute is accessible via the .type property", () => {
                const html = '<notebook><script type="module">export default 1;</script></notebook>';
                const doc = makeParser().parseFromString(html, "text/html");
                const script = doc.querySelectorAll("notebook script")[0];
                expect(script.type).toBe("module");
            });

            it("multiple scripts are returned in document order", () => {
                const html = '<notebook><script id="s1">1;</script><script id="s2">2;</script></notebook>';
                const doc = makeParser().parseFromString(html, "text/html");
                const scripts = doc.querySelectorAll("notebook script");
                expect(scripts[0].id).toBe("s1");
                expect(scripts[1].id).toBe("s2");
            });
        });
    });
});

