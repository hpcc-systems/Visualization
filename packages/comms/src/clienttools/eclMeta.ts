import * as path from "path";

import { Dictionary } from "@hpcc-js/util";
import { find } from "@hpcc-js/util";
import { scopedLogger } from "@hpcc-js/util";
import { SAXStackParser, XMLNode } from "@hpcc-js/util";

const logger = scopedLogger("clienttools/eclmeta");

const _inspect = false;
function inspect(obj: any, _id: string, known: any) {
    if (_inspect) {
        for (const key in obj) {
            const id = `${_id}.${key}`;
            if (key !== "$" && known[key] === undefined && known[key.toLowerCase() + "s"] === undefined) {
                logger.debug(id);
            }
        }
        if (obj.$) {
            inspect(obj.$, _id + ".$", known);
        }
    }
}

export class Attr {
    name: string;

    constructor(xmlAttr: XMLNode) {
        this.name = xmlAttr.$.name;
    }
}

export class Field {
    name: string;
    type: string;

    constructor(xmlField: XMLNode) {
        this.name = xmlField.$.name;
        this.type = xmlField.$.type;
    }
}

export interface ECLDefinitionLocation {
    filePath: string;
    line: number;
    charPos: number;
    definition?: Definition;
    source?: Source;
}

export interface ISuggestion {
    name: string;
    type: string;
}

export class ECLScope {
    name: string;
    type: string;
    sourcePath: string;
    line: number;
    start: number;
    body: number;
    end: number;
    definitions: Definition[];

    constructor(name: string, type: string, sourcePath: string, xmlDefinitions: XMLNode[], line: number = 1, start: number = 0, body: number = 0, end: number = Number.MAX_VALUE) {
        this.name = name;
        this.type = type;
        this.sourcePath = sourcePath;
        this.line = +line - 1;
        this.start = +start;
        this.body = +body;
        this.end = +end;
        this.definitions = this.parseDefinitions(xmlDefinitions);
    }

    private parseDefinitions(definitions: XMLNode[] = []): Definition[] {
        return definitions.map(definition => {
            const retVal = new Definition(this.sourcePath, definition);
            inspect(definition, "definition", retVal);
            return retVal;
        });
    }

    contains(charOffset: number) {
        return charOffset >= this.start && charOffset <= this.end;
    }

    scopeStackAt(charOffset: number): ECLScope[] {
        let retVal: ECLScope[] = [];
        if (this.contains(charOffset)) {
            retVal.push(this);
            this.definitions.forEach(def => {
                retVal = def.scopeStackAt(charOffset).concat(retVal);
            });
        }
        return retVal;
    }

    private _resolve(defs: Definition[] = [], qualifiedID: string): Definition | undefined {
        const qualifiedIDParts = qualifiedID.split(".");
        const top = qualifiedIDParts.shift();
        const retVal = find(defs, def => {
            if (def.name === top) {
                return true;
            }
            return false;
        });
        if (retVal && retVal.definitions.length && qualifiedIDParts.length) {
            return this._resolve(retVal.definitions, qualifiedIDParts.join("."));
        }
        return retVal;
    }

    resolve(qualifiedID: string) {
        return this._resolve(this.definitions, qualifiedID);
    }

    suggestions(): ISuggestion[] {
        return this.definitions.map(def => {
            return {
                name: def.name,
                type: this.type
            };
        });
    }
}

export class Definition extends ECLScope {
    exported: boolean;
    shared: boolean;
    attrs: Attr[];
    fields: Field[];

    constructor(sourcePath: string, xmlDefinition: XMLNode) {
        super(xmlDefinition.$.name, xmlDefinition.$.type, sourcePath, xmlDefinition.children("Definition"), xmlDefinition.$.line, xmlDefinition.$.start, xmlDefinition.$.body, xmlDefinition.$.end);
        this.exported = !!xmlDefinition.$.exported;
        this.shared = !!xmlDefinition.$.shared;
        this.attrs = this.parseAttrs(xmlDefinition.children("Attr"));
        this.fields = this.parseFields(xmlDefinition.children("Field"));
    }

    private parseAttrs(attrs: XMLNode[] = []): Attr[] {
        return attrs.map(attr => {
            const retVal = new Attr(attr);
            inspect(attr, "attr", retVal);
            return retVal;
        });
    }

    private parseFields(fields: XMLNode[] = []): Field[] {
        return fields.map(field => {
            const retVal = new Field(field);
            inspect(field, "field", retVal);
            return retVal;
        });
    }

    suggestions() {
        return super.suggestions().concat(this.fields.map(field => {
            return {
                name: field.name,
                type: field.type
            };
        }));
    }
}

export class Import {
    name: string;
    ref: string;
    start: number;
    end: number;
    line: number;

