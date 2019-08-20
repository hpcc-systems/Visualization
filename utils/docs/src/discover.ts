import * as fs from "fs";
import * as path from "path";
import * as TypeDoc from "typedoc";
import { TDNode } from "./meta";

const isMD = (file: string) => path.extname(file) === ".md";

function loadMDDoc(filePath: string): Promise<{ filePath: string, data: string }> {
    return new Promise(resolve => {
        fs.readFile(filePath, "utf8", (err, data) => {
            resolve({
                filePath,
                data
            });
        });
    });
}

function loadMDDocs(folder: string) {
    return new Promise((resolve, reject) => {
        fs.readdir(`${folder}/docs`, (err, files) => {
            if (err) reject(err);
            files = files || [];
            Promise.all(files.filter(isMD).map(loadMDDoc)).then(resolve);
        });
    });
}

function loadTypeDocCache(folder: string): Promise<TDNode> {
    return new Promise((resolve, reject) => {
        fs.readFile(`${folder}/docs/index.json`, "utf8", (err, json) => {
            if (err) reject(err);
            resolve(JSON.parse(json));
        });
    });
}

function loadTypeDoc(folder: string): Promise<TDNode> {
    return new Promise((resolve, reject) => {
        const app = new TypeDoc.Application({
            tsconfig: `${folder}/tsconfig.js`
        });

        const project = app.convert(app.expandInputFiles([`${folder}/src`]));
        if (project) {
            resolve(app.serializer.projectToObject(project));
        } else {
            reject("Error parsing typescript");
        }
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

export function loadMeta(folder: string, useCache: boolean = false) {
    return Promise.all([
        loadPackageJson(folder),
        useCache ? loadTypeDocCache(folder) : loadTypeDoc(folder),
        loadMDDocs(folder)
    ]);
}
