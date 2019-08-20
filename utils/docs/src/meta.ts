import * as fs from "fs";
import * as path from "path";
import * as TypeDoc from "typedoc";

const wd = process.cwd();
const pkgName = path.basename(wd);

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

    constructor(tdNode: TDNode) {
        super(tdNode);
        if (tdNode.children) {
            tdNode.children.filter(cls => cls.kindString === "Class").forEach(cls => {
                this._classes[cls.name] = new TSClass(cls);
            });
        }
    }

}

export class TSClass extends TSNode {

    constructor(tdNode: TDNode) {
        super(tdNode);
    }

    source() {
        if (this._tdNode.sources) {
            const source = this._tdNode.sources[0];
            return `https://github.com/hpcc-systems/Visualization/blob/master/packages/${pkgName}/src/${source.fileName}#L${source.line}`;
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
            extends: this.extends(),
            yyy: "yyy",
            zzz: {
                aaa: 0
            }
        }, undefined, 4);
    }
}

export class Meta {
    readonly modules: { [id: string]: TSModule } = {};
    private _classes: { [id: string]: TSClass } = {};
    get classes() {
        return this._classes;
    }

    constructor(private useCache: boolean = false) {
    }

    load(): Promise<this> {
        return Promise.all([this.loadPackageJson(), this.useCache ? this.loadTypeDocCache() : this.loadTypeDoc()]).then(([pkgJson, metaObj]) => {
            metaObj.children.forEach(mod => {
                this.modules[mod.name] = new TSModule(mod);
                this._classes = { ...this._classes, ...this.modules[mod.name]._classes };
            });
            return this;
        });
    }

    loadTypeDocCache(): Promise<TDNode> {
        return new Promise(resolve => {
            fs.readFile("./docs/index.json", "utf8", (err, json) => {
                resolve(JSON.parse(json));
            });
        });
    }

    loadTypeDoc(): Promise<TSNode> {
        return new Promise((resolve, reject) => {
            const app = new TypeDoc.Application({
                tsconfig: "./tsconfig.js"
            });

            const project = app.convert(app.expandInputFiles(["src"]));
            if (project) {
                resolve(app.serializer.projectToObject(project));
            } else {
                reject("Error parsing typescript");
            }
        });
    }

    loadPackageJson(): Promise<any> {
        return new Promise(resolve => {
            fs.readFile("./package.json", "utf8", (err, json) => {
                resolve(JSON.parse(json));
            });
        });
    }
}
