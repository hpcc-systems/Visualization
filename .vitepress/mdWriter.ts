import { ApiItem, ApiItemKind, ApiProperty } from "@microsoft/api-extractor-model";
import { DocBlock, DocEscapedText, DocParamCollection, DocErrorText, DocParamBlock, DocBlockTag, DocFencedCode, DocNodeTransforms, DocLinkTag, DocParagraph, DocHtmlStartTag, DocCodeSpan, DocHtmlEndTag, DocPlainText, DocNode, DocSection } from '@microsoft/tsdoc';

const enum DocNodeKind {
    Block = "Block",
    BlockTag = "BlockTag",
    Excerpt = "Excerpt",
    FencedCode = "FencedCode",
    CodeSpan = "CodeSpan",
    Comment = "Comment",
    DeclarationReference = "DeclarationReference",
    ErrorText = "ErrorText",
    EscapedText = "EscapedText",
    HtmlAttribute = "HtmlAttribute",
    HtmlEndTag = "HtmlEndTag",
    HtmlStartTag = "HtmlStartTag",
    InheritDocTag = "InheritDocTag",
    InlineTag = "InlineTag",
    LinkTag = "LinkTag",
    MemberIdentifier = "MemberIdentifier",
    MemberReference = "MemberReference",
    MemberSelector = "MemberSelector",
    MemberSymbol = "MemberSymbol",
    Paragraph = "Paragraph",
    ParamBlock = "ParamBlock",
    ParamCollection = "ParamCollection",
    PlainText = "PlainText",
    Section = "Section",
    SoftBreak = "SoftBreak"
}

export class IndentedWriter {

    content: string[] = [""];

    ensureNewLine() {
        const lastCharacter: string = this.peekLastCharacter();
        if (lastCharacter !== '\n' && lastCharacter !== '') {
            this.write("\n");
        }
    }

    writeLine(text: string = "") {
        this.content.push(`${text}\n`);
    }

    write(text: string) {
        this.content[this.content.length - 1] += text;
    }

    peekLastCharacter() {
        const line = this.content[this.content.length - 1];
        return line[line.length - 1];
    }

    toString() {
        return this.content.join("");
    }
}

interface IMarkdownEmitterOptions { }
interface IMarkdownEmitterContext<TOptions = IMarkdownEmitterOptions> {
    writer: IndentedWriter;
    insideTable?: boolean;

    boldRequested?: boolean;
    italicRequested?: boolean;

    writingBold?: boolean;
    writingItalic?: boolean;

    options?: TOptions;
}

function writeDocNode(docNode: DocNode, context: IMarkdownEmitterContext, docNodeSiblings: boolean): void {
    if (!docNode) return;
    const writer: IndentedWriter = context.writer;
    // writer.writeLine(docNode.kind);
    switch (docNode.kind) {
        case DocNodeKind.PlainText: {
            const docPlainText: DocPlainText = docNode as DocPlainText;
            writePlainText(docPlainText.text, context);
            break;
        }
        case DocNodeKind.HtmlStartTag:
        case DocNodeKind.HtmlEndTag: {
            const docHtmlTag: DocHtmlStartTag | DocHtmlEndTag = docNode as DocHtmlStartTag | DocHtmlEndTag;
            // write the HTML element verbatim into the output
            writer.write(docHtmlTag.emitAsHtml());
            break;
        }
        case DocNodeKind.CodeSpan: {
            const docCodeSpan: DocCodeSpan = docNode as DocCodeSpan;
            if (context.insideTable) {
                writer.write('<code>');
            } else {
                writer.write('`');
            }
            if (context.insideTable) {
                const code: string = this.getTableEscapedText(docCodeSpan.code);
                const parts: string[] = code.split(/\r?\n/g);
                writer.write(parts.join('</code><br/><code>'));
            } else {
                writer.write(docCodeSpan.code);
            }
            if (context.insideTable) {
                writer.write('</code>');
            } else {
                writer.write('`');
            }
            break;
        }
        case DocNodeKind.LinkTag: {
            const docLinkTag: DocLinkTag = docNode as DocLinkTag;
            if (docLinkTag.codeDestination) {
                this.writeLinkTagWithCodeDestination(docLinkTag, context);
            } else if (docLinkTag.urlDestination) {
                this.writeLinkTagWithUrlDestination(docLinkTag, context);
            } else if (docLinkTag.linkText) {
                writePlainText(docLinkTag.linkText, context);
            }
            break;
        }
        case DocNodeKind.Paragraph: {
            const docParagraph: DocParagraph = docNode as DocParagraph;
            const trimmedParagraph: DocParagraph = DocNodeTransforms.trimSpacesInParagraph(docParagraph);
            if (context.insideTable) {
                if (docNodeSiblings) {
                    writer.write('<p>');
                    writeNodes(trimmedParagraph.nodes, context);
                    writer.write('</p>');
                } else {
                    // Special case:  If we are the only element inside this table cell, then we can omit the <p></p> container.
                    writeNodes(trimmedParagraph.nodes, context);
                }
            } else {
                writeNodes(trimmedParagraph.nodes, context);
                writer.ensureNewLine();
                writer.writeLine();
            }
            break;
        }
        case DocNodeKind.FencedCode: {
            const docFencedCode: DocFencedCode = docNode as DocFencedCode;
            writer.ensureNewLine();
            writer.write('```');
            writer.write(docFencedCode.language);
            writer.writeLine();
            writer.write(docFencedCode.code);
            writer.ensureNewLine();
            writer.writeLine('```');
            break;
        }
        case DocNodeKind.Section: {
            const docSection: DocSection = docNode as DocSection;
            writeNodes(docSection.nodes, context);
            break;
        }
        case DocNodeKind.SoftBreak: {
            if (!/^\s?$/.test(writer.peekLastCharacter())) {
                writer.write(' ');
            }
            break;
        }
        case DocNodeKind.EscapedText: {
            const docEscapedText: DocEscapedText = docNode as DocEscapedText;
            writePlainText(docEscapedText.decodedText, context);
            break;
        }
        case DocNodeKind.ErrorText: {
            const docErrorText: DocErrorText = docNode as DocErrorText;
            writePlainText(docErrorText.text, context);
            break;
        }
        case DocNodeKind.InlineTag: {
            break;
        }
        case DocNodeKind.BlockTag: {
            const tagNode: DocBlockTag = docNode as DocBlockTag;
            console.warn('Unsupported block tag: ' + tagNode.tagName);
            break;
        }
        case DocNodeKind.Block: {
            const docBlock: DocBlock = docNode as DocBlock;
            writeDocNode(docBlock.content, context, docNodeSiblings);
            break;
        }
        case DocNodeKind.ParamCollection: {
            const paramCollection: DocParamCollection = docNode as DocParamCollection;
            writeNodes(paramCollection.blocks, context);
            break;
        }
        case DocNodeKind.ParamBlock: {
            const paramBlock: DocParamBlock = docNode as DocParamBlock;
            writer.write(`* \`${paramBlock.parameterName}\`:  `);
            writeDocNode(paramBlock.content, context, docNodeSiblings);
            writer.ensureNewLine();
            break;
        }
        default:
            writer.writeLine(`Unknown prop type ${docNode.kind} (${Object.getPrototypeOf(docNode).constructor.name})`);
    }
}

