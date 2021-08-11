import { Attributes, StackElement, StackParser } from "@hpcc-js/wasm";
import { StringAnyMap } from "./dictionary";
import { Stack } from "./stack";

export class XMLNode {
    name: string = "";
    $: StringAnyMap = {};
    protected _children: XMLNode[] = [];
    content: string = "";

    constructor(name: string) {
        this.name = name;
    }

    appendAttribute(key: string, val: string) {
        this.$[key] = val;
    }

    appendContent(content: string) {
        this.content += content;
    }

    appendChild(child: XMLNode) {
        this._children.push(child);
    }

    children(tag?: string): XMLNode[] {
        if (tag === undefined) {
            return this._children;
        }
        return this._children.filter((xmlNode) => {
            return xmlNode.name === tag;
        });
    }
}

export class SAXStackParser extends StackParser {
    root: XMLNode;
    stack: Stack<XMLNode> = new Stack<XMLNode>();

    constructor() {
        super();
    }

    startElement(tag: string, attrs: Attributes): StackElement {
        const retVal = super.startElement(tag, attrs);
        const xmlNode = new XMLNode(tag);
        if (!this.stack.depth()) {
            this.root = xmlNode;
        } else {
            this.stack.top()!.appendChild(xmlNode);
        }
        this.stack.push(xmlNode);
        if (this.root === xmlNode) {
            this.startDocument();
        }
        this.startXMLNode(xmlNode);
        for (const key in attrs) {
            this.attributes(key, attrs[key]);
        }
        return retVal;
    }

    endElement(tag: string): StackElement {
        const retVal = super.endElement(tag);
        const xmlNode = this.stack.pop();
        this.endXMLNode(xmlNode!);
        if (!this.stack.depth()) {
            this.endDocument();
        }
        return retVal;
    }

    characterData(content: string): void {
        super.characterData(content);
        this.characters(content);
    }

    parse(xml: string, wasmFolder?: string, wasmBinary?: Uint8Array) {
        this.stack = new Stack<XMLNode>();
        const retVal = super.parse(xml, wasmFolder, wasmBinary);
        return retVal;
    }

    //  Callbacks  ---
    startDocument() {
    }

    endDocument() {
    }

    startXMLNode(node: XMLNode) {
    }

    endXMLNode(node: XMLNode) {
    }

    attributes(key: string, val: any) {
        this.stack.top()!.appendAttribute(key, val);
    }

    characters(text: string) {
        this.stack.top()!.appendContent(text);
    }
}

class XML2JSONParser extends SAXStackParser {
    startXMLNode(node: XMLNode) {
        super.startXMLNode(node);
        switch (node.name) {
            case "xs:element":
                break;
            case "xs:simpleType":
                break;
            default:
                break;
        }
    }

    endXMLNode(node: XMLNode) {
        switch (node.name) {
            case "xs:element":
                break;
            case "xs:simpleType":
                break;
            default:
                break;
        }
        super.endXMLNode(node);
    }
}

export async function xml2json(xml: string): Promise<XMLNode> {
    const saxParser = new XML2JSONParser();
    await saxParser.parse(xml);
    return saxParser.root;
}
