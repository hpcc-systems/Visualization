import * as path from "path";

export const posixPath = (pathStr: string) => pathStr.split(/[\\\/]/g).join(path.posix.sep);

type kindStringT = "External Module" | "Class" | "Interface" | "Function" | "Variable";
type TSNodeT = TSClass | TSFunction | TSVariable | TSUnknown;

interface TDReference {
    id: number;
    name: string;
    type: "reference";
}

interface TDSource {
    fileName: string;
    line: number;
    character: number;
}

export interface Parameter {
    id: number;
    name: string;
    kindStrng: string;
    flags: {
        isOptional: boolean
    };
    type: {
        type: string;
        name: string
    };
}

export interface Signature {
    id: number;
    name: string;
    kindStrng: string;
    parameters: Parameter[];
    type: {
        type: string;
        name: string
    };
}

export interface TDNode {
    id: number;
    name: string;
    kind: number;
    kindString: undefined | kindStringT;
    flags: {
        isExported?: boolean;
    };
    originalName: string;
    children?: TDNode[];
    groups?: any[];
    extendedTypes?: TDReference[];
    sources?: TDSource[];
    type?: {
        type: string,
        name: string,
        id: number
    };
    signatures?: Signature[];
    folder: string;
}

export class TSNode {

    readonly name: string;
    readonly _content: { [id: string]: TSNodeT } = {};

    constructor(readonly folderPath: string, readonly _tdNode: TDNode) {
        this.name = _tdNode.name;
        if (_tdNode.children) {
            _tdNode.children.forEach(child => {
                switch (child.kindString) {
                    case "Class":
                        this._content[child.name] = new TSClass(folderPath, child);
                        break;
                    case "Function":
                        this._content[child.name] = new TSFunction(folderPath, child);
                        break;
                    case "Variable":
                        this._content[child.name] = new TSVariable(folderPath, child);
                        break;
                    default:
                        this._content[child.name] = new TSUnknown(folderPath, child);
                }
            });
        }
        this._tdNode.folder = posixPath(path.relative("../", this.folderPath));
    }

    items(kind: kindStringT) {
        const retVal: { [id: string]: TSNodeT } = {};
        for (const key in this._content) {
            if (this._content[key]._tdNode.kindString === kind) {
                retVal[key] = this._content[key];
            }
        }
        return retVal;
    }

    classes(): { [id: string]: TSClass } {
        return this.items("Class") as { [id: string]: TSClass };
    }

    item(id: string) {
        const item = this._content[id];
        if (item) {
            return item.toJSON();
        }
        return "Unable to locate:  " + id;
    }

    source() {
        if (this._tdNode.sources) {
            const source = this._tdNode.sources[0];
            return `https://github.com/hpcc-systems/Visualization/blob/master/packages/${path.basename(this.folderPath)}/src/${source.fileName}#L${source.line}`;
        }
        return "";
    }

    signature(id: string) {
        const item = this._content[id];
        let refItem = this._content[id];
        while (refItem && refItem._tdNode.type && refItem._tdNode.type.type === "reference") {
            refItem = this._content[refItem._tdNode.type.name];
        }
        if (refItem) {
            return refItem.toJSON({ ...item._tdNode, signatures: refItem._tdNode.signatures });
        }
        return "Unable to locate:  " + id;
    }

    toJSON(_obj?: TDNode, skipChildren = false) {
        const obj: TDNode = { ...(_obj || this._tdNode) };
        if (skipChildren) {
            delete obj.children;
            delete obj.groups;
        }
        return JSON.stringify(obj || this._tdNode, undefined, 4);
    }
}

export class TSFunction extends TSNode {
}

export class TSVariable extends TSNode {
}

export class TSUnknown extends TSNode {
}

export class TSClass extends TSNode {

    constructor(folderPath: string, tdNode: TDNode) {
        super(folderPath, tdNode);
    }

    extends() {
        if (this._tdNode.extendedTypes) {
            return this._tdNode.extendedTypes.map(et => et.name)[0];
        }
        return "";
    }

    toJSON() {
        return super.toJSON(undefined, true);
    }
}

export class TSModule extends TSNode {

    constructor(folderPath: string, tdNode: TDNode) {
        super(folderPath, tdNode);
    }
}

export class Meta {
    readonly modules: { [id: string]: TSModule } = {};
    private _classes: { [id: string]: TSClass } = {};
    get classes() {
        return this._classes;
    }

    constructor(folderPath: string, filePath: string, metaJson: TDNode) {
        if (metaJson.children) {
            metaJson.children.forEach(mod => {
                this.modules[mod.name] = new TSModule(folderPath, mod);
                this._classes = { ...this._classes, ...this.modules[mod.name].classes() };
            });
        }
    }
}
