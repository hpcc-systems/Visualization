import { describe, it, expect } from "vitest";
import { SAXStackParser, XMLNode, root, xml2json } from "@hpcc-js/util";
import { DOMParser } from "@xmldom/xmldom";
root.DOMParser = DOMParser;

class TestsParser extends SAXStackParser {

    _startDocument = false;
    _endDocument = false;
    _Remainder = false;

    constructor() {
        super();
    }

    startDocument() {
        super.startDocument();
        this._startDocument = true;
    }

    endDocument() {
        this._endDocument = true;
        super.endDocument();
    }

    startXMLNode(node: XMLNode) {
        super.startXMLNode(node);
    }

    endXMLNode(node: XMLNode) {
        super.endXMLNode(node);
    }

    attributes(key: string, val: any) {
        super.attributes(key, val);
    }

    characters(text: string) {
        if (this.stack.top()?.name === "heading" && text === "Reminder") {
            this._Remainder = true;
        }
        super.characters(text);
    }
}

const testXml = `\
<?xml version="1.0" encoding="ISO-8859-1"?>  
<note>
    <to>Tove</to>
    <from>Jani</from>
    <heading>Reminder</heading>
    <body>Don't forget me this weekend!</body>
</note>
`;

describe("xmldom", function () {
    it("SAXStackParser", function () {
        const testParser = new TestsParser();
        testParser.parse(testXml);

        expect(testParser._startDocument).to.be.true;
        expect(testParser._endDocument).to.be.true;
        expect(testParser._Remainder).to.be.true;
    });

    it("keeps CDATA text as content", function () {
        const r = xml2json("<r>x<![CDATA[<y>]]>z</r>")!.children()[0];
        expect(r.content).to.equal("x<y>z");
        expect(r.children()).to.have.length(0);
    });

    it("skips comments and processing instructions", function () {
        const r = xml2json("<r>a<!-- c --><?pi data?>b<e/></r>")!.children()[0];
        expect(r.content).to.equal("ab");
        expect(r.children().map(c => c.name)).to.deep.equal(["e"]);
    });

    it("skips the XML declaration", function () {
        const doc = xml2json("<?xml version=\"1.0\"?><!-- top --><Debug><Row>1</Row></Debug>")!;
        expect(doc.children().map(c => c.name)).to.deep.equal(["Debug"]);
        expect(doc.children()[0].children("Row")[0].content).to.equal("1");
    });
});
