var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "fs", "mock-browser", "navigator", "node-hook", "path", "./generate/discover", "./generate/generate"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fs = require("fs");
    var MockBrowserMod = require("mock-browser");
    var navigator = require("navigator");
    var hook = require("node-hook");
    var path = require("path");
    var discover_1 = require("./generate/discover");
    var generate_1 = require("./generate/generate");
    //  Ignore CSS files during reflection ---
    hook.hook(".css", function (source, filename) {
        return "";
    });
    //  Create fake browser environment for reflection ---
    var MockBrowser = MockBrowserMod.mocks.MockBrowser;
    global["window"] = MockBrowser.createWindow();
    global["document"] = MockBrowser.createDocument();
    global["navigator"] = navigator;
    global["screen"] = {
        availWidth: 1024
    };
    var USE_CACHE = true;
    var posixPath = function (pathStr) { return pathStr.split(/[\\\/]/g).join(path.posix.sep); };
    discover_1.calcFolders().then(function (folders) {
        return Promise.all(folders.map(function (folder) {
            console.log("Scanning:  " + folder);
            return discover_1.loadMDDocs(folder).then(function (mdDocs) {
                return {
                    folder: folder,
                    mdDocs: mdDocs
                };
            });
        })).then(function (items) {
            return items.filter(function (item) { return item.mdDocs.length; });
        });
    }).then(function (mdFolders) {
        var index = [];
        return Promise.all(mdFolders.map(function (mdFolder) {
            return discover_1.loadMeta(mdFolder.folder, USE_CACHE).then(function (_a) {
                var pkg = _a[0], meta = _a[1];
                return __assign({}, mdFolder, { pkg: pkg,
                    meta: meta });
            }).then(function (metaFolder) {
                console.log("Generating:  " + metaFolder.folder);
                metaFolder.mdDocs.forEach(function (mdDoc) {
                    index.push({
                        path: posixPath(path.relative(".", mdDoc.filePath))
                    });
                    generate_1.updateMDMeta(metaFolder.folder, mdDoc.filePath, mdDoc.data, metaFolder.pkg, metaFolder.meta);
                });
            });
        })).then(function () {
            return new Promise(function (resolve, reject) {
                try {
                    fs.mkdirSync("src-umd");
                }
                catch (e) { }
                fs.writeFile("src-umd/index.json", JSON.stringify(index, undefined, 4), function (err) {
                    if (err)
                        reject(err);
                    resolve();
                });
            });
        });
    }).then(function () {
        console.log("Complete");
    }).catch(function (e) {
        console.error(e);
    });
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
//# sourceMappingURL=index-node.js.map