import * as path from "path";

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

export interface TDNode {
    id: number;
    name: string;
    kind: number;
    kindString: undefined | "External Module" | "Class";
    flags: {
        isExported?: boolean;
    };
    originalName: string;
    children?: TDNode[];
    extendedTypes?: TDReference[];
    sources?: TDSource[];
}

export class TSNode {

    readonly name: string;

    constructor(readonly _tdNode: TDNode) {
        this.name = _tdNode.name;
    }
}

export class TSModule extends TSNode {

    readonly _classes: { [id: string]: TSClass } = {};

    constructor(folderPath: string, tdNode: TDNode) {
        super(tdNode);
        if (tdNode.children) {
            tdNode.children.filter(cls => cls.kindString === "Class").forEach(cls => {
                this._classes[cls.name] = new TSClass(folderPath, cls);
            });
        }
    }

}

export class TSClass extends TSNode {

    constructor(readonly folderPath: string, tdNode: TDNode) {
        super(tdNode);
    }

    source() {
        if (this._tdNode.sources) {
            const source = this._tdNode.sources[0];
            return `https://github.com/hpcc-systems/Visualization/blob/master/packages/${path.basename(this.folderPath)}/src/${source.fileName}#L${source.line}`;
        }
        return "";
    }

    extends() {
        if (this._tdNode.extendedTypes) {
            return this._tdNode.extendedTypes.map(et => et.name)[0];
        }
        return "";
    }

    toJSON() {
        return JSON.stringify({
            source: this.source(),
            extends: this.extends()
        }, undefined, 4);
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
                this._classes = { ...this._classes, ...this.modules[mod.name]._classes };
            });
        }
    }
}
