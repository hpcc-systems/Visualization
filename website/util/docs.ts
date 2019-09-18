import * as fs from "fs";
import * as path from "path";

import { Meta } from "./meta";

const wd = process.cwd();

const isMD = (file: string) => path.extname(file) === ".md";

class MetaMarker {
    private _classLabel: string;
    private _methodLabel: string;

    constructor(readonly _meta: Meta, readonly _filePath: string, readonly _metaLine: string, readonly lineNo: number) {
        if (this._metaLine === "") {
            this._classLabel = path.basename(this._filePath, ".md");
        } else if (this._metaLine[0] === ":") {
            const parts = this._metaLine.substr(1).split(".");
            if (parts.length) {
                this._classLabel = parts[0];
            }
            if (parts.length > 1) {
                this._methodLabel = parts[1];
            }
        }
    }

    content(): string {
        if (this._classLabel && this._methodLabel) {
            const classDecl = this._meta.classes[this._classLabel];
            if (classDecl) {
                return classDecl.signature(this._methodLabel);
            }
            const moduleDecl = this._meta.modules[`"${this._classLabel}"`];
            if (moduleDecl) {
                return moduleDecl.signature(this._methodLabel);
            }
        } else if (this._classLabel) {
            const classDecl = this._meta.classes[this._classLabel];
            if (classDecl) {
                return classDecl.toJSON();
            }
        }
        return `Unsupported: "${this._metaLine}"`;
    }
}

export class MDFile {

    readonly name: string;
    private _meta: Meta;
    // private _tmp: TSClass;
    private _content: string[];

    constructor(readonly filePath: string, meta: Meta) {
        this.name = path.basename(filePath, ".md");
        this._meta = meta;
        // this._tmp = meta.classes[this.name];
        let content = fs.readFileSync(filePath, "utf8");
        content = content.replace(/\r\n/g, "\n");
        content = content.replace(/\r/g, "\n");
        this._content = content.split("\n");
    }

    protected clearPlaceholder(tag: string): MetaMarker[] {
        const retVal: MetaMarker[] = [];
        const content: string[] = [];
        let inMeta = false;
        let lineNo = 0;
        for (const line of this._content) {
            if (line.indexOf("<!--meta") === 0) {
                inMeta = true;
                retVal.push(new MetaMarker(this._meta, this.filePath, line.substr("<!--meta".length), lineNo));
            } else if (inMeta && line.indexOf("-->") === 0) {
                inMeta = false;
            } else if (inMeta && line.indexOf("-->") === 0) {
                throw new Error(`Invalid Meta Section (${this.filePath}-${lineNo})`);
            } else if (inMeta) {
                continue;
            }
            content.push(line);
            ++lineNo;
        }
        this._content = content;
        return retVal;
    }

    updateMeta(): this {
        const metaMarkers = this.clearPlaceholder("meta");
        metaMarkers.reverse();
        metaMarkers.forEach(mm => {
            this._content.splice(mm.lineNo + 1, 0, mm.content());
        });
        return this;
    }

    write(): Promise<this> {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.filePath, this._content.join("\n"), err => {
                if (err) reject(err);
                resolve(this);
            });
        });
    }
}

export class Docs {

    readonly files: { [id: string]: MDFile } = {};

    constructor(meta: Meta) {
        fs.readdirSync(`${wd}/docs`).filter(isMD).forEach(filePath => {
            const mdFile = new MDFile(`${wd}/docs/${filePath}`, meta);
            this.files[mdFile.name] = mdFile;
        });
    }
}
