import { expect } from "chai";
import { SAXStackParser, XMLNode } from "@hpcc-js/util";

class TestsParser extends SAXStackParser {

    _startDocument = false;
    _endDocument = false;
    _Remainder = false;

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

describe.only("xmldom", function () {
    it("SAXStackParser", async function () {
        const testParser = new TestsParser();
        await testParser.parse(testXml, "./node_modules/@hpcc-js/util/dist");
        expect(testParser._startDocument).to.be.true;
        expect(testParser._endDocument).to.be.true;
        expect(testParser._Remainder).to.be.true;
    });
});
