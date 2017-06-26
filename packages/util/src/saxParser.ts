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

export class SAXStackParser {
    root: XMLNode;
    stack: Stack<XMLNode> = new Stack<XMLNode>();

    constructor() {
    }

    private walkDoc(node: Node) {
        this.startXMLNode(node);
        if (node.attributes) {
            for (let i = 0; i < node.attributes.length; ++i) {
                const attribute = node.attributes.item(i);
                this.attributes(attribute.nodeName, attribute.nodeValue);
            }
        }
        if (node.childNodes) {
            for (let i = 0; i < node.childNodes.length; ++i) {
                const childNode = node.childNodes.item(i);
                if (childNode.nodeType === childNode.TEXT_NODE) {
                    this.characters(childNode.nodeValue!);
                } else {
                    this.walkDoc(childNode);
                }
            }
        }
        this.endXMLNode(node);
    }

    parse(xml: string) {
        const domParser = new DOMParser();
        const doc = domParser.parseFromString(xml, "application/xml");
        this.startDocument();
        this.walkDoc(doc);
        this.endDocument();
    }

    //  Callbacks  ---
    startDocument() {
    }

    endDocument() {
    }

    startXMLNode(node: Node): XMLNode {
        const newNode = new XMLNode(node.nodeName);
        if (!this.stack.depth()) {
            this.root = newNode;
        } else {
            this.stack.top()!.appendChild(newNode);
        }
        return this.stack.push(newNode);
    }

    endXMLNode(_node: Node): XMLNode {
        return this.stack.pop()!;
    }

    attributes(key: string, val: any) {
        this.stack.top()!.appendAttribute(key, val);
    }

    characters(text: string) {
        this.stack.top()!.appendContent(text);
    }
}

class XML2JSONParser extends SAXStackParser {
    startXMLNode(node: Node): XMLNode {
        const e = super.startXMLNode(node);
        switch (e.name) {
            case "xs:element":
                break;
            case "xs:simpleType":
                break;
            default:
                break;
        }
        return e;
    }

    endXMLNode(node: Node): XMLNode {
        const e: XMLNode = this.stack.top()!;
        switch (e.name) {
            case "xs:element":
                break;
            case "xs:simpleType":
                break;
            default:
                break;
        }
        return super.endXMLNode(node);
    }
}

export function xml2json(xml: string): XMLNode {
    const saxParser = new XML2JSONParser();
    saxParser.parse(xml);
    return saxParser.root;
}