function getEscapedText(text: string): string {
    const textWithBackslashes: string = text
        .replace(/\\/g, '\\\\') // first replace the escape character
        .replace(/[*#[\]_|`~]/g, (x) => '\\' + x) // then escape any special characters
        .replace(/---/g, '\\-\\-\\-') // hyphens only if it's 3 or more
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    return textWithBackslashes;
}

function getTableEscapedText(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\|/g, '&#124;');
}

function writePlainText(text: string, context: IMarkdownEmitterContext): void {
    const writer: IndentedWriter = context.writer;

    // split out the [ leading whitespace, content, trailing whitespace ]
    const parts: string[] = text.match(/^(\s*)(.*?)(\s*)$/) || [];

    writer.write(parts[1]); // write leading whitespace

    const middle: string = parts[2];

    if (middle !== '') {
        switch (writer.peekLastCharacter()) {
            case '':
            case '\n':
            case ' ':
            case '[':
            case '>':
                // okay to put a symbol
                break;
            default:
                // This is no problem:        "**one** *two* **three**"
                // But this is trouble:       "**one***two***three**"
                // The most general solution: "**one**<!-- -->*two*<!-- -->**three**"
                writer.write('<!-- -->');
                break;
        }

        if (context.boldRequested) {
            writer.write('<b>');
        }
        if (context.italicRequested) {
            writer.write('<i>');
        }

        writer.write(getEscapedText(middle));

        if (context.italicRequested) {
            writer.write('</i>');
        }
        if (context.boldRequested) {
            writer.write('</b>');
        }
    }

    writer.write(parts[3]); // write trailing whitespace
}

function writeNodes(docNodes: ReadonlyArray<DocNode>, context: IMarkdownEmitterContext): void {
    for (const docNode of docNodes) {
        writeDocNode(docNode, context, docNodes.length > 1);
    }
}

export function writeApiItem(apiItem: ApiItem, context: IMarkdownEmitterContext, docNodeSiblings: boolean): boolean {
    const writer: IndentedWriter = context.writer;

    switch (apiItem.kind) {
        case ApiItemKind.Property:
            const property = apiItem as ApiProperty;
            writer.write(`### \`${property.displayName}\``);
            writer.writeLine();
            writeDocNode(property.tsdocComment?.summarySection, { ...context, italicRequested: true }, docNodeSiblings);
            writer.writeLine();
            writer.write(`**Type:**  \`${property.propertyTypeExcerpt?.text}\``);
            writer.writeLine();
            writeDocNode(property.tsdocComment?.typeParams, context, docNodeSiblings);
            writeDocNode(property.tsdocComment?.params, context, docNodeSiblings);
            writer.writeLine();
            writer.write(`**Default Value:**  `);
            writeNodes(property.tsdocComment?.customBlocks.filter(block => block.blockTag.tagName === "@defaultValue"), context);
            writer.writeLine();
            if (property.tsdocComment?.remarksBlock) {
                writer.writeLine(`::: info`);
                writeDocNode(property.tsdocComment?.remarksBlock, context, docNodeSiblings);
                writer.writeLine(`:::`);
            }
            return true;
    }
    return false;
}

