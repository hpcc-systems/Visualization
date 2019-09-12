import * as fs from "fs";
import * as marked from "marked";
import * as path from "path";
import * as TypeDoc from "typedoc";
import { TDNode } from "./meta";

const isMD = (file: string) => path.extname(file) === ".md";
const isDirectory = (file: string) => fs.lstatSync(file).isDirectory();

export class MDDoc {

    constructor(readonly filePath: string, readonly data: string) {
    }

    tokens(): marked.TokensList {
        return marked.lexer(this.data);
    }

    headings(): marked.Tokens.Heading[] {
        return this.tokens().filter(t => t.type === "heading") as marked.Tokens.Heading[];
    }
}

function loadMDDoc(filePath: string): Promise<MDDoc> {
    return new Promise(resolve => {
        fs.readFile(filePath, "utf8", (err, data) => {
            resolve(new MDDoc(filePath, data));
        });
    });
}

function walk(dir): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (error, files) => {
            files = files || [];
            Promise.all(files.map((file) => {
                return new Promise((resolve, reject) => {
                    const filepath = path.join(dir, file);
                    fs.stat(filepath, (error, stats) => {
                        if (error) {
                            return reject(error);
                        }
                        if (stats.isDirectory()) {
                            walk(filepath).then(resolve);
                        } else if (stats.isFile()) {
                            resolve(filepath);
                        }
                    });
                });
            })).then((foldersContents: string[]) => {
                resolve(foldersContents.reduce((all, folderContents) => all.concat(folderContents), []));
            });
        });
    });
}

export function loadMDDocs(folder: string): Promise<MDDoc[]> {
    const docsFolder = path.join(folder, "docs");
    return walk(docsFolder).then((files: string[]) => {
        return Promise.all(files.filter(isMD).map(loadMDDoc));
    });
}

function loadTypeDoc(folder: string): Promise<TDNode> {
    return new Promise((resolve, reject) => {
        try { fs.mkdirSync(".doccache"); } catch (e) { }
        const docCache = path.join(".doccache", `${path.basename(folder)}.json`);
        console.log(`Creating ${docCache}`);
        const tsconfigPath = path.join(folder, "tsconfig.json");
        if (!fs.existsSync(tsconfigPath)) {
            const json: TDNode = {
                id: 0,
                name: path.basename(folder),
                kind: 0,
                kindString: undefined,
                flags: {
                },
                originalName: path.basename(folder)
            };
            fs.writeFile(docCache, JSON.stringify(json, undefined, 4), err => {
                resolve(json);
            });
        } else {
            const app = new TypeDoc.Application({
                tsconfig: `${folder}/tsconfig.js`
            });

            const project = app.convert(app.expandInputFiles([`${folder}/src`]));
            if (project) {
                const json = app.serializer.projectToObject(project);
                fs.writeFile(docCache, JSON.stringify(json, undefined, 4), err => {
                    resolve(json);
                });
            } else {
                reject("Error parsing typescript");
            }
        }
    });
}

function loadTypeDocCache(folder: string): Promise<TDNode> {
    return new Promise((resolve, reject) => {
        const docCache = path.join(".doccache", `${path.basename(folder)}.json`);
        console.log(`Loading ${docCache}`);
        fs.readFile(docCache, "utf8", (err, json) => {
            if (!json) {
                console.log(`No cache:  ${folder}`);
                resolve(loadTypeDoc(folder));
            } else {
                resolve(JSON.parse(json));
            }
        });
    });
}

function loadPackageJson(folder: string): Promise<any> {
    return new Promise((resolve, reject) => {
        fs.readFile(`${folder}/package.json`, "utf8", (err, json) => {
            if (err) reject(err);
            resolve(JSON.parse(json));
        });
    });
}

export function loadMeta(folder: string, useCache: boolean = true) {
    return Promise.all([
        loadPackageJson(folder),
        useCache ? loadTypeDocCache(folder) : loadTypeDoc(folder)
    ]);
}

export function calcFolders(): Promise<string[]> {
    const wd = process.cwd();
    return new Promise((resolve, reject) => {
        fs.readdir(path.join(wd, "../packages"), (err, files) => {
            if (err) reject(err);
            const folders = files.map(f => path.join(wd, "../packages", f)).filter(isDirectory);
            resolve([path.join(wd, ".."), ...folders, path.join(wd, ".")]);
        });
    });
}
