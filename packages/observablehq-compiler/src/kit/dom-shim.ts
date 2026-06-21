/**
 * Minimal, partial DOM implementation for use in the Node extension host.
 *
 * Observable Notebook Kit's `serialize`/`deserialize` helpers
 * (see `refs/notebook-kit/src/lib/serialize.ts`) require a small subset of the
 * DOM API to be available as `globalThis.document` and `globalThis.DOMParser`.
 * Rather than depend on the heavyweight `jsdom` package (which cannot be safely
 * bundled and drags in large runtime assets), we provide just enough of the DOM
 * to satisfy those two functions.
 *
 * Surface required by `serialize`:
 *  - `document.createElement(tag)` and `document.createTextNode(text)`
 *  - element `setAttribute`, `appendChild`, `textContent`, `id`, `type`, `outerHTML`
 *
 * Surface required by `deserialize`:
 *  - `new DOMParser().parseFromString(data, "text/html")`
 *  - document `querySelector`/`querySelectorAll`
 *  - element `getAttribute`, `hasAttribute`, `id`, `textContent`
 */

const RAW_TEXT_TAGS = new Set(["script", "style"]);

function escapeText(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function escapeAttr(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;");
}

function decodeEntities(text: string): string {
    return text.replace(/&(#x[0-9a-fA-F]+|#[0-9]+|[a-zA-Z][a-zA-Z0-9]*);/g, (match: string, body: string): string => {
        if (body[0] === "#") {
            const code = body[1] === "x" || body[1] === "X"
                ? parseInt(body.slice(2), 16)
                : parseInt(body.slice(1), 10);
            return Number.isFinite(code) ? String.fromCodePoint(code) : match;
        }
        switch (body) {
            case "amp": return "&";
            case "lt": return "<";
            case "gt": return ">";
            case "quot": return "\"";
            case "apos": return "'";
            case "nbsp": return "\u00a0";
            default: return match;
        }
    });
}

class ShimTextNode {
    constructor(public value: string) { }
}

type ShimChildNode = ShimTextNode | ShimElement;

class ShimElement {
    readonly tagName: string;
    private readonly attributes = new Map<string, string>();
    private childNodes: ShimChildNode[] = [];

    constructor(tagName: string) {
        this.tagName = tagName.toLowerCase();
    }

    setAttribute(name: string, value: string): void {
        this.attributes.set(name.toLowerCase(), value);
    }

    getAttribute(name: string): string | null {
        const key = name.toLowerCase();
        return this.attributes.has(key) ? this.attributes.get(key)! : null;
    }

    hasAttribute(name: string): boolean {
        return this.attributes.has(name.toLowerCase());
    }

    appendChild<T extends ShimChildNode>(node: T): T {
        this.childNodes.push(node);
        return node;
    }

    get id(): string {
        return this.getAttribute("id") ?? "";
    }

    set id(value: string) {
        this.setAttribute("id", value);
    }

    get type(): string {
        return this.getAttribute("type") ?? "";
    }

    set type(value: string) {
        this.setAttribute("type", value);
    }

    get textContent(): string {
        return this.childNodes
            .map((node) => node instanceof ShimElement ? node.textContent : node.value)
            .join("");
    }

    set textContent(value: string) {
        this.childNodes = [new ShimTextNode(value)];
    }

    get outerHTML(): string {
        const isRaw = RAW_TEXT_TAGS.has(this.tagName);
        let attrs = "";
        for (const [name, value] of this.attributes) {
            attrs += ` ${name}="${escapeAttr(value)}"`;
        }
        let inner = "";
        for (const node of this.childNodes) {
            if (node instanceof ShimElement) {
                inner += node.outerHTML;
            } else {
                inner += isRaw ? node.value : escapeText(node.value);
            }
        }
        return `<${this.tagName}${attrs}>${inner}</${this.tagName}>`;
    }
}

class ShimDocument {
    constructor(
        private readonly notebookEl: ShimElement | null,
        private readonly titleEl: ShimElement | null,
        private readonly scripts: ShimElement[]
    ) { }

    querySelector(selector: string): ShimElement | null {
        switch (selector) {
            case "notebook":
                return this.notebookEl;
            case "title":
                return this.titleEl;
            default:
                return null;
        }
    }

    querySelectorAll(selector: string): ShimElement[] {
        switch (selector) {
            case "notebook script":
                return this.scripts;
            default:
                return [];
        }
    }
}

function applyAttributes(element: ShimElement, attrString: string): void {
    const re = /([^\s=/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
    let match: RegExpExecArray | null;
    while ((match = re.exec(attrString)) !== null) {
        const name = match[1];
        if (!name) {
            continue;
        }
        const rawValue = match[2] ?? match[3] ?? match[4] ?? "";
        element.setAttribute(name, decodeEntities(rawValue));
    }
}

function parseHTML(data: string): ShimDocument {
    let notebookEl: ShimElement | null = null;
    let scope = data;

    const notebookMatch = /<notebook\b([^>]*)>([\s\S]*?)<\/notebook>/i.exec(data);
    if (notebookMatch) {
        notebookEl = new ShimElement("notebook");
        applyAttributes(notebookEl, notebookMatch[1]);
        scope = notebookMatch[2];
    }

    let titleEl: ShimElement | null = null;
    const titleMatch = /<title\b([^>]*)>([\s\S]*?)<\/title>/i.exec(scope);
    if (titleMatch) {
        titleEl = new ShimElement("title");
        applyAttributes(titleEl, titleMatch[1]);
        titleEl.textContent = decodeEntities(titleMatch[2]);
    }

    const scripts: ShimElement[] = [];
    const scriptRe = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
    let scriptMatch: RegExpExecArray | null;
    while ((scriptMatch = scriptRe.exec(scope)) !== null) {
        const element = new ShimElement("script");
        applyAttributes(element, scriptMatch[1]);
        // Script is a raw text element: its content is not entity-decoded.
        element.textContent = scriptMatch[2];
        scripts.push(element);
    }

    return new ShimDocument(notebookEl, titleEl, scripts);
}

class ShimDOMParser {
    parseFromString(data: string, _type: string): ShimDocument {
        return parseHTML(data);
    }
}

const shimDocument = {
    createElement(tagName: string): ShimElement {
        return new ShimElement(tagName);
    },
    createTextNode(value: string): ShimTextNode {
        return new ShimTextNode(value);
    }
};

/**
 * Installs the partial DOM shim onto `globalThis` if a DOM is not already
 * present. This makes `globalThis.document` and `globalThis.DOMParser`
 * available for Observable Notebook Kit's serialize/deserialize helpers when
 * running in the Node extension host.
 */
export function installDOMShim(): void {
    const target = globalThis as unknown as { document?: unknown; DOMParser?: unknown };
    if (!target.document) {
        target.document = shimDocument as unknown as typeof Document;
    }
    if (!target.DOMParser) {
        target.DOMParser = ShimDOMParser as unknown as typeof DOMParser;
    }
}
