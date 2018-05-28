import * as fs from "fs";
import * as path from "path";

import { Dictionary, DictionaryNoCase } from "@hpcc-js/util";
import { find } from "@hpcc-js/util";
import { scopedLogger } from "@hpcc-js/util";
import { SAXStackParser, XMLNode } from "@hpcc-js/util";
import { ClientTools, locateClientTools } from "./eclcc";

const logger = scopedLogger("clienttools/eclmeta");

export interface IFilePath {
    scope: ECLScope;
}

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
    definition: Definition;
    get scope(): ECLScope {
        return this.definition;
    }
    name: string;
    type: string;

    constructor(definition: Definition, xmlField: XMLNode) {
        this.definition = definition;
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

export class ECLScope implements IFilePath {
    get scope(): ECLScope {
        return this;
    }
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
        this.sourcePath = path.normalize(sourcePath);
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
        const base = qualifiedIDParts.shift();
        const retVal = find(defs, def => {
            if (typeof def.name === "string" && typeof base === "string" && def.name.toLowerCase() === base.toLowerCase()) {
                return true;
            }
            return false;
        });
        if (retVal && retVal.definitions.length && qualifiedIDParts.length) {
            return this._resolve(retVal.definitions, qualifiedIDParts.join("."));
        }
        return retVal;
    }

    resolve(qualifiedID: string): Definition | undefined {
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
            const retVal = new Field(this, field);
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
        const nameParts = xmlSource.$.name.split(".");
        nameParts.pop();
        const fakeNode = new XMLNode("");
        fakeNode.appendAttribute("name", "$");
        fakeNode.appendAttribute("ref", nameParts.join("."));
        this.imports = [
            new Import(fakeNode),
            ...this.parseImports(xmlSource.children("Import"))
        ];
    }

    private parseImports(imports: XMLNode[] = []): Import[] {
        return imports.map(imp => {
            const retVal = new Import(imp);
            inspect(imp, "import", retVal);
            return retVal;
        });
    }

    resolve(qualifiedID: string, charOffset?: number): Definition | undefined {
        let retVal;

        //  Check Inner Scopes  ---
        if (!retVal && charOffset !== undefined) {
            const scopes = this.scopeStackAt(charOffset);
            scopes.some(scope => {
                retVal = scope.resolve(qualifiedID);
                return !!retVal;
            });
        }

        //  Check Definitions  ---
        if (!retVal) {
            retVal = super.resolve(qualifiedID);
        }
        return retVal;
    }
}

const isHiddenDirectory = source => path.basename(source).indexOf(".") === 0;
const isDirectory = source => fs.lstatSync(source).isDirectory() && !isHiddenDirectory(source);
const isEcl = source => [".ecl", ".ecllib"].indexOf(path.extname(source).toLowerCase()) >= 0;
const modAttrs = source => fs.readdirSync(source).map(name => path.join(source, name)).filter(path => isDirectory(path) || isEcl(path));

export class File extends ECLScope {

    constructor(name: string, sourcePath: string) {
        super(name, "file", sourcePath, []);
    }

    suggestions(): ISuggestion[] {
        return [];
    }
}

export class Folder extends ECLScope {

    constructor(name: string, sourcePath: string) {
        super(name, "folder", sourcePath, []);
    }

    suggestions(): ISuggestion[] {
        return modAttrs(this.sourcePath).map(folder => {
            return {
                name: path.basename(folder, ".ecl"),
                type: "folder"
            };
        });
    }
}

export class Workspace {
    _workspacePath: string;
    _eclccPath?: string;
    _clientTools: ClientTools;
    _sourceByID: DictionaryNoCase<Source> = new DictionaryNoCase<Source>();
    _sourceByPath: Dictionary<Source> = new Dictionary<Source>();
    private _test: DictionaryNoCase<IFilePath> = new DictionaryNoCase<IFilePath>();

    constructor(workspacePath: string, eclccPath?: string) {
        this._workspacePath = workspacePath;
        this._eclccPath = eclccPath;
    }

    refresh() {
        this.primeWorkspace();
        this.primeClientTools();
    }

    primeClientTools(): Promise<this> {
        return locateClientTools(this._eclccPath, this._workspacePath).then(clientTools => {
            this._clientTools = clientTools;
            return clientTools.paths();
        }).then(paths => {
            for (const knownFolder of ["ECLCC_ECLLIBRARY_PATH", "ECLCC_PLUGIN_PATH"]) {
                if (paths[knownFolder] && fs.existsSync(paths[knownFolder])) {
                    this.walkChildFolders(paths[knownFolder], paths[knownFolder]);
                }
            }
            return this;
        });
    }

    primeWorkspace() {
        if (fs.existsSync(this._workspacePath)) {
            this.visitFolder(this._workspacePath, this._workspacePath);
        }
    }

    walkChildFolders(folderPath: string, refPath: string, force: boolean = false) {
        for (const child of modAttrs(folderPath)) {
            if (!isDirectory(child)) {
                this.visitFile(child, refPath, force);
            } else {
                this.visitFolder(child, refPath, force);
            }
        }
    }

    visitFile(filePath: string, refPath: string, force: boolean = false) {
        const filePathInfo = path.parse(filePath);
        const pathNoExt = path.join(filePathInfo.dir, filePathInfo.name);
        const name = path.relative(refPath, pathNoExt).split(path.sep).join(".");
        if (force || !this._test.has(name)) {
            this._test.set(name, new File("", filePath));
        }
    }

