(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "fs", "path", "typedoc"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fs = require("fs");
    var path = require("path");
    var TypeDoc = require("typedoc");
    var isMD = function (file) { return path.extname(file) === ".md"; };
    var isDirectory = function (file) { return fs.lstatSync(file).isDirectory(); };
    function loadMDDoc(filePath) {
        return new Promise(function (resolve) {
            fs.readFile(filePath, "utf8", function (err, data) {
                resolve({
                    filePath: filePath,
                    data: data
                });
            });
        });
    }
    function walk(dir) {
        return new Promise(function (resolve, reject) {
            fs.readdir(dir, function (error, files) {
                files = files || [];
                Promise.all(files.map(function (file) {
                    return new Promise(function (resolve, reject) {
                        var filepath = path.join(dir, file);
                        fs.stat(filepath, function (error, stats) {
                            if (error) {
                                return reject(error);
                            }
                            if (stats.isDirectory()) {
                                walk(filepath).then(resolve);
                            }
                            else if (stats.isFile()) {
                                resolve(filepath);
                            }
                        });
                    });
                })).then(function (foldersContents) {
                    resolve(foldersContents.reduce(function (all, folderContents) { return all.concat(folderContents); }, []));
                });
            });
        });
    }
    function loadMDDocs(folder) {
        var docsFolder = path.join(folder, "docs");
        return walk(docsFolder).then(function (files) {
            return Promise.all(files.filter(isMD).map(loadMDDoc));
        });
    }
    exports.loadMDDocs = loadMDDocs;
    function loadTypeDoc(folder) {
        return new Promise(function (resolve, reject) {
            try {
                fs.mkdirSync(".doccache");
            }
            catch (e) { }
            var docCache = path.join(".doccache", path.basename(folder) + ".json");
            console.log("Creating " + docCache);
            var tsconfigPath = path.join(folder, "tsconfig.json");
            if (!fs.existsSync(tsconfigPath)) {
                var json_1 = {
                    id: 0,
                    name: path.basename(folder),
                    kind: 0,
                    kindString: undefined,
                    flags: {},
                    originalName: path.basename(folder)
                };
                fs.writeFile(docCache, JSON.stringify(json_1, undefined, 4), function (err) {
                    resolve(json_1);
                });
            }
            else {
                var app = new TypeDoc.Application({
                    tsconfig: folder + "/tsconfig.js"
                });
                var project = app.convert(app.expandInputFiles([folder + "/src"]));
                if (project) {
                    var json_2 = app.serializer.projectToObject(project);
                    fs.writeFile(docCache, JSON.stringify(json_2, undefined, 4), function (err) {
                        resolve(json_2);
                    });
                }
                else {
                    reject("Error parsing typescript");
                }
            }
        });
    }
    function loadTypeDocCache(folder) {
        return new Promise(function (resolve, reject) {
            var docCache = path.join(".doccache", path.basename(folder) + ".json");
            console.log("Loading " + docCache);
            fs.readFile(docCache, "utf8", function (err, json) {
                if (!json) {
                    console.log("No cache:  " + folder);
                    resolve(loadTypeDoc(folder));
                }
                else {
                    resolve(JSON.parse(json));
                }
            });
        });
    }
    function loadPackageJson(folder) {
        return new Promise(function (resolve, reject) {
            fs.readFile(folder + "/package.json", "utf8", function (err, json) {
                if (err)
                    reject(err);
                resolve(JSON.parse(json));
            });
        });
    }
    function loadMeta(folder, useCache) {
        if (useCache === void 0) { useCache = true; }
        return Promise.all([
            loadPackageJson(folder),
            useCache ? loadTypeDocCache(folder) : loadTypeDoc(folder)
        ]);
    }
    exports.loadMeta = loadMeta;
    function calcFolders() {
        var wd = process.cwd();
        return new Promise(function (resolve, reject) {
            fs.readdir(path.join(wd, "../packages"), function (err, files) {
                if (err)
                    reject(err);
                var folders = files.map(function (f) { return path.join(wd, "../packages", f); }).filter(isDirectory);
                resolve([path.join(wd, "..")].concat(folders));
            });
        });
    }
    exports.calcFolders = calcFolders;
});
//# sourceMappingURL=discover.js.map