import * as fs from "fs";
import * as path from "path";

import { Meta, TSClass } from "./meta";

const wd = process.cwd();

const isMD = (file: string) => path.extname(file) === ".md";

export class MDFile {

    readonly name: string;
    private _meta: TSClass;
    private _content: string[];

    constructor(readonly filePath: string, meta: Meta) {
        this.name = path.basename(filePath, ".md");
        this._meta = meta.classes[this.name];
        this._content = fs.readFileSync(filePath, "utf8").split("\n");
    }

    protected clearPlaceholder(tag: string): number {
        let retVal = -1;
        const content: string[] = [];
        let inMeta = false;
        let lineNo = 0;
        for (const line of this._content) {
            if (line === "```meta") {
                inMeta = true;
                retVal = lineNo;
            } else if (inMeta && line === "```") {
                inMeta = false;
            } else if (inMeta && line.indexOf("```") === 0) {
                throw new Error(`Invalid Meta Section (${this.filePath})`);
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
        const metaLineNo = this.clearPlaceholder("meta");
        if (metaLineNo >= 0) {
            this._content.splice(metaLineNo + 1, 0, this._meta.toJSON());
        }
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