    constructor(xmlImport: XMLNode) {
        this.name = xmlImport.$.name;
        this.ref = xmlImport.$.ref;
        this.start = xmlImport.$.start;
        this.end = xmlImport.$.end;
        this.line = xmlImport.$.line;
    }
}

export class Source extends ECLScope {
    imports: Import[];

    constructor(xmlSource: XMLNode) {
        super(xmlSource.$.name, "source", xmlSource.$.sourcePath, xmlSource.children("Definition"));
        this.imports = this.parseImports(xmlSource.children("Import"));
    }

    private parseImports(imports: XMLNode[] = []): Import[] {
        return imports.map(imp => {
            const retVal = new Import(imp);
            inspect(imp, "import", retVal);
            return retVal;
        });
    }
}

export class Workspace {
    _workspacePath: string;
    _sourceByID: Dictionary<Source> = new Dictionary<Source>();
    _sourceByPath: Dictionary<Source> = new Dictionary<Source>();

    constructor(workspacePath: string) {
        this._workspacePath = workspacePath;
    }

    parseSources(sources: XMLNode[] = []) {
        return sources.map(_source => {
            const source = new Source(_source);
            inspect(_source, "source", source);
            this._sourceByID.set(source.name, source);
            this._sourceByPath.set(source.sourcePath, source);
        });
    }

    parseMetaXML(metaXML: string): void {
        const metaParser = new MetaParser();
        metaParser.parse(metaXML);
        this.parseSources(metaParser.sources);
    }

    resolveQualifiedID(filePath: string, qualifiedID: string, charOffset: number): ECLScope | undefined {
        qualifiedID = qualifiedID.toLowerCase();
        let retVal: ECLScope | undefined;
        if (this._sourceByPath.has(filePath)) {
            const eclSource = this._sourceByPath.get(filePath);
            const scopes = eclSource.scopeStackAt(charOffset);
            scopes.some(scope => {
                retVal = scope.resolve(qualifiedID);
                return !!retVal;
            });
            if (!retVal) {
                const imports = eclSource.imports;
                imports.some(imp => {
                    if (this._sourceByID.has(imp.ref)) {
                        const eclFile = this._sourceByID.get(imp.ref);
                        if (qualifiedID === imp.ref.toLowerCase()) {
                        }
                        if (!retVal && qualifiedID === imp.name && this._sourceByID.has(imp.ref)) {
                            const importFile = this._sourceByID.get(imp.ref);
                            retVal = this.resolveQualifiedID(importFile.sourcePath, qualifiedID, charOffset);
                            if (!retVal) {
                                const impRefParts = imp.ref.split(".");
                                retVal = this.resolveQualifiedID(importFile.sourcePath, impRefParts[impRefParts.length - 1], charOffset);
                            }
                        }
                        if (!retVal && qualifiedID.indexOf(imp.name + ".") === 0) {
                            const impRefParts = imp.ref.split(".");
                            const partialID = impRefParts[impRefParts.length - 1] + "." + qualifiedID.substring(imp.name.length + 1);
                            retVal = this.resolveQualifiedID(eclFile.sourcePath, partialID, charOffset);
                        }
                    }
                    return !!retVal;
                });
            }
        }
        return retVal;
    }

    resolvePartialID(filePath: string, partialID: string, charOffset: number): ECLScope | undefined {
        partialID = partialID.toLowerCase();
        if (this._sourceByPath.has(filePath)) {
            const partialIDParts = partialID.split(".");
            partialIDParts.pop();
            const partialIDQualifier = partialIDParts.length === 1 ? partialIDParts[0] : partialIDParts.join(".");
            return this.resolveQualifiedID(filePath, partialIDQualifier, charOffset);
        }
        return undefined;
    }
}

const workspaceCache = new Dictionary<Workspace>();
export function attachWorkspace(_workspacePath: string): Workspace {
    const workspacePath = path.normalize(_workspacePath);
    if (!workspaceCache.has(workspacePath)) {
        workspaceCache.set(workspacePath, new Workspace(workspacePath));
    }
    return workspaceCache.get(workspacePath);
}

function isQualifiedIDChar(lineText: string, charPos: number) {
    if (charPos < 0) return false;
    const testChar = lineText.charAt(charPos);
    return /[a-zA-Z\d_\.]/.test(testChar);
}

export function qualifiedIDBoundary(lineText: string, charPos: number, reverse: boolean) {
    while (isQualifiedIDChar(lineText, charPos)) {
        charPos += reverse ? -1 : 1;
    }
    return charPos + (reverse ? 1 : -1);
}

class MetaParser extends SAXStackParser {
    sources: XMLNode[] = [];

    endXMLNode(e: XMLNode) {
        switch (e.name) {
            case "Source":
                this.sources.push(e);
                break;
            default:
                break;
        }
        super.endXMLNode(e);
    }
}