    visitFolder(folderPath: string, refPath: string, force: boolean = false) {
        const name = path.relative(refPath, folderPath).split(path.sep).join(".");
        if (force || !this._test.has(name)) {
            this._test.set(name, new Folder(name, folderPath));
            this.walkChildFolders(folderPath, refPath, force);
        }
    }

    buildStack(parentStack: string[], name: string, removeDupID: boolean): { stack: string[], qid: string } {
        const nameStack = name.split(".");
        if (removeDupID && parentStack[parentStack.length - 1] === nameStack[0]) {
            nameStack.shift();
        }
        const stack = [...parentStack, ...nameStack];
        const qid: string = stack.join(".");
        return {
            stack,
            qid
        };
    }

    walkECLScope(parentStack: string[], scope: ECLScope) {
        const info = this.buildStack(parentStack, scope.name, true);
        this._test.set(info.qid, scope);
        for (const def of scope.definitions) {
            this.walkDefinition(info.stack, def);
        }
    }

    walkField(parentStack: string[], field: Field) {
        const info = this.buildStack(parentStack, field.name, false);
        this._test.set(info.qid, field);
    }

    walkDefinition(parentStack: string[], definition: Definition) {
        const info = this.buildStack(parentStack, definition.name, true);
        this.walkECLScope(parentStack, definition);
        for (const field of definition.fields) {
            this.walkField(info.stack, field);
        }
    }

    walkSource(source: Source) {
        // const dirName = path.dirname(source.sourcePath);
        // const relName = path.relative(this._workspacePath, dirName).split(path.sep).join(".");
        // const folder = new Folder(relName, dirName);
        // this._test.set(folder.name, folder);
        this.walkECLScope([], source);
    }

    parseSources(sources: XMLNode[] = []): void {
        for (const _source of sources) {
            if (_source.$.name) {   //  Plugins have no name...
                const source = new Source(_source);
                inspect(_source, "source", source);
                this._sourceByID.set(source.name, source);
                this._sourceByPath.set(source.sourcePath, source);

                //  If external source like "std.system.ThorLib" then need to backup to "std" and add its folder
                if (source.name) {
                    const sourceNameParts = source.name.split(".");
                    let depth = sourceNameParts.length;
                    if (depth > 1) {
                        let sourcePath = source.sourcePath;
                        while (depth > 1) {
                            sourcePath = path.dirname(sourcePath);
                            --depth;
                        }
                        this.visitFolder(sourcePath, path.dirname(sourcePath));
                    }
                }
                this.walkSource(source);
            }
        }
    }

    parseMetaXML(metaXML: string): string[] {
        const metaParser = new MetaParser();
        metaParser.parse(metaXML);
        this.parseSources(metaParser.sources);
        return metaParser.sources.map(source => path.normalize(source.$.sourcePath));
    }

    resolveQualifiedID(filePath: string, qualifiedID: string, charOffset?: number): ECLScope | undefined {
        let retVal: ECLScope | undefined;
        if (!retVal && this._test.has(qualifiedID)) {
            retVal = this._test.get(qualifiedID).scope;
        }
        if (!retVal && this._sourceByPath.has(filePath)) {
            const eclSource = this._sourceByPath.get(filePath);

            //  Resolve Imports  ---
            const qualifiedIDParts = qualifiedID.split(".");
            for (const imp of eclSource.imports) {
                if (imp.name.toLowerCase() === qualifiedIDParts[0].toLowerCase()) {
                    if (imp.ref) {
                        qualifiedIDParts[0] = imp.ref;
                    } else {
                        qualifiedIDParts.shift();
                    }
                    break;
                }
            }
            let realQID = qualifiedIDParts.join(".");
            if (!retVal && this._test.has(realQID)) {
                retVal = this._test.get(realQID).scope;
            }
            if (!retVal) {
                realQID = [...eclSource.name.split("."), ...qualifiedIDParts].join(".");
                if (this._test.has(realQID)) {
                    retVal = this._test.get(realQID).scope;
                }
            }
        }
        return retVal;
    }

    resolvePartialID(filePath: string, partialID: string, charOffset: number): ECLScope | undefined {
        partialID = partialID.toLowerCase();
        const partialIDParts = partialID.split(".");
        partialIDParts.pop();
        const partialIDQualifier = partialIDParts.length === 1 ? partialIDParts[0] : partialIDParts.join(".");
        return this.resolveQualifiedID(filePath, partialIDQualifier, charOffset);
    }
}

const workspaceCache = new Dictionary<Workspace>();
export function attachWorkspace(_workspacePath: string, eclccPath?: string): Workspace {
    const workspacePath = path.normalize(_workspacePath);
    if (!workspaceCache.has(workspacePath)) {
        const workspace = new Workspace(workspacePath, eclccPath);
        workspaceCache.set(workspacePath, workspace);
        workspace.refresh();
    }
    return workspaceCache.get(workspacePath);
}

function isQualifiedIDChar(lineText: string, charPos: number, reverse: boolean) {
    if (charPos < 0) return false;
    const testChar = lineText.charAt(charPos);
    return (reverse ? /[a-zA-Z\d_\.$]/ : /[a-zA-Z\d_]/).test(testChar);
}

export function qualifiedIDBoundary(lineText: string, charPos: number, reverse: boolean) {
    while (isQualifiedIDChar(lineText, charPos, reverse)) {
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
