import * as fs from "fs";
import * as MockBrowserMod from "mock-browser";
import * as navigator from "navigator";
import * as hook from "node-hook";
import * as path from "path";
import { calcFolders, loadMDDocs, loadMeta } from "./generate/discover";
import { updateMDMeta } from "./generate/generate";

//  Ignore CSS files during reflection ---
hook.hook(".css", (source, filename) => {
    return "";
});

//  Create fake browser environment for reflection ---
const MockBrowser = MockBrowserMod.mocks.MockBrowser;
global["window"] = MockBrowser.createWindow();
global["document"] = MockBrowser.createDocument();
global["navigator"] = navigator;
global["screen"] = {
    availWidth: 1024
};

const USE_CACHE = true;

interface Index {
    path: string;
}

const posixPath = (pathStr: string) => pathStr.split(/[\\\/]/g).join(path.posix.sep);

calcFolders().then(folders => {
    return Promise.all(folders.map(folder => {
        console.log(`Scanning:  ${folder}`);
        return loadMDDocs(folder).then(mdDocs => {
            return {
                folder,
                mdDocs
            };
        });
    })).then(items => {
        return items.filter(item => item.mdDocs.length);
    });
}).then(mdFolders => {
    const index: Index[] = [];
    return Promise.all(mdFolders.map(mdFolder => {
        return loadMeta(mdFolder.folder, USE_CACHE).then(([pkg, meta]) => {
            return {
                ...mdFolder,
                pkg,
                meta
            };
        }).then(metaFolder => {
            console.log(`Generating:  ${metaFolder.folder}`);
            metaFolder.mdDocs.forEach(mdDoc => {
                index.push({
                    path: posixPath(path.relative(".", mdDoc.filePath))
                });
                updateMDMeta(metaFolder.folder, mdDoc.filePath, mdDoc.data, metaFolder.pkg, metaFolder.meta);
            });
        });
    })).then(() => {
        return new Promise((resolve, reject) => {
            try {
                fs.mkdirSync("src-umd");
            } catch (e) { }
            fs.writeFile("src-umd/index.json", JSON.stringify(index, undefined, 4), err => {
                if (err) reject(err);
                resolve();
            });
        });
    });
}).then(() => {
    console.log("Complete");
}).catch(e => {
    console.error(e);
});

/*
const folder = path.join(process.cwd(), "../packages/chart");

import(`${folder}/lib-umd/Column.js`).then(modFile => {
    const col = new modFile.Column();
    const pp = col.publishedProperties();
    console.log(pp.map(m => m.id));
});

loadMeta(folder, false).then(([pkg, meta, docs]) => {
    debugger;
}).catch(e => {
    console.log(e);
});

*/
